import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import Button from './components/ui/Button';

const SurveyPage = lazy(() => import('./pages/SurveyPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-hero-glow px-4">
          <div className="glass-panel p-8 text-center">
            <p className="mb-4 text-lg font-extrabold text-ink-900">جاري تحميل الواجهة...</p>
            <Button disabled>يرجى الانتظار</Button>
          </div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
