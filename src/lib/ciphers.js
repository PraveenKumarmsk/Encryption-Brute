// Core cipher implementations + brute-force helpers.
// Educational only: classical ciphers (Caesar, Vigenère, XOR) are not secure
// and are used here purely to demonstrate how brute-force search works.

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

export function caesarEncode(text, shift) {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const isUpper = ch === ch.toUpperCase();
    const base = isUpper ? 65 : 97;
    const code = ch.charCodeAt(0) - base;
    return String.fromCharCode(((code + s) % 26) + base);
  });
}

export function caesarDecode(text, shift) {
  return caesarEncode(text, -shift);
}

// English letter-frequency table (approx, percentages) used to score
// candidate plaintexts during brute force / frequency analysis.
export const ENGLISH_FREQ = {
  a: 8.2, b: 1.5, c: 2.8, d: 4.3, e: 12.7, f: 2.2, g: 2.0, h: 6.1, i: 7.0,
  j: 0.15, k: 0.77, l: 4.0, m: 2.4, n: 6.7, o: 7.5, p: 1.9, q: 0.095,
  r: 6.0, s: 6.3, t: 9.1, u: 2.8, v: 0.98, w: 2.4, x: 0.15, y: 2.0, z: 0.074,
};

const COMMON_WORDS = [' the ', ' and ', ' is ', ' to ', ' of ', ' a ', ' in ', ' that ', ' it ', ' you '];

// Lower score = more English-like. Combination of chi-squared distance from
// expected letter frequency and a bonus for common short words.
export function englishScore(text) {
  const clean = text.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean.length) return Infinity;
  const counts = {};
  for (const ch of clean) counts[ch] = (counts[ch] || 0) + 1;
  let chiSq = 0;
  for (const letter of ALPHA) {
    const observed = (counts[letter] || 0) / clean.length * 100;
    const expected = ENGLISH_FREQ[letter];
    chiSq += Math.pow(observed - expected, 2) / expected;
  }
  const padded = ' ' + text.toLowerCase() + ' ';
  let wordBonus = 0;
  for (const w of COMMON_WORDS) if (padded.includes(w)) wordBonus += 8;
  return chiSq - wordBonus;
}

export function bruteForceCaesar(ciphertext) {
  const results = [];
  for (let shift = 0; shift < 26; shift++) {
    const guess = caesarDecode(ciphertext, shift);
    results.push({ key: shift, label: `shift ${shift}`, guess, score: englishScore(guess) });
  }
  return results.sort((a, b) => a.score - b.score);
}

export function vigenereEncode(text, key, decode = false) {
  if (!key) return text;
  const cleanKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleanKey.length) return text;
  let ki = 0;
  return text.replace(/[a-zA-Z]/g, (ch) => {
    const isUpper = ch === ch.toUpperCase();
    const base = isUpper ? 65 : 97;
    const code = ch.charCodeAt(0) - base;
    const k = cleanKey.charCodeAt(ki % cleanKey.length) - 97;
    ki++;
    const shift = decode ? -k : k;
    return String.fromCharCode(((code + shift + 26) % 26) + base);
  });
}

export function vigenereDecode(text, key) {
  return vigenereEncode(text, key, true);
}

export function xorEncodeBytes(bytes, keyByte) {
  return bytes.map((b) => b ^ keyByte);
}

export function bytesToHex(bytes) {
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function hexToBytes(hex) {
  const clean = hex.trim().replace(/\s+/g, '');
  const out = [];
  for (let i = 0; i < clean.length; i += 2) out.push(parseInt(clean.slice(i, i + 2), 16));
  return out;
}

export function textToBytes(text) {
  return Array.from(new TextEncoder().encode(text));
}

export function bytesToText(bytes) {
  try {
    return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(bytes));
  } catch {
    return bytes.map((b) => String.fromCharCode(b)).join('');
  }
}

export function bruteForceXorSingleByte(cipherBytes) {
  const results = [];
  for (let key = 0; key < 256; key++) {
    const plainBytes = xorEncodeBytes(cipherBytes, key);
    const guess = bytesToText(plainBytes);
    results.push({ key, label: `0x${key.toString(16).padStart(2, '0')}`, guess, score: englishScore(guess) });
  }
  return results.sort((a, b) => a.score - b.score);
}

export async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(Array.from(new Uint8Array(hashBuffer)));
}

// Rough brute-force time estimator for a password given a charset size,
// length, and attacker guesses-per-second budget.
export function estimateCrackTime(charsetSize, length, guessesPerSecond) {
  const combinations = Math.pow(charsetSize, length);
  const seconds = combinations / guessesPerSecond / 2; // average case
  return { combinations, seconds };
}

export function formatDuration(seconds) {
  if (!isFinite(seconds)) return '∞';
  const units = [
    ['century', 60 * 60 * 24 * 365 * 100],
    ['year', 60 * 60 * 24 * 365],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];
  for (const [name, size] of units) {
    if (seconds >= size) {
      const val = seconds / size;
      const rounded = val >= 100 ? Math.round(val).toLocaleString() : val.toFixed(1);
      return `${rounded} ${name}${val >= 2 ? 's' : ''}`;
    }
  }
  return '< 1 second';
}
