import LoginForm from './LoginForm';

export const metadata = { title: 'Portal' };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
