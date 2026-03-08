# Claude Code Local Orchestration Bridge

Run Claude Code CLI tasks unattended from a single task file or command queue — with automatic logging, retries, and optional GitHub/Vercel CLI integration.

---

## Files

| File | Purpose |
|---|---|
| `run-claude-task.sh` | Bash runner (zero Python dependency) |
| `run-claude-task.py` | Python runner (structured JSON logs, retries, parallel execution) |
| `task.txt` | Example task file |
| `claude-logs/` | Auto-created log directory |

---

## Prerequisites

### Required

```bash
# Claude Code CLI (npm)
npm install -g @anthropic-ai/claude-code

# Authenticate once
claude auth login
```

### Optional (auto-detected at runtime)

```bash
# GitHub CLI — for PR/issue tasks
brew install gh        # macOS
sudo apt install gh    # Ubuntu/Debian
gh auth login

# Vercel CLI — for deployment tasks
npm install -g vercel
vercel login
```

---

## Quick Start

### 1. Make scripts executable

```bash
chmod +x run-claude-task.sh run-claude-task.py
```

### 2. Run a task file

```bash
./run-claude-task.sh task.txt
```

### 3. Run an inline task

```bash
./run-claude-task.sh "List all TypeScript files in src/ and summarise each one"
```

### 4. Run a directory queue

```bash
# Put multiple *.txt task files in a folder
mkdir -p tasks/
cp task.txt tasks/01-audit.txt
./run-claude-task.sh --queue tasks/
```

---

## Task File Format

```text
# Lines starting with # are comments — they are ignored.
# Tasks are separated by lines containing only ---
# Without any --- the entire file is treated as a single task.

List all TypeScript source files in src/ and describe each one.

---

# Task 2
Review package.json scripts and suggest missing standard scripts.

---

# Task 3 — uses gh CLI if available
List any open GitHub issues in this repository.
```

Save it as any `.txt` file and pass it to the runner.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `CLAUDE_LOG_DIR` | `./claude-logs` | Directory where logs are written |
| `CLAUDE_WORKDIR` | current directory | Repository root Claude operates in |
| `CLAUDE_MODEL` | `claude-sonnet-4-6` | Claude model to use |
| `CLAUDE_TIMEOUT` | `300` | Per-task timeout in seconds |
| `CLAUDE_RETRIES` | `2` | Max retries on failure (Python only) |

Example:

```bash
CLAUDE_MODEL=claude-opus-4-6 CLAUDE_TIMEOUT=600 ./run-claude-task.sh task.txt
```

---

## Bash Runner Reference

```
Usage:
  ./run-claude-task.sh <task-file.txt>         Run tasks from a file
  ./run-claude-task.sh "inline task string"    Run a single inline task
  ./run-claude-task.sh --queue <directory>     Run all *.txt files in a directory
  ./run-claude-task.sh --help                  Show help
```

**Key behaviour:**
- Uses `claude -p --no-interactive` so Claude never stops to ask for confirmation.
- Detects `gh` and `vercel` and tells Claude they are available.
- Writes a plain-text log to `claude-logs/session-<timestamp>.log`.
- Prints a summary table at the end with pass/fail/duration per task.
- Returns a non-zero exit code if any task fails — suitable for CI pipelines.

---

## Python Runner Reference

```
Usage:
  python run-claude-task.py task.txt
  python run-claude-task.py "inline task string"
  python run-claude-task.py --queue tasks/
  python run-claude-task.py task.txt --parallel 3
  python run-claude-task.py task.txt --retries 3 --timeout 600
```

**Extra features over the bash version:**

| Feature | Detail |
|---|---|
| Retries | Exponential back-off: 2 s, 4 s, 8 s … up to `--retries` attempts |
| Parallel | `--parallel N` runs N tasks concurrently via `ThreadPoolExecutor` |
| JSON logs | Every result written as a JSON line to `session-<id>.jsonl` for machine parsing |
| Rich summary | Colour-coded table with icons, duration, retry count |

---

## Logs

After each session two files are created inside `claude-logs/`:

```
claude-logs/
  session-20260308-143012-12345.log     # plain-text, human readable
  session-20260308-143012-12345.jsonl   # structured JSON lines (Python only)
  summary-20260308-143012-12345.txt     # one-line per task (bash only)
```

### Reading the JSONL log with jq

```bash
# Show all failed tasks
jq 'select(.status != "ok")' claude-logs/*.jsonl

# Show total duration per task
jq '{label, duration_s, status}' claude-logs/*.jsonl
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
        description: "Task file to run"
        default: "task.txt"

jobs:
  run-tasks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Authenticate
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" >> $GITHUB_ENV

      - name: Run tasks
        run: |
          chmod +x run-claude-task.sh
          ./run-claude-task.sh "${{ github.event.inputs.task_file }}"

      - name: Upload logs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: claude-logs
          path: claude-logs/
```

---

## Troubleshooting

### `claude: command not found`
Install Claude Code CLI: `npm install -g @anthropic-ai/claude-code`

### Tasks hang or time out
Increase `CLAUDE_TIMEOUT`: `CLAUDE_TIMEOUT=600 ./run-claude-task.sh task.txt`

### Authentication errors
Run `claude auth login` once in your terminal before using the bridge.

### `--no-interactive` flag not recognised
You may be on an older version of Claude Code. Update with: `npm update -g @anthropic-ai/claude-code`

### Tasks fail silently
Check the log file: `cat claude-logs/session-*.log | tail -100`
