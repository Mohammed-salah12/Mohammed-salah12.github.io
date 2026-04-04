import { CheckCircle2, RotateCcw } from 'lucide-react';

import Button from '../ui/Button';
import StepShell from '../ui/StepShell';

export default function ThankYouStep({ onReset }) {
  return (
    <StepShell
      badge="تم الإرسال"
      title="شكرًا لمشاركتك"
      description="تم استلام الاستبيان بنجاح، ونقدّر وقتك ومساهمتك في إنجاح هذه الدراسة."
      footer="يمكنك الآن إغلاق الصفحة أو بدء رد جديد إذا رغبت."
    >
      <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-bl from-brand-50 via-white to-sand-50 p-8 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/20">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
          جميع بياناتك حُفظت بشكل آمن. إذا أردت تعبئة الاستبيان مرة أخرى يمكنك البدء من جديد
          من الزر التالي.
        </p>

        <div className="mt-8">
          <Button onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            بدء استبيان جديد
          </Button>
        </div>
      </div>
    </StepShell>
  );
}
