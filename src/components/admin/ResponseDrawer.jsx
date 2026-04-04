import { X } from 'lucide-react';

import SummarySection from '../ui/SummarySection';
import { buildResponseSections } from '../../utils/survey';
import { formatDate } from '../../utils/format';

export default function ResponseDrawer({ response, onClose }) {
  if (!response) {
    return null;
  }

  const sections = buildResponseSections(response);

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-full overflow-y-auto bg-slate-50 p-4 shadow-2xl sm:max-w-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <div className="status-chip mb-3">تفاصيل الرد</div>
            <h2 className="text-2xl font-extrabold text-ink-900">استجابة #{response.id.slice(-6)}</h2>
            <p className="mt-2 text-sm text-slate-500">{formatDate(response.createdAt)}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-brand-300 hover:text-brand-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div className="glass-panel p-4">
            <p className="text-sm font-bold text-slate-500">درجة المعرفة</p>
            <p className="mt-2 text-3xl font-extrabold text-ink-900">
              {response.knowledgeScore?.correctCount}/{response.knowledgeScore?.total}
            </p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-sm font-bold text-slate-500">تصنيف المشارك</p>
            <p className="mt-2 text-3xl font-extrabold text-ink-900">
              {response.respondentTypeLabel || (response.isPractitioner ? 'ممارس' : 'غير ممارس')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <SummarySection key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      </div>
    </div>
  );
}
