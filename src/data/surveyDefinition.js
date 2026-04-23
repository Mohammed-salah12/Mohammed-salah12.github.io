export const respondentTypes = {
  unrelated: 'unrelated',
  experiencedClient: 'experienced_client',
  practitioner: 'practitioner',
};

export const respondentTypeOptions = [
  {
    value: respondentTypes.unrelated,
    label: 'لا توجد لدي تجربة مع الليزر ولا أتعامل معه',
  },
  {
    value: respondentTypes.experiencedClient,
    label: 'سبق أن خضعت لجلسة ليزر في مركز تجميل أو عيادة',
  },
  {
    value: respondentTypes.practitioner,
    label: 'أنا أخصائي/ة أو أتعامل مع أجهزة الليزر مهنيًا',
  },
];

export const respondentTypeLabels = respondentTypeOptions.reduce((accumulator, option) => {
  accumulator[option.value] = option.label;
  return accumulator;
}, {});

export const screeningQuestion = {
  id: 'respondentType',
  label: 'أي من الحالات التالية تنطبق عليك؟',
  options: respondentTypeOptions,
};

export const demographicsQuestions = [
  {
    id: 'ageRange',
    label: 'العمر',
    options: ['أقل من 20', '20–29', '30–39', '40–49', '50+'],
  },
  {
    id: 'gender',
    label: 'الجنس',
    options: ['ذكر', 'أنثى'],
  },
  {
    id: 'maritalStatus',
    label: 'الحالة الاجتماعية',
    options: ['أعزب/عزباء', 'متزوج/ة', 'مطلق/ة', 'أرمل/ة'],
  },
  {
    id: 'residence',
    label: 'مكان السكن',
    options: ['مدينة', 'قرية', 'مخيم'],
  },
  {
    id: 'educationLevel',
    label: 'المستوى التعليمي',
    options: ['ثانوية أو أقل', 'دبلوم', 'بكالوريوس', 'دراسات عليا'],
  },
  {
    id: 'occupation',
    label: 'المهنة',
    options: ['طالب', 'موظف', 'ممارس تجميل', 'قطاع صحي', 'أخرى'],
  },
  {
    id: 'incomeLevel',
    label: 'الدخل',
    options: ['منخفض', 'متوسط', 'مرتفع'],
  },
  {
    id: 'worksInBeauty',
    label: 'هل تعمل في التجميل؟',
    options: ['نعم', 'لا'],
  },
  {
    id: 'procedureType',
    label: 'نوع الإجراء',
    options: ['إزالة الشعر', 'تجديد البشرة', 'تصبغات', 'حب الشباب', 'أخرى'],
    condition: ({ respondentType }) => respondentType === respondentTypes.experiencedClient,
  },
  {
    id: 'sessionCount',
    label: 'عدد الجلسات',
    options: ['1–2', '3–5', 'أكثر من 5'],
    condition: ({ respondentType }) => respondentType === respondentTypes.experiencedClient,
  },
  {
    id: 'infoSource',
    label: 'مصدر المعلومات',
    options: ['طبيب', 'أخصائي تجميل', 'سوشيال ميديا', 'إنترنت', 'أصدقاء', 'إعلانات'],
  },
  {
    id: 'skinType',
    label: 'نوع البشرة',
    options: ['فاتحة جدًا', 'فاتحة', 'متوسطة', 'سمراء', 'داكنة', 'لا أعلم'],
  },
  {
    id: 'skinConcern',
    label: 'مشاكل جلدية',
    options: ['حب شباب', 'تصبغات', 'شعر زائد', 'لا يوجد', 'أخرى'],
  },
];

export const knowledgeQuestions = [
  {
    id: 'knowledge_1',
    label: 'إزالة الشعر بالليزر تحتاج عادةً إلى عدة جلسات للحصول على نتائج فعالة.',
  },
  {
    id: 'knowledge_2',
    label: 'قد تسبب إجراءات الليزر حروقًا إذا استُخدمت بشكل غير صحيح.',
  },
  {
    id: 'knowledge_3',
    label: 'قد تكون البشرة الداكنة أكثر عرضة لبعض مضاعفات الليزر.',
  },
  { id: 'knowledge_4', label: 'يجب استخدام نظارات واقية أثناء جلسات الليزر.' },
  {
    id: 'knowledge_5',
    label: 'قد يزيد التعرض المباشر للشمس بعد جلسة الليزر من خطر حدوث التصبغات الجلدية.',
  },
  {
    id: 'knowledge_6',
    label: 'بعض الأدوية قد تزيد من حساسية الجلد أثناء العلاج بالليزر.',
  },
  {
    id: 'knowledge_7',
    label: 'قد يقلل إجراء اختبار ليزر على منطقة صغيرة من الجلد من احتمال حدوث المضاعفات.',
  },
  {
    id: 'knowledge_8',
    label: 'يتطلب تشغيل أجهزة الليزر تدريبًا مهنيًا متخصصًا.',
  },
  {
    id: 'knowledge_9',
    label: 'تُستخدم أنواع مختلفة من الليزر لعلاج حالات جلدية مختلفة.',
  },
  {
    id: 'knowledge_10',
    label: 'العلاج بالليزر خالٍ تمامًا من المخاطر عند استخدامه بشكل صحيح.',
  },
  {
    id: 'knowledge_11',
    label: 'تُعد العناية بالبشرة بعد جلسة الليزر مهمة للوقاية من المضاعفات.',
  },
  {
    id: 'knowledge_12',
    label: 'لا يُنصح بإجراء الليزر التجميلي أثناء الحمل عندما يكون الهدف تجميليًا فقط.',
  },
];

export const practicesQuestions = [
  { id: 'practice_2', label: 'أستخدم واقي الشمس بانتظام بعد جلسات الليزر.' },
  {
    id: 'practice_3',
    label: 'أراجع مختصًا صحيًا في حال حدوث أي مضاعفات بعد جلسات الليزر.',
  },
  {
    id: 'practice_4',
    label: 'أختار مراكز تجميل موثوقة أو مرخصة عند إجراء جلسات الليزر.',
  },
  {
    id: 'practice_5',
    label: 'ألتزم بعدد الجلسات الموصى بها للحصول على أفضل النتائج.',
  },
  { id: 'practice_6', label: 'ألتزم بالتعليمات المعطاة لي قبل الجلسة وبعدها.' },
];

export const attitudesQuestions = [
  {
    id: 'attitude_1',
    label: 'إجراءات الليزر التجميلية آمنة عند إجرائها بواسطة مختصين مدربين.',
  },
  {
    id: 'attitude_2',
    label: 'يجب تنظيم إجراءات الليزر من قبل الجهات الصحية المختصة.',
  },
  {
    id: 'attitude_3',
    label: 'يجب أن يتلقى العاملون في مراكز التجميل تدريبًا معتمدًا على استخدام أجهزة الليزر.',
  },
  {
    id: 'attitude_4',
    label: 'قد تسهم إجراءات الليزر التجميلية في تحسين المظهر الخارجي والثقة بالنفس.',
  },
  {
    id: 'attitude_8',
    label: 'هناك حاجة إلى حملات توعية حول الاستخدام الآمن لإجراءات الليزر.',
  },
];

export const riskQuestions = [
  {
    id: 'risk_2',
    label: 'يزيد استخدام أجهزة الليزر من قبل أشخاص غير مدربين من خطر حدوث الإصابات.',
  },
  { id: 'risk_3', label: 'يُفضل إجراء علاجات الليزر تحت إشراف طبي.' },
  {
    id: 'risk_4',
    label: 'يقلل التدريب المناسب بشكل كبير من المخاطر المرتبطة باستخدام الليزر.',
  },
];

export const practitionerQuestions = [];

export const practitionerSafetyQuestions = [
  { id: 'safety_1', label: 'أُقيّم نوع بشرة العميل قبل إجراء العلاج بالليزر.' },
  { id: 'safety_2', label: 'أراجع التاريخ المرضي للعميل قبل بدء الجلسة.' },
  {
    id: 'safety_3',
    label: 'أسأل العميل عن الأدوية التي قد تزيد من حساسية الجلد للضوء.',
  },
  {
    id: 'safety_4',
    label: 'أجري اختبار ليزر على منطقة صغيرة من الجلد قبل بدء الجلسة.',
  },
  { id: 'safety_5', label: 'أقدم للعميل تعليمات واضحة للعناية بعد الجلسة.' },
  { id: 'safety_6', label: 'أستخدم نظارات الحماية لي وللعميل أثناء الجلسة.' },
];

export const scales = {
  truth: ['صحيح', 'غير صحيح', 'لا أعرف'],
  frequency: ['دائمًا', 'غالبًا', 'أحيانًا', 'نادرًا', 'أبدًا'],
  agreement: ['أوافق بشدة', 'أوافق', 'محايد', 'لا أوافق', 'لا أوافق بشدة'],
};

export const sectionTitles = {
  demographics: 'القسم الأول: البيانات الديموغرافية',
  knowledge: 'القسم الثاني: اختبار المعرفة حول إجراءات الليزر التجميلية',
  practices: 'القسم الثالث: الممارسات المتعلقة بإجراءات الليزر',
  attitudes: 'القسم الرابع: الاتجاهات والتصورات حول الليزر التجميلي',
  risks: 'القسم الخامس: إدراك المخاطر المرتبطة بالليزر',
  practitioner: 'القسم السادس: ممارسات السلامة المهنية لدى الممارسين فقط',
};
