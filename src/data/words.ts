// Everyday Swahili words \u2014 easy to picture, easy to remember, unrelated to personal info.
export const wordBank: string[] = [
  "Twiga", "Simba", "Ndizi", "Jua", "Mvua", "Chai", "Baba", "Rafiki",
  "Kahawa", "Duka", "Bahari", "Mlima", "Nyota", "Embe", "Kondoo", "Punda",
  "Samaki", "Ngoma", "Sufuria", "Kiti", "Meza", "Kalamu", "Shule", "Soko",
];

const symbols = ["!", "@", "#", "$", "%", "&"];

export function generatePassphrase(): string {
  const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, 4);
  const sym1 = symbols[Math.floor(Math.random() * symbols.length)];
  const sym2 = symbols[Math.floor(Math.random() * symbols.length)];
  const num = Math.floor(10 + Math.random() * 89);
  return `${picks[0]}.${picks[1]}${sym1}${picks[2]}${sym2}${picks[3]}${num}`;
}
