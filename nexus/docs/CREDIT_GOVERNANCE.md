# Credit & Token Governance

## Overview

The Nexus platform enforces strict AI usage governance to keep costs predictable and capped. Every AI call flows through a budget manager that enforces limits, caches responses, and logs usage.

## Budget Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `MAX_DAILY_TOKENS` | 500,000 | Maximum total tokens per calendar day |
| `MAX_RUN_TOKENS` | 100,000 | Maximum tokens per single run/session |
| `MAX_CALLS_PER_RUN` | 20 | Maximum API calls per day |

Set these in your `.env` file or Vercel environment variables.

## Architecture

### Local Script (`scripts/ai-budget-manager.js`)

```
node scripts/ai-budget-manager.js \
  --provider openai \
  --prompt "Review this function for bugs" \
  --context "$(cat src/services/DepositService.js)"
```

### Serverless Endpoints (Vercel Functions)

- `POST /api/ai-review` — Code review via AI
- `POST /api/ai-generate` — Code generation via AI (diff-first by default)

Both endpoints enforce the same budget rules.

## Caching Strategy

1. Every prompt+context pair is hashed (SHA-256).
2. If the hash matches a cached response, the cached result is returned immediately (0 tokens consumed).
3. Cache entries expire after 24 hours.
4. Cache is stored:
   - Locally: `.cache/ai-cache.json`
   - Serverless: in-memory (resets on cold start)

## Diff-First Workflow

The system instructs AI models to produce **unified diff/patch output** rather than full file rewrites. This:
- Reduces output tokens by 60-80%
- Makes changes easier to review
- Produces smaller, reversible commits

## Small Context Discipline

When making AI calls:
- Only send the **specific file** being reviewed/modified
- Never send the entire repository
- Extract only the relevant function/section when possible

## Usage Logging

All AI calls are logged to `logs/ai-usage.json`:

```json
{
  "daily": {
    "2026-02-08": { "tokens": 12500, "calls": 3 }
  },
  "runs": [
    {
      "timestamp": "2026-02-08T10:30:00Z",
      "provider": "openai",
      "prompt_preview": "Review this function...",
      "tokens_estimated": 4500,
      "cached": false
    }
  ]
}
```

## Kill Switch

If the budget is exceeded:
- **Local script**: Exits with code 2 and prints a "Budget exceeded" report
- **Serverless**: Returns HTTP 429 with budget details

## How to Reduce Spend

1. **Increase cache hit rate**: Use consistent prompts for similar tasks
2. **Use smaller models**: `gpt-4o-mini` for reviews, Claude Haiku for simple tasks
3. **Reduce context size**: Send only the relevant 50-100 lines, not entire files
4. **Batch similar reviews**: Group related changes into one prompt
5. **Lower token limits**: Reduce `MAX_DAILY_TOKENS` during development
6. **Review logs**: Check `logs/ai-usage.json` daily for unexpected spikes
