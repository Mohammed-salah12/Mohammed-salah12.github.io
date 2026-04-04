export default function QuestionCard({
  index,
  label,
  options,
  value,
  onChange,
  error,
  helper,
}) {
  const normalizedOptions = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <div className="section-panel">
      <div className="mb-4">
        <div className="field-label">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100 text-sm font-extrabold text-sand-600">
            {index}
          </span>
          <span>{label}</span>
        </div>
        {helper ? <p className="text-sm text-slate-500">{helper}</p> : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {normalizedOptions.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`option-card ${isActive ? 'option-card-active' : ''} ${
                error ? 'option-card-error' : ''
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-3 text-sm font-bold text-rose-600">{error}</p> : null}
    </div>
  );
}
