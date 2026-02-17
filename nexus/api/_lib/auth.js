/**
 * Server-side authentication utilities.
 *
 * Uses crypto-random tokens stored in the sessions table.
 * In production, swap with JWT + bcrypt or a managed auth provider.
 */

import { randomUUID } from 'crypto';
import db from './database.js';

/**
 * Hash a password. Uses base64 for demo — swap with bcrypt in production.
 */
export function hashPassword(password) {
  return Buffer.from(password).toString('base64');
}

/**
 * Verify a password against its hash.
 */
export function verifyPassword(password, hash) {
  return Buffer.from(password).toString('base64') === hash;
}

/**
 * Create a new session for a user. Returns the token.
 */
export function createSession(userId) {
  const token = randomUUID();
  db.insert('sessions', {
    user_id: userId,
    token,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
  return token;
}

/**
 * Validate a bearer token from the Authorization header.
 * Returns { user, role, dbCtx } or null.
 */
export function validateToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  if (!token) return null;

  const sessions = db.query('sessions', { token }, { isAdmin: true });
  if (sessions.length === 0) return null;

  const session = sessions[0];

  // Check expiry
  if (new Date(session.expires_at) < new Date()) {
    db.delete('sessions', session.id);
    return null;
  }

  const user = db.getById('profiles', session.user_id, { isAdmin: true });
  if (!user) return null;

  const roles = db.query('roles', { user_id: user.id }, { isAdmin: true });
  const role = roles[0]?.role || 'client';
  const isAdmin = role === 'admin';

  return {
    user,
    role,
    isAdmin,
    dbCtx: { userId: user.id, isAdmin },
  };
}

/**
 * Destroy a session by token.
 */
export function destroySession(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  const sessions = db.query('sessions', { token }, { isAdmin: true });
  if (sessions.length > 0) {
    db.delete('sessions', sessions[0].id);
    return true;
  }
  return false;
}

/**
 * Middleware helper: extract authenticated user from request.
 * Returns null if unauthenticated.
 */
export function getAuthFromReq(req) {
  return validateToken(req.headers.authorization || req.headers['authorization']);
}

/**
 * Require authentication. Returns auth or sends 401.
 */
export function requireAuth(req, res) {
  const auth = getAuthFromReq(req);
  if (!auth) {
    res.status(401).json({ error: 'Unauthorized. Provide a valid Bearer token.' });
    return null;
  }
  return auth;
}

/**
 * Require admin role. Returns auth or sends 403.
 */
export function requireAdmin(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return null;
  if (!auth.isAdmin) {
    res.status(403).json({ error: 'Forbidden. Admin access required.' });
    return null;
  }
  return auth;
}
