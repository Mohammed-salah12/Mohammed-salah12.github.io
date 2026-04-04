import StepShell from '../ui/StepShell';
import QuestionCard from '../ui/QuestionCard';

export default function DemographicsStep({
  questions,
  answers,
  respondentType,
  errors,
  onAnswer,
}) {
  return (
    <StepShell
      badge="القسم الأول"
      title="البيانات الديموغرافية"
      description="يرجى تعبئة البيانات التالية لتصنيف العينة بشكل دقيق."
      footer={
        respondentType === 'unrelated'
          ? 'تم تقليص المسار إلى القسمين الأول والثاني فقط بناءً على إجابتك التمهيدية.'
          : respondentType === 'experienced_client'
            ? 'بناءً على حالتك، ستظهر الأقسام من الأول إلى الخامس فقط دون القسم السادس.'
            : respondentType === 'practitioner'
              ? 'بناءً على حالتك، سيظهر الاستبيان كاملًا بما فيه القسم السادس الخاص بالممارسين.'
              : null
      }
    >
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          index={index + 1}
          label={question.label}
          options={question.options}
          value={answers[question.id]}
          onChange={(value) => onAnswer(question.id, value)}
          error={errors[question.id]}
        />
      ))}
    </StepShell>
  );
}
