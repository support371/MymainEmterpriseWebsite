/**
 * Feed provider registry — curated RSS/Atom sources for GEM Cyber's
 * enterprise intelligence verticals. Each provider has a real RSS URL,
 * category tag, display metadata, and refresh cadence.
 *
 * Verticals:
 *  • Cybersecurity & Threat Intelligence
 *  • Finance & Markets
 *  • Business & Enterprise
 *  • Crypto & Digital Assets
 *  • Real Estate & Property
 *  • Technology & AI
 *  • Federal / Compliance / Regulatory
 */

export interface FeedProvider {
  id: string;
  name: string;
  category: FeedCategory;
  feedUrl: string;
  siteUrl: string;
  /** Hex colour for the source badge */
  color: string;
  /** Short tagline shown in the provider showcase */
  tagline: string;
  /** How often to re-fetch (minutes) */
  refreshMinutes: number;
  /** Whether this provider is active */
  enabled: boolean;
}

export type FeedCategory =
  | 'Cybersecurity'
  | 'Finance'
  | 'Business'
  | 'Crypto'
  | 'Real Estate'
  | 'Tech'
  | 'Compliance';

export const FEED_CATEGORIES: { id: FeedCategory; label: string; color: string }[] = [
  { id: 'Cybersecurity', label: 'Cybersecurity', color: '#10b981' },
  { id: 'Finance', label: 'Finance', color: '#3b82f6' },
  { id: 'Business', label: 'Business', color: '#8b5cf6' },
  { id: 'Crypto', label: 'Crypto', color: '#f59e0b' },
  { id: 'Real Estate', label: 'Real Estate', color: '#ec4899' },
  { id: 'Tech', label: 'Technology', color: '#06b6d4' },
  { id: 'Compliance', label: 'Compliance', color: '#64748b' },
];

export const FEED_PROVIDERS: FeedProvider[] = [
  // ── CYBERSECURITY ───────────────────────────────────────────────────
  {
    id: 'cisa',
    name: 'CISA Advisories',
    category: 'Cybersecurity',
    feedUrl: 'https://www.cisa.gov/cybersecurity-advisories/all.xml',
    siteUrl: 'https://www.cisa.gov',
    color: '#10b981',
    tagline: 'U.S. federal cyber advisories & BOD alerts',
    refreshMinutes: 30,
    enabled: true,
  },
  {
    id: 'thehackernews',
    name: 'The Hacker News',
    category: 'Cybersecurity',
    feedUrl: 'https://feeds.feedburner.com/TheHackersNews',
    siteUrl: 'https://thehackernews.com',
    color: '#10b981',
    tagline: 'Infosec news, vulnerabilities & threat research',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'bleepingcomputer',
    name: 'BleepingComputer',
    category: 'Cybersecurity',
    feedUrl: 'https://www.bleepingcomputer.com/feed/',
    siteUrl: 'https://www.bleepingcomputer.com',
    color: '#10b981',
    tagline: 'Malware, ransomware & security incident coverage',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'darkreading',
    name: 'Dark Reading',
    category: 'Cybersecurity',
    feedUrl: 'https://www.darkreading.com/rss.xml',
    siteUrl: 'https://www.darkreading.com',
    color: '#10b981',
    tagline: 'Enterprise cybersecurity analysis & research',
    refreshMinutes: 30,
    enabled: true,
  },
  {
    id: 'krebsonsecurity',
    name: 'Krebs on Security',
    category: 'Cybersecurity',
    feedUrl: 'https://krebsonsecurity.com/feed/',
    siteUrl: 'https://krebsonsecurity.com',
    color: '#10b981',
    tagline: 'Investigative cybercrime & breach journalism',
    refreshMinutes: 60,
    enabled: true,
  },

  // ── FINANCE ─────────────────────────────────────────────────────────
  {
    id: 'reuters-business',
    name: 'Reuters Business',
    category: 'Finance',
    feedUrl: 'https://www.reutersagency.com/feed/?best-topics=business-finance',
    siteUrl: 'https://www.reuters.com',
    color: '#3b82f6',
    tagline: 'Global market & corporate finance wire',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'cnbc',
    name: 'CNBC Top News',
    category: 'Finance',
    feedUrl: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
    siteUrl: 'https://www.cnbc.com',
    color: '#3b82f6',
    tagline: 'Markets, earnings & economic data coverage',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'marketwatch',
    name: 'MarketWatch',
    category: 'Finance',
    feedUrl: 'https://feeds.content.dowjones.io/public/rss/mw_topstories',
    siteUrl: 'https://www.marketwatch.com',
    color: '#3b82f6',
    tagline: 'Stock market news & financial analysis',
    refreshMinutes: 15,
    enabled: true,
  },

  // ── BUSINESS ────────────────────────────────────────────────────────
  {
    id: 'bbc-business',
    name: 'BBC Business',
    category: 'Business',
    feedUrl: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    siteUrl: 'https://www.bbc.com/news/business',
    color: '#8b5cf6',
    tagline: 'International business & economic reporting',
    refreshMinutes: 30,
    enabled: true,
  },
  {
    id: 'forbes',
    name: 'Forbes',
    category: 'Business',
    feedUrl: 'https://www.forbes.com/innovation/feed2',
    siteUrl: 'https://www.forbes.com',
    color: '#8b5cf6',
    tagline: 'Entrepreneurship, leadership & innovation',
    refreshMinutes: 30,
    enabled: true,
  },

  // ── CRYPTO ──────────────────────────────────────────────────────────
  {
    id: 'coindesk',
    name: 'CoinDesk',
    category: 'Crypto',
    feedUrl: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    siteUrl: 'https://www.coindesk.com',
    color: '#f59e0b',
    tagline: 'Digital asset markets, DeFi & regulation',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'cointelegraph',
    name: 'Cointelegraph',
    category: 'Crypto',
    feedUrl: 'https://cointelegraph.com/rss',
    siteUrl: 'https://cointelegraph.com',
    color: '#f59e0b',
    tagline: 'Blockchain, crypto policy & Web3 intelligence',
    refreshMinutes: 15,
    enabled: true,
  },

  // ── REAL ESTATE ─────────────────────────────────────────────────────
  {
    id: 'housingwire',
    name: 'HousingWire',
    category: 'Real Estate',
    feedUrl: 'https://www.housingwire.com/feed/',
    siteUrl: 'https://www.housingwire.com',
    color: '#ec4899',
    tagline: 'Mortgage, housing market & proptech news',
    refreshMinutes: 60,
    enabled: true,
  },
  {
    id: 'globest',
    name: 'GlobeSt',
    category: 'Real Estate',
    feedUrl: 'https://www.globest.com/feed/',
    siteUrl: 'https://www.globest.com',
    color: '#ec4899',
    tagline: 'Commercial real estate & investment reporting',
    refreshMinutes: 60,
    enabled: true,
  },

  // ── TECHNOLOGY ──────────────────────────────────────────────────────
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    category: 'Tech',
    feedUrl: 'https://techcrunch.com/feed/',
    siteUrl: 'https://techcrunch.com',
    color: '#06b6d4',
    tagline: 'Startups, AI, venture & enterprise tech',
    refreshMinutes: 15,
    enabled: true,
  },
  {
    id: 'arstechnica',
    name: 'Ars Technica',
    category: 'Tech',
    feedUrl: 'https://feeds.arstechnica.com/arstechnica/index',
    siteUrl: 'https://arstechnica.com',
    color: '#06b6d4',
    tagline: 'In-depth technology & science journalism',
    refreshMinutes: 30,
    enabled: true,
  },
  {
    id: 'theverge',
    name: 'The Verge',
    category: 'Tech',
    feedUrl: 'https://www.theverge.com/rss/index.xml',
    siteUrl: 'https://www.theverge.com',
    color: '#06b6d4',
    tagline: 'Technology, science & culture',
    refreshMinutes: 30,
    enabled: true,
  },

  // ── COMPLIANCE / REGULATORY ─────────────────────────────────────────
  {
    id: 'secgov',
    name: 'SEC.gov',
    category: 'Compliance',
    feedUrl: 'https://www.sec.gov/news/pressreleases.rss',
    siteUrl: 'https://www.sec.gov',
    color: '#64748b',
    tagline: 'Securities regulation, enforcement & filings',
    refreshMinutes: 60,
    enabled: true,
  },
  {
    id: 'nist',
    name: 'NIST Cybersecurity',
    category: 'Compliance',
    feedUrl: 'https://www.nist.gov/blogs/cybersecurity-insights/rss.xml',
    siteUrl: 'https://www.nist.gov',
    color: '#64748b',
    tagline: 'Federal cybersecurity standards & frameworks',
    refreshMinutes: 120,
    enabled: true,
  },
];

export function getProvidersByCategory(cat: FeedCategory): FeedProvider[] {
  return FEED_PROVIDERS.filter((p) => p.category === cat && p.enabled);
}

export function getProvider(id: string): FeedProvider | undefined {
  return FEED_PROVIDERS.find((p) => p.id === id);
}

export function getEnabledProviders(): FeedProvider[] {
  return FEED_PROVIDERS.filter((p) => p.enabled);
}
