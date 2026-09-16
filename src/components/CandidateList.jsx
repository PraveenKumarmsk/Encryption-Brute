export default function CandidateList({ results, limit = 12, onUse }) {
  if (!results || !results.length) return null;
  const shown = results.slice(0, limit);
  const maxScore = Math.max(...shown.map((r) => Math.max(r.score, 0)), 1);

  return (
    <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
      {shown.map((r, i) => {
        const confidence = Math.max(0, 100 - (Math.max(r.score, 0) / maxScore) * 100);
        const isBest = i === 0;
        return (
          <button
            key={r.key}
            onClick={() => onUse && onUse(r)}
            className={`w-full text-left rounded-md border px-3 py-2 transition group ${
              isBest ? 'border-ok/50 bg-ok/5 hover:bg-ok/10' : 'border-border bg-panel2 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className={`text-[11px] font-mono-tight ${isBest ? 'text-ok' : 'text-slate-500'}`}>
                {isBest ? '★ best match · ' : ''}key = {r.label}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isBest ? 'bg-ok' : 'bg-neon/60'}`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 w-8 text-right">{confidence.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-sm font-mono-tight text-slate-300 truncate group-hover:text-slate-100">
              {r.guess || <span className="text-slate-600 italic">(empty)</span>}
            </p>
          </button>
        );
      })}
    </div>
  );
}
