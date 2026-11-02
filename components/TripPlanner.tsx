"use client";

import { FormEvent, useMemo, useState } from "react";
import { MapPin, Users, CalendarDays, Wallet, Compass, Car, Sparkles } from "lucide-react";
import { recommendDestinations } from "@/lib/recommend";
import type { RankedDestination } from "@/lib/recommend";
import type { TravelMood, TransportMode } from "@/lib/types";

const moodLabels: Record<TravelMood, string> = {
  peaceful: "Peaceful & nature", adventure: "Adventure", beach: "Beach & coast",
  culture: "Culture & heritage", family: "Family friendly", party: "Party & nightlife",
  shopping: "Shopping & food"
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function TripPlanner() {
  const [origin, setOrigin] = useState("Mumbai");
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(10000);
  const [mood, setMood] = useState<TravelMood>("peaceful");
  const [transport, setTransport] = useState<TransportMode>("own-car");
  const [results, setResults] = useState<RankedDestination[] | null>(null);
  const [message, setMessage] = useState("");

  const preferences = useMemo(() => ({ origin, people, days, budget, mood, transport }), [origin, people, days, budget, mood, transport]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (origin.trim().length < 2) {
      setMessage("Please enter a starting city or town.");
      setResults(null);
      return;
    }
    if (people < 1 || days < 1 || budget < 1000) {
      setMessage("Please check group size, duration and budget.");
      setResults(null);
      return;
    }
    setMessage("");
    setResults(recommendDestinations(preferences));
  }

  return (
    <div className="planner">
      <form className="card" onSubmit={submit}>
        <h3>Tell us about your trip</h3>
        <p className="subtle">A few details help us shortlist places that suit your time and budget.</p>
        <div className="form-grid">
          <div className="field full">
            <label htmlFor="origin"><MapPin size={13} style={{ display: "inline", marginRight: 5 }} />STARTING FROM</label>
            <input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. Mumbai" required />
          </div>
          <div className="field">
            <label htmlFor="people"><Users size={13} style={{ display: "inline", marginRight: 5 }} />TRAVELLERS</label>
            <input id="people" type="number" min="1" max="30" value={people} onChange={(e) => setPeople(Number(e.target.value))} />
          </div>
          <div className="field">
            <label htmlFor="days"><CalendarDays size={13} style={{ display: "inline", marginRight: 5 }} />DAYS</label>
            <select id="days" value={days} onChange={(e) => setDays(Number(e.target.value))}>
              {[1,2,3,4,5,6,7].map((n) => <option key={n} value={n}>{n} {n === 1 ? "day" : "days"}</option>)}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="budget"><Wallet size={13} style={{ display: "inline", marginRight: 5 }} />TOTAL GROUP BUDGET (₹)</label>
            <input id="budget" type="number" min="1000" step="500" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
          </div>
          <div className="field full">
            <label htmlFor="mood"><Compass size={13} style={{ display: "inline", marginRight: 5 }} />WHAT KIND OF TRIP?</label>
            <select id="mood" value={mood} onChange={(e) => setMood(e.target.value as TravelMood)}>
              {Object.entries(moodLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="transport"><Car size={13} style={{ display: "inline", marginRight: 5 }} />TRAVEL MODE</label>
            <select id="transport" value={transport} onChange={(e) => setTransport(e.target.value as TransportMode)}>
              <option value="own-car">Own car</option>
              <option value="public-transport">Train / bus</option>
              <option value="bike">Bike</option>
              <option value="not-decided">Not decided</option>
            </select>
          </div>
          <div className="field full">
            <button className="primary" type="submit"><Sparkles size={16} style={{ display: "inline", marginRight: 8 }} />Find my Maharashtra getaway</button>
            {message && <span role="alert" className="subtle" style={{ color: "#b42318" }}>{message}</span>}
          </div>
        </div>
        <div className="note">Demo estimates only. The current shortlist uses a small curated sample catalogue; it does not check live hotel prices, route conditions or availability.</div>
      </form>

      <div className="results" aria-live="polite">
        {results === null ? (
          <div className="card empty">
            <div className="empty-icon">⌖</div>
            <h3>Your next trip starts here</h3>
            <p className="subtle">Enter your preferences and we’ll show a shortlist with reasons, budget guidance and seasonal notes.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="card empty">
            <div className="empty-icon">⌕</div>
            <h3>No close matches yet</h3>
            <p className="subtle">Try increasing your budget or trip duration, or choose another travel mood.</p>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding: 18 }}>
              <div className="score">YOUR SHORTLIST</div>
              <h3 style={{ marginTop: 5 }}>{results.length} ideas to explore</h3>
              <p className="subtle">Ranked against your preferences. Confirm local conditions and current prices before booking.</p>
            </div>
            {results.map((item) => (
              <article className="result-card" key={item.id}>
                <div className="result-art"><span>{item.district} district</span></div>
                <div>
                  <div className="score">MATCH SCORE · {item.score}/14</div>
                  <h4>{item.name}</h4>
                  <div className="result-meta">{item.bestFor} · {item.minDays}–{item.maxDays} days</div>
                  <p>{item.description}</p>
                  <div className="result-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <p style={{ marginTop: 9 }}><strong>Planning estimate:</strong> {formatINR(item.indicativeBudgetPerPerson)} per person</p>
                  <p style={{ marginTop: 5 }}><strong>Why it matches:</strong> {item.reasons.slice(0, 2).join("; ")}.</p>
                  <p style={{ marginTop: 5, fontSize: 11 }}>{item.seasonNote}</p>
                </div>
              </article>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
