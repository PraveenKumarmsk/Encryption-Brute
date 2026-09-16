export default function Panel({ title, subtitle, children, className = '' }) {
  return (
    <section className={`bg-panel/60 border border-border rounded-lg p-5 md:p-6 ${className}`}>
      {title && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-100 font-mono-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
