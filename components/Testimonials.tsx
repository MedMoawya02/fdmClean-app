const testimonials = [
  {
    delay: "",
    text: "Ça fait 8 mois que j'ai la même agente tous les jeudis matin. Elle connaît maintenant mes habitudes, ma façon de ranger, mes priorités. Je ne peux plus imaginer sans.",
    avatar: "👩",
    name: "Soraya B.",
    meta: "Casablanca · Abonnement hebdo",
  },
  {
    delay: "d1",
    text: "Grand ménage avant l'emménagement de mes locataires. Villa de 300 m², 3 agentes en une journée. Résultat impeccable, tout était parfait. Je recommande sans hésitation.",
    avatar: "👨",
    name: "Mehdi A.",
    meta: "Bouskoura · Grand ménage",
  },
  {
    delay: "d2",
    text: "J'ai trouvé ma nounou via l'annuaire. J'ai pu lire son profil complet, voir ses disponibilités et la contacter directement. C'est simple, rapide et surtout on fait confiance au profil vérifié.",
    avatar: "👩",
    name: "Nadia K.",
    meta: "Fès · Annuaire Nounou",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-inner">
        <div className="testi-header fi">
          <span className="section-eyebrow">Témoignages</span>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <p className="section-sub">
            +6 000 avis vérifiés. Voici quelques témoignages de familles qui nous font confiance au
            quotidien.
          </p>
        </div>

        <div className="testi-grid">
          {testimonials.map((t) => (
            <div className={`testi-card fi ${t.delay}`} key={t.name}>
              <div className="testi-quote">&quot;</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-footer">
                <div className="testi-av">{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-meta">{t.meta}</div>
                  <div className="testi-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testi-score fi d3" style={{ marginTop: 44, flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="testi-score-num">4.8</span>
            <div className="testi-score-right">
              <div className="testi-score-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <div className="testi-score-sub">Note moyenne · +6 000 avis vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
