import type { PortalRole } from './session';

/** Route-level permission matrix */
const routePermissions: Record<string, PortalRole[]> = {
  '/portal': ['admin', 'analyst', 'client', 'viewer'],
  '/portal/services': ['admin', 'analyst', 'client', 'viewer'],
  '/portal/cybersecurity': ['admin', 'analyst'],
  '/portal/cybersecurity/incidents': ['admin', 'analyst'],
  '/portal/cybersecurity/monitoring': ['admin', 'analyst'],
  '/portal/cybersecurity/compliance': ['admin', 'analyst', 'client'],
  '/portal/real-estate': ['admin', 'client'],
  '/portal/real-estate/deals': ['admin', 'client'],
  '/portal/real-estate/documents': ['admin', 'client'],
  '/portal/wealth/investments': ['admin', 'client'],
  '/portal/wealth/retirement': ['admin', 'client'],
  '/portal/wealth/qfs': ['admin'],
  '/portal/legal/poa': ['admin', 'client'],
  '/portal/legal/estate': ['admin', 'client'],
  '/portal/requests': ['admin', 'analyst', 'client'],
  '/portal/users': ['admin'],
  '/portal/audit': ['admin'],
};

export function isRouteAllowed(pathname: string, role: PortalRole): boolean {
  // Find the most specific matching route
  const sorted = Object.keys(routePermissions).sort((a, b) => b.length - a.length);
  for (const route of sorted) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return routePermissions[route].includes(role);
    }
  }
  // Default: allow authenticated users to portal root paths
  if (pathname.startsWith('/portal')) {
    return routePermissions['/portal'].includes(role);
  }
  return true;
}

export function getAllowedNavItems(role: PortalRole) {
  return [
    { href: '/portal', label: 'Dashboard', roles: ['admin', 'analyst', 'client', 'viewer'] },
    { href: '/portal/services', label: 'Services', roles: ['admin', 'analyst', 'client', 'viewer'] },
    { href: '/portal/cybersecurity', label: 'Cybersecurity', roles: ['admin', 'analyst'] },
    { href: '/portal/real-estate', label: 'Real Estate', roles: ['admin', 'client'] },
    { href: '/portal/wealth/investments', label: 'Wealth', roles: ['admin', 'client'] },
    { href: '/portal/legal/poa', label: 'Legal', roles: ['admin', 'client'] },
    { href: '/portal/requests', label: 'Requests', roles: ['admin', 'analyst', 'client'] },
    { href: '/portal/users', label: 'Users', roles: ['admin'] },
    { href: '/portal/audit', label: 'Audit Log', roles: ['admin'] },
  ].filter((item) => (item.roles as PortalRole[]).includes(role));
}
