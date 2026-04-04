export default function SummarySection({ title, items }) {
  return (
    <div className="section-panel">
      <h3 className="mb-4 text-xl font-extrabold text-ink-900">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${title}-${item.label}`}
            className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-bold text-ink-800">{item.label}</span>
            <span className="text-base text-slate-600">{item.answer || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
