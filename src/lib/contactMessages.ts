import { promises as fs } from 'node:fs';
import path from 'node:path';

export type MessageStatus = 'open' | 'triaged' | 'closed';

export interface ContactMessage {
  id: string;
  createdAt: string;
  sourcePage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  messageBody: string;
  status: MessageStatus;
  assignedToUserId: string | null;
  orgId: string | null;
  tags: string[];
}

interface ListFilters {
  q?: string;
  status?: MessageStatus;
  assignedToUserId?: string;
}

const dataPath = path.join(process.cwd(), 'data', 'contact-messages.json');

async function ensureStore(): Promise<void> {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });

  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, '[]', 'utf8');
  }
}

async function readMessages(): Promise<ContactMessage[]> {
  await ensureStore();
  const raw = await fs.readFile(dataPath, 'utf8');

  try {
    const parsed = JSON.parse(raw) as ContactMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(messages, null, 2), 'utf8');
}

export async function createContactMessage(
  input: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'assignedToUserId' | 'orgId' | 'tags'>,
): Promise<ContactMessage> {
  const messages = await readMessages();

  const record: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'open',
    assignedToUserId: null,
    orgId: null,
    tags: [],
    ...input,
  };

  messages.unshift(record);
  await writeMessages(messages);

  return record;
}

export async function listContactMessages(filters: ListFilters = {}): Promise<ContactMessage[]> {
  const messages = await readMessages();
  const query = filters.q?.trim().toLowerCase();

  return messages.filter((message) => {
    if (filters.status && message.status !== filters.status) {
      return false;
    }

    if (filters.assignedToUserId && message.assignedToUserId !== filters.assignedToUserId) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      message.firstName,
      message.lastName,
      message.email,
      message.phone,
      message.serviceInterest,
      message.messageBody,
      message.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

export async function updateContactMessage(
  id: string,
  updates: Partial<Pick<ContactMessage, 'status' | 'assignedToUserId' | 'orgId' | 'tags'>>,
): Promise<ContactMessage | null> {
  const messages = await readMessages();
  const index = messages.findIndex((message) => message.id === id);

  if (index === -1) {
    return null;
  }

  const current = messages[index];

  messages[index] = {
    ...current,
    ...updates,
    tags: updates.tags ?? current.tags,
  };

  await writeMessages(messages);
  return messages[index];
}

export function toCsv(messages: ContactMessage[]): string {
  const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const header = [
    'id',
    'createdAt',
    'sourcePage',
    'firstName',
    'lastName',
    'email',
    'phone',
    'serviceInterest',
    'status',
    'assignedToUserId',
    'orgId',
    'tags',
    'messageBody',
  ];

  const rows = messages.map((message) =>
    [
      message.id,
      message.createdAt,
      message.sourcePage,
      message.firstName,
      message.lastName,
      message.email,
      message.phone,
      message.serviceInterest,
      message.status,
      message.assignedToUserId ?? '',
      message.orgId ?? '',
      message.tags.join('|'),
      message.messageBody,
    ]
      .map((field) => escape(field))
      .join(','),
  );

  return [header.join(','), ...rows].join('\n');
}
