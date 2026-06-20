"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./particulier.module.css";
import useFadeIn from "@/components/useFadeIn";

const PHONE_RE = /^(00212|\+212|0)[5-7][0-9]{8}$/;

const annexes = [
  { icon: "🪟", title: "Nettoyage vitres", desc: "Baies vitrées, vérandas, garde-corps, balcons en verre" },
  { icon: "👕", title: "Repassage", desc: "Repassage et rangement du linge. Idéal pour la lessive du week-end." },
  { icon: "🗄️", title: "Rangement placard", desc: "Tri, organisation et rangement complet de vos placards et armoires." },
  { icon: "🧹", title: "Grand ménage", desc: "Nettoyage en profondeur : sous les lits, murs, lustres, zones difficiles." },
  { icon: "🍳", title: "Électroménager", desc: "Four, plaques de cuisson, hotte, intérieur frigo, micro-ondes." },
  { icon: "🏨", title: "Remise en état Airbnb", desc: "Nettoyage complet entre deux locataires, changement du linge inclus." },
];

const faqs = [
  {
    q: "Dois-je être présent(e) pendant le ménage ?",
    a: "Non, ce n'est pas obligatoire. Vous pouvez être présent au début pour les consignes, ou nous confier les clés en toute confiance. Nos agentes sont sélectionnées et vérifiées.",
  },
  {
    q: "Fournissez-vous le matériel et les produits ?",
    a: "Vous pouvez utiliser votre propre matériel, ou opter pour nos produits en supplément (20 DH). Nos agentes sont formées à l'utilisation des deux.",
  },
  {
    q: "Puis-je annuler ou modifier ma réservation ?",
    a: "Oui, jusqu'à 24h avant la prestation sans frais. Pour les annulations de dernière minute, des frais peuvent s'appliquer selon les conditions générales.",
  },
  {
    q: "Aurai-je toujours la même agente ?",
    a: "Pour les abonnements, nous faisons en sorte que ce soit toujours la même agente. Pour les one-shot, cela dépend des disponibilités, mais nous veillons à la continuité.",
  },
  {
    q: "Comment vous joindre en cas de problème ?",
    a: "Par téléphone au 06 95 43 95 95, par WhatsApp ou via notre formulaire. Nous sommes disponibles 7j/7 pour répondre à toutes vos demandes.",
  },
];

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ParticulierPage() {
  useFadeIn();

  // Tabs (hero prestations card)
  const [tab, setTab] = useState<"one" | "abo">("one");

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Reservation form state
  const [ville, setVille] = useState("");
  const [logement, setLogement] = useState("");
  const [superficie, setSuperficie] = useState(80);
  const [creneau, setCreneau] = useState("");
  const [service, setService] = useState<"One shot" | "Abonnement">("One shot");
  const [freq, setFreq] = useState("2 fois");
  const [extras, setExtras] = useState<string[]>([]);
  const [matCheck, setMatCheck] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [notes, setNotes] = useState("");
  const [cgu, setCgu] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [startTime] = useState(() => Date.now());

  function toggleExtra(val: string) {
    setExtras((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  }

  async function submitReservation() {
    if (honeypot) return;
    if (Date.now() - startTime < 5000) {
      alert("Soumission trop rapide.");
      return;
    }
    if (!prenom.trim() || !tel.trim()) {
      alert("Veuillez renseigner votre prénom et votre téléphone.");
      return;
    }
    if (!PHONE_RE.test(tel.trim())) {
      alert("Numéro de téléphone invalide.");
      return;
    }
    if (!cgu) {
      alert("Veuillez accepter les CGU.");
      return;
    }
    setSubmitting(true);
    const data = {
      type: "reservation-particulier",
      timestamp: new Date().toISOString(),
      prenom,
      tel,
      adresse,
      notes,
      ville,
      logement,
      creneau,
      service,
      freq,
      superficie,
      materiaux: matCheck ? "Oui" : "Non",
      extras: extras.join(","),
    };
    try {
      await fetch(SHEET_URL, { method: "POST", body: JSON.stringify(data) });
    } catch {
      // ignore network errors, still show success per original behavior
    }
    window.fbq?.("track", "Lead", { content_name: "Reservation-Particulier" });
    setSuccess(true);
    setSubmitting(false);
  }

  return (
    <div className={styles.page}>
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

          <div className={`${styles["presta-card"]} fi`}>
            <div className={styles["pcard-tabs"]}>
              <div
                className={`${styles.ptab} ${tab === "one" ? styles.active : ""}`}
                onClick={() => setTab("one")}
              >
                One shot
              </div>
              <div
                className={`${styles.ptab} ${tab === "abo" ? styles.active : ""}`}
                onClick={() => setTab("abo")}
              >
                Abonnement
              </div>
            </div>

            {tab === "one" && (
              <div className={styles["pcard-content"]}>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>🏠</div>
                  <div className={styles["pi-info"]}>
                    <h4>Ménage normal</h4>
                    <p>4h · Sols, surfaces, cuisine, sdb</p>
                  </div>
                  <div className={styles["pi-price"]}>250 DH</div>
                </div>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>🧹</div>
                  <div className={styles["pi-info"]}>
                    <h4>Grand ménage</h4>
                    <p>Journée · En profondeur</p>
                  </div>
                  <div className={styles["pi-price"]}>480 DH</div>
                </div>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>🌅</div>
                  <div className={styles["pi-info"]}>
                    <h4>Journée complète</h4>
                    <p>8h · Villa ou grand appartement</p>
                  </div>
                  <div className={styles["pi-price"]}>480 DH</div>
                </div>
              </div>
            )}

            {tab === "abo" && (
              <div className={styles["pcard-content"]}>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>📅</div>
                  <div className={styles["pi-info"]}>
                    <h4>1 fois/semaine</h4>
                    <p>~4 interventions/mois</p>
                  </div>
                  <div className={styles["pi-price"]}>990 DH</div>
                </div>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>⭐</div>
                  <div className={styles["pi-info"]}>
                    <h4>2 fois/semaine</h4>
                    <p>~8 interventions/mois · Populaire</p>
                  </div>
                  <div className={styles["pi-price"]}>1 900 DH</div>
                </div>
                <div className={styles["presta-item"]}>
                  <div className={styles["pi-icon"]}>💎</div>
                  <div className={styles["pi-info"]}>
                    <h4>3 fois/semaine</h4>
                    <p>~12 interventions/mois</p>
                  </div>
                  <div className={styles["pi-price"]}>2 890 DH</div>
                </div>
              </div>
            )}

            <div className={styles["pcard-cta"]}>
              <Link href="#reserver" className={styles["btn-pcard"]}>
                Configurer ma prestation →
              </Link>
            </div>
          </div>
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
              <span className={styles["reassur-icon"]}>🔍</span>
              <h3>Vérifiées</h3>
              <p>Vérification des antécédents et entretien pour chaque agente.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d1`}>
              <span className={styles["reassur-icon"]}>📚</span>
              <h3>Formées</h3>
              <p>Formation aux protocoles de nettoyage professionnels.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d2`}>
              <span className={styles["reassur-icon"]}>🛡️</span>
              <h3>Fiables</h3>
              <p>Sélectionnées sur références et disponibilités vérifiées.</p>
            </div>
            <div className={`${styles["reassur-card"]} fi d3`}>
              <span className={styles["reassur-icon"]}>📞</span>
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
          <div className={`${styles["faq-list"]} fi`}>
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div className={`${styles["faq-item"]} ${isOpen ? styles.open : ""}`} key={item.q}>
                  <div className={styles["faq-q"]} onClick={() => setOpenFaq(isOpen ? null : i)}>
                    {item.q} <span className={styles["faq-arrow"]}>⌄</span>
                  </div>
                  <div className={`${styles["faq-a"]} ${isOpen ? styles.open : ""}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
      <section id="reserver" style={{ padding: "72px 24px", background: "var(--n50)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-block",
                background: "var(--g700)",
                color: "#fff",
                borderRadius: 40,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Réservation en ligne
            </div>
            <h2
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(24px,3vw,36px)",
                fontWeight: 800,
                color: "var(--n800)",
                marginBottom: 10,
              }}
            >
              Réservez votre ménage
            </h2>
            <p style={{ fontSize: 15, color: "var(--n500)" }}>
              En quelques clics, planifiez un ménage professionnel à domicile.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid var(--n200)",
              padding: "36px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,.07)",
            }}
          >
            {!success && (
              <div>
                {/* Step 1 */}
                <div>
                  <div className={styles["rs-step-label"]}>① Ville &amp; logement</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                    <div>
                      <label className={styles["rs-label"]}>
                        Ville <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                        {["Casablanca", "Bouskoura", "Fès"].map((v) => (
                          <div
                            key={v}
                            className={`${styles["rs-pill"]} ${ville === v ? styles["rs-pill-active"] : ""}`}
                            onClick={() => setVille(v)}
                          >
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={styles["rs-label"]}>
                        Type de logement <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                        {["Appartement", "Villa"].map((v) => (
                          <div
                            key={v}
                            className={`${styles["rs-pill"]} ${logement === v ? styles["rs-pill-active"] : ""}`}
                            onClick={() => setLogement(v)}
                          >
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className={styles["rs-label"]}>Superficie approximative (m²)</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                      <input
                        type="range"
                        min={20}
                        max={300}
                        value={superficie}
                        onChange={(e) => setSuperficie(Number(e.target.value))}
                        style={{ flex: 1, accentColor: "var(--g700)" }}
                      />
                      <span
                        style={{
                          fontFamily: "'Outfit',sans-serif",
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--g700)",
                          minWidth: 60,
                        }}
                      >
                        {superficie} m²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div>
                  <div className={styles["rs-step-label"]} style={{ marginTop: 20 }}>
                    ② Prestation
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                    <div>
                      <label className={styles["rs-label"]}>
                        Créneau <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                        {["🌅 8h → 12h (demi-j)", "☀️ 13h → 17h (demi-j)", "🌞 Journée complète"].map((c) => (
                          <div
                            key={c}
                            className={`${styles["rs-pill"]} ${creneau === c ? styles["rs-pill-active"] : ""}`}
                            onClick={() => setCreneau(c)}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={styles["rs-label"]}>
                        Type de service <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                        <div
                          className={`${styles["rs-pill"]} ${service === "One shot" ? styles["rs-pill-active"] : ""}`}
                          onClick={() => setService("One shot")}
                        >
                          One shot
                        </div>
                        <div
                          className={`${styles["rs-pill"]} ${service === "Abonnement" ? styles["rs-pill-active"] : ""}`}
                          onClick={() => setService("Abonnement")}
                        >
                          Abonnement
                        </div>
                      </div>
                      {service === "Abonnement" && (
                        <div style={{ marginTop: 10 }}>
                          <label className={styles["rs-label"]}>Fréquence / semaine</label>
                          <div style={{ display: "flex", gap: 7, marginTop: 6 }}>
                            {["1 fois", "2 fois", "3 fois"].map((f) => (
                              <div
                                key={f}
                                className={`${styles["rs-pill"]} ${freq === f ? styles["rs-pill-active"] : ""}`}
                                onClick={() => setFreq(f)}
                              >
                                {f === "2 fois" ? "2x ⭐" : f.replace(" fois", "x")}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className={styles["rs-label"]}>Services annexes (optionnel)</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 8 }}>
                      {[
                        { key: "vitres", label: "🪟 Vitres" },
                        { key: "repassage", label: "👕 Repassage" },
                        { key: "placard", label: "🗄️ Placards" },
                        { key: "electro", label: "🍳 Électroménager" },
                        { key: "airbnb", label: "🏨 Airbnb" },
                      ].map((e) => (
                        <div
                          key={e.key}
                          className={`${styles["rs-check"]} ${extras.includes(e.key) ? styles.active : ""}`}
                          onClick={() => toggleExtra(e.key)}
                        >
                          {e.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "var(--n50)",
                      borderRadius: 10,
                      padding: "8px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <input
                      type="checkbox"
                      id="matCheck"
                      checked={matCheck}
                      onChange={(e) => setMatCheck(e.target.checked)}
                      style={{ accentColor: "var(--g700)", width: 16, height: 16 }}
                    />
                    <label htmlFor="matCheck" style={{ fontSize: 13, color: "var(--n600)", cursor: "pointer" }}>
                      Je n&apos;ai pas de matériel / produits de nettoyage (+20 DH)
                    </label>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <div className={styles["rs-step-label"]} style={{ marginTop: 20 }}>
                    ③ Vos coordonnées
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label className={styles["rs-label"]}>
                        Prénom <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className={styles["rs-input"]}
                        placeholder="Votre prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={styles["rs-label"]}>
                        Téléphone <span style={{ color: "var(--g700)" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        className={styles["rs-input"]}
                        placeholder="06 XX XX XX XX"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label className={styles["rs-label"]}>Adresse</label>
                    <input
                      type="text"
                      className={styles["rs-input"]}
                      placeholder="Quartier, rue..."
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label className={styles["rs-label"]}>Instructions particulières</label>
                    <textarea
                      className={styles["rs-input"]}
                      rows={3}
                      style={{ resize: "vertical" }}
                      placeholder="Enfants, animaux, zones prioritaires, accès..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {/* SUMMARY */}
                  <div
                    style={{
                      background: "var(--g50)",
                      border: "1px solid rgba(46,125,50,.2)",
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 16,
                      fontSize: 13,
                      color: "var(--n600)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontWeight: 700,
                        color: "var(--n800)",
                        marginBottom: 8,
                      }}
                    >
                      Récapitulatif
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      <div>
                        Ville : <strong>{ville || "—"}</strong>
                      </div>
                      <div>
                        Logement : <strong>{logement || "—"}</strong>
                      </div>
                      <div>
                        Superficie : <strong>{superficie} m²</strong>
                      </div>
                      <div>
                        Créneau : <strong>{creneau || "—"}</strong>
                      </div>
                      <div>
                        Service :{" "}
                        <strong>
                          {service}
                          {service === "Abonnement" ? ` · ${freq}` : ""}
                        </strong>
                      </div>
                      <div>
                        Extras : <strong>{extras.length ? extras.join(", ") : "Aucun"}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ position: "absolute", left: -9999 }}>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <input
                      type="checkbox"
                      id="cguCheck"
                      checked={cgu}
                      onChange={(e) => setCgu(e.target.checked)}
                      style={{ accentColor: "var(--g700)", width: 16, height: 16 }}
                    />
                    <label htmlFor="cguCheck" style={{ fontSize: 12, color: "var(--n500)", cursor: "pointer" }}>
                      J&apos;accepte les{" "}
                      <a href="/cgu" style={{ color: "var(--g700)" }}>
                        CGU
                      </a>
                    </label>
                  </div>

                  <button
                    onClick={submitReservation}
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: 15,
                      background: "var(--g700)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all .25s ease",
                    }}
                  >
                    {submitting ? "Envoi en cours..." : "Réserver maintenant →"}
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--n800)",
                    marginBottom: 8,
                  }}
                >
                  Demande envoyée !
                </h3>
                <p style={{ fontSize: 14, color: "var(--n500)", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.7 }}>
                  Merci ! Notre équipe vous contactera sous 2h pour confirmer votre réservation.
                </p>
                <a
                  href="https://wa.me/212695439595"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    background: "var(--g700)",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  💬 Nous contacter sur WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

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
