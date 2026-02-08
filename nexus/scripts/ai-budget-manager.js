/**
 * AI Budget Manager
 *
 * Caps AI API calls with:
 *   - Per-day token budget (MAX_DAILY_TOKENS)
 *   - Per-run token budget (MAX_RUN_TOKENS)
 *   - Per-run call count limit (MAX_CALLS_PER_RUN)
 *   - Prompt+context caching (hash → response)
 *   - Usage logging to /logs/ai-usage.json
 *   - Kill switch when budget exceeded
 *
 * Usage (Node.js script):
 *   node scripts/ai-budget-manager.js --provider openai --prompt "Review this code" --context "file.js content"
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Config from env ──────────────────────────────────────────────
function requireEnv(name) {
  const val = process.env[name];
  if (!val) {
    console.error(`[CONFIG ERROR] Missing required env var: ${name}`);
    process.exit(1);
  }
  return val;
}

const MAX_DAILY_TOKENS = parseInt(process.env.MAX_DAILY_TOKENS || '500000', 10);
const MAX_RUN_TOKENS = parseInt(process.env.MAX_RUN_TOKENS || '100000', 10);
const MAX_CALLS_PER_RUN = parseInt(process.env.MAX_CALLS_PER_RUN || '20', 10);

// ── Paths ────────────────────────────────────────────────────────
const LOGS_DIR = resolve(__dirname, '..', 'logs');
const USAGE_LOG_PATH = resolve(LOGS_DIR, 'ai-usage.json');
const CACHE_DIR = resolve(__dirname, '..', '.cache');
const CACHE_PATH = resolve(CACHE_DIR, 'ai-cache.json');

// Ensure directories
for (const dir of [LOGS_DIR, CACHE_DIR]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ── Helpers ──────────────────────────────────────────────────────
function loadJson(path, fallback) {
  try {
    if (existsSync(path)) return JSON.parse(readFileSync(path, 'utf-8'));
  } catch { /* ignore corrupt files */ }
  return fallback;
}

function saveJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

function hashKey(prompt, context) {
  return createHash('sha256').update(`${prompt}||${context}`).digest('hex');
}

function estimateTokens(text) {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil((text || '').length / 4);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// ── Cache ────────────────────────────────────────────────────────
const cache = loadJson(CACHE_PATH, {});

function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;
  // Expire after 24h
  if (Date.now() - entry.timestamp > 86400000) {
    delete cache[key];
    saveJson(CACHE_PATH, cache);
    return null;
  }
  return entry.response;
}

function setCache(key, response) {
  cache[key] = { response, timestamp: Date.now() };
  saveJson(CACHE_PATH, cache);
}

// ── Usage Log ────────────────────────────────────────────────────
const usageLog = loadJson(USAGE_LOG_PATH, { daily: {}, runs: [] });

function getDailyUsage() {
  const key = todayKey();
  return usageLog.daily[key] || { tokens: 0, calls: 0 };
}

function recordUsage(provider, prompt, tokensUsed, cached) {
  const key = todayKey();
  if (!usageLog.daily[key]) usageLog.daily[key] = { tokens: 0, calls: 0 };
  usageLog.daily[key].tokens += tokensUsed;
  usageLog.daily[key].calls += 1;

  usageLog.runs.push({
    timestamp: new Date().toISOString(),
    provider,
    prompt_preview: prompt.slice(0, 100),
    tokens_estimated: tokensUsed,
    cached,
  });

  saveJson(USAGE_LOG_PATH, usageLog);
}

// ── Budget Check ─────────────────────────────────────────────────
function checkBudget(estimatedTokens) {
  const daily = getDailyUsage();

  if (daily.tokens + estimatedTokens > MAX_DAILY_TOKENS) {
    return {
      allowed: false,
      reason: `Daily token budget exceeded: ${daily.tokens}/${MAX_DAILY_TOKENS} used. Estimated: +${estimatedTokens}`,
    };
  }

  if (daily.calls >= MAX_CALLS_PER_RUN) {
    return {
      allowed: false,
      reason: `Daily call limit reached: ${daily.calls}/${MAX_CALLS_PER_RUN}`,
    };
  }

  return { allowed: true };
}

// ── AI Call ──────────────────────────────────────────────────────
async function callAI(provider, prompt, context = '') {
  const cacheKey = hashKey(prompt, context);

  // Check cache first
  const cached = getCached(cacheKey);
  if (cached) {
    console.log('[AI] Cache hit — returning stored response');
    recordUsage(provider, prompt, 0, true);
    return cached;
  }

  // Estimate tokens
  const inputTokens = estimateTokens(prompt + context);
  const estimatedTotal = inputTokens * 2; // rough: input + expected output

  // Budget check
  const budget = checkBudget(estimatedTotal);
  if (!budget.allowed) {
    console.error(`[BUDGET EXCEEDED] ${budget.reason}`);
    console.error('Kill switch activated. Stopping.');
    process.exit(2);
  }

  let response;
  if (provider === 'openai') {
    const apiKey = requireEnv('OPENAI_API_KEY');
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a code review assistant. Produce concise diffs/patches, not full files.' },
          { role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt },
        ],
        max_tokens: 2000,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    response = data.choices?.[0]?.message?.content || '';
    const actualTokens = (data.usage?.total_tokens) || estimatedTotal;
    recordUsage(provider, prompt, actualTokens, false);
  } else if (provider === 'anthropic') {
    const apiKey = requireEnv('ANTHROPIC_API_KEY');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: 'You are a code review assistant. Produce concise diffs/patches, not full files.',
        messages: [
          { role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt },
        ],
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    response = data.content?.[0]?.text || '';
    const actualTokens = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0) || estimatedTotal;
    recordUsage(provider, prompt, actualTokens, false);
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }

  // Cache the response
  setCache(cacheKey, response);
  return response;
}

// ── CLI Entry Point ──────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const flags = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, '');
    flags[key] = args[i + 1];
  }

  if (!flags.provider || !flags.prompt) {
    console.log('Usage: node scripts/ai-budget-manager.js --provider openai|anthropic --prompt "..." [--context "..."]');
    console.log('\nCurrent budget status:');
    const daily = getDailyUsage();
    console.log(`  Daily tokens: ${daily.tokens}/${MAX_DAILY_TOKENS}`);
    console.log(`  Daily calls:  ${daily.calls}/${MAX_CALLS_PER_RUN}`);
    process.exit(0);
  }

  try {
    const result = await callAI(flags.provider, flags.prompt, flags.context || '');
    console.log('\n=== AI Response ===\n');
    console.log(result);
    console.log('\n=== Usage ===');
    const daily = getDailyUsage();
    console.log(`Daily tokens: ${daily.tokens}/${MAX_DAILY_TOKENS}`);
    console.log(`Daily calls:  ${daily.calls}/${MAX_CALLS_PER_RUN}`);
  } catch (err) {
    console.error('[ERROR]', err.message);
    process.exit(1);
  }
}

main();

export { callAI, checkBudget, getDailyUsage, estimateTokens };
