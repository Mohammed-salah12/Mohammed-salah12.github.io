import {
  attitudesQuestions,
  demographicsQuestions,
  knowledgeQuestions,
  practitionerQuestions,
  practitionerSafetyQuestions,
  practicesQuestions,
  riskQuestions,
  respondentTypeLabels,
  respondentTypes,
  scales,
  screeningQuestion,
  sectionTitles,
} from '../data/surveyDefinition';

function createAnswerState(questions) {
  return questions.reduce((accumulator, question) => {
    accumulator[question.id] = '';
    return accumulator;
  }, {});
}

export const initialFormState = {
  respondentType: '',
  demographics: createAnswerState(demographicsQuestions),
  knowledge: createAnswerState(knowledgeQuestions),
  practices: createAnswerState(practicesQuestions),
  attitudes: createAnswerState(attitudesQuestions),
  risks: createAnswerState(riskQuestions),
  practitioner: {
    ...createAnswerState(practitionerQuestions),
    safetyPractices: createAnswerState(practitionerSafetyQuestions),
  },
};

export function getRespondentTypeLabel(value) {
  return respondentTypeLabels[value] || value || '-';
}

export function shouldShowExtendedSections(formData) {
  return (
    formData.respondentType === respondentTypes.experiencedClient ||
    formData.respondentType === respondentTypes.practitioner
  );
}

export function isPractitioner(formData) {
  return formData.respondentType === respondentTypes.practitioner;
}

export function getVisibleDemographicsQuestions(formData) {
  return demographicsQuestions.filter((question) => {
    if (!question.condition) {
      return true;
    }

    return question.condition(formData);
  });
}

export function buildSurveySteps(formData) {
  const baseSteps = [
    {
      id: 'intro',
      title: 'مقدمة الدراسة',
      description: 'الرجاء قراءة مقدمة الدراسة قبل البدء.',
    },
    {
      id: 'screening',
      title: 'السؤال التمهيدي',
      description: 'يحدد هذا السؤال المسار المناسب داخل الاستبيان وفق حالة المشارك.',
    },
    {
      id: 'demographics',
      title: sectionTitles.demographics,
      description: 'معلومات عامة تساعد في تصنيف المشاركين.',
    },
    {
      id: 'knowledge',
      title: sectionTitles.knowledge,
      description: 'يرجى تحديد ما إذا كانت كل عبارة صحيحة أو غير صحيحة أو أنك لا تعرف.',
    },
  ];

  if (shouldShowExtendedSections(formData)) {
    baseSteps.push(
      {
        id: 'practices',
        title: sectionTitles.practices,
        description: 'يرجى تحديد مدى تكرار قيامك بالسلوكيات المتعلقة بإجراءات الليزر.',
      },
      {
        id: 'attitudes',
        title: sectionTitles.attitudes,
        description: 'يرجى تحديد درجة موافقتك على العبارات المتعلقة بالليزر التجميلي.',
      },
      {
        id: 'risks',
        title: sectionTitles.risks,
        description: 'يرجى تقييم مدى إدراكك للمخاطر المرتبطة باستخدام الليزر.',
      }
    );
  }

  if (isPractitioner(formData)) {
    baseSteps.push({
      id: 'practitioner',
      title: sectionTitles.practitioner,
      description: 'يُعرض هذا القسم للممارسين فقط ويقيس ممارسات السلامة المهنية أثناء الجلسات.',
    });
  }

  baseSteps.push({
    id: 'summary',
    title: 'مراجعة نهائية',
    description: 'راجع جميع الإجابات قبل الإرسال.',
  });

  return baseSteps;
}

function validateAnswers(questions, answerMap) {
  return questions.reduce((errors, question) => {
    if (!answerMap[question.id]) {
      errors[question.id] = 'هذا السؤال مطلوب';
    }
    return errors;
  }, {});
}

export function validateStep(stepId, formData) {
  switch (stepId) {
    case 'screening':
      return formData.respondentType ? {} : { respondentType: 'اختر حالة للمتابعة' };
    case 'demographics':
      return validateAnswers(getVisibleDemographicsQuestions(formData), formData.demographics);
    case 'knowledge':
      return validateAnswers(knowledgeQuestions, formData.knowledge);
    case 'practices':
      return validateAnswers(practicesQuestions, formData.practices);
    case 'attitudes':
      return validateAnswers(attitudesQuestions, formData.attitudes);
    case 'risks':
      return validateAnswers(riskQuestions, formData.risks);
    case 'practitioner':
      return {
        ...validateAnswers(practitionerQuestions, formData.practitioner),
        ...validateAnswers(practitionerSafetyQuestions, formData.practitioner.safetyPractices),
      };
    default:
      return {};
  }
}

export function isStepComplete(stepId, formData) {
  return Object.keys(validateStep(stepId, formData)).length === 0;
}

function questionsToAnswers(questions, answerMap) {
  return questions.map((question) => ({
    questionId: question.id,
    question: question.label,
    answer: answerMap[question.id],
  }));
}

export function buildSubmissionPayload(formData) {
  const extendedSections = shouldShowExtendedSections(formData);
  const practitionerEnabled = isPractitioner(formData);
  const hasClientExperience = formData.respondentType === respondentTypes.experiencedClient;

  return {
    demographics: {
      respondentType: formData.respondentType,
      screeningAnswer: getRespondentTypeLabel(formData.respondentType),
      ...formData.demographics,
      procedureType: hasClientExperience ? formData.demographics.procedureType : '',
      sessionCount: hasClientExperience ? formData.demographics.sessionCount : '',
    },
    knowledge: questionsToAnswers(knowledgeQuestions, formData.knowledge),
    practices: extendedSections ? questionsToAnswers(practicesQuestions, formData.practices) : [],
    attitudes: extendedSections ? questionsToAnswers(attitudesQuestions, formData.attitudes) : [],
    risks: extendedSections ? questionsToAnswers(riskQuestions, formData.risks) : [],
    practitioner: {
      isPractitioner: practitionerEnabled,
      safetyPractices: practitionerEnabled
        ? questionsToAnswers(
            practitionerSafetyQuestions,
            formData.practitioner.safetyPractices
          )
        : [],
    },
  };
}

function buildLabeledItems(questions, values) {
  return questions.map((question) => ({
    label: question.label,
    answer: values[question.id] || '-',
  }));
}

function buildArrayItems(answersArray) {
  return answersArray.map((answer) => ({
    label: answer.question,
    answer: answer.answer,
  }));
}

export function buildSummarySections(formData) {
  const sections = [
    {
      title: 'المسار المختار',
      items: [
        {
          label: screeningQuestion.label,
          answer: getRespondentTypeLabel(formData.respondentType),
        },
      ],
    },
    {
      title: sectionTitles.demographics,
      items: buildLabeledItems(getVisibleDemographicsQuestions(formData), formData.demographics),
    },
    {
      title: sectionTitles.knowledge,
      items: buildLabeledItems(knowledgeQuestions, formData.knowledge),
    },
  ];

  if (shouldShowExtendedSections(formData)) {
    sections.push(
      {
        title: sectionTitles.practices,
        items: buildLabeledItems(practicesQuestions, formData.practices),
      },
      {
        title: sectionTitles.attitudes,
        items: buildLabeledItems(attitudesQuestions, formData.attitudes),
      },
      {
        title: sectionTitles.risks,
        items: buildLabeledItems(riskQuestions, formData.risks),
      }
    );
  }

  if (isPractitioner(formData)) {
    sections.push({
      title: sectionTitles.practitioner,
      items: [
        ...buildLabeledItems(practitionerQuestions, formData.practitioner),
        ...buildLabeledItems(
          practitionerSafetyQuestions,
          formData.practitioner.safetyPractices
        ),
      ],
    });
  }

  return sections;
}

export function buildResponseSections(response) {
  const respondentType =
    response.demographics?.respondentType ||
    (response.practitioner?.isPractitioner
      ? respondentTypes.practitioner
      : response.demographics?.screeningAnswer === 'نعم'
        ? respondentTypes.experiencedClient
        : response.demographics?.screeningAnswer === 'لا'
          ? respondentTypes.unrelated
          : '');
  const practitionerEnabled = respondentType === respondentTypes.practitioner;
  const extendedSections =
    respondentType === respondentTypes.experiencedClient ||
    respondentType === respondentTypes.practitioner;

  const sections = [
    {
      title: 'المسار المختار',
      items: [{ label: screeningQuestion.label, answer: getRespondentTypeLabel(respondentType) }],
    },
    {
      title: sectionTitles.demographics,
      items: getVisibleDemographicsQuestions({
        respondentType,
      }).map((question) => ({
        label: question.label,
        answer: response.demographics?.[question.id] || '-',
      })),
    },
    {
      title: sectionTitles.knowledge,
      items: buildArrayItems(response.knowledge || []),
    },
  ];

  if (extendedSections) {
    sections.push(
      {
        title: sectionTitles.practices,
        items: buildArrayItems(response.practices || []),
      },
      {
        title: sectionTitles.attitudes,
        items: buildArrayItems(response.attitudes || []),
      },
      {
        title: sectionTitles.risks,
        items: buildArrayItems(response.risks || []),
      }
    );
  }

  if (practitionerEnabled) {
    sections.push({
      title: sectionTitles.practitioner,
      items: [
        ...practitionerQuestions.map((question) => ({
          label: question.label,
          answer: response.practitioner?.[question.id] || '-',
        })),
        ...buildArrayItems(response.practitioner?.safetyPractices || []),
      ],
    });
  }

  return sections;
}

export const answerScales = scales;
