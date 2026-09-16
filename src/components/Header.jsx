import { useState } from 'react';

export default function Header() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 32 32" className="shrink-0">
              <rect width="32" height="32" rx="6" fill="#111827" />
              <path d="M11 14V11a5 5 0 0110 0v3" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="8" y="14" width="16" height="12" rx="2" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
              <circle cx="16" cy="19" r="1.6" fill="#22d3ee" />
              <rect x="15.3" y="19.5" width="1.4" height="3" fill="#22d3ee" />
            </svg>
            <span className="font-mono-tight font-bold text-slate-100 tracking-tight">
              Crypto<span className="text-neon">Lab</span>
            </span>
          </div>
          <span className="hidden sm:block text-xs text-slate-500 font-mono-tight">
            client-side · nothing leaves your browser
          </span>
        </div>
      </header>
      {!dismissed && (
        <div className="bg-warn/10 border-b border-warn/30 text-warn/90 text-xs md:text-sm">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 flex items-start justify-between gap-4">
            <p>
              Educational use only. These tools demonstrate how classical ciphers break under brute-force and
              frequency analysis — none of this is safe for real secrets, and cracking systems or accounts you
              don't own is illegal.
            </p>
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 text-warn/70 hover:text-warn transition font-mono-tight"
              aria-label="Dismiss notice"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
