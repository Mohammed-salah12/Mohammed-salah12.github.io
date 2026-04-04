import { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formState);
      navigate('/admin');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'تعذر تسجيل الدخول حاليًا.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-glow px-4 py-8">
      <div className="glass-panel w-full max-w-lg p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/20">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-ink-900">دخول الإدارة</h1>
          <p className="mt-3 text-base text-slate-600">
            سجّل الدخول للوصول إلى الردود، الفلاتر، والرسوم التحليلية.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600">البريد الإلكتروني</span>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, email: event.target.value }))
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-400"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600">كلمة المرور</span>
            <div className="relative">
              <input
                type="password"
                required
                value={formState.password}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, password: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-11 outline-none transition focus:border-brand-400"
                placeholder="••••••••"
              />
              <LockKeyhole className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </label>

          {error ? (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              {error}
            </div>
          ) : null}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </Button>
        </form>
      </div>
    </div>
  );
}
