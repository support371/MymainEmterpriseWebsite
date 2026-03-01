# DeepSeek API Network Egress Troubleshooting

## Problem signature

When this environment blocks outbound traffic to DeepSeek, requests to the Anthropic-compatible endpoint fail with:

- `HTTP 403 Forbidden`
- `x-deny-reason: host_not_allowed`

Typical probe command:

```bash
curl -I https://api.deepseek.com/anthropic
```

## Root cause

The runtime uses an outbound allowlist policy, and `api.deepseek.com` is not included.

## What this means

If your project configuration is otherwise correct (base URL, API key, SDK setup, scripts), requests still fail until network egress is updated.

## Resolution options

### 1) Allowlist DeepSeek in the current environment (recommended)

Add this host to your network policy allowlist:

- `api.deepseek.com`

Then verify:

```bash
npm run deepseek:test
```

### 2) Run from an unrestricted environment

Clone and run the project from a machine or CI runtime that permits outbound access to `api.deepseek.com`.

### 3) Export and transfer the prepared project

If this environment cannot be changed, package and move your project to a compatible runtime.

## Verification checklist

1. Probe endpoint:

```bash
curl -I https://api.deepseek.com/anthropic
```

Expected: any non-policy response (for example 200/401/404), but **not** `403` with `host_not_allowed`.

2. Run smoke test:

```bash
npm run deepseek:test
```

3. (Optional) run Python smoke test:

```bash
npm run deepseek:test-python
```

## Security note

Do not store live API keys in docs, tracked source files, commit messages, or pull request text. Keep credentials in local-only environment files such as `.env.local` and ensure they are git-ignored.
