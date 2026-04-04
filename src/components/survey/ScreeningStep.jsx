import StepShell from '../ui/StepShell';
import QuestionCard from '../ui/QuestionCard';

export default function ScreeningStep({ question, value, onChange, error }) {
  return (
    <StepShell
      badge="المسار الذكي"
      title="السؤال التمهيدي"
      description="اختر الوصف الأقرب لحالتك ليظهر لك المسار المناسب داخل الاستبيان."
      footer={
        value === 'unrelated'
          ? 'سيتم عرض القسم الأول والقسم الثاني فقط.'
          : value === 'experienced_client'
            ? 'سيتم عرض الأقسام من الأول إلى الخامس، ولن يظهر القسم السادس.'
            : value === 'practitioner'
              ? 'سيظهر لك الاستبيان كاملًا بجميع أقسامه بما فيها القسم السادس.'
              : null
      }
    >
      <QuestionCard
        index={1}
        label={question.label}
        options={question.options}
        value={value}
        onChange={onChange}
        error={error}
      />
    </StepShell>
  );
}
