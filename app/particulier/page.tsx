// Server Component — pas de "use client".
// Le contenu statique est rendu côté serveur (SEO, HTML immédiat).
// PrestaCard, FaqAccordion, ReservationForm et FadeInObserver restent des client islands.

import Link from "next/link";
import Image from "next/image";
import styles from "./particulier.module.css";
import FadeInObserver from "@/components/FadeInObserver";
import ReservationForm from "./ReservationForm";
import PrestaCard from "./PrestaCard";
import FaqAccordion from "./FaqAccordion";

const annexes = [
  { icon: "🪟", title: "Nettoyage vitres", desc: "Baies vitrées, vérandas, garde-corps, balcons en verre" },
  { icon: "👕", title: "Repassage", desc: "Repassage et rangement du linge. Idéal pour la lessive du week-end." },
  { icon: "🗄️", title: "Rangement placard", desc: "Tri, organisation et rangement complet de vos placards et armoires." },
  { icon: "🧹", title: "Grand ménage", desc: "Nettoyage en profondeur : sous les lits, murs, lustres, zones difficiles." },
  { icon: "🍳", title: "Électroménager", desc: "Four, plaques de cuisson, hotte, intérieur frigo, micro-ondes." },
  { icon: "🏨", title: "Remise en état Airbnb", desc: "Nettoyage complet entre deux locataires, changement du linge inclus." },
];

export default function ParticulierPage() {
  return (
    <div className={styles.page}>
      <FadeInObserver />

      {/* HERO PAS */}
      <section className={styles.hero}>
        <div className={styles["hero-inner"]}>
          <div>
            <div className={`${styles["pain-tag"]} fi`}>
              😤 Vous en avez assez de passer votre weekend à faire le ménage ?
            </div>
            <h1 className="fi">
              Retrouvez vos <em>weekends libres</em> grâce à une femme de ménage professionnelle
            </h1>
            <p className={`${styles["hero-agitate"]} fi`}>
              Le travail, les enfants, les imprévus… votre temps libre est précieux. Pourtant, chaque
              week-end, c&apos;est la même corvée : aspirer, frotter, récurer. Vous méritez mieux.
            </p>
            <div className={`${styles["hero-solution"]} fi`}>
              <p>
                <strong>✅ La solution : Femmes de Ménage</strong>
                Des agentes formées et vérifiées interviennent chez vous selon votre planning. Votre
                intérieur est impeccable, vous récupérez votre temps.
              </p>
            </div>
            <div className={`${styles["hero-btns"]} fi`}>
              <Link href="#reserver" className={styles["btn-primary"]}>
                Je réserve maintenant →
              </Link>
              <a href="tel:+212695439595" className={styles["btn-ghost"]}>
                📞 Nous appeler
              </a>
            </div>
            <div className={`${styles["social-proof"]} fi`}>
              <div className={styles["sp-avatars"]}>
                <div className={styles["sp-av"]}>👩</div>
                <div className={styles["sp-av"]}>👩</div>
                <div className={styles["sp-av"]}>👩</div>
              </div>
              <div className={styles["sp-text"]}>
                <strong>+500 clients satisfaits</strong>
                ⭐⭐⭐⭐⭐ 4.9/5 de moyenne
              </div>
            </div>
          </div>

          <PrestaCard />
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className={styles.pain}>
        <div className={styles["pain-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Vous vous reconnaissez ?
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "var(--g900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Ces situations vous parlent probablement
          </h2>
          <div className={styles["pain-grid"]}>
            <div className={`${styles["pain-card"]} fi`}>
              <span className={styles["pain-emoji"]}>😴</span>
              <h3>Plus d&apos;énergie après le travail</h3>
              <p>Rentrer tard et devoir encore nettoyer ? Votre temps libre mérite mieux que la serpillère.</p>
              <div className={styles.solution}>→ Intervenons le matin pendant que vous travaillez</div>
            </div>
            <div className={`${styles["pain-card"]} fi d1`}>
              <span className={styles["pain-emoji"]}>😰</span>
              <h3>Invités de dernière minute</h3>
              <p>La belle-mère arrive demain ? Panique à bord. Nous pouvons intervenir en urgence sous 24h.</p>
              <div className={styles.solution}>→ Réservation confirmée sous 1 heure</div>
            </div>
            <div className={`${styles["pain-card"]} fi d2`}>
              <span className={styles["pain-emoji"]}>🤧</span>
              <h3>Allergies à la poussière</h3>
              <p>
                Nettoyage insuffisant, poussière accumulée… un problème de santé réel. Nos agentes sont
                formées aux protocoles anti-allergènes.
              </p>
              <div className={styles.solution}>→ Nettoyage en profondeur régulier</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className={styles.steps}>
        <div className={styles["steps-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Comment ça marche
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "var(--g900)",
              letterSpacing: "-1px",
              margin: "10px 0 40px",
            }}
          >
            De votre téléphone à votre porte propre
          </h2>
          <div className={styles["steps-timeline"]}>
            <div className={`${styles["step-row"]} fi`}>
              <div className={styles["step-num-col"]}>
                <div className={styles["step-circle"]}>1</div>
              </div>
              <div className={styles["step-body"]}>
                <h3>Configurez en 2 minutes</h3>
                <p>
                  Choisissez votre ville, le type de logement, le nombre d&apos;agents et votre créneau
                  préféré. Notre calculateur vous donne une estimation immédiate.
                </p>
                <span className={styles["step-tip"]}>💡 Pas de compte requis pour réserver</span>
              </div>
            </div>
            <div className={`${styles["step-row"]} fi d1`}>
              <div className={styles["step-num-col"]}>
                <div className={styles["step-circle"]}>2</div>
              </div>
              <div className={styles["step-body"]}>
                <h3>Confirmation sous 1h</h3>
                <p>
                  Notre équipe vous rappelle pour valider les détails et vous confirmer le nom et le
                  profil de l&apos;agente qui interviendra chez vous.
                </p>
                <span className={styles["step-tip"]}>📞 Appel de confirmation systématique</span>
              </div>
            </div>
            <div className={`${styles["step-row"]} fi d2`}>
              <div className={styles["step-num-col"]}>
                <div className={styles["step-circle"]}>3</div>
              </div>
              <div className={styles["step-body"]}>
                <h3>Intervention professionnelle</h3>
                <p>
                  L&apos;agente arrive à l&apos;heure, avec ou sans matériel selon votre choix. Elle suit un
                  protocole de nettoyage rigoureux pièce par pièce.
                </p>
                <span className={styles["step-tip"]}>✓ Checklist de nettoyage pour chaque intervention</span>
              </div>
            </div>
            <div className={`${styles["step-row"]} fi d3`}>
              <div className={styles["step-num-col"]}>
                <div className={styles["step-circle"]}>4</div>
              </div>
              <div className={styles["step-body"]}>
                <h3>Évaluation &amp; suivi</h3>
                <p>
                  Après chaque prestation, vous recevez un récapitulatif et pouvez noter l&apos;agente.
                  Votre avis améliore la qualité pour tout le monde.
                </p>
                <span className={styles["step-tip"]}>⭐ Notation anonyme après chaque intervention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULES */}
      <section className={styles.formules}>
        <div className={styles["fl-inner"]}>
          <span className={`${styles["fl-label"]} fi`}>Tarification transparente</span>
          <h2 className={`${styles["fl-title"]} fi`}>Choisissez votre formule</h2>
          <p className={`${styles["fl-sub"]} fi`}>Prix affichés = prix payés. Aucune surprise, aucun frais cachés.</p>
          <div className={styles["fl-grid"]}>
            <div className={`${styles["fl-card"]} fi`}>
              <h3>One shot</h3>
              <div className={styles["fl-price"]}>
                250 <span className={styles.unit}>DH</span>
              </div>
              <div className={styles["fl-note"]}>par demi-journée · 1 agent</div>
              <ul className={styles["fl-features"]}>
                <li>Ménage courant (4h)</li>
                <li>Matin ou après-midi</li>
                <li>Sans engagement</li>
                <li>Confirmation sous 1h</li>
              </ul>
              <Link href="#reserver" className={`${styles["btn-fl"]} ${styles["btn-fl-outline"]}`}>
                Réserver
              </Link>
            </div>
            <div className={`${styles["fl-card"]} fi d1`}>
              <h3>Abonnement 1×/sem</h3>
              <div className={styles["fl-price"]}>
                990 <span className={styles.unit}>DH</span>
              </div>
              <div className={styles["fl-note"]}>par mois · 4 interventions</div>
              <ul className={styles["fl-features"]}>
                <li>Même agente à chaque fois</li>
                <li>Horaires flexibles</li>
                <li>Résiliation libre</li>
                <li>Support dédié</li>
              </ul>
              <Link href="#reserver" className={`${styles["btn-fl"]} ${styles["btn-fl-outline"]}`}>
                Souscrire
              </Link>
            </div>
            <div className={`${styles["fl-card"]} ${styles.featured} fi d2`}>
              <span className={styles["fl-featured-badge"]}>⭐ Le plus populaire</span>
              <h3>Abonnement 2×/sem</h3>
              <div className={styles["fl-price"]}>
                1 900 <span className={styles.unit}>DH</span>
              </div>
              <div className={styles["fl-note"]}>par mois · 8 interventions</div>
              <ul className={styles["fl-features"]}>
                <li>Même agente attitrée</li>
                <li>Priorité planning</li>
                <li>Résiliation libre</li>
                <li>Rapport mensuel</li>
              </ul>
              <Link href="#reserver" className={`${styles["btn-fl"]} ${styles["btn-fl-white"]}`}>
                Démarrer
              </Link>
            </div>
            <div className={`${styles["fl-card"]} fi d3`}>
              <h3>Abonnement 3×/sem</h3>
              <div className={styles["fl-price"]}>
                2 890 <span className={styles.unit}>DH</span>
              </div>
              <div className={styles["fl-note"]}>par mois · 12 interventions</div>
              <ul className={styles["fl-features"]}>
                <li>Agente dédiée</li>
                <li>Priorité absolue</li>
                <li>Résiliation libre</li>
                <li>Suivi hebdo</li>
              </ul>
              <Link href="#reserver" className={`${styles["btn-fl"]} ${styles["btn-fl-outline"]}`}>
                Souscrire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className={styles.reassur}>
        <div className={styles["reassur-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Nos engagements
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "var(--g900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Pourquoi nous faire confiance
          </h2>
          <div className={styles["reassur-grid"]}>
            <div className={`${styles["reassur-card"]} fi`}>
              <span className={styles["reassur-icon"]}><Image src="search.svg" alt="vérifiées" width={42} height={42} /></span>
              <h3>Vérifiées</h3>
              <p>Vérification des antécédents et entretien pour chaque agente.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d1`}>
              <span className={styles["reassur-icon"]}><Image src="/particulierIcones/formee.svg" alt="formées" width={42} height={42} /></span>
              <h3>Formées</h3>
              <p>Formation aux protocoles de nettoyage professionnels.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d2`}>
              <span className={styles["reassur-icon"]}><Image src="/particulierIcones/fiable.svg" alt="fiable" width={42} height={42} /></span>
              <h3>Fiables</h3>
              <p>Sélectionnées sur références et disponibilités vérifiées.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d3`}>
              <span className={styles["reassur-icon"]}><Image src="/particulierIcones/suivie.svg" alt="suivées" width={42} height={42} /></span>
              <h3>Suivies</h3>
              <p>Évaluation après chaque prestation, qualité maintenue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className={styles.avis}>
        <div className={styles["avis-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Avis clients
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "var(--g900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Ce qu&apos;ils disent de nous
          </h2>
          <div className={styles["avis-grid"]}>
            <div className={`${styles["avis-card"]} fi`}>
              <div className={styles["avis-stars"]}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className={styles["avis-q"]}>&quot;Je récupère enfin mes week-ends&quot;</p>
              <p className={styles["avis-text"]}>
                Abonnée 2 fois/semaine depuis 4 mois. Fatima est ponctuelle, efficace, et ma fille
                l&apos;adore. Mon appartement n&apos;a jamais été aussi propre.
              </p>
              <div className={styles["avis-author"]}>
                <div className={styles["avis-av"]}>👩</div>
                <div>
                  <div className={styles["avis-name"]}>Imane R.</div>
                  <div className={styles["avis-detail"]}>Casablanca · Abo 2×/semaine</div>
                </div>
              </div>
            </div>
            <div className={`${styles["avis-card"]} fi d1`}>
              <div className={styles["avis-stars"]}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className={styles["avis-q"]}>&quot;Grand ménage : résultat bluffant&quot;</p>
              <p className={styles["avis-text"]}>
                Avant déménagement, j&apos;avais besoin d&apos;un nettoyage en profondeur. 2 agentes,
                journée complète, résultat impeccable. Je recommande vivement.
              </p>
              <div className={styles["avis-author"]}>
                <div className={styles["avis-av"]}>👩</div>
                <div>
                  <div className={styles["avis-name"]}>Nadia K.</div>
                  <div className={styles["avis-detail"]}>Fès · Grand ménage</div>
                </div>
              </div>
            </div>
            <div className={`${styles["avis-card"]} fi d2`}>
              <div className={styles["avis-stars"]}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className={styles["avis-q"]}>&quot;Rapide et professionnel&quot;</p>
              <p className={styles["avis-text"]}>
                Réservation le matin, intervention l&apos;après-midi. L&apos;agente est arrivée à
                l&apos;heure exacte, avec du matériel de qualité. Parfait du début à la fin.
              </p>
              <div className={styles["avis-author"]}>
                <div className={styles["avis-av"]}>👨</div>
                <div>
                  <div className={styles["avis-name"]}>Youssef A.</div>
                  <div className={styles["avis-detail"]}>Bouskoura · One shot</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles["faq-section"]}>
        <div className={styles["faq-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            FAQ
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "var(--g900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Questions fréquentes
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* SERVICES ANNEXES */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                background: "var(--g50)",
                color: "var(--g700)",
                border: "1px solid rgba(46,125,50,.2)",
                borderRadius: 40,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Services annexes
            </div>
            <h2
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 800,
                color: "var(--n800)",
                marginBottom: 12,
              }}
            >
              Complétez votre ménage
            </h2>
            <p style={{ fontSize: 15, color: "var(--n500)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              En option, ajoutez une prestation spécialisée à votre ménage courant.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {annexes.map((a) => (
              <div
                key={a.title}
                style={{
                  background: "var(--n50)",
                  border: "1.5px solid var(--n200)",
                  borderRadius: 14,
                  padding: "24px 20px",
                  textAlign: "center",
                  transition: "all .25s ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--n800)",
                    marginBottom: 6,
                  }}
                >
                  {a.title}
                </h3>
                <p style={{ fontSize: 12, color: "var(--n500)", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE RESERVATION */}
      <ReservationForm />

      {/* CTA FINAL */}
      <div className={styles["cta-final"]}>
        <h2>Votre premier ménage à partir de 250 DH</h2>
        <p>Rejoignez +500 familles qui nous font déjà confiance à Casablanca, Fès et Bouskoura.</p>
        <div className={styles["cta-final-btns"]}>
          <Link href="#reserver" className={styles["btn-cf-white"]}>
            Réserver maintenant →
          </Link>
          <a href="tel:+212695439595" className={styles["btn-cf-outline"]}>
            📞 06 95 43 95 95
          </a>
        </div>
      </div>
    </div>
  );
}
