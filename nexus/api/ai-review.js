/**
 * Vercel Serverless Function: /api/ai-review
 *
 * POST { provider: "openai"|"anthropic", prompt: string, context?: string }
 *
 * Wraps AI calls with budget management, caching, and logging.
 * All API keys read from Vercel env vars — never hardcoded.
 */

import { createHash } from 'crypto';

// Budget config from env
const MAX_DAILY_TOKENS = parseInt(process.env.MAX_DAILY_TOKENS || '500000', 10);
const MAX_CALLS_PER_RUN = parseInt(process.env.MAX_CALLS_PER_RUN || '20', 10);

// In-memory stores (reset on cold start — for production, use KV/Redis)
const usageStore = {};
const responseCache = {};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashKey(prompt, context) {
  return createHash('sha256').update(`${prompt}||${context || ''}`).digest('hex');
}

function estimateTokens(text) {
  return Math.ceil((text || '').length / 4);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provider, prompt, context } = req.body || {};
  if (!provider || !prompt) {
    return res.status(400).json({ error: 'Missing provider or prompt' });
  }

  // Cache check
  const cacheKey = hashKey(prompt, context);
  if (responseCache[cacheKey]) {
    return res.status(200).json({
      response: responseCache[cacheKey],
      cached: true,
      usage: usageStore[todayKey()] || { tokens: 0, calls: 0 },
    });
  }

  // Budget check
  const day = todayKey();
  if (!usageStore[day]) usageStore[day] = { tokens: 0, calls: 0 };
  const daily = usageStore[day];

  const inputTokens = estimateTokens((prompt || '') + (context || ''));
  const estimatedTotal = inputTokens * 2;

  if (daily.tokens + estimatedTotal > MAX_DAILY_TOKENS) {
    return res.status(429).json({
      error: 'Budget exceeded',
      detail: `Daily token budget: ${daily.tokens}/${MAX_DAILY_TOKENS}`,
    });
  }

  if (daily.calls >= MAX_CALLS_PER_RUN) {
    return res.status(429).json({
      error: 'Call limit reached',
      detail: `Daily calls: ${daily.calls}/${MAX_CALLS_PER_RUN}`,
    });
  }

  try {
    let aiResponse;

    if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a code review assistant. Produce concise diffs/patches.' },
            { role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt },
          ],
          max_tokens: 2000,
        }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error.message);
      aiResponse = data.choices?.[0]?.message?.content || '';
      daily.tokens += data.usage?.total_tokens || estimatedTotal;
    } else if (provider === 'anthropic') {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: 'You are a code review assistant. Produce concise diffs/patches.',
          messages: [{ role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt }],
        }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error.message);
      aiResponse = data.content?.[0]?.text || '';
      daily.tokens += (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0) || estimatedTotal;
    } else {
      return res.status(400).json({ error: `Unknown provider: ${provider}` });
    }

    daily.calls += 1;
    responseCache[cacheKey] = aiResponse;

    return res.status(200).json({
      response: aiResponse,
      cached: false,
      usage: daily,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
