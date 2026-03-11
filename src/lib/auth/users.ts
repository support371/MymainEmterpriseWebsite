import crypto from 'node:crypto';
import type { PortalRole } from './types';

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  passwordHash: string;
  isActive: boolean;
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Preview-mode user store.
 * In production, replace with database queries (Prisma User model).
 */
const previewUsers: PortalUser[] = [
  {
    id: 'usr_admin_001',
    email: 'admin@gemcyber.com',
    name: 'Platform Admin',
    role: 'admin',
    passwordHash: hashPassword('admin'),
    isActive: true,
  },
  {
    id: 'usr_analyst_001',
    email: 'analyst@gemcyber.com',
    name: 'Security Analyst',
    role: 'analyst',
    passwordHash: hashPassword('analyst'),
    isActive: true,
  },
  {
    id: 'usr_client_001',
    email: 'client@gemcyber.com',
    name: 'Enterprise Client',
    role: 'client',
    passwordHash: hashPassword('client'),
    isActive: true,
  },
  {
    id: 'usr_viewer_001',
    email: 'viewer@gemcyber.com',
    name: 'Read-Only Viewer',
    role: 'viewer',
    passwordHash: hashPassword('viewer'),
    isActive: true,
  },
];

export async function authenticatePortalUser(
  email: string,
  password: string,
): Promise<Omit<PortalUser, 'passwordHash'> | null> {
  const user = previewUsers.find(
    (u) => u.email === email && u.passwordHash === hashPassword(password) && u.isActive,
  );
  if (!user) return null;
  const { passwordHash: _, ...safe } = user;
  return safe;
}

export async function listPortalUsers(): Promise<Omit<PortalUser, 'passwordHash'>[]> {
  return previewUsers.map(({ passwordHash: _, ...safe }) => safe);
}

export async function getPortalUser(id: string): Promise<Omit<PortalUser, 'passwordHash'> | null> {
  const user = previewUsers.find((u) => u.id === id);
  if (!user) return null;
  const { passwordHash: _, ...safe } = user;
  return safe;
}
