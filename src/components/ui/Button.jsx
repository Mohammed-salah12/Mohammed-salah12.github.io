export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-ink-900 text-white shadow-lg shadow-ink-900/10 hover:-translate-y-0.5 hover:bg-ink-800',
    secondary:
      'border border-slate-200 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-900',
    ghost: 'text-ink-700 hover:bg-slate-100',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
