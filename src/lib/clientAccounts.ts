import crypto from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type ClientTier = 'starter' | 'growth' | 'institutional';

export interface ClientAccount {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  organization: string;
  tier: ClientTier;
  active: boolean;
}

interface LegacyClientAccount {
  id: string;
  email: string;
  password?: string;
  passwordHash?: string;
  name: string;
  organization: string;
  tier: ClientTier;
  active: boolean;
}

const accountsPath = path.join(process.cwd(), 'data', 'client-accounts.json');

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

function defaultAccounts(): ClientAccount[] {
  return [
    {
      id: 'C-1001',
      email: 'client.alpha@gem.local',
      passwordHash: hashPassword(process.env.CLIENT_ALPHA_PASSWORD || 'change-me-client-alpha'),
      name: 'Alpha Capital Operations',
      organization: 'Alpha Capital',
      tier: 'institutional',
      active: true,
    },
    {
      id: 'C-1002',
      email: 'client.bridge@gem.local',
      passwordHash: hashPassword(process.env.CLIENT_BRIDGE_PASSWORD || 'change-me-client-bridge'),
      name: 'Bridge Trust Portfolio',
      organization: 'Bridge Trust Realty',
      tier: 'growth',
      active: true,
    },
  ];
}

function normalizeAccount(account: LegacyClientAccount): ClientAccount {
  if (account.passwordHash) {
    return {
      id: account.id,
      email: account.email,
      passwordHash: account.passwordHash,
      name: account.name,
      organization: account.organization,
      tier: account.tier,
      active: account.active,
    };
  }

  return {
    id: account.id,
    email: account.email,
    passwordHash: hashPassword(account.password || 'change-me-client-password'),
    name: account.name,
    organization: account.organization,
    tier: account.tier,
    active: account.active,
  };
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(accountsPath), { recursive: true });

  try {
    await fs.access(accountsPath);
  } catch {
    await fs.writeFile(accountsPath, JSON.stringify(defaultAccounts(), null, 2), 'utf8');
  }
}

export async function listClientAccounts(): Promise<ClientAccount[]> {
  await ensureStore();
  const raw = await fs.readFile(accountsPath, 'utf8');

  try {
    const parsed = JSON.parse(raw) as LegacyClientAccount[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    const normalized = parsed.map(normalizeAccount);
    const needsMigration = normalized.some((account, index) => {
      const legacy = parsed[index];
      return !legacy.passwordHash || Boolean(legacy.password);
    });

    if (needsMigration) {
      await fs.writeFile(accountsPath, JSON.stringify(normalized, null, 2), 'utf8');
    }

    return normalized;
  } catch {
    return [];
  }
}

export async function authenticateClient(email: string, password: string): Promise<ClientAccount | null> {
  const accounts = await listClientAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const account = accounts.find((candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.active);

  if (!account || !verifyPassword(password, account.passwordHash)) {
    return null;
  }

  return account;
}

export async function getClientById(id: string): Promise<ClientAccount | null> {
  const accounts = await listClientAccounts();
  return accounts.find((account) => account.id === id) || null;
}
