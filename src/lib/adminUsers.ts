import crypto from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type AdminRole = 'super_admin' | 'admin' | 'analyst' | 'auditor';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  active: boolean;
}

interface LegacyAdminUser {
  id: string;
  email: string;
  password?: string;
  passwordHash?: string;
  name: string;
  role: AdminRole;
  active: boolean;
}

const usersPath = path.join(process.cwd(), 'data', 'admin-users.json');

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, passwordHash: string): boolean {
  const [salt, storedHash] = passwordHash.split(':');

  if (!salt || !storedHash) {
    return false;
  }

  const computedHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(computedHash, 'hex'));
}

function defaultUsers(): AdminUser[] {
  return [
    {
      id: 'U-1',
      email: 'superadmin@gem.local',
      passwordHash: hashPassword(process.env.SUPER_ADMIN_PASSWORD || 'change-me-superadmin'),
      name: 'Super Admin',
      role: 'super_admin',
      active: true,
    },
    {
      id: 'U-2',
      email: 'admin@gem.local',
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || 'change-me-admin'),
      name: 'Platform Admin',
      role: 'admin',
      active: true,
    },
    {
      id: 'U-3',
      email: 'analyst@gem.local',
      passwordHash: hashPassword(process.env.ANALYST_PASSWORD || 'change-me-analyst'),
      name: 'SOC Analyst',
      role: 'analyst',
      active: true,
    },
  ];
}

function normalizeUser(user: LegacyAdminUser): AdminUser {
  if (user.passwordHash) {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
      active: user.active,
    };
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: hashPassword(user.password || 'change-me-password'),
    name: user.name,
    role: user.role,
    active: user.active,
  };
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(usersPath), { recursive: true });

  try {
    await fs.access(usersPath);
  } catch {
    await fs.writeFile(usersPath, JSON.stringify(defaultUsers(), null, 2), 'utf8');
  }
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  await ensureStore();
  const raw = await fs.readFile(usersPath, 'utf8');

  try {
    const parsed = JSON.parse(raw) as LegacyAdminUser[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    const normalized = parsed.map(normalizeUser);

    const needsMigration = normalized.some((user, index) => {
      const legacy = parsed[index];
      return !legacy.passwordHash || Boolean(legacy.password);
    });

    if (needsMigration) {
      await fs.writeFile(usersPath, JSON.stringify(normalized, null, 2), 'utf8');
    }

    return normalized;
  } catch {
    return [];
  }
}

export async function authenticateUser(email: string, password: string): Promise<AdminUser | null> {
  const users = await listAdminUsers();
  const normalized = email.trim().toLowerCase();

  const user = users.find((candidate) => candidate.email.toLowerCase() === normalized && candidate.active);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return user;
}
