import { Eye } from 'lucide-react';

import Button from '../ui/Button';
import { formatDate } from '../../utils/format';

export default function ResponseTable({ responses, onView }) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-xl font-extrabold text-ink-900">الردود المسجلة</h2>
        <p className="text-sm text-slate-500">يمكنك عرض الاستبيان الكامل لكل مشاركة.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-right">
          <thead className="bg-slate-50">
            <tr className="text-sm font-bold text-slate-600">
              <th className="px-5 py-4">المعرف</th>
              <th className="px-5 py-4">التاريخ</th>
              <th className="px-5 py-4">الجنس</th>
              <th className="px-5 py-4">العمر</th>
              <th className="px-5 py-4">الممارس</th>
              <th className="px-5 py-4">درجة المعرفة</th>
              <th className="px-5 py-4">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {responses.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-5 py-10 text-center text-slate-500">
                  لا توجد نتائج مطابقة للفلاتر الحالية.
                </td>
              </tr>
            ) : (
              responses.map((response) => (
                <tr key={response.id} className="border-t border-slate-100 text-sm text-ink-800">
                  <td className="px-5 py-4 font-bold">{response.id.slice(-6)}</td>
                  <td className="px-5 py-4">{formatDate(response.createdAt)}</td>
                  <td className="px-5 py-4">{response.demographics?.gender}</td>
                  <td className="px-5 py-4">{response.demographics?.ageRange}</td>
                  <td className="px-5 py-4">
                    {response.isPractitioner ? (
                      <span className="status-chip">نعم</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        لا
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {response.knowledgeScore?.correctCount}/{response.knowledgeScore?.total}
                  </td>
                  <td className="px-5 py-4">
                    <Button variant="secondary" onClick={() => onView(response)} className="gap-2">
                      <Eye className="h-4 w-4" />
                      عرض
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
