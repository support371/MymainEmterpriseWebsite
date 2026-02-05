import { promises as fs } from 'node:fs';
import path from 'node:path';

export type AdminRole = 'super_admin' | 'admin' | 'analyst' | 'auditor';

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: AdminRole;
  active: boolean;
}

const usersPath = path.join(process.cwd(), 'data', 'admin-users.json');

function defaultUsers(): AdminUser[] {
  return [
    {
      id: 'U-1',
      email: 'superadmin@gem.local',
      password: process.env.SUPER_ADMIN_PASSWORD || 'change-me-superadmin',
      name: 'Super Admin',
      role: 'super_admin',
      active: true,
    },
    {
      id: 'U-2',
      email: 'admin@gem.local',
      password: process.env.ADMIN_PASSWORD || 'change-me-admin',
      name: 'Platform Admin',
      role: 'admin',
      active: true,
    },
    {
      id: 'U-3',
      email: 'analyst@gem.local',
      password: process.env.ANALYST_PASSWORD || 'change-me-analyst',
      name: 'SOC Analyst',
      role: 'analyst',
      active: true,
    },
  ];
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
  const parsed = JSON.parse(raw) as AdminUser[];
  return Array.isArray(parsed) ? parsed : [];
}

export async function authenticateUser(email: string, password: string): Promise<AdminUser | null> {
  const users = await listAdminUsers();
  const normalized = email.trim().toLowerCase();

  const user = users.find((u) => u.email.toLowerCase() === normalized && u.active);

  if (!user || user.password !== password) {
    return null;
  }

  return user;
}
