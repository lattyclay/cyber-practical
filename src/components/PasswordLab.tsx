import { useMemo, useState } from "react";
import { Check, X, Eye, EyeOff, RefreshCw, ArrowLeft } from "lucide-react";
import { rules, tierForScore, estimateCrackTime } from "../data/passwordRules";
import { generatePassphrase } from "../data/words";

type Props = {
  onBack: () => void;
};

export default function PasswordLab({ onBack }: Props) {
  const [pw, setPw] = useState("");
  const [reveal, setReveal] = useState(true);
  const [lastPassphrase, setLastPassphrase] = useState<string | null>(null);

  const results = useMemo(() => rules.map((r) => ({ ...r, pass: r.test(pw) })), [pw]);
  const score = results.filter((r) => r.pass).length;
  const tier = tierForScore(pw.length === 0 ? 0 : score);
  const crackTime = estimateCrackTime(pw);
  const fillPct = pw.length === 0 ? 0 : (score / rules.length) * 100;

  function tryPassphrase() {
    const p = generatePassphrase();
    setLastPassphrase(p);
    setPw(p);
    setReveal(true);
  }

  return (
    <div className="station-view">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={18} /> Back to practical
      </button>

      <h1>Password Lab</h1>
      <p className="station-intro">
        Type a password below, exactly like you'd use it on a real account.
        Nothing is saved or sent anywhere \u2014 it only ever stays on this
        screen.
      </p>

      <div className="lab-panel">
        <label className="pw-label" htmlFor="pw-input">
          Your password
        </label>
        <div className="pw-input-row">
          <input
            id="pw-input"
            type={reveal ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Start typing here"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            className="icon-btn"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
            type="button"
          >
            {reveal ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className={`lock-meter tier-${tier.color}`} aria-hidden="true">
          <div className="lock-meter-track">
            <div className="lock-meter-fill" style={{ width: `${fillPct}%` }} />
          </div>
        </div>
        <p className={`tier-label tier-${tier.color}`}>
          {pw.length === 0 ? "Start typing to see your strength" : tier.label}
        </p>

        <ul className="rule-list">
          {results.map((r) => (
            <li key={r.id} className={r.pass ? "rule-pass" : "rule-fail"}>
              <span className="rule-icon">
                {r.pass ? <Check size={16} /> : <X size={16} />}
              </span>
              {r.label}
            </li>
          ))}
        </ul>

        <div className="crack-time">
          <span className="crack-time-label">Estimated time to crack</span>
          <span className={`crack-time-value tier-${tier.color}`}>{crackTime}</span>
        </div>
      </div>

      <div className="passphrase-panel">
        <div className="passphrase-copy">
          <h2>Try a passphrase instead</h2>
          <p>
            Four random, unrelated words are longer than a typical password
            but much easier to remember than a jumble of characters.
          </p>
        </div>
        <button className="secondary-btn" onClick={tryPassphrase} type="button">
          <RefreshCw size={18} /> Generate an example
        </button>
      </div>
      {lastPassphrase && (
        <p className="passphrase-hint">
          Loaded <strong>{lastPassphrase}</strong> into the field above \u2014
          keep it, tweak it, or generate another.
        </p>
      )}

      <div className="tip-box">
        Never reuse this password on another site, and never share it with
        anyone \u2014 not even someone claiming to be IT support.
      </div>
    </div>
  );
}
