#!/usr/bin/env bash
# =============================================================================
# run-claude-task.sh — Local Orchestration Bridge for Claude Code
#
# Usage:
#   ./run-claude-task.sh task.txt          # run tasks from a file
#   ./run-claude-task.sh "task string"     # run a single inline task
#   ./run-claude-task.sh --queue tasks/    # run all *.txt files in a directory
#
# Environment variables:
#   CLAUDE_LOG_DIR   Directory to write logs (default: ./claude-logs)
#   CLAUDE_WORKDIR   Working directory for Claude (default: current dir)
#   CLAUDE_MODEL     Model to use (default: claude-sonnet-4-6)
#   CLAUDE_TIMEOUT   Per-task timeout in seconds (default: 300)
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
CLAUDE_LOG_DIR="${CLAUDE_LOG_DIR:-./claude-logs}"
CLAUDE_WORKDIR="${CLAUDE_WORKDIR:-$(pwd)}"
CLAUDE_MODEL="${CLAUDE_MODEL:-claude-sonnet-4-6}"
CLAUDE_TIMEOUT="${CLAUDE_TIMEOUT:-300}"
SESSION_ID="$(date +%Y%m%d-%H%M%S)-$$"
LOG_FILE="${CLAUDE_LOG_DIR}/session-${SESSION_ID}.log"
SUMMARY_FILE="${CLAUDE_LOG_DIR}/summary-${SESSION_ID}.txt"

# ---------------------------------------------------------------------------
# Colours
# ---------------------------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
log()     { echo -e "${CYAN}[$(date '+%H:%M:%S')]${RESET} $*" | tee -a "$LOG_FILE"; }
success() { echo -e "${GREEN}[OK]${RESET} $*" | tee -a "$LOG_FILE"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET} $*" | tee -a "$LOG_FILE"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" | tee -a "$LOG_FILE" >&2; }
die()     { error "$*"; exit 1; }

# ---------------------------------------------------------------------------
# Detect available tools
# ---------------------------------------------------------------------------
check_tools() {
    local tools_found=()
    local tools_missing=()

    command -v claude  &>/dev/null && tools_found+=("claude")  || tools_missing+=("claude (required)")
    command -v gh      &>/dev/null && tools_found+=("gh")      || tools_missing+=("gh")
    command -v vercel  &>/dev/null && tools_found+=("vercel")  || tools_missing+=("vercel")
    command -v jq      &>/dev/null && tools_found+=("jq")      || true  # optional
    command -v python3 &>/dev/null && tools_found+=("python3") || true  # optional

    if [[ ! " ${tools_found[*]} " =~ " claude " ]]; then
        die "Claude Code CLI not found. Install it with: npm install -g @anthropic-ai/claude-code"
    fi

    log "Available tools: ${tools_found[*]}"
    [[ ${#tools_missing[@]} -gt 0 ]] && warn "Optional tools not found: ${tools_missing[*]}"

    # Export for use in task hints passed to Claude
    TOOLS_AVAILABLE="${tools_found[*]}"
    export TOOLS_AVAILABLE
}

# ---------------------------------------------------------------------------
# Build the base Claude command
# ---------------------------------------------------------------------------
build_claude_cmd() {
    CLAUDE_CMD=(
        claude
        --model "$CLAUDE_MODEL"
        --output-format text
        --no-interactive           # never prompt the user mid-run
        -p                         # print mode: non-interactive single pass
    )
    # Pass working directory via env so subshell inherits it
    export CLAUDE_WORKDIR
}

# ---------------------------------------------------------------------------
# Run a single task string
# ---------------------------------------------------------------------------
run_task() {
    local task_text="$1"
    local task_index="${2:-1}"
    local task_label="${3:-task}"

    log "--- Task ${task_index}: ${task_label} ---"
    echo "TASK: $task_text" >> "$LOG_FILE"

    local task_start; task_start=$(date +%s)
    local exit_code=0
    local output=""

    # Prepend context about available tools so Claude can leverage them
    local full_prompt="Working directory: ${CLAUDE_WORKDIR}

Available CLI tools on this machine: ${TOOLS_AVAILABLE}
$(command -v gh     &>/dev/null && echo "  - GitHub CLI (gh) is available for PR/issue operations")
$(command -v vercel &>/dev/null && echo "  - Vercel CLI is available for deployments")

Task:
${task_text}"

    output=$(
        cd "$CLAUDE_WORKDIR"
        timeout "$CLAUDE_TIMEOUT" "${CLAUDE_CMD[@]}" "$full_prompt" 2>&1
    ) || exit_code=$?

    local task_end; task_end=$(date +%s)
    local duration=$(( task_end - task_start ))

    echo "OUTPUT:" >> "$LOG_FILE"
    echo "$output"  >> "$LOG_FILE"
    echo "EXIT_CODE: $exit_code  DURATION: ${duration}s" >> "$LOG_FILE"
    echo "---" >> "$LOG_FILE"

    if [[ $exit_code -eq 124 ]]; then
        error "Task ${task_index} timed out after ${CLAUDE_TIMEOUT}s"
        record_summary "$task_index" "$task_label" "TIMEOUT" "$duration"
        return 1
    elif [[ $exit_code -ne 0 ]]; then
        error "Task ${task_index} failed (exit $exit_code)"
        record_summary "$task_index" "$task_label" "FAILED (exit $exit_code)" "$duration"
        return $exit_code
    else
        success "Task ${task_index} completed in ${duration}s"
        record_summary "$task_index" "$task_label" "OK" "$duration"
        echo "$output"
        return 0
    fi
}

# ---------------------------------------------------------------------------
# Record a one-line summary entry
# ---------------------------------------------------------------------------
record_summary() {
    local idx="$1" label="$2" status="$3" dur="$4"
    printf "  [%s] Task %-3s %-40s %s  (%ss)\n" \
        "$status" "$idx" "${label:0:40}" "$(date '+%H:%M:%S')" "$dur" \
        >> "$SUMMARY_FILE"
}

# ---------------------------------------------------------------------------
# Load tasks from a file
# Lines starting with # are comments; blank lines are skipped.
# A line starting with "---" acts as a task separator (multi-line tasks).
# ---------------------------------------------------------------------------
load_tasks_from_file() {
    local file="$1"
    [[ -f "$file" ]] || die "Task file not found: $file"

    local tasks=()
    local current_task=""

    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip comment lines
        [[ "$line" =~ ^[[:space:]]*# ]] && continue

        if [[ "$line" == "---" ]]; then
            # Separator: flush the current task
            if [[ -n "${current_task// /}" ]]; then
                tasks+=("$current_task")
                current_task=""
            fi
        else
            # Accumulate lines into the current task
            if [[ -n "$current_task" ]]; then
                current_task+=$'\n'"$line"
            elif [[ -n "${line// /}" ]]; then
                current_task="$line"
            fi
        fi
    done < "$file"

    # Flush last task
    [[ -n "${current_task// /}" ]] && tasks+=("$current_task")

    echo "${#tasks[@]} tasks loaded from $file" | tee -a "$LOG_FILE"
    # Return tasks via global array (bash limitation)
    LOADED_TASKS=("${tasks[@]}")
}

# ---------------------------------------------------------------------------
# Run all *.txt files in a directory (queue mode)
# ---------------------------------------------------------------------------
run_queue() {
    local dir="$1"
    [[ -d "$dir" ]] || die "Queue directory not found: $dir"

    local queue_files=()
    while IFS= read -r -d '' f; do
        queue_files+=("$f")
    done < <(find "$dir" -maxdepth 1 -name "*.txt" -print0 | sort -z)

    [[ ${#queue_files[@]} -eq 0 ]] && die "No *.txt task files found in $dir"

    log "Queue mode: processing ${#queue_files[@]} file(s) from $dir"
    local overall_exit=0

    for qf in "${queue_files[@]}"; do
        log "Processing queue file: $qf"
        load_tasks_from_file "$qf"
        local idx=0
        for t in "${LOADED_TASKS[@]}"; do
            idx=$(( idx + 1 ))
            run_task "$t" "$idx" "$(basename "$qf"):$idx" || overall_exit=$?
        done
    done
    return $overall_exit
}

# ---------------------------------------------------------------------------
# Print final summary
# ---------------------------------------------------------------------------
print_summary() {
    local overall_exit="$1"
    echo ""
    echo -e "${BOLD}============================================================${RESET}"
    echo -e "${BOLD} Execution Summary  —  Session ${SESSION_ID}${RESET}"
    echo -e "${BOLD}============================================================${RESET}"
    cat "$SUMMARY_FILE" 2>/dev/null || echo "  (no tasks recorded)"
    echo ""
    echo "  Log file:  $LOG_FILE"
    echo "  Work dir:  $CLAUDE_WORKDIR"
    if [[ $overall_exit -eq 0 ]]; then
        echo -e "  Status:    ${GREEN}ALL TASKS PASSED${RESET}"
    else
        echo -e "  Status:    ${RED}ONE OR MORE TASKS FAILED (exit $overall_exit)${RESET}"
    fi
    echo -e "${BOLD}============================================================${RESET}"
}

# ---------------------------------------------------------------------------
# Usage / help
# ---------------------------------------------------------------------------
usage() {
    cat <<EOF
Usage:
  $(basename "$0") <task-file.txt>          Run tasks from a file
  $(basename "$0") "inline task string"     Run a single inline task
  $(basename "$0") --queue <directory>      Run all *.txt files in a directory
  $(basename "$0") --help                   Show this message

Environment variables:
  CLAUDE_LOG_DIR   Log directory           (default: ./claude-logs)
  CLAUDE_WORKDIR   Working directory       (default: current directory)
  CLAUDE_MODEL     Claude model ID         (default: claude-sonnet-4-6)
  CLAUDE_TIMEOUT   Timeout per task (sec)  (default: 300)

Task file format:
  - Plain text; each logical task is separated by a line containing only ---
  - Lines starting with # are comments and are ignored
  - If no --- separators are present, the entire file is treated as one task
EOF
    exit 0
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
    [[ $# -eq 0 ]] && usage

    mkdir -p "$CLAUDE_LOG_DIR"
    touch "$LOG_FILE" "$SUMMARY_FILE"

    log "Session ${SESSION_ID} started"
    log "Working directory: $CLAUDE_WORKDIR"
    log "Log file: $LOG_FILE"

    check_tools
    build_claude_cmd

    local overall_exit=0

    case "${1:-}" in
        --help|-h)
            usage
            ;;

        --queue|-q)
            [[ -z "${2:-}" ]] && die "--queue requires a directory argument"
            run_queue "$2" || overall_exit=$?
            ;;

        *)
            local arg="$1"

            if [[ -f "$arg" ]]; then
                # Task file
                load_tasks_from_file "$arg"
                local idx=0
                for task in "${LOADED_TASKS[@]}"; do
                    idx=$(( idx + 1 ))
                    run_task "$task" "$idx" "$(basename "$arg"):$idx" || overall_exit=$?
                done
            else
                # Treat the argument as an inline task string
                run_task "$arg" 1 "inline" || overall_exit=$?
            fi
            ;;
    esac

    print_summary "$overall_exit"
    exit $overall_exit
}

main "$@"
