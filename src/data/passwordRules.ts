export type RuleCheck = {
  id: string;
  label: string;
  test: (pw: string) => boolean;
};

const commonWeak = [
  "password", "password123", "qwerty", "admin", "12345678", "123456789",
  "letmein", "welcome", "iloveyou", "monkey", "football", "abc123",
];

export const rules: RuleCheck[] = [
  { id: "length", label: "At least 12 characters", test: (pw) => pw.length >= 12 },
  {
    id: "case",
    label: "Uppercase + lowercase letters",
    test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw),
  },
  { id: "number", label: "At least one number (0\u20139)", test: (pw) => /[0-9]/.test(pw) },
  {
    id: "symbol",
    label: "At least one symbol (! @ # $ % &)",
    test: (pw) => /[!@#$%&]/.test(pw),
  },
  {
    id: "dictionary",
    label: "Not a common word or phrase",
    test: (pw) => {
      const lower = pw.toLowerCase();
      if (lower.length === 0) return false;
      return !commonWeak.some((w) => lower.includes(w));
    },
  },
];

export type Tier = {
  label: string;
  color: "coral" | "gold" | "teal";
};

export function tierForScore(score: number): Tier {
  if (score <= 1) return { label: "Easy to crack", color: "coral" };
  if (score <= 3) return { label: "Getting there", color: "gold" };
  if (score === 4) return { label: "Strong", color: "teal" };
  return { label: "Vault-grade", color: "teal" };
}

// Rough offline-attack estimate: 10 billion guesses/second, own charset only.
export function estimateCrackTime(pw: string): string {
  if (!pw) return "\u2014";
  let charset = 0;
  if (/[a-z]/.test(pw)) charset += 26;
  if (/[A-Z]/.test(pw)) charset += 26;
  if (/[0-9]/.test(pw)) charset += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) charset += 32;
  if (charset === 0) return "\u2014";

  const guessesPerSecond = 1e10;
  const combinations = Math.pow(charset, pw.length);
  const seconds = combinations / guessesPerSecond / 2;

  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1000)} thousand years`;
  if (years < 1e9) return `${Math.round(years / 1e6)} million years`;
  return "billions of years";
}
