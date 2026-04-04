import { Link, Navigate, Outlet } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';

import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { admin, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-hero-glow px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="glass-panel mb-6 flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="status-chip mb-3">
              <ShieldCheck className="h-4 w-4" />
              لوحة الإدارة
            </div>
            <h1 className="text-3xl font-extrabold text-ink-900">متابعة نتائج الاستبيان</h1>
            <p className="mt-2 text-base text-slate-600">
              {admin?.email || 'admin'} يمكنك مراجعة الردود، تصفية النتائج، وتحليل مستوى المعرفة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-ink-800 transition hover:border-brand-300 hover:text-brand-800"
            >
              فتح الاستبيان
            </Link>
            <Button variant="secondary" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
