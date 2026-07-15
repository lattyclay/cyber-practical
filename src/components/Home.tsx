import { Lock, MailWarning, ArrowRight } from "lucide-react";

type Props = {
  onSelect: (view: "password" | "phishing") => void;
};

export default function Home({ onSelect }: Props) {
  return (
    <div className="home">
      <header className="home-header">
        <p className="eyebrow">Module 6 &middot; Online Safety &amp; Cybersecurity</p>
        <h1>Today's practical</h1>
        <p className="home-lede">
          Two short stations. Work through both at your own pace \u2014 there's no
          time limit and no wrong way to learn.
        </p>
      </header>

      <div className="station-grid">
        <button className="station-card" onClick={() => onSelect("password")}>
          <span className="station-icon icon-navy">
            <Lock size={28} strokeWidth={2} />
          </span>
          <span className="station-body">
            <span className="station-tag">Station 1</span>
            <span className="station-title">Password Lab</span>
            <span className="station-desc">
              Build a password, watch it get stronger, and see how long it
              would take to crack.
            </span>
          </span>
          <span className="station-go">
            Start <ArrowRight size={18} />
          </span>
        </button>

        <button className="station-card" onClick={() => onSelect("phishing")}>
          <span className="station-icon icon-coral">
            <MailWarning size={28} strokeWidth={2} />
          </span>
          <span className="station-body">
            <span className="station-tag">Station 2</span>
            <span className="station-title">Inbox Check</span>
            <span className="station-desc">
              Seven real-looking messages. Decide which are safe and which
              are trying to trick you.
            </span>
          </span>
          <span className="station-go">
            Start <ArrowRight size={18} />
          </span>
        </button>
      </div>

      <p className="home-footer">
        Swahilipot Hub Foundation &middot; Attachee Training Program &middot; Cohort 2
      </p>
    </div>
  );
}
