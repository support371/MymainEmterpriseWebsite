import { promises as fs } from 'node:fs';

async function checkStorage() {
  try {
    await fs.access('data/contact-messages.json');
    return 'reachable';
  } catch {
    return 'initializing';
  }
}

export default async function DiagnosticsPage() {
  const storageStatus = await checkStorage();

  const checks = [
    { key: 'runtime', label: 'Runtime', value: process.env.NODE_ENV || 'development' },
    { key: 'storage', label: 'Message Store', value: storageStatus },
    { key: 'smtp', label: 'SMTP', value: process.env.SMTP_USER ? 'configured' : 'not configured' },
    { key: 'admin', label: 'Admin Token', value: process.env.ADMIN_ACCESS_TOKEN ? 'configured' : 'using default (change me)' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Diagnostics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <article key={check.key} className="p-4 rounded-lg border border-slate-800 bg-slate-950/40">
            <h3 className="text-sm text-slate-400">{check.label}</h3>
            <p className="mt-1 text-lg font-medium">{check.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
