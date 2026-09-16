import { useMemo, useState } from 'react';
import Panel from '../components/Panel.jsx';
import CipherTextArea from '../components/CipherTextArea.jsx';
import CandidateList from '../components/CandidateList.jsx';
import { caesarEncode, bruteForceCaesar } from '../lib/ciphers.js';

export default function CaesarCipher() {
  const [plaintext, setPlaintext] = useState('Attack at dawn');
  const [shift, setShift] = useState(3);
  const ciphertext = useMemo(() => caesarEncode(plaintext, Number(shift) || 0), [plaintext, shift]);

  const [crackInput, setCrackInput] = useState('Dwwdfn dw gdzq');
  const results = useMemo(() => (crackInput ? bruteForceCaesar(crackInput) : []), [crackInput]);

  return (
    <div className="space-y-6">
      <Panel title="Caesar Cipher" subtitle="Shift each letter forward by a fixed number of places in the alphabet.">
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Plaintext" value={plaintext} onChange={setPlaintext} />
          <CipherTextArea label={`Ciphertext (shift ${shift})`} value={ciphertext} readOnly />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs uppercase tracking-wide text-slate-500">Shift</span>
          <input
            type="range"
            min={0}
            max={25}
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="flex-1 accent-neon"
          />
          <span className="w-10 text-center font-mono-tight text-neon">{shift}</span>
        </div>
      </Panel>

      <Panel
        title="Brute-force this cipher"
        subtitle="With only 26 possible shifts, every key can be tried instantly and ranked by how English it looks."
      >
        <CipherTextArea
          label="Ciphertext to crack"
          value={crackInput}
          onChange={setCrackInput}
          placeholder="Paste Caesar-shifted text here"
        />
        <div className="mt-4">
          <CandidateList results={results} onUse={(r) => setCrackInput(r.guess)} />
        </div>
      </Panel>
    </div>
  );
}
