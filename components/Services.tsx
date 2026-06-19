import Link from "next/link";

const services = [
  {
    href: "/particulier",
    cls: "s1",
    delay: "",
    icon: "🧹",
    title: "Femme de ménage",
    desc: "Ménage courant, grand ménage, remise en état, entretien régulier ou ponctuel à domicile.",
    tags: ["Ménage courant", "Grand ménage", "Airbnb"],
    linkLabel: "Voir le service →",
    linkColor: undefined,
  },
  {
    href: "/annuaire?metier=nounou",
    cls: "s2",
    delay: "d1",
    icon: "👶",
    title: "Nounou",
    desc: "Garde d'enfants à domicile, couchante ou non, avec ou sans expérience petite enfance.",
    tags: ["Garde à domicile", "Couchante", "0–10 ans"],
    linkLabel: "Voir les nounous →",
    linkColor: "#e65100",
  },
  {
    href: "/annuaire?metier=cuisiniere",
    cls: "s3",
    delay: "d2",
    icon: "🍳",
    title: "Cuisinière",
    desc: "Cuisine marocaine et internationale, préparation des repas familiaux, grands événements.",
    tags: ["Cuisine marocaine", "Internationale", "Événements"],
    linkLabel: "Voir les cuisinières →",
    linkColor: "#c62828",
  },
  {
    href: "/annuaire?metier=vitrier",
    cls: "s4",
    delay: "d3",
    icon: "🪟",
    title: "Vitrier",
    desc: "Nettoyage de vitres, baies vitrées, vérandas, garde-corps en verre, miroirs grands formats.",
    tags: ["Baies vitrées", "Véranda", "Miroirs"],
    linkLabel: "Voir les vitriers →",
    linkColor: "#1565c0",
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-inner">
        <div className="services-header fi">
          <span className="section-eyebrow">Nos services</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Tout ce dont votre foyer a besoin
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", textAlign: "center" }}>
            Femme de ménage, nounou, cuisinière ou vitrier — trouvez l&apos;aide adaptée à votre
            quotidien.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <Link key={s.title} href={s.href} className={`svc-card ${s.cls} fi ${s.delay}`}>
              <span className="svc-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="svc-tags">
                {s.tags.map((t) => (
                  <span className="svc-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="svc-link" style={s.linkColor ? { color: s.linkColor } : undefined}>
                {s.linkLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
