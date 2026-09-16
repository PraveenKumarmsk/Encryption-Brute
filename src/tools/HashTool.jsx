import { useEffect, useState } from 'react';
import Panel from '../components/Panel.jsx';
import CipherTextArea from '../components/CipherTextArea.jsx';
import { sha256Hex } from '../lib/ciphers.js';

export default function HashTool() {
  const [input, setInput] = useState('correct horse battery staple');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let active = true;
    sha256Hex(input).then((h) => {
      if (!active) return;
      setHash(h);
      setTarget((prev) => (prev === '' || prev === hash ? h : prev));
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const [candidate, setCandidate] = useState('');
  const [candidateHash, setCandidateHash] = useState('');
  const [target, setTarget] = useState(hash);
  useEffect(() => { sha256Hex(candidate).then(setCandidateHash); }, [candidate]);
  const match = candidateHash && target && candidateHash === target;

  return (
    <div className="space-y-6">
      <Panel title="SHA-256" subtitle="A one-way hash: trivial to compute forward, effectively impossible to reverse.">
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Input" value={input} onChange={setInput} />
          <CipherTextArea label="SHA-256 digest" value={hash} readOnly rows={2} />
        </div>
      </Panel>

      <Panel
        title="Try to match a hash"
        subtitle="This is how real password systems work: they store a hash, then check a guess by hashing it and comparing — never by decrypting."
      >
        <div className="mb-4">
          <label className="block max-w-xl">
            <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5">Target hash to match</span>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-panel2 border border-border rounded-md px-3 py-2 text-xs font-mono-tight text-slate-300 outline-none focus:ring-2 focus:ring-neon/40 focus:border-neon/60"
            />
          </label>
          <button
            onClick={() => setTarget(hash)}
            className="mt-2 text-xs font-mono-tight px-2.5 py-1.5 rounded-md border border-border text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
          >
            Use digest above ↑
          </button>
        </div>
        <CipherTextArea label="Your guess" value={candidate} onChange={setCandidate} rows={2} />
        <div className={`mt-3 text-sm font-mono-tight ${match ? 'text-ok' : 'text-slate-500'}`}>
          {candidate ? (match ? '✓ Match — the guess hashes to the target.' : '✗ No match.') : 'Enter a guess to check it.'}
        </div>
      </Panel>

      <Panel title="Why brute force looks different here" className="border-warn/30">
        <p className="text-sm text-slate-400 leading-relaxed">
          There's no key to search for — only guesses to hash and compare. That's why weak, short, or
          common passwords are the real vulnerability: an attacker with a stored hash tries candidate
          passwords (often from breach lists) rather than trying to "decrypt" anything. See the Password
          Strength module for how guess count and password length change how long that search takes.
        </p>
      </Panel>
    </div>
  );
}
