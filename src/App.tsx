import { useState } from "react";
import Home from "./components/Home";
import PasswordLab from "./components/PasswordLab";
import PhishingSpotter from "./components/PhishingSpotter";
import "./App.css";

type View = "home" | "password" | "phishing";

export default function App() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="app-shell">
      <div className="app-frame">
        {view === "home" && <Home onSelect={(v) => setView(v)} />}
        {view === "password" && <PasswordLab onBack={() => setView("home")} />}
        {view === "phishing" && <PhishingSpotter onBack={() => setView("home")} />}
      </div>
    </div>
  );
}
