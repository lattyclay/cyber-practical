# Module 6 Practical — Passwords & Phishing

A two-station interactive practical for the Module 6 lecture series
(Cybersecurity & Password Management + Phishing Attacks & Online Scams).

Built with React + TypeScript + Vite.

## Stations

- **Password Lab** — live password strength checker against the 5 rules
  from the lecture (length, case mix, numbers, symbols, no dictionary
  words), a crack-time estimate, and a passphrase generator using
  everyday Swahili words.
- **Inbox Check** — a 7-message phishing-spotting quiz drawn from the
  5 warning signs in the lecture (urgency, generic greetings, spelling
  errors, fake links, requests for passwords/PINs), mixed with genuinely
  safe messages so learners practice telling the difference, not just
  spotting scams everywhere.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy

This is a static Vite app — deploys directly to Vercel:

```bash
npm install -g vercel
vercel
```

Or drag the `dist/` folder into any static host (Netlify, GitHub Pages,
Swahilipot Hub's own hosting, etc.).

## Notes for facilitators

- Nothing typed into the Password Lab is stored or transmitted —
  it's safe for learners to use a real example.
- The Inbox Check message order is shuffled each time it's opened, so
  it can be replayed.
- All content is sourced directly from the Week 5 Monday and Tuesday
  slide decks (Module 6), so the practical reinforces exactly what was
  taught.
