import Button from '../ui/Button';

export default function FilterBar({ filters, onChange, onReset }) {
  const selects = [
    {
      id: 'gender',
      label: 'الجنس',
      options: ['الكل', 'ذكر', 'أنثى'],
    },
    {
      id: 'ageRange',
      label: 'العمر',
      options: ['الكل', 'أقل من 20', '20–29', '30–39', '40–49', '50+'],
    },
    {
      id: 'practitioner',
      label: 'الممارس',
      options: ['الكل', 'نعم', 'لا'],
    },
  ];

  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-ink-900">الفلاتر</h2>
          <p className="text-sm text-slate-500">صفِ الردود بحسب الجنس والعمر وحالة الممارس.</p>
        </div>
        <Button variant="secondary" onClick={onReset}>
          إعادة التعيين
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {selects.map((select) => (
          <label key={select.id} className="block">
            <span className="mb-2 block text-sm font-bold text-slate-600">{select.label}</span>
            <select
              value={filters[select.id]}
              onChange={(event) => onChange(select.id, event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-400"
            >
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
