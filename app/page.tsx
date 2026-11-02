import { ArrowUpRight, HeartHandshake, Route, ShieldCheck } from "lucide-react";
import AvaraLogo from "@/components/AvaraLogo";
import TripPlanner from "@/components/TripPlanner";

export default function HomePage() {
  return (
    <main>
      <div className="shell">
        <nav className="nav">
          <div className="brand">
            <AvaraLogo className="brand-logo" />
          </div>
          <a className="nav-link" href="#planner">Plan a trip <ArrowUpRight size={14} style={{ display: "inline" }} /></a>
        </nav>

        <section className="hero">
          <div>
            <span className="eyebrow">Maharashtra, made personal</span>
            <h1>Your next escape is closer than you think.</h1>
            <p>Tell us your time, budget and travel mood. Discover Maharashtra destinations worth exploring, with a trip plan shaped around your group.</p>
            <a href="#planner"><button className="primary" type="button">Plan my getaway <ArrowUpRight size={16} style={{ display: "inline", marginLeft: 8 }} /></button></a>
          </div>
          <div className="hero-panel">
            <div className="panel-label">A better way to explore</div>
            <div className="panel-title">Less scrolling.<br/>More travelling.</div>
            <div className="panel-bottom"><span className="chip">Weekend escapes</span><span className="chip">Local discoveries</span><span className="chip">Your budget</span></div>
          </div>
        </section>

        <section className="section" id="planner">
          <div className="section-heading">
            <div><span className="eyebrow">Trip finder</span><h2>Where should you go?</h2></div>
            <p>Start with a few details. We’ll help narrow down the possibilities before you spend hours researching.</p>
          </div>
          <TripPlanner />
        </section>

        <section className="section">
          <div className="section-heading">
            <div><span className="eyebrow">Built around travellers</span><h2>More than a list of places.</h2></div>
          </div>
          <div className="feature-grid">
            <div className="feature"><div className="feature-icon">✦</div><h3>Recommendations with reasons</h3><p>See why a destination fits your mood, available days, starting point and planning budget.</p></div>
            <div className="feature"><div className="feature-icon"><Route size={23}/></div><h3>Editable trip plans</h3><p>Our next releases will turn your shortlist into day-wise itineraries you can save and customize.</p></div>
            <div className="feature"><div className="feature-icon"><HeartHandshake size={23}/></div><h3>Local hospitality knowledge</h3><p>We’re building toward trusted stays, local experiences and traveller feedback—not unverified claims.</p></div>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Maharashtra Travel Companion</span>
          <span><ShieldCheck size={13} style={{ display: "inline", marginRight: 5 }} />Planning estimates are not live quotes or booking confirmations.</span>
        </footer>
      </div>
    </main>
  );
}
