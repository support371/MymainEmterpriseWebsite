"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  TrendingUp,
  Filter,
  Shield,
  Briefcase,
  Home,
  Cpu,
  Coins,
  Globe,
  Lock,
  CheckCircle,
  X,
  Share2,
  Bookmark,
  ExternalLink,
  Server,
  BellRing,
  CalendarClock,
  Newspaper,
  RefreshCcw
} from 'lucide-react';

// --- Mock Data ---
const MOCK_DATA = [
  // TECH
  {
    id: 1,
    title: "Gartner Warnings: Organizations urged to block 'Agentic' AI Browsers immediately",
    source: "TechNewsWorld",
    time: "2h ago",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    excerpt: "New report highlights security risks as AI-driven browsers can expose sensitive enterprise data.",
    content: "Organizations are facing a new wave of security challenges as 'Agentic' AI browsers gain popularity. Gartner's latest report suggests that these tools, while powerful, often bypass traditional security perimeters, allowing for unauthorized data exfiltration. CISOs are advised to update their CASB policies immediately to detect and block these autonomous agents until a secure framework is established."
  },
  {
    id: 2,
    title: "Samsung Galaxy Z TriFold Debuts: A new era for foldable devices",
    source: "Gadget Weekly",
    time: "4h ago",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
    excerpt: "The dual-hinge system promises a tablet-sized experience that fits in your pocket."
  },
  {
    id: 3,
    title: "Nvidia vs. Spectral: The $5 Trillion Battle for Compute Supremacy",
    source: "Silicon Valley Journal",
    time: "6h ago",
    category: "Tech",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    excerpt: "New compiler technology could open the door to broader hardware adoption in AI training."
  },

  // FINANCE & BUSINESS
  {
    id: 4,
    title: "Market Rally: S&P 500 hits new record as inflation data cools",
    source: "Fox Business",
    time: "1h ago",
    category: "Finance",
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=800",
    excerpt: "Fed policymaker floats further rate cuts as economy stays on the 'golden path'."
  },
  {
    id: 5,
    title: "Elon Musk's Tesla Pay Package Restored by Delaware Court",
    source: "CNBC",
    time: "3h ago",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=800",
    excerpt: "The controversial compensation package is back in play following a supreme court ruling."
  },
  {
    id: 6,
    title: "Ford Reverses on Truck Production: EV Strategy Shift",
    source: "AutoNews",
    time: "5h ago",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    excerpt: "Major automaker drops $242M to rebuild workforce as demand for hybrids surges."
  },

  // CRYPTO
  {
    id: 7,
    title: "Bitcoin Holds at $88k: Market muted after CPI Data",
    source: "Investing.com",
    time: "30m ago",
    category: "Crypto",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800",
    excerpt: "Traders await next Fed move as institutional inflows stabilize."
  },
  {
    id: 8,
    title: "Poland Approves Crypto Bill: Aligning with EU MiCA Regulations",
    source: "CoinDesk",
    time: "8h ago",
    category: "Crypto",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    excerpt: "Parliament overrides presidential veto to standardize crypto asset oversight."
  },

  // REAL ESTATE
  {
    id: 9,
    title: "US Home Sales Tick Up: First monthly rise in 2025",
    source: "AP News",
    time: "10h ago",
    category: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    excerpt: "Despite elevated prices, buyers are returning as mortgage rates stabilize near 6%."
  },
  {
    id: 10,
    title: "The 'Delisting' Epidemic: Sellers retreat as price gaps widen",
    source: "Realtor.com",
    time: "12h ago",
    category: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
    excerpt: "Record number of homes pulled off market as seller expectations clash with buyer reality."
  },

  // CYBERSECURITY
  {
    id: 11,
    title: "Critical UEFI Flaw: Millions of Motherboards at Risk",
    source: "The Hacker News",
    time: "1h ago",
    category: "Cybersecurity",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    excerpt: "ASRock, ASUS, and MSI boards vulnerable to early-boot DMA attacks."
  },
  {
    id: 12,
    title: "CISA Urges Lifecycle Management to Eliminate Unsupported Edge Device Risk",
    source: "CISA Field Advisory",
    time: "35m ago",
    category: "Cybersecurity",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    excerpt: "Program managers are being advised to shift from reactive maintenance to proactive lifecycle governance aligned with BOD 26-02.",
    content: `Best Approach: Proactive Lifecycle Management\n\nBy aligning with CISA Binding Operational Directive (BOD) 26-02, organizations can reduce exposure to imminent exploitation tied to end-of-support edge devices.\n\nPhase 1 — Asset Inventory (0-3 months)\n• Catalog all internet-facing edge devices (firewalls, routers, VPN appliances).\n• Flag devices already at end-of-support (EOS).\n\nPhase 2 — Decommissioning Schedule (12-18 months)\n• Establish and approve a replacement plan for EOS equipment.\n• Prioritize high-value systems and externally exposed management interfaces.\n\nPhase 3 — Continuous Discovery (ongoing)\n• Maintain a recurring process to identify devices that will become end-of-life in the next 12 months.\n• Tie lifecycle triggers to budget and procurement planning.\n\nStrategic Access Points Provided by CISA\n• Intelligence Access: Threat advisories with early warnings on actively exploited vulnerabilities.\n• Operational Access: Regional Cybersecurity Advisors (CSAs) across 10 regions for tailored support.\n• Technical Access: Cyber Hygiene scanning for internet-facing systems.\n• Evaluation Access: Cyber Resilience Review (CRR) to benchmark resilience against federal practices.\n\nProject Manager Takeaway\n“Practicing good cyber hygiene starts with eliminating unsupported edge devices.”\n\nRecommendation\nBuild a project risk register that tracks EOS assets, replacement deadlines, and control owners so lifecycle risk is managed before incidents occur.`
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Top Stories', icon: Globe },
  { id: 'Tech', label: 'Tech', icon: Cpu },
  { id: 'Finance', label: 'Finance', icon: TrendingUp },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Crypto', label: 'Crypto', icon: Coins },
  { id: 'Real Estate', label: 'Real Estate', icon: Home },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
];

const DAILY_FEED_STATUS = [
  { label: 'Stories Ingested Today', value: '42', note: 'AI + editor verified', icon: Newspaper },
  { label: 'Newsletter Dispatch', value: '06:30 UTC', note: 'Daily automated send', icon: CalendarClock },
  { label: 'Regional Alerts Routed', value: '10 Regions', note: 'Threat tags mapped', icon: BellRing },
  { label: 'Pipeline Health', value: '99.98%', note: 'Last refresh 4m ago', icon: RefreshCcw },
];


interface Article {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  content?: string;
}

const DetailView = ({ article, onClose }: { article: Article, onClose: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-50 dark:bg-slate-950 flex flex-col animate-in slide-in-from-bottom-10 duration-300">
      <div className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 border-b border-slate-700 shadow-md shrink-0">
         <div className="flex items-center gap-2">
           <div className="bg-emerald-500/20 p-1.5 rounded text-emerald-400">
             <Server size={18} />
           </div>
           <span className="font-bold tracking-wide font-mono text-sm md:text-base">
             GEM Assist <span className="text-slate-500 font-normal hidden sm:inline">| Secure Content Gateway</span>
           </span>
         </div>
         <div className="flex items-center gap-3">
           {!loading && <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-900/30 px-2 py-0.5 rounded-full"><Lock size={10}/> Encrypted</span>}
           <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
             <X size={20}/>
           </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-2">Redirecting...</h3>
            <p className="text-emerald-400 font-mono text-sm animate-pulse">Establishing Secure Link to GEM Assist Backend</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-slate-400 text-sm">• {article.source}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-xl relative">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" unoptimized />
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                {article.excerpt}
              </p>
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-8 w-full" />
              <p className="text-slate-700 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {article.content || "Full content retrieved from the secure archive. This view is generated by the GEM Assist backend engine, ensuring that your browsing session remains isolated from public ad-trackers and potential malicious scripts embedded in the source website."}
              </p>
            </div>

            <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <Shield size={24} className="text-emerald-500"/>
                 <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">Analyzed by GEM Assist</h4>
                   <p className="text-xs text-slate-500">No threats detected in this content.</p>
                 </div>
               </div>
               <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                 View Original <ExternalLink size={12}/>
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface NavPillProps {
  active: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

const NavPill = ({ active, label, icon: Icon, onClick }: NavPillProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
      active
        ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-white shadow-lg scale-105 ring-2 ring-slate-900 dark:ring-emerald-400'
        : 'bg-white text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
    }`}
  >
    {Icon && <Icon size={14} />}
    {label}
  </button>
);

const NewsCard = ({ article, onClick }: { article: Article, onClick: (a: Article) => void }) => (
  <div onClick={() => onClick(article)} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full cursor-pointer relative top-0 hover:-top-1">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={article.imageUrl}
        alt={article.title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
        unoptimized
      />
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 bg-slate-900/90 backdrop-blur text-xs font-bold rounded-md shadow-sm uppercase tracking-wide text-white flex items-center gap-1">
          {article.category === 'Cybersecurity' && <Shield size={10} className="text-emerald-400"/>}
          {article.category}
        </span>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
          {article.source[0]}
        </div>
        <span className="text-xs font-semibold text-slate-500 uppercase">{article.source}</span>
        <span className="text-slate-300">•</span>
        <span className="text-xs text-slate-400">{article.time}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
        {article.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
        {article.excerpt}
      </p>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-2">
           <button className="text-slate-400 hover:text-blue-500 transition-colors"><Share2 size={16} /></button>
           <button className="text-slate-400 hover:text-blue-500 transition-colors"><Bookmark size={16} /></button>
        </div>
        <span className="text-blue-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
          Read Story <ChevronRight size={14} />
        </span>
      </div>
    </div>
  </div>
);


const AutomationPanel = () => (
  <section className="mb-8 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 p-6 shadow-xl">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
          <BellRing size={12} /> GEM Newsroom Automation
        </p>
        <h1 className="text-3xl font-black text-white md:text-4xl">GEM News & Newsletter Command Center</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
          Branded publishing pipeline for daily intelligence drops, newsletter distribution, and category-tagged story curation.
          Content is staged continuously and promoted on a fixed cadence so your audience receives trusted updates every day.
        </p>
      </div>
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
        <button className="rounded-xl border border-emerald-400/50 bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400">Schedule Daily Upload</button>
        <button className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300">Open Newsletter Queue</button>
      </div>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {DAILY_FEED_STATUS.map(({ label, value, note, icon: Icon }) => (
        <div key={label} className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
            <Icon size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{note}</p>
        </div>
      ))}
    </div>
  </section>
);

export default function GemNewsApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') return MOCK_DATA;
    return MOCK_DATA.filter(item => item.category === activeCategory || (activeCategory === 'Finance' && item.category === 'Business'));
  }, [activeCategory]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 pt-20">
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-3 px-6 overflow-x-auto scrollbar-hide sticky top-20 z-10 shadow-sm">
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map(cat => (
            <NavPill
              key={cat.id}
              active={activeCategory === cat.id}
              label={cat.label}
              icon={cat.icon}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <AutomationPanel />

          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <CheckCircle size={12}/> System Operational
              </p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {activeCategory === 'all' ? 'Live GEM Intelligence Feed' : `${activeCategory} Briefing`}
              </h2>
            </div>
            <button className="text-xs font-bold text-slate-500 hover:text-emerald-500 flex items-center gap-1 transition-colors">
              Filter View <Filter size={12}/>
            </button>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {filteredNews.map(article => (
                <NewsCard key={article.id} article={article} onClick={setSelectedArticle} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Filter size={48} className="mb-4 opacity-20" />
              <p>No stories found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {selectedArticle && (
        <DetailView
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
