import { listPortalUsers } from '@/lib/auth/users';

export default async function UsersPage() {
  const users = await listPortalUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-slate-400">Platform users and role assignments</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md text-sm font-medium transition">
          Add User
        </button>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Name</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Email</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Role</th>
              <th className="text-left px-4 py-3 font-medium text-slate-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-slate-400">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-cyan-600/20 text-cyan-400 capitalize">{user.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs ${user.isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
