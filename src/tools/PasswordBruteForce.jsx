import { useMemo, useState } from 'react';
import Panel from '../components/Panel.jsx';
import { estimateCrackTime, formatDuration } from '../lib/ciphers.js';

const SPEEDS = [
  { label: 'Online, rate-limited (10/sec)', value: 10 },
  { label: 'Offline, single GPU (10 billion/sec)', value: 1e10 },
  { label: 'Offline, GPU cluster (100 billion/sec)', value: 1e11 },
];

function detectCharsetSize(pw) {
  let size = 0;
  if (/[a-z]/.test(pw)) size += 26;
  if (/[A-Z]/.test(pw)) size += 26;
  if (/[0-9]/.test(pw)) size += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) size += 32;
  return size || 26;
}

export default function PasswordBruteForce() {
  const [password, setPassword] = useState('Sunshine24');
  const [speedIdx, setSpeedIdx] = useState(1);

  const charsetSize = detectCharsetSize(password);
  const { combinations, seconds } = useMemo(
    () => estimateCrackTime(charsetSize, password.length || 1, SPEEDS[speedIdx].value),
    [charsetSize, password, speedIdx]
  );

  const strength = seconds > 60 * 60 * 24 * 365 * 10 ? 'strong' : seconds > 60 * 60 * 24 ? 'okay' : 'weak';
  const strengthColor = { strong: 'text-ok border-ok/40 bg-ok/5', okay: 'text-warn border-warn/40 bg-warn/5', weak: 'text-bad border-bad/40 bg-bad/5' }[strength];

  return (
    <div className="space-y-6">
      <Panel
        title="Password Strength Estimator"
        subtitle="Estimates how long a pure brute-force search — trying every combination — would take to find this password."
      >
        <label className="block max-w-md">
          <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            spellCheck={false}
            className="w-full bg-panel2 border border-border rounded-md px-3 py-2.5 text-sm font-mono-tight text-slate-200 outline-none focus:ring-2 focus:ring-neon/40 focus:border-neon/60"
            placeholder="Type a password to test"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {SPEEDS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSpeedIdx(i)}
              className={`text-xs font-mono-tight px-3 py-1.5 rounded-md border transition ${
                i === speedIdx ? 'border-neon/50 bg-neon/10 text-neon' : 'border-border text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={`mt-5 rounded-lg border p-4 ${strengthColor}`}>
          <p className="font-mono-tight text-sm mb-1">
            Estimated crack time: <span className="font-bold">{formatDuration(seconds)}</span>
          </p>
          <p className="text-xs opacity-80 font-mono-tight">
            {combinations.toExponential(2)} possible combinations · charset size {charsetSize} · length {password.length}
          </p>
        </div>
      </Panel>

      <Panel title="What actually makes a password hard to brute force" className="border-neon2/30">
        <ul className="text-sm text-slate-400 leading-relaxed space-y-2 list-disc list-inside">
          <li>Length matters more than complexity — each extra character multiplies the search space by the charset size.</li>
          <li>Real attackers rarely brute-force blindly; they try breached-password lists and common patterns first, so avoiding dictionary words and reused passwords matters as much as raw length.</li>
          <li>Rate limiting and account lockouts (the "online" speed above) are why offline hash leaks are so much more dangerous than a login form.</li>
        </ul>
      </Panel>
    </div>
  );
}
