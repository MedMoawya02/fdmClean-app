import Image from "next/image";
const steps = [
  {
    icon: "/search.svg",
    num: 1,
    delay: "d1",
    title: "Choisissez votre service",
    desc: "Réservation clé en main ou parcours de l'annuaire pour trouver votre agente idéale.",
  },
  {
    icon: "/checkList.svg",
    num: 2,
    delay: "d2",
    title: "Nous validons ensemble",
    desc: "Notre équipe vous rappelle sous 2h pour confirmer les détails et attribuer l'agente.",
  },
  {
    icon: "/ordre-du-jour.svg",
    num: 3,
    delay: "d3",
    title: "L'agente intervient",
    desc: "Elle arrive à l'heure, selon vos instructions, avec le matériel si besoin.",
  },
  {
    icon: "/etoile.svg",
    num: 4,
    delay: "d4",
    title: "Vous notez la prestation",
    desc: "Votre avis améliore les profils et garantit la qualité pour tous les clients.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="section-inner">
        <div className="fi" style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Comment ça marche</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Simple, rapide, sans stress
          </h2>
        </div>

        <div className="steps-row">
          {steps.map((s) => (
            <div className={`step fi ${s.delay}`} key={s.num}>
              <div className="step-circle">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={32}
                  height={32}
                />
                <span className="step-num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
