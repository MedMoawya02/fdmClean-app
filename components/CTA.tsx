import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-box fi">
        <h2>
          La propreté,
          <br />
          quelle que soit votre situation
        </h2>
        <p>
          Particulier qui veut déléguer, autonome qui veut choisir, ou entreprise cherchant un
          contrat — on a la bonne option pour vous.
        </p>
        <div className="cta-btns">
          <Link href="/particulier" className="cta-btn-white">
            Réserver une prestation →
          </Link>
          <Link href="/annuaire" className="cta-btn-outline">
            🔍 Parcourir l&apos;annuaire
          </Link>
          <Link href="/pro" className="cta-btn-outline">
            🏢 Devis entreprise
          </Link>
        </div>
      </div>
    </section>
  );
}
