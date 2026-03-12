#!/usr/bin/env python3
"""
run-claude-task.py — Local Orchestration Bridge for Claude Code (Python edition)

Features over the bash version:
  - Structured JSON logging
  - Automatic retries with exponential back-off
  - Concurrent task execution (--parallel flag)
  - Richer summary table

Usage:
    python run-claude-task.py task.txt
    python run-claude-task.py "inline task string"
    python run-claude-task.py --queue tasks/
    python run-claude-task.py task.txt --parallel 3

Environment variables (same as bash version):
    CLAUDE_LOG_DIR    Log directory           (default: ./claude-logs)
    CLAUDE_WORKDIR    Working directory       (default: cwd)
    CLAUDE_MODEL      Claude model ID         (default: claude-sonnet-4-6)
    CLAUDE_TIMEOUT    Per-task timeout (sec)  (default: 300)
    CLAUDE_RETRIES    Max retries on failure  (default: 2)
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
LOG_DIR    = Path(os.environ.get("CLAUDE_LOG_DIR",  "./claude-logs"))
WORKDIR    = Path(os.environ.get("CLAUDE_WORKDIR",  ".")).resolve()
MODEL      = os.environ.get("CLAUDE_MODEL",   "claude-sonnet-4-6")
TIMEOUT    = int(os.environ.get("CLAUDE_TIMEOUT",  "300"))
MAX_RETRY  = int(os.environ.get("CLAUDE_RETRIES",  "2"))
SESSION_ID = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S") + f"-{os.getpid()}"

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------
LOG_DIR.mkdir(parents=True, exist_ok=True)
_log_path = LOG_DIR / f"session-{SESSION_ID}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    datefmt="%H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(_log_path, encoding="utf-8"),
    ],
)
log = logging.getLogger("orchestrator")

# JSONL structured log file for machine consumption
_jsonl_path = LOG_DIR / f"session-{SESSION_ID}.jsonl"


def _jsonl(record: dict) -> None:
    """Append a JSON line to the structured log."""
    with _jsonl_path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(record, ensure_ascii=False) + "\n")


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------
@dataclass
class TaskResult:
    index: int
    label: str
    status: str          # "ok" | "failed" | "timeout" | "skipped"
    exit_code: int
    duration_s: float
    output: str
    retries: int = 0
    error: Optional[str] = None


# ---------------------------------------------------------------------------
# Tool detection
# ---------------------------------------------------------------------------
def detect_tools() -> dict[str, str]:
    """Return a dict of {tool: path} for every tool that is installed."""
    candidates = {
        "claude":  "claude",
        "gh":      "gh",
        "vercel":  "vercel",
        "jq":      "jq",
        "python3": "python3",
        "node":    "node",
    }
    found = {}
    for name, cmd in candidates.items():
        path = shutil.which(cmd)
        if path:
            found[name] = path

    if "claude" not in found:
        log.error("Claude Code CLI not found. Install: npm install -g @anthropic-ai/claude-code")
        sys.exit(1)

    log.info("Available tools: %s", ", ".join(found.keys()))
    missing = [k for k in ("gh", "vercel") if k not in found]
    if missing:
        log.warning("Optional tools not found: %s", ", ".join(missing))

    return found


# ---------------------------------------------------------------------------
# Task file parser
# ---------------------------------------------------------------------------
SEPARATOR = re.compile(r"^\s*---\s*$")
COMMENT   = re.compile(r"^\s*#")


def parse_task_file(path: Path) -> list[str]:
    """Split a task file into individual task strings."""
    tasks: list[str] = []
    current: list[str] = []

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if COMMENT.match(raw_line):
            continue
        if SEPARATOR.match(raw_line):
            chunk = "\n".join(current).strip()
            if chunk:
                tasks.append(chunk)
            current = []
        else:
            current.append(raw_line)

    chunk = "\n".join(current).strip()
    if chunk:
        tasks.append(chunk)

    log.info("Loaded %d task(s) from %s", len(tasks), path)
    return tasks


# ---------------------------------------------------------------------------
# Single-task executor
# ---------------------------------------------------------------------------
def run_task(
    task_text: str,
    index: int,
    label: str,
    tools_available: dict[str, str],
    *,
    retries: int = MAX_RETRY,
) -> TaskResult:
    """Execute one task via `claude -p` and return a TaskResult."""

    context_lines = [
        f"Working directory: {WORKDIR}",
        f"Available CLI tools: {', '.join(tools_available.keys())}",
    ]
    if "gh" in tools_available:
        context_lines.append("  - GitHub CLI (gh) is available for PR/issue operations")
    if "vercel" in tools_available:
        context_lines.append("  - Vercel CLI is available for deployments")

    full_prompt = "\n".join(context_lines) + "\n\nTask:\n" + task_text

    cmd = [
        tools_available["claude"],
        "--model", MODEL,
        "--output-format", "text",
        "--no-interactive",
        "-p",
        full_prompt,
    ]

    attempt = 0
    last_exit = -1
    last_output = ""
    last_error: Optional[str] = None
    t_start = time.monotonic()

    while attempt <= retries:
        if attempt > 0:
            wait = 2 ** attempt          # 2s, 4s, 8s …
            log.warning("  Retry %d/%d for task %d — waiting %ds", attempt, retries, index, wait)
            time.sleep(wait)

        attempt += 1
        log.info("  Running task %d (attempt %d): %s", index, attempt, label)

        try:
            result = subprocess.run(
                cmd,
                cwd=str(WORKDIR),
                capture_output=True,
                text=True,
                timeout=TIMEOUT,
            )
            last_exit   = result.returncode
            last_output = result.stdout + result.stderr

            if last_exit == 0:
                break
            last_error = f"non-zero exit: {last_exit}"

        except subprocess.TimeoutExpired:
            last_exit   = 124
            last_output = ""
            last_error  = f"timed out after {TIMEOUT}s"
            break                        # no point retrying a timeout
        except Exception as exc:         # noqa: BLE001
            last_exit  = -1
            last_error = str(exc)

    duration = time.monotonic() - t_start

    if last_exit == 124:
        status = "timeout"
        log.error("Task %d timed out (%s)", index, label)
    elif last_exit == 0:
        status = "ok"
        log.info("Task %d completed in %.1fs (%s)", index, duration, label)
    else:
        status = "failed"
        log.error("Task %d failed (exit %d, %s)", index, last_exit, label)

    tr = TaskResult(
        index=index,
        label=label,
        status=status,
        exit_code=last_exit,
        duration_s=round(duration, 2),
        output=last_output,
        retries=attempt - 1,
        error=last_error,
    )

    _jsonl({
        "session": SESSION_ID,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        **asdict(tr),
    })

    return tr


# ---------------------------------------------------------------------------
# Batch runner
# ---------------------------------------------------------------------------
def run_tasks_sequential(tasks: list[str], labels: list[str], tools: dict) -> list[TaskResult]:
    results = []
    for i, (task, label) in enumerate(zip(tasks, labels), start=1):
        results.append(run_task(task, i, label, tools))
    return results


def run_tasks_parallel(tasks: list[str], labels: list[str], tools: dict, workers: int) -> list[TaskResult]:
    results: list[TaskResult] = [None] * len(tasks)  # type: ignore[list-item]
    with ThreadPoolExecutor(max_workers=workers) as pool:
        future_map = {
            pool.submit(run_task, task, i + 1, label, tools): i
            for i, (task, label) in enumerate(zip(tasks, labels))
        }
        for future in as_completed(future_map):
            idx = future_map[future]
            results[idx] = future.result()
    return results


# ---------------------------------------------------------------------------
# Summary printer
# ---------------------------------------------------------------------------
TICK  = "\u2714"
CROSS = "\u2718"
CLOCK = "\u23f1"

STATUS_ICON = {"ok": TICK, "failed": CROSS, "timeout": CLOCK, "skipped": "-"}
STATUS_CLRS = {
    "ok":      "\033[32m",
    "failed":  "\033[31m",
    "timeout": "\033[33m",
    "skipped": "\033[90m",
}
RESET = "\033[0m"
BOLD  = "\033[1m"


def print_summary(results: list[TaskResult]) -> int:
    """Print a formatted summary table. Returns overall exit code."""
    ok_count      = sum(1 for r in results if r.status == "ok")
    failed_count  = sum(1 for r in results if r.status in ("failed", "timeout"))
    total_dur     = sum(r.duration_s for r in results)

    print(f"\n{BOLD}{'=' * 66}{RESET}")
    print(f"{BOLD}  Execution Summary  —  Session {SESSION_ID}{RESET}")
    print(f"{BOLD}{'=' * 66}{RESET}")
    print(f"  {'#':<4}  {'Status':<10}  {'Duration':>8}  {'Retries':>7}  Label")
    print(f"  {'-'*4}  {'-'*10}  {'-'*8}  {'-'*7}  {'-'*30}")
    for r in results:
        icon  = STATUS_ICON.get(r.status, "?")
        colour = STATUS_CLRS.get(r.status, "")
        print(
            f"  {r.index:<4}  "
            f"{colour}{icon} {r.status:<8}{RESET}  "
            f"{r.duration_s:>7.1f}s  "
            f"{r.retries:>7}  "
            f"{r.label[:40]}"
        )
    print(f"{BOLD}{'=' * 66}{RESET}")
    print(f"  Tasks: {ok_count} passed, {failed_count} failed  |  "
          f"Total time: {total_dur:.1f}s")
    print(f"  Log (text):  {_log_path}")
    print(f"  Log (jsonl): {_jsonl_path}")
    if failed_count == 0:
        print(f"  Status: {STATUS_CLRS['ok']}{TICK} ALL TASKS PASSED{RESET}")
    else:
        print(f"  Status: {STATUS_CLRS['failed']}{CROSS} {failed_count} TASK(S) FAILED{RESET}")
    print(f"{BOLD}{'=' * 66}{RESET}\n")

    return 0 if failed_count == 0 else 1


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="run-claude-task.py",
        description="Local orchestration bridge — run Claude Code tasks from files or command line.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument(
        "input",
        nargs="?",
        help="Task file (.txt), inline task string, or directory (with --queue)",
    )
    p.add_argument(
        "--queue", "-q",
        metavar="DIR",
        help="Process every *.txt file in this directory as a task queue",
    )
    p.add_argument(
        "--parallel", "-P",
        metavar="N",
        type=int,
        default=1,
        help="Run tasks in parallel using N workers (default: 1 = sequential)",
    )
    p.add_argument(
        "--model",
        default=MODEL,
        help=f"Claude model ID (default: {MODEL})",
    )
    p.add_argument(
        "--timeout",
        type=int,
        default=TIMEOUT,
        help=f"Per-task timeout in seconds (default: {TIMEOUT})",
    )
    p.add_argument(
        "--retries",
        type=int,
        default=MAX_RETRY,
        help=f"Max retries on transient failure (default: {MAX_RETRY})",
    )
    return p


def main() -> None:
    global MODEL, TIMEOUT, MAX_RETRY  # noqa: PLW0603

    parser = build_parser()
    args = parser.parse_args()

    MODEL      = args.model
    TIMEOUT    = args.timeout
    MAX_RETRY  = args.retries

    log.info("Session %s started  |  workdir: %s", SESSION_ID, WORKDIR)

    tools = detect_tools()

    all_tasks: list[str]  = []
    all_labels: list[str] = []

    # --queue mode
    if args.queue:
        queue_dir = Path(args.queue)
        if not queue_dir.is_dir():
            log.error("Queue directory not found: %s", queue_dir)
            sys.exit(1)
        task_files = sorted(queue_dir.glob("*.txt"))
        if not task_files:
            log.error("No *.txt files found in %s", queue_dir)
            sys.exit(1)
        for tf in task_files:
            parsed = parse_task_file(tf)
            all_tasks.extend(parsed)
            all_labels.extend([f"{tf.name}:{i+1}" for i in range(len(parsed))])

    elif args.input:
        p = Path(args.input)
        if p.is_file():
            parsed = parse_task_file(p)
            all_tasks.extend(parsed)
            all_labels.extend([f"{p.name}:{i+1}" for i in range(len(parsed))])
        else:
            # Treat as inline task string
            all_tasks.append(args.input)
            all_labels.append("inline")
    else:
        parser.print_help()
        sys.exit(0)

    if not all_tasks:
        log.error("No tasks to execute.")
        sys.exit(1)

    log.info("Total tasks to execute: %d", len(all_tasks))

    if args.parallel > 1:
        log.info("Running in parallel with %d workers", args.parallel)
        results = run_tasks_parallel(all_tasks, all_labels, tools, args.parallel)
    else:
        results = run_tasks_sequential(all_tasks, all_labels, tools)

    sys.exit(print_summary(results))


if __name__ == "__main__":
    main()
