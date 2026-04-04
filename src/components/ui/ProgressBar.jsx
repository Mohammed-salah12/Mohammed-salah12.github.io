export default function ProgressBar({ currentStep, totalSteps, title }) {
  const progress =
    totalSteps <= 1 ? 0 : Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="glass-panel p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-brand-800">تقدّم الاستبيان</p>
          <h2 className="text-lg font-extrabold text-ink-900">{title}</h2>
        </div>
        <div className="rounded-2xl bg-brand-50 px-4 py-2 text-sm font-extrabold text-brand-800">
          {progress}%
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-l from-brand-500 via-brand-400 to-sand-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        الخطوة {Math.min(currentStep + 1, totalSteps)} من {totalSteps}
      </p>
    </div>
  );
}
