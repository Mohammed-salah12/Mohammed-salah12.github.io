import { AlertTriangle } from 'lucide-react';

import StepShell from '../ui/StepShell';
import SummarySection from '../ui/SummarySection';

export default function SummaryStep({ sections }) {
  return (
    <StepShell
      badge="مراجعة"
      title="الملخص النهائي قبل الإرسال"
      description="راجع إجاباتك كاملة، ويمكنك العودة لأي خطوة وتعديلها قبل الحفظ."
      footer="عند الضغط على إرسال، سيتم حفظ الرد في قاعدة البيانات وإظهاره داخل لوحة الإدارة."
    >
      <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50/70 p-5 text-amber-900">
        <div className="mb-2 flex items-center gap-3 font-extrabold">
          <AlertTriangle className="h-5 w-5" />
          تأكيد أخير
        </div>
        <p className="leading-8">
          تأكد من دقة الإجابات لأن هذه البيانات ستستخدم لأغراض البحث العلمي والتحليل
          الإحصائي.
        </p>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <SummarySection key={section.title} title={section.title} items={section.items} />
        ))}
      </div>
    </StepShell>
  );
}
