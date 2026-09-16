import { NavLink } from 'react-router-dom';

const ITEMS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/caesar', label: 'Caesar Cipher' },
  { to: '/vigenere', label: 'Vigenère Cipher' },
  { to: '/xor', label: 'XOR Cipher' },
  { to: '/base64', label: 'Base64' },
  { to: '/hash', label: 'SHA-256 Hash' },
  { to: '/password', label: 'Password Strength' },
];

export default function Nav() {
  return (
    <nav className="space-y-1">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-mono-tight transition border ${
              isActive
                ? 'bg-neon/10 border-neon/40 text-neon'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-panel'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
