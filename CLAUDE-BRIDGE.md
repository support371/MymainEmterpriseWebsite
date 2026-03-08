# Claude Code Local Orchestration Bridge

A production-grade autonomous executor that lets you run Claude Code tasks
unattended from a single command — with multi-task files, retries, dry-run,
watch mode, JSONL logs, GitHub CLI, and Vercel CLI integration.

---

## Quick Start

```bash
# 1. Install Claude Code CLI
npm install -g @anthropic-ai/claude-code
claude auth login

# 2. Make the runner executable
chmod +x claude-run

# 3. Run your first task file
./claude-run task.txt

# 4. Or an inline task
./claude-run "List all TypeScript files in src/ and describe each one"
```

---

## Files

```
claude-run              ← main entrypoint (Python, no external deps)
run-claude-task.sh      ← legacy bash runner (zero Python needed)
run-claude-task.py      ← Python runner (subset of claude-run features)
task.txt                ← example task file
tasks/
  cleanup.txt           ← GitHub housekeeping examples
  deploy.txt            ← build, test, and Vercel deploy examples
  audit.txt             ← dependency and security audit examples
  done/                 ← completed task files (watch mode)
  failed/               ← failed task files (watch mode)
logs/                   ← timestamped stdout/stderr + JSONL logs
```

---

## Prerequisites

### Required

```bash
npm install -g @anthropic-ai/claude-code
claude auth login
```

### Optional (auto-detected)

```bash
# GitHub CLI
brew install gh          # macOS
sudo apt install gh      # Ubuntu/Debian
gh auth login

# Vercel CLI
npm install -g vercel
vercel login
```

Both tools are auto-detected at startup. Claude is told which ones are present
so it can use or skip them appropriately.

---

## Usage

### Run a task file

```bash
./claude-run task.txt
```

### Run an inline task

```bash
./claude-run "Summarise every file in src/ in one line each"
```

### Multi-task file with `---` separators

```text
# my-tasks.txt
Audit all dependencies in package.json

---

Check all open GitHub issues and label them by priority

---

Run the test suite and report failing tests
```

```bash
./claude-run my-tasks.txt
```

### Run all `.txt` files in a directory (queue mode)

```bash
./claude-run --queue tasks/
```

### Watch a directory for new task files (daemon mode)

```bash
./claude-run --watch tasks/
```

Drop any `.txt` file into `tasks/` and it is picked up automatically.
After execution the file is moved to `tasks/done/` or `tasks/failed/`.

---

## Flags Reference

| Flag | Description |
|---|---|
| `--retry N` | Retry failed tasks up to N times with exponential back-off (2s, 4s, 8s …) |
| `--dry-run` | Preview tasks without executing them |
| `--dangerously-skip-permissions` | Pass `--dangerously-skip-permissions` to Claude CLI (no interactive confirmations) |
| `--parallel N` | Run N tasks concurrently |
| `--fail-fast` | Stop after the first task failure |
| `--model MODEL` | Claude model to use (default: `claude-sonnet-4-6`) |
| `--timeout SECS` | Per-task timeout in seconds (default: 300) |
| `--workdir PATH` | Repository root Claude operates in (default: current dir) |
| `--log-dir PATH` | Log directory (default: `./logs`) |
| `--watch DIR` | Watch DIR for incoming `.txt` task files |
| `--queue DIR` | Process every `.txt` in DIR once, then exit |
| `--poll SECS` | Watch poll interval (default: 2s) |

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `CLAUDE_MODEL` | `claude-sonnet-4-6` | Model override |
| `CLAUDE_TIMEOUT` | `300` | Per-task timeout (seconds) |
| `CLAUDE_RETRIES` | `2` | Retry count |
| `CLAUDE_WORKDIR` | current dir | Repository root |
| `CLAUDE_LOG_DIR` | `./logs` | Log directory |

```bash
CLAUDE_MODEL=claude-opus-4-6 CLAUDE_TIMEOUT=600 ./claude-run task.txt
```

---

## Logging

Every session produces files in `logs/`:

```
logs/
  session-20260308-143012-12345.log       ← full human-readable session log
  session-20260308-143012-12345.jsonl     ← machine-readable JSONL events
  task-20260308-143012-001-task_name.log  ← per-task stdout/stderr
  task-20260308-143012-002-task_name.log
  …
```

### JSONL event types

| Event | Description |
|---|---|
| `session_start` | Session opened with config snapshot |
| `task_result` | Result for each executed task |
| `session_end` | Aggregated pass/fail counts |
| `watch_start` | Watch daemon activated |
| `file_picked` | New file detected |
| `file_processed` | File processed and moved |
| `watch_stop` | Watch daemon stopped |

### Querying JSONL logs with jq

```bash
# All failed tasks
jq 'select(.status == "failed")' logs/*.jsonl

# Task durations
jq '{label, duration_s, status}' logs/*.jsonl

# Session summary
jq 'select(.event == "session_end")' logs/*.jsonl
```

---

## Example: GitHub Cleanup

```bash
./claude-run tasks/cleanup.txt
```

Tasks included:
1. List all open issues with age
2. Audit stale branches (no delete)
3. Report merged-PR branches as deletion candidates
4. Health check all open PRs (draft / review / CI status)

---

## Example: Build and Deploy

```bash
./claude-run tasks/deploy.txt
```

Tasks included:
1. Run Next.js build — stop if it fails
2. Run test suite
3. Check Vercel deployment history
4. Create a preview deployment
5. Post preview URL as a PR comment via gh

---

## Example: Code Audit

```bash
./claude-run tasks/audit.txt
```

Tasks included:
1. Unused dependency detection
2. TypeScript strict-mode gap report
3. Environment variable coverage check
4. Security pattern scan (eval, innerHTML, dangerouslySetInnerHTML …)
5. Large file report

---

## Watch Mode Walk-through

```bash
# Start the watcher
./claude-run --watch tasks/ &

# Drop a task file in
cp tasks/audit.txt tasks/my-audit-run.txt

# claude-run picks it up, executes it, then:
#   success → tasks/done/my-audit-run.txt
#   failure → tasks/failed/my-audit-run.txt

# Stop the watcher
kill %1   # or Ctrl-C in the foreground
```

---

## Dry Run

Preview what tasks would be sent to Claude — without executing anything:

```bash
./claude-run tasks/deploy.txt --dry-run
```

---

## Retry and Fail-Fast

```bash
# Retry each task up to 3 times on failure
./claude-run task.txt --retry 3

# Stop immediately after the first failure
./claude-run task.txt --fail-fast

# Both together
./claude-run task.txt --retry 2 --fail-fast
```

---

## Parallel Execution

```bash
# Run all tasks in a queue concurrently (3 at a time)
./claude-run --queue tasks/ --parallel 3
```

---

## CI / GitHub Actions Integration

```yaml
# .github/workflows/claude-tasks.yml
name: Claude Code Tasks

on:
  workflow_dispatch:
    inputs:
      task_file:
        description: Task file to run
        default: task.txt

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run tasks
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          chmod +x claude-run
          ./claude-run "${{ github.event.inputs.task_file }}" \
            --dangerously-skip-permissions \
            --retry 2

      - name: Upload logs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: claude-logs
          path: logs/
```

---

## Task File Format

```text
# Lines starting with # are comments — ignored
# Tasks are separated by --- on its own line
# Without any --- the whole file is one task

First task text here.
Can span multiple lines.

---

# Second task
Second task text here.

---

Third task.
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `claude: command not found` | `npm install -g @anthropic-ai/claude-code` |
| `--no-interactive` not recognised | `npm update -g @anthropic-ai/claude-code` |
| Tasks time out | Increase `--timeout 600` or `CLAUDE_TIMEOUT=600` |
| Auth errors | `claude auth login` |
| `gh` commands fail | `gh auth login` |
| Watch mode misses files | Reduce `--poll 1` or check filesystem events |
| Silent failures | `cat logs/session-*.log | tail -100` |
