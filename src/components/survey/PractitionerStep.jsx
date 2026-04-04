import StepShell from '../ui/StepShell';
import QuestionCard from '../ui/QuestionCard';

export default function PractitionerStep({
  safetyQuestions,
  values,
  errors,
  onSafetyAnswer,
  frequencyScale,
}) {
  return (
    <StepShell
      badge="القسم السادس"
      title="القسم السادس: ممارسات السلامة المهنية لدى الممارسين فقط"
      description="يُعبأ هذا القسم من قبل الممارسين فقط."
      footer="يركز هذا القسم على مدى الالتزام بإجراءات السلامة المهنية أثناء جلسات الليزر."
    >
      <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50/50 p-5">
        <h3 className="mb-4 text-2xl font-extrabold text-ink-900">
          ممارسات السلامة المهنية لدى الممارسين
        </h3>
        <p className="mb-5 text-base text-slate-600">
          يرجى تحديد مدى تكرار قيامك بالممارسات التالية.
        </p>

        <div className="space-y-5">
          {safetyQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              index={index + 1}
              label={question.label}
              options={frequencyScale}
              value={values.safetyPractices[question.id]}
              onChange={(value) => onSafetyAnswer(question.id, value)}
              error={errors[question.id]}
            />
          ))}
        </div>
      </div>
    </StepShell>
  );
}
