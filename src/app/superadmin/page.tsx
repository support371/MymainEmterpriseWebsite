import { redirect } from 'next/navigation';

export default function SuperAdminPage() {
  redirect('/admin/login?next=/admin/inbox');
}
