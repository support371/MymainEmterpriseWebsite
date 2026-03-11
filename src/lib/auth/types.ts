export type PortalRole = 'admin' | 'analyst' | 'client' | 'viewer';

export interface PortalSession {
  userId: string;
  email: string;
  name: string;
  role: PortalRole;
  exp: number;
}
