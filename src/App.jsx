import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Overview from './tools/Overview.jsx';
import CaesarCipher from './tools/CaesarCipher.jsx';
import VigenereCipher from './tools/VigenereCipher.jsx';
import XorCipher from './tools/XorCipher.jsx';
import Base64Tool from './tools/Base64Tool.jsx';
import HashTool from './tools/HashTool.jsx';
import PasswordBruteForce from './tools/PasswordBruteForce.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 py-6 flex-1 flex flex-col md:flex-row gap-6">
        <aside className="md:w-56 shrink-0">
          <div className="md:sticky md:top-24">
            <Nav />
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/caesar" element={<CaesarCipher />} />
            <Route path="/vigenere" element={<VigenereCipher />} />
            <Route path="/xor" element={<XorCipher />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/hash" element={<HashTool />} />
            <Route path="/password" element={<PasswordBruteForce />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
      <footer className="border-t border-border py-4 text-center text-xs text-slate-600 font-mono-tight">
        CryptoLab — educational cryptography sandbox · runs entirely client-side
      </footer>
    </div>
  );
}
