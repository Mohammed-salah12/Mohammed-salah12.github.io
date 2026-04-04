import { useEffect, useMemo, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AnalyticsCharts from '../components/admin/AnalyticsCharts';
import FilterBar from '../components/admin/FilterBar';
import ResponseDrawer from '../components/admin/ResponseDrawer';
import ResponseTable from '../components/admin/ResponseTable';
import StatsCards from '../components/admin/StatsCards';
import Button from '../components/ui/Button';
import { adminService } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const initialFilters = {
  gender: 'الكل',
  ageRange: 'الكل',
  practitioner: 'الكل',
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const [responsesData, statsData] = await Promise.all([
        adminService.getResponses(),
        adminService.getStats(),
      ]);

      setResponses(responsesData.responses || []);
      setStats(statsData.stats || null);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }

      setError(requestError.response?.data?.message || 'تعذر تحميل بيانات لوحة الإدارة.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredResponses = useMemo(() => {
    return responses.filter((response) => {
      const genderMatch =
        filters.gender === 'الكل' || response.demographics?.gender === filters.gender;
      const ageMatch =
        filters.ageRange === 'الكل' || response.demographics?.ageRange === filters.ageRange;
      const practitionerMatch =
        filters.practitioner === 'الكل' ||
        (filters.practitioner === 'نعم' ? response.isPractitioner : !response.isPractitioner);

      return genderMatch && ageMatch && practitionerMatch;
    });
  }, [filters, responses]);

  const exportFilters = useMemo(() => {
    const normalized = {};

    if (filters.gender !== 'الكل') {
      normalized.gender = filters.gender;
    }

    if (filters.ageRange !== 'الكل') {
      normalized.ageRange = filters.ageRange;
    }

    if (filters.practitioner !== 'الكل') {
      normalized.practitioner = filters.practitioner;
    }

    return normalized;
  }, [filters]);

  const handleExportCsv = async () => {
    setIsExporting(true);
    setError('');

    try {
      const { blob, filename } = await adminService.exportResponses(exportFilters);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        logout();
        navigate('/admin/login');
        return;
      }

      setError(requestError.response?.data?.message || 'تعذر تنزيل ملف CSV حاليًا.');
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-8 text-center text-lg font-bold text-slate-600">
        جاري تحميل لوحة الإدارة...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error ? (
        <div className="glass-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-rose-700">تعذر تحميل البيانات</h2>
            <p className="text-sm text-slate-600">{error}</p>
          </div>
          <Button onClick={loadDashboard} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
        </div>
      ) : null}

      <StatsCards summary={stats?.summary} />

      <AnalyticsCharts charts={stats?.charts} />

      <FilterBar
        filters={filters}
        onChange={(field, value) =>
          setFilters((previous) => ({
            ...previous,
            [field]: value,
          }))
        }
        onReset={() => setFilters(initialFilters)}
      />

      <div className="glass-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-ink-900">تصدير الردود</h2>
          <p className="text-sm text-slate-500">
            نزّل ملف CSV يحتوي على الردود الحالية مع تطبيق نفس الفلاتر المحددة.
          </p>
        </div>

        <Button onClick={handleExportCsv} disabled={isExporting} className="gap-2">
          <Download className="h-4 w-4" />
          {isExporting ? 'جاري تجهيز الملف...' : 'تنزيل CSV'}
        </Button>
      </div>

      <ResponseTable responses={filteredResponses} onView={setSelectedResponse} />

      <ResponseDrawer response={selectedResponse} onClose={() => setSelectedResponse(null)} />
    </div>
  );
}
