export default function CipherTextArea({ label, value, onChange, placeholder, readOnly, rows = 4, accent = 'neon' }) {
  const ring = accent === 'neon' ? 'focus:ring-neon/40 focus:border-neon/60' : 'focus:ring-neon2/40 focus:border-neon2/60';
  return (
    <label className="block">
      {label && <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5">{label}</span>}
      <textarea
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        spellCheck={false}
        className={`w-full resize-y bg-panel2 border border-border rounded-md px-3 py-2.5 text-sm font-mono-tight text-slate-200 placeholder-slate-600 outline-none transition focus:ring-2 ${ring} ${readOnly ? 'text-neon/90' : ''}`}
      />
    </label>
  );
}
