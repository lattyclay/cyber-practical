import { useMemo, useState } from "react";
import { ArrowLeft, ShieldCheck, MailWarning, RotateCcw } from "lucide-react";
import { messages } from "../data/messages";

type Props = {
  onBack: () => void;
};

type Answer = "safe" | "report";

export default function PhishingSpotter({ onBack }: Props) {
  const order = useMemo(() => {
    const idx = messages.map((_, i) => i);
    return idx.sort(() => Math.random() - 0.5);
  }, []);

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = messages[order[step]];
  const answeredCorrectly =
    answer !== null && ((answer === "report") === current.isPhishing);

  function choose(a: Answer) {
    if (answer !== null) return;
    setAnswer(a);
    if ((a === "report") === current.isPhishing) {
      setCorrectCount((c) => c + 1);
    }
  }

  function next() {
    if (step + 1 >= order.length) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setAnswer(null);
  }

  function restart() {
    setStep(0);
    setAnswer(null);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="station-view">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={18} /> Back to practical
        </button>
        <h1>Inbox Check \u2014 results</h1>
        <div className="result-panel">
          <p className="result-score">
            {correctCount} / {messages.length}
          </p>
          <p className="result-copy">
            {correctCount === messages.length
              ? "Every message sorted correctly \u2014 that instinct will serve you well."
              : "Good work. Review the flags below, then try again to lock it in."}
          </p>
          <button className="secondary-btn" onClick={restart} type="button">
            <RotateCcw size={18} /> Try again with a new order
          </button>
        </div>
        <div className="recap-box">
          <p className="recap-title">Before you go, remember:</p>
          <ul>
            <li>Do NOT click any links in a suspicious message</li>
            <li>Do NOT reply or give any personal information</li>
            <li>Report it to IT or your instructor</li>
            <li>Delete the message</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="station-view">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={18} /> Back to practical
      </button>

      <div className="quiz-head">
        <h1>Inbox Check</h1>
        <span className="quiz-progress">
          Message {step + 1} of {order.length}
        </span>
      </div>
      <p className="station-intro">
        Read the message like it just landed on your phone. Is it safe, or
        should it be reported?
      </p>

      <div className="message-card">
        <div className="message-meta">
          <span className={`channel-pill channel-${current.channel.toLowerCase()}`}>
            {current.channel}
          </span>
          <span className="message-sender">{current.sender}</span>
        </div>
        {current.subject && <p className="message-subject">{current.subject}</p>}
        <p className="message-body">{current.body}</p>

        {answer !== null && (
          <div className={`stamp ${answeredCorrectly ? "stamp-correct" : "stamp-wrong"}`}>
            {current.isPhishing ? "PHISHING" : "SAFE"}
          </div>
        )}
      </div>

      {answer === null ? (
        <div className="quiz-actions">
          <button className="choice-btn choice-safe" onClick={() => choose("safe")} type="button">
            <ShieldCheck size={20} /> Looks safe
          </button>
          <button className="choice-btn choice-report" onClick={() => choose("report")} type="button">
            <MailWarning size={20} /> Report as phishing
          </button>
        </div>
      ) : (
        <div className="feedback-panel">
          <p className={`feedback-verdict ${answeredCorrectly ? "verdict-right" : "verdict-wrong"}`}>
            {answeredCorrectly ? "Correct." : "Not quite."} This message is{" "}
            {current.isPhishing ? "a phishing attempt." : "genuinely safe."}
          </p>
          {current.isPhishing ? (
            <ul className="flag-list">
              {current.flags.map((f) => (
                <li key={f.sign}>
                  <strong>{f.sign}:</strong> {f.note}
                </li>
              ))}
            </ul>
          ) : (
            <p className="safe-note">{current.safeNote}</p>
          )}
          <button className="primary-btn" onClick={next} type="button">
            {step + 1 >= order.length ? "See results" : "Next message"}
          </button>
        </div>
      )}
    </div>
  );
}
