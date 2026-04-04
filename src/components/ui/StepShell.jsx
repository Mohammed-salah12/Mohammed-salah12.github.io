export default function StepShell({ badge, title, description, children, footer }) {
  return (
    <section className="glass-panel overflow-hidden p-6 sm:p-8">
      <div className="mb-8 border-b border-slate-100 pb-6">
        {badge ? <div className="status-chip mb-4">{badge}</div> : null}
        <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
        ) : null}
      </div>

      <div className="space-y-5">{children}</div>

      {footer ? (
        <div className="mt-8 rounded-3xl border border-brand-100 bg-brand-50/60 p-4 text-sm font-medium leading-7 text-brand-900">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
