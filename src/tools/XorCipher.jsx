import { useMemo, useState } from 'react';
import Panel from '../components/Panel.jsx';
import CipherTextArea from '../components/CipherTextArea.jsx';
import CandidateList from '../components/CandidateList.jsx';
import { textToBytes, xorEncodeBytes, bytesToHex, hexToBytes, bruteForceXorSingleByte } from '../lib/ciphers.js';

export default function XorCipher() {
  const [plaintext, setPlaintext] = useState('The password is hunter2');
  const [keyByte, setKeyByte] = useState(42);

  const ciphertextHex = useMemo(() => {
    const bytes = textToBytes(plaintext);
    return bytesToHex(xorEncodeBytes(bytes, Number(keyByte) || 0));
  }, [plaintext, keyByte]);

  const [crackInput, setCrackInput] = useState('');
  const results = useMemo(() => {
    if (!crackInput.trim()) return [];
    try {
      const bytes = hexToBytes(crackInput);
      if (!bytes.length) return [];
      return bruteForceXorSingleByte(bytes);
    } catch {
      return [];
    }
  }, [crackInput]);

  return (
    <div className="space-y-6">
      <Panel
        title="XOR Cipher"
        subtitle="Every byte of the message is XORed with a single repeating key byte, shown here as hex."
      >
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Plaintext" value={plaintext} onChange={setPlaintext} />
          <CipherTextArea label="Ciphertext (hex)" value={ciphertextHex} readOnly />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs uppercase tracking-wide text-slate-500">Key byte</span>
          <input
            type="range"
            min={0}
            max={255}
            value={keyByte}
            onChange={(e) => setKeyByte(e.target.value)}
            className="flex-1 accent-neon2"
          />
          <span className="w-14 text-center font-mono-tight text-neon2">
            0x{Number(keyByte).toString(16).padStart(2, '0')}
          </span>
          <button
            onClick={() => setCrackInput(ciphertextHex)}
            className="shrink-0 text-xs font-mono-tight px-2.5 py-1.5 rounded-md border border-border text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
          >
            Send to cracker →
          </button>
        </div>
      </Panel>

      <Panel
        title="Brute-force this cipher"
        subtitle="256 possible single-byte keys — every one is tried and ranked by how English the decoded text looks."
      >
        <CipherTextArea
          label="Ciphertext to crack (hex)"
          value={crackInput}
          onChange={setCrackInput}
          placeholder="Paste hex-encoded XOR ciphertext here"
        />
        <div className="mt-4">
          <CandidateList results={results} onUse={() => {}} />
        </div>
        {crackInput && !results.length && (
          <p className="text-xs text-slate-500 mt-2">Enter valid hex bytes (e.g. "1a 2b 3c" or "1a2b3c").</p>
        )}
      </Panel>
    </div>
  );
}
