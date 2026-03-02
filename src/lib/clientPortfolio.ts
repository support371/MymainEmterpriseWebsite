import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface ClientHolding {
  id: string;
  clientId: string;
  portfolioName: string;
  segment: 'real-estate' | 'fintech' | 'digital-banking' | 'security-fund';
  marketValueUsd: number;
  riskScore: 'low' | 'medium' | 'high';
  complianceStatus: 'green' | 'amber' | 'red';
}

const holdingsPath = path.join(process.cwd(), 'data', 'client-holdings.json');

function defaultHoldings(): ClientHolding[] {
  return [
    {
      id: 'H-9001',
      clientId: 'C-1001',
      portfolioName: 'Institutional Cyber Growth',
      segment: 'fintech',
      marketValueUsd: 520000000,
      riskScore: 'medium',
      complianceStatus: 'green',
    },
    {
      id: 'H-9002',
      clientId: 'C-1001',
      portfolioName: 'Digital Banking Security Basket',
      segment: 'digital-banking',
      marketValueUsd: 210000000,
      riskScore: 'low',
      complianceStatus: 'green',
    },
    {
      id: 'H-9101',
      clientId: 'C-1002',
      portfolioName: 'Real Estate Trust Protection',
      segment: 'real-estate',
      marketValueUsd: 165000000,
      riskScore: 'medium',
      complianceStatus: 'amber',
    },
  ];
}

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(holdingsPath), { recursive: true });

  try {
    await fs.access(holdingsPath);
  } catch {
    await fs.writeFile(holdingsPath, JSON.stringify(defaultHoldings(), null, 2), 'utf8');
  }
}

async function readHoldings(): Promise<ClientHolding[]> {
  await ensureStore();
  const raw = await fs.readFile(holdingsPath, 'utf8');

  try {
    const parsed = JSON.parse(raw) as ClientHolding[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listHoldingsByClient(clientId: string): Promise<ClientHolding[]> {
  const all = await readHoldings();
  return all.filter((holding) => holding.clientId === clientId);
}
