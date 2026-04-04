import StepShell from '../ui/StepShell';
import QuestionCard from '../ui/QuestionCard';

export default function ScaleSectionStep({
  badge,
  title,
  description,
  footer,
  questions,
  options,
  answers,
  errors,
  onAnswer,
}) {
  return (
    <StepShell badge={badge} title={title} description={description} footer={footer}>
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          index={index + 1}
          label={question.label}
          options={options}
          value={answers[question.id]}
          onChange={(value) => onAnswer(question.id, value)}
          error={errors[question.id]}
        />
      ))}
    </StepShell>
  );
}
