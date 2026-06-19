"use client";

import { useEffect, useRef } from "react";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    function animate() {
      let start = 0;
      const duration = 1800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        if (el) {
          el.textContent =
            (current >= 1000
              ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 1) + "k+"
              : current + (progress < 1 ? "" : "+")) + "";
        }
        if (progress < 1) requestAnimationFrame(step);
        else if (el) el.textContent = target >= 1000 ? target / 1000 + "k+" : target + "+";
      };
      requestAnimationFrame(step);
    }

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="stat-num" ref={ref}>
      0
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="section-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div className="fi">
            <span className="section-eyebrow">Nos chiffres</span>
            <h2 className="section-title">Particuliers, entreprises et agentes nous font confiance</h2>
            <p className="section-sub">
              Que vous soyez une famille, un cabinet ou une agente cherchant à travailler — FDM
              est la plateforme de référence au Maroc depuis 2018.
            </p>
          </div>
          <div
            className="fi d1"
            style={{ textAlign: "right", fontSize: 13, color: "var(--n400)", lineHeight: 1.8 }}
          >
            Casablanca · Fès · Bouskoura
            <br />
            Particuliers · Bureaux · Cabinets
            <br />
            Ménage · Nounou · Cuisine · Vitrerie
          </div>
        </div>

        <div className="stats-grid fi d2">
          <div className="stat-card">
            <Counter target={1200} />
            <div className="stat-label">Clients actifs</div>
            <div className="stat-sub">particuliers &amp; entreprises</div>
          </div>
          <div className="stat-card">
            <Counter target={320} />
            <div className="stat-label">Agentes vérifiées</div>
            <div className="stat-sub">profils actifs dans l&apos;annuaire</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" id="stat-rating">
              4.8
            </div>
            <div className="stat-label">Note moyenne</div>
            <div className="stat-sub">sur +6 000 avis clients</div>
          </div>
          <div className="stat-card">
            <Counter target={8000} />
            <div className="stat-label">Missions réalisées</div>
            <div className="stat-sub">depuis notre lancement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
