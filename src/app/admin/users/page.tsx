import { redirect } from 'next/navigation';
import { getCurrentAdminSession } from '@/lib/adminAuth';
import { listAdminUsers } from '@/lib/adminUsers';

export default async function AdminUsersPage() {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  if (session.role !== 'super_admin') {
    return (
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold">Access Restricted</h2>
        <p className="text-sm text-slate-400 mt-2">Only super admins can manage admin users.</p>
      </section>
    );
  }

  const users = await listAdminUsers();

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">Admin & Super Admin Setup</h2>
      <p className="text-sm text-slate-400 mb-6">Configured users and roles for privileged access.</p>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-800">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-800/70">
                <td className="py-3 pr-4">{user.name}</td>
                <td className="py-3 pr-4">{user.email}</td>
                <td className="py-3 pr-4"><span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">{user.role}</span></td>
                <td className="py-3 pr-4">{user.active ? 'yes' : 'no'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
