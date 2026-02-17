/**
 * Frontend API client.
 *
 * All backend communication goes through this module.
 * Automatically attaches auth token from localStorage.
 */

const BASE = '/api/v1';

function getToken() {
  return localStorage.getItem('nexus_token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('nexus_token', token);
  } else {
    localStorage.removeItem('nexus_token');
  }
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }

  return data;
}

// ── Auth ─────────────────────────────────────────────────────────

export const authApi = {
  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  signin: (body) => request('/auth/signin', { method: 'POST', body: JSON.stringify(body) }),
  signout: () => request('/auth/signout', { method: 'POST' }),
  me: () => request('/auth/me'),
};

// ── Client ───────────────────────────────────────────────────────

export const profileApi = {
  get: () => request('/profile'),
  update: (body) => request('/profile', { method: 'PATCH', body: JSON.stringify(body) }),
  bankAccounts: () => request('/bank-accounts'),
  portfolio: () => request('/portfolio'),
  notifications: () => request('/notifications'),
  activity: () => request('/activity'),
};

export const depositsApi = {
  list: () => request('/deposits'),
  create: (body) => request('/deposits', { method: 'POST', body: JSON.stringify(body) }),
  getById: (id) => request(`/deposits/${id}`),
};

export const cardsApi = {
  list: () => request('/cards'),
  eligibility: () => request('/cards/eligibility'),
  requestCard: () => request('/cards/request', { method: 'POST' }),
  requests: () => request('/cards/requests'),
  transactions: () => request('/cards/transactions'),
};

// ── Admin ────────────────────────────────────────────────────────

export const adminApi = {
  dashboard: () => request('/admin/dashboard'),
  clients: () => request('/admin/clients'),
  clientDetail: (id) => request(`/admin/clients/${id}`),
  updateKyc: (id, status) => request(`/admin/clients/${id}/kyc`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  deposits: () => request('/admin/deposits'),
  simulateInbound: (id) => request(`/admin/deposits/${id}/simulate`, { method: 'POST' }),
  settleDeposit: (id, body) => request(`/admin/deposits/${id}/settle`, { method: 'POST', body: JSON.stringify(body || {}) }),

  cardRequests: () => request('/admin/cards/requests'),
  approveCard: (requestId) => request(`/admin/cards/requests/${requestId}/approve`, { method: 'POST' }),
  cards: () => request('/admin/cards'),
  simulateTransaction: (cardId, body) => request(`/admin/cards/${cardId}/transaction`, { method: 'POST', body: JSON.stringify(body) }),

  webhooks: () => request('/admin/webhooks'),
  operations: () => request('/admin/operations'),
  emailOutbox: () => request('/admin/email/outbox'),
  processEmails: () => request('/admin/email/process', { method: 'POST' }),
  settings: () => request('/admin/settings'),
  reset: () => request('/admin/reset', { method: 'POST' }),
};
