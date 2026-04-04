import { Clock3, Mail, Microscope } from 'lucide-react';

import StepShell from '../ui/StepShell';

export default function IntroStep() {
  return (
    <StepShell
      badge="مقدمة"
      title="دراسة حول الوعي باستخدام الليزر في مراكز التجميل"
      description="يرجى قراءة المعلومات التالية بعناية قبل البدء بالإجابة على الاستبيان."
      footer="جميع المعلومات سرية بالكامل ولن تستخدم إلا لأغراض البحث العلمي."
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="section-panel bg-gradient-to-bl from-white to-brand-50/50">
          <p className="text-lg leading-8 text-slate-700">
            عزيزنا المشارك/عزيزتنا المشاركة،
            <br />
            تقوم الطالبات عبير الشيوخي وراية عطوان وكنانة حمدان بإجراء دراسة بعنوان:
          </p>

          <h2 className="mt-5 text-2xl font-extrabold leading-10 text-ink-900">
            "مقارنة مستوى الوعي باستخدام الليزر بين المستخدمين والممارسين في مراكز التجميل"
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-700">
            وذلك استكمالاً لمتطلبات الحصول على درجة البكالوريوس في المستحضرات الطبية في
            التجميل.
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-700">
            راجين منكم الإجابة بصراحة وموضوعية، مع التأكيد أن جميع المعلومات سرية ولن تستخدم
            إلا لأغراض البحث العلمي.
          </p>
        </div>

        <div className="space-y-5">
          <div className="section-panel">
            <div className="mb-3 flex items-center gap-3 text-brand-800">
              <Clock3 className="h-5 w-5" />
              <span className="font-extrabold">الوقت المتوقع</span>
            </div>
            <p className="text-lg font-bold text-ink-900">6–8 دقائق</p>
          </div>

          <div className="section-panel">
            <div className="mb-3 flex items-center gap-3 text-brand-800">
              <Mail className="h-5 w-5" />
              <span className="font-extrabold">إشراف</span>
            </div>
            <p className="text-lg font-bold text-ink-900">د. عبير غنايم</p>
            <a
              className="mt-2 inline-block text-base font-bold text-brand-700 hover:text-brand-900"
              href="mailto:abeer@ppu.edu"
            >
              abeer@ppu.edu
            </a>
          </div>

          <div className="section-panel">
            <div className="mb-3 flex items-center gap-3 text-brand-800">
              <Microscope className="h-5 w-5" />
              <span className="font-extrabold">تعريف</span>
            </div>
            <p className="text-base leading-8 text-slate-700">
              أجهزة الليزر هي أجهزة طبية تصدر ضوءًا مركزًا لعلاج مشاكل الجلد مثل إزالة الشعر
              والتصبغات.
            </p>
          </div>
        </div>
      </div>
    </StepShell>
  );
}
