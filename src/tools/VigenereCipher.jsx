import { useMemo, useState } from 'react';
import Panel from '../components/Panel.jsx';
import CipherTextArea from '../components/CipherTextArea.jsx';
import { vigenereEncode, vigenereDecode } from '../lib/ciphers.js';

export default function VigenereCipher() {
  const [plaintext, setPlaintext] = useState('Meet me at midnight');
  const [key, setKey] = useState('lemon');
  const ciphertext = useMemo(() => vigenereEncode(plaintext, key), [plaintext, key]);

  const [decodeInput, setDecodeInput] = useState('');
  const [decodeKey, setDecodeKey] = useState('');
  const decoded = useMemo(() => (decodeInput ? vigenereDecode(decodeInput, decodeKey) : ''), [decodeInput, decodeKey]);

  return (
    <div className="space-y-6">
      <Panel
        title="Vigenère Cipher"
        subtitle="A repeating keyword shifts each letter by a different amount, based on the matching key letter."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Plaintext" value={plaintext} onChange={setPlaintext} />
          <CipherTextArea label="Ciphertext" value={ciphertext} readOnly />
        </div>
        <div className="mt-4">
          <label className="block max-w-xs">
            <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5">Keyword</span>
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-panel2 border border-border rounded-md px-3 py-2 text-sm font-mono-tight text-slate-200 outline-none focus:ring-2 focus:ring-neon2/40 focus:border-neon2/60"
              placeholder="e.g. lemon"
            />
          </label>
        </div>
      </Panel>

      <Panel title="Decode with a known key">
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Ciphertext" value={decodeInput} onChange={setDecodeInput} />
          <CipherTextArea label="Recovered plaintext" value={decoded} readOnly />
        </div>
        <div className="mt-4">
          <label className="block max-w-xs">
            <span className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5">Keyword</span>
            <input
              value={decodeKey}
              onChange={(e) => setDecodeKey(e.target.value)}
              className="w-full bg-panel2 border border-border rounded-md px-3 py-2 text-sm font-mono-tight text-slate-200 outline-none focus:ring-2 focus:ring-neon2/40 focus:border-neon2/60"
              placeholder="Enter the keyword"
            />
          </label>
        </div>
      </Panel>

      <Panel title="Why brute force doesn't work here" className="border-warn/30">
        <p className="text-sm text-slate-400 leading-relaxed">
          Caesar only has 26 keys, so trying all of them is instant. A Vigenère keyword built from letters
          has 26ⁿ possibilities for a length-n key — a 6-letter key already has over 300 million
          combinations. Real attacks instead guess the key length (via repeated-pattern analysis, e.g.
          the Kasiski method) and then brute-force each shorter Caesar shift within it. This lab keeps that
          next step as an exercise: try guessing a short key length and cracking each column with the
          Caesar tool.
        </p>
      </Panel>
    </div>
  );
}
