/**
 * Vercel Serverless Function: /api/ai-generate
 *
 * POST { provider: "openai"|"anthropic", prompt: string, context?: string, outputFormat?: "diff"|"full" }
 *
 * Generates code via AI with budget enforcement.
 * Defaults to diff output format per "diff-first" policy.
 */

import { createHash } from 'crypto';

const MAX_DAILY_TOKENS = parseInt(process.env.MAX_DAILY_TOKENS || '500000', 10);
const MAX_CALLS_PER_RUN = parseInt(process.env.MAX_CALLS_PER_RUN || '20', 10);

const usageStore = {};
const responseCache = {};

function todayKey() { return new Date().toISOString().slice(0, 10); }
function hashKey(p, c) { return createHash('sha256').update(`gen:${p}||${c || ''}`).digest('hex'); }
function estimateTokens(t) { return Math.ceil((t || '').length / 4); }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { provider, prompt, context, outputFormat = 'diff' } = req.body || {};
  if (!provider || !prompt) return res.status(400).json({ error: 'Missing provider or prompt' });

  const cacheKey = hashKey(prompt, context);
  if (responseCache[cacheKey]) {
    return res.status(200).json({ response: responseCache[cacheKey], cached: true });
  }

  const day = todayKey();
  if (!usageStore[day]) usageStore[day] = { tokens: 0, calls: 0 };
  const daily = usageStore[day];

  const est = estimateTokens((prompt || '') + (context || '')) * 2;
  if (daily.tokens + est > MAX_DAILY_TOKENS) {
    return res.status(429).json({ error: 'Budget exceeded', detail: `${daily.tokens}/${MAX_DAILY_TOKENS}` });
  }
  if (daily.calls >= MAX_CALLS_PER_RUN) {
    return res.status(429).json({ error: 'Call limit reached' });
  }

  const systemMsg = outputFormat === 'diff'
    ? 'You are a code generation assistant. ALWAYS output unified diff/patch format. Never output full files unless the user says "full".'
    : 'You are a code generation assistant.';

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
            { role: 'system', content: systemMsg },
            { role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt },
          ],
          max_tokens: 4000,
        }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error.message);
      aiResponse = data.choices?.[0]?.message?.content || '';
      daily.tokens += data.usage?.total_tokens || est;
    } else if (provider === 'anthropic') {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: systemMsg,
          messages: [{ role: 'user', content: context ? `Context:\n${context}\n\n${prompt}` : prompt }],
        }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error.message);
      aiResponse = data.content?.[0]?.text || '';
      daily.tokens += (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0) || est;
    } else {
      return res.status(400).json({ error: `Unknown provider: ${provider}` });
    }

    daily.calls += 1;
    responseCache[cacheKey] = aiResponse;
    return res.status(200).json({ response: aiResponse, cached: false, usage: daily });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
