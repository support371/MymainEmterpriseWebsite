/**
 * Centralized configuration layer.
 * All external dependencies read from environment variables only.
 * Fails fast with a clear error if a required secret is missing.
 */

const required = (name) => {
  const val = import.meta.env[name] ?? (typeof process !== 'undefined' ? process.env[name] : undefined);
  if (!val) {
    throw new Error(`[CONFIG] Missing required env var: ${name}. Set it in .env or Vercel dashboard.`);
  }
  return val;
};

const optional = (name, fallback) => {
  return import.meta.env[name] ?? (typeof process !== 'undefined' ? process.env[name] : undefined) ?? fallback;
};

/**
 * Config is lazily evaluated—secrets are only required when the specific
 * subsystem that needs them is initialised (e.g. AI calls are only made
 * server-side, so OPENAI_API_KEY is not required in the browser build).
 */
const config = {
  // Application
  get appEnv() { return optional('VITE_APP_ENV', 'development'); },
  get isProd() { return this.appEnv === 'production'; },

  // AI provider keys (server-side only)
  get openaiApiKey() { return required('OPENAI_API_KEY'); },
  get anthropicApiKey() { return required('ANTHROPIC_API_KEY'); },

  // GitHub
  get githubToken() { return required('GITHUB_TOKEN'); },
  get githubRepoOwner() { return required('GITHUB_REPO_OWNER'); },
  get githubRepoName() { return optional('GITHUB_REPO_NAME', 'nexus-bitcoin-banking'); },

  // Vercel
  get vercelToken() { return required('VERCEL_TOKEN'); },
  get vercelProjectId() { return required('VERCEL_PROJECT_ID'); },
  get vercelOrgId() { return required('VERCEL_ORG_ID'); },
  get vercelProjectName() { return optional('VERCEL_PROJECT_NAME', 'nexus-bitcoin-banking'); },
  get deployDomain() { return optional('DEPLOY_DOMAIN', ''); },

  // AI Budget Governance
  get maxDailyTokens() { return parseInt(optional('VITE_MAX_DAILY_TOKENS', '500000'), 10); },
  get maxRunTokens() { return parseInt(optional('VITE_MAX_RUN_TOKENS', '100000'), 10); },
  get maxCallsPerRun() { return parseInt(optional('VITE_MAX_CALLS_PER_RUN', '20'), 10); },
};

export default config;
