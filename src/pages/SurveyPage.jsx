import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

import DemographicsStep from '../components/survey/DemographicsStep';
import IntroStep from '../components/survey/IntroStep';
import PractitionerStep from '../components/survey/PractitionerStep';
import ScaleSectionStep from '../components/survey/ScaleSectionStep';
import ScreeningStep from '../components/survey/ScreeningStep';
import SummaryStep from '../components/survey/SummaryStep';
import ThankYouStep from '../components/survey/ThankYouStep';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import {
  attitudesQuestions,
  knowledgeQuestions,
  practitionerQuestions,
  practitionerSafetyQuestions,
  practicesQuestions,
  riskQuestions,
  screeningQuestion,
  sectionTitles,
} from '../data/surveyDefinition';
import { surveyService } from '../services/api';
import {
  answerScales,
  buildSubmissionPayload,
  buildSummarySections,
  buildSurveySteps,
  getVisibleDemographicsQuestions,
  initialFormState,
  isStepComplete,
  validateStep,
} from '../utils/survey';

export default function SurveyPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const steps = useMemo(() => buildSurveySteps(formData), [formData]);
  const currentStep = steps[currentStepIndex] || steps[0];
  const summarySections = useMemo(() => buildSummarySections(formData), [formData]);

  useEffect(() => {
    if (currentStepIndex > steps.length - 1) {
      setCurrentStepIndex(steps.length - 1);
    }
  }, [currentStepIndex, steps.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepIndex, submitted]);

  const visibleDemographicsQuestions = useMemo(
    () => getVisibleDemographicsQuestions(formData),
    [formData]
  );

  const canProceed = submitted
    ? true
    : currentStep.id === 'intro' || currentStep.id === 'summary'
      ? true
      : isStepComplete(currentStep.id, formData);

  const handleScreeningChange = (value) => {
    setFormData((previous) => ({
      ...previous,
      respondentType: value,
    }));
    setErrors({});
  };

  const handleDemographicAnswer = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      demographics: {
        ...previous.demographics,
        [field]: value,
      },
    }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const handleSectionAnswer = (section, field, value) => {
    setFormData((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const handlePractitionerAnswer = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      practitioner: {
        ...previous.practitioner,
        [field]: value,
      },
    }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const handleSafetyAnswer = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      practitioner: {
        ...previous.practitioner,
        safetyPractices: {
          ...previous.practitioner.safetyPractices,
          [field]: value,
        },
      },
    }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
  };

  const handleNext = async () => {
    if (currentStep.id === 'summary') {
      setSubmitError('');
      setIsSubmitting(true);

      try {
        await surveyService.submit(buildSubmissionPayload(formData));
        setSubmitted(true);
      } catch (error) {
        setSubmitError(
          error.response?.data?.message || 'تعذر إرسال الاستبيان حاليًا. الرجاء المحاولة مرة أخرى.'
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    const validation = validateStep(currentStep.id, formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setCurrentStepIndex((previous) => Math.min(previous + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setSubmitError('');
    setCurrentStepIndex((previous) => Math.max(previous - 1, 0));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setCurrentStepIndex(0);
    setErrors({});
    setSubmitted(false);
    setSubmitError('');
  };

  function renderStep() {
    if (submitted) {
      return <ThankYouStep onReset={handleReset} />;
    }

    switch (currentStep.id) {
      case 'intro':
        return <IntroStep />;
      case 'screening':
        return (
          <ScreeningStep
            question={screeningQuestion}
            value={formData.respondentType}
            onChange={handleScreeningChange}
            error={errors.respondentType}
          />
        );
      case 'demographics':
        return (
          <DemographicsStep
            questions={visibleDemographicsQuestions}
            answers={formData.demographics}
            respondentType={formData.respondentType}
            errors={errors}
            onAnswer={handleDemographicAnswer}
          />
        );
      case 'knowledge':
        return (
          <ScaleSectionStep
            badge="القسم الثاني"
            title={sectionTitles.knowledge}
            description="يرجى تحديد ما إذا كانت العبارات التالية صحيحة أو غير صحيحة أو أنك لا تعرف، والإجابة حسب معلوماتك الحقيقية دون أي مساعدة."
            footer="لن تتمكن من المتابعة قبل الإجابة على جميع العبارات."
            questions={knowledgeQuestions}
            options={answerScales.truth}
            answers={formData.knowledge}
            errors={errors}
            onAnswer={(field, value) => handleSectionAnswer('knowledge', field, value)}
          />
        );
      case 'practices':
        return (
          <ScaleSectionStep
            badge="القسم الثالث"
            title={sectionTitles.practices}
            description="يرجى تحديد مدى تكرار قيامك بالسلوكيات التالية."
            questions={practicesQuestions}
            options={answerScales.frequency}
            answers={formData.practices}
            errors={errors}
            onAnswer={(field, value) => handleSectionAnswer('practices', field, value)}
          />
        );
      case 'attitudes':
        return (
          <ScaleSectionStep
            badge="القسم الرابع"
            title={sectionTitles.attitudes}
            description="يرجى تحديد درجة موافقتك على العبارات التالية."
            questions={attitudesQuestions}
            options={answerScales.agreement}
            answers={formData.attitudes}
            errors={errors}
            onAnswer={(field, value) => handleSectionAnswer('attitudes', field, value)}
          />
        );
      case 'risks':
        return (
          <ScaleSectionStep
            badge="القسم الخامس"
            title={sectionTitles.risks}
            description="يرجى تحديد درجة موافقتك على العبارات التالية."
            questions={riskQuestions}
            options={answerScales.agreement}
            answers={formData.risks}
            errors={errors}
            onAnswer={(field, value) => handleSectionAnswer('risks', field, value)}
          />
        );
      case 'practitioner':
        return (
          <PractitionerStep
            questions={practitionerQuestions}
            safetyQuestions={practitionerSafetyQuestions}
            values={formData.practitioner}
            errors={errors}
            onAnswer={handlePractitionerAnswer}
            onSafetyAnswer={handleSafetyAnswer}
            frequencyScale={answerScales.frequency}
          />
        );
      case 'summary':
        return <SummaryStep sections={summarySections} />;
      default:
        return null;
    }
  }

  const nextLabel = submitted
    ? ''
    : currentStep.id === 'summary'
      ? isSubmitting
        ? 'جاري الإرسال...'
        : 'إرسال الاستبيان'
      : 'التالي';

  return (
    <div className="min-h-screen bg-hero-glow px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">
              مقارنة مستوى الوعي باستخدام الليزر
            </h1>
          </div>

          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-ink-900 transition hover:border-brand-300 hover:text-brand-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            لوحة الإدارة
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_0.8fr]">
          <div className="space-y-5">
            {!submitted ? (
              <ProgressBar
                currentStep={currentStepIndex}
                totalSteps={steps.length}
                title={currentStep.title}
              />
            ) : null}

            <AnimatePresence mode="wait">
              <motion.div
                key={submitted ? 'submitted' : currentStep.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.28 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {!submitted ? (
              <div className="glass-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0 || isSubmitting}
                  className="gap-2"
                >
                  <ChevronRight className="h-4 w-4" />
                  السابق
                </Button>

                <div className="text-sm font-medium text-slate-500">
                  {!canProceed && currentStep.id !== 'intro'
                    ? 'أكمل جميع الأسئلة المطلوبة لتفعيل المتابعة.'
                    : 'يمكنك المتابعة أو العودة لتعديل أي إجابة.'}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className="gap-2"
                >
                  {nextLabel}
                  {currentStep.id === 'summary' ? null : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </div>
            ) : null}

            {submitError ? (
              <div className="rounded-[1.75rem] border border-rose-100 bg-rose-50 p-4 text-sm font-bold text-rose-700">
                {submitError}
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div className="glass-panel p-5">
              <h2 className="mb-4 text-xl font-extrabold text-ink-900">كيف يعمل المسار؟</h2>
              <div className="space-y-3 text-sm leading-7 text-slate-600">
                <p>
                  إذا اخترت عدم وجود تجربة أو علاقة بالليزر فسيتم عرض القسمين الأول والثاني
                  فقط.
                </p>
                <p>
                  إذا سبق لك الخضوع لجلسة ليزر في مركز تجميل أو عيادة فستظهر الأقسام من
                  الأول إلى الخامس فقط.
                </p>
                <p>
                  إذا كنت أخصائيًا أو تتعامل مع أجهزة الليزر مهنيًا فسيظهر الاستبيان كاملًا
                  بما فيه القسم السادس.
                </p>
              </div>
            </div>

            <div className="glass-panel p-5">
              <h2 className="mb-4 text-xl font-extrabold text-ink-900">الخطوات الحالية</h2>
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isActive = index === currentStepIndex && !submitted;

                  return (
                    <div
                      key={step.id}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        isActive
                          ? 'border-brand-300 bg-brand-50 text-brand-900'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <div className="font-extrabold">{step.title}</div>
                      <div className="mt-1 text-xs leading-6">{step.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
