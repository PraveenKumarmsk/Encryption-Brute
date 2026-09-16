import { useMemo, useState } from 'react';
import Panel from '../components/Panel.jsx';
import CipherTextArea from '../components/CipherTextArea.jsx';

function safeEncode(text) {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return '(unable to encode)';
  }
}

function safeDecode(text) {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch {
    return '(invalid base64)';
  }
}

export default function Base64Tool() {
  const [plain, setPlain] = useState('Meet me at midnight');
  const encoded = useMemo(() => safeEncode(plain), [plain]);

  const [toDecode, setToDecode] = useState('SGVsbG8sIHdvcmxkIQ==');
  const decoded = useMemo(() => safeDecode(toDecode), [toDecode]);

  return (
    <div className="space-y-6">
      <Panel title="Base64 Encode">
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Text" value={plain} onChange={setPlain} />
          <CipherTextArea label="Base64" value={encoded} readOnly />
        </div>
      </Panel>

      <Panel title="Base64 Decode">
        <div className="grid md:grid-cols-2 gap-4">
          <CipherTextArea label="Base64" value={toDecode} onChange={setToDecode} />
          <CipherTextArea label="Text" value={decoded} readOnly />
        </div>
      </Panel>

      <Panel title="Why there's nothing to brute force here" className="border-bad/30">
        <p className="text-sm text-slate-400 leading-relaxed">
          Base64 has no key — it's a reversible way to represent bytes as text, not a cipher. Anyone can
          decode it instantly with no guessing at all, which is why it's used for transporting data safely
          through text-only channels (like embedding images in HTML), never for keeping data secret.
        </p>
      </Panel>
    </div>
  );
}
