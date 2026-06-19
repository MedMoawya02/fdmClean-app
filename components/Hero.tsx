import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-pill">
        <span className="dot"></span> Casablanca · Fès · Bouskoura
      </div>
      <h1>
        Propre, géré,
        <br />
        <span>sans vous en occuper.</span>
      </h1>
      <p className="hero-sub">
        Que vous ayez un appartement à entretenir, un bureau à nettoyer ou que vous vouliez
        choisir votre agente vous-même — nous avons la solution qui vous correspond.
      </p>

      <div className="cards-grid fi">
        <Link href="/particulier" className="cat-card c-b2c">
          <div className="card-ico">🏠</div>
          <div className="card-eyebrow">Particulier · Service géré</div>
          <h2>Je veux qu&apos;on s&apos;occupe de tout</h2>
          <p>
            Vous réservez, on attribue l&apos;agente, on suit la prestation. Zéro friction, zéro
            coordination.
          </p>
          <ul className="card-list">
            <li>One shot ou abonnement hebdo/mensuel</li>
            <li>Agente sélectionnée &amp; planifiée pour vous</li>
            <li>Confirmation sous 2h — dès 250 DH</li>
          </ul>
          <div className="card-foot">
            <span className="card-cta-txt">Réserver une prestation</span>
            <span className="card-arr">→</span>
          </div>
        </Link>

        <Link href="/annuaire" className="cat-card c-ann">
          <div className="card-ico">🔍</div>
          <div className="card-eyebrow">Particulier · Autonome</div>
          <h2>Je veux choisir mon agente moi-même</h2>
          <p>Parcourez les profils, comparez les tarifs et l&apos;expérience, puis contactez directement.</p>
          <ul className="card-list">
            <li>Femme de ménage, nounou, cuisinière, vitrier</li>
            <li>Filtres par ville, métier, disponibilité</li>
            <li>Vous gérez le contrat en direct</li>
          </ul>
          <div className="card-foot">
            <span className="card-cta-txt">Parcourir l&apos;annuaire</span>
            <span className="card-arr">→</span>
          </div>
        </Link>

        <Link href="/pro" className="cat-card c-b2b">
          <div className="card-ico">🏢</div>
          <div className="card-eyebrow">Entreprise · Bureau · Cabinet</div>
          <h2>Nettoyage régulier de mes locaux pro</h2>
          <p>
            Bureaux, cabinets médicaux, commerces, résidences — équipe dédiée, contrat mensuel,
            facturation simplifiée.
          </p>
          <ul className="card-list">
            <li>Équipes formées pour environnements pro</li>
            <li>Contrat, facturation &amp; suivi dédiés</li>
            <li>Devis personnalisé sous 24h</li>
          </ul>
          <div className="card-foot">
            <span className="card-cta-txt">Obtenir un devis pro</span>
            <span className="card-arr">→</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
