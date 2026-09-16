# CryptoLab — Encryption & Brute-Force Learning Lab

A browser-based, client-side cryptography lab: Caesar cipher, Vigenère cipher, XOR cipher,
Base64, SHA-256 hashing, and a password brute-force time estimator — each with a working
encoder/decoder and, where the key space is small enough, an automatic brute-force cracker
that ranks guesses by how "English" they look.

Educational use only. Nothing here is safe for real secrets, and everything runs entirely
in your browser — no server, no network calls.

## 1. Push this to GitHub

The project is already configured for a repo named **Encryption-Brute** (see `base` in
`vite.config.js`). Easiest path:

1. Create a new GitHub repository named `Encryption-Brute` (Settings → repository name must
   match exactly, or update `vite.config.js`'s `base` to match whatever name you use).
2. Unzip this project locally, then from inside the folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Encryption-Brute.git
   git push -u origin main
   ```
   (Or use GitHub's "Add file → Upload files" in the web UI, then drag in everything except
   `node_modules` — it isn't included in this zip anyway.)

## 2. Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.
3. That's it — the included workflow at `.github/workflows/deploy.yml` builds the site with
   Vite and deploys it automatically on every push to `main`. Check the **Actions** tab to
   watch it run.
4. Once the workflow finishes, your site is live at:
   ```
   https://<your-username>.github.io/Encryption-Brute/
   ```

## 3. Local development (optional)

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   shared UI (header, nav, panels, text areas, candidate list)
  lib/ciphers.js  all cipher math + brute-force + English-likeness scoring
  tools/        one file per lab module (Caesar, Vigenère, XOR, Base64, Hash, Password)
  App.jsx       layout + routes
  main.jsx      entry point
```

## If you rename the repo

If your GitHub repo isn't named `Encryption-Brute`, update the `base` value in
`vite.config.js` to `/<your-repo-name>/` and the favicon path in `index.html` to match —
otherwise assets will 404 on GitHub Pages.
