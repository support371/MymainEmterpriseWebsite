import Link from 'next/link';

interface TopbarProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

export default function Topbar({ userName, userEmail, userRole }: TopbarProps) {
  return (
    <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <div>
          <Link href="/portal" className="text-xl font-semibold hover:text-cyan-300 transition">
            GEM Cyber Portal
          </Link>
          <p className="text-xs text-slate-400">Enterprise Client Platform</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-cyan-300">{userName}</p>
          <p className="text-xs text-slate-400">
            {userEmail} · {userRole}
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="px-3 py-2 text-sm rounded-md border border-slate-700 hover:border-cyan-400 transition">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
