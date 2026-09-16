import { Link } from 'react-router-dom';
import Panel from '../components/Panel.jsx';

const MODULES = [
  { to: '/caesar', title: 'Caesar Cipher', desc: 'Shift every letter by a fixed amount. Only 26 possible keys — brute force tries all of them in an instant.' },
  { to: '/vigenere', title: 'Vigenère Cipher', desc: 'A repeating keyword shifts each letter differently. Encode and decode once you know (or guess) the key.' },
  { to: '/xor', title: 'XOR Cipher', desc: 'A single-byte key XORed against every byte of the message. 256 possible keys, ranked by how English the result looks.' },
  { to: '/base64', title: 'Base64', desc: 'Not encryption at all — just an encoding. See why it offers zero confidentiality.' },
  { to: '/hash', title: 'SHA-256 Hash', desc: 'One-way hashing: easy to compute, effectively impossible to reverse. Compare that to reversible ciphers.' },
  { to: '/password', title: 'Password Strength', desc: 'Estimate how long a brute-force attack would take against a password, given its length and character set.' },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 font-mono-tight mb-3">
          Encryption & Brute-Force Learning Lab
        </h1>
        <p className="text-slate-400 leading-relaxed max-w-2xl">
          Every tool here runs entirely in your browser — no server, no network request, nothing stored.
          Pick a module to encode and decode messages, then watch how an attacker without the key can still
          often recover the plaintext by trying every possibility and scoring the results against how
          English actually looks.
        </p>
      </Panel>

      <div className="grid sm:grid-cols-2 gap-4">
        {MODULES.map((m) => (
          <Link key={m.to} to={m.to} className="group block">
            <Panel className="h-full transition hover:border-neon/40 hover:shadow-neon">
              <h3 className="font-mono-tight font-semibold text-slate-100 group-hover:text-neon transition mb-1.5">
                {m.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
            </Panel>
          </Link>
        ))}
      </div>

      <Panel title="How the brute-force scoring works" className="border-neon2/30">
        <p className="text-sm text-slate-400 leading-relaxed">
          For ciphers with a small key space (Caesar's 26 shifts, single-byte XOR's 256 keys), the lab
          decrypts under every possible key and scores each result against expected English letter
          frequencies plus a bonus for common short words like "the" and "and". The candidate that looks
          most like real English floats to the top — usually the right answer, even with no key given.
        </p>
      </Panel>
    </div>
  );
}
