"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./pro.module.css";
import useFadeIn from "@/components/useFadeIn";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const secteurs = [
  {
    icon: "🏢",
    title: "Bureaux & Open spaces",
    desc: "Nettoyage des espaces de travail, salles de réunion, zones communes, cuisines, sanitaires. Intervention possible avant ou après les heures de bureau.",
    tags: ["Quotidien", "Hebdo", "Horaires décalés"],
  },
  {
    icon: "🏨",
    title: "Hôtels & Résidences",
    desc: "Nettoyage des chambres, parties communes, piscines, restaurants. Équipes formées aux standards hôteliers, discrétion absolue.",
    tags: ["Journalier", "Remise en état", "Standards hôteliers"],
  },
  {
    icon: "🏥",
    title: "Cliniques & Cabinets",
    desc: "Protocoles de désinfection renforcés, respect des normes sanitaires. Agentes formées aux milieux médicaux et à l'usage des désinfectants agréés.",
    tags: ["Désinfection", "Protocole médical", "Quotidien"],
  },
  {
    icon: "🛍️",
    title: "Commerces & Retail",
    desc: "Nettoyage avant ouverture ou après fermeture. Vitrines, sols, cabines d'essayage, zones de caisse. Image soignée pour vos clients.",
    tags: ["Avant ouverture", "Après fermeture"],
  },
  {
    icon: "🏗️",
    title: "Chantiers & Fin de travaux",
    desc: "Nettoyage post-construction ou rénovation. Évacuation des poussières, nettoyage des vitres, dépoussiérage complet des surfaces.",
    tags: ["Post-construction", "Vitrerie", "Ponctuel"],
  },
  {
    icon: "🏫",
    title: "Écoles & Formations",
    desc: "Entretien des salles de cours, couloirs, sanitaires et espaces communs. Disponible en dehors des heures de cours.",
    tags: ["Hors heures cours", "Sanitaires", "Hebdo"],
  },
];

const avantages = [
  { icon: "🔒", title: "Confidentialité garantie", desc: "Toutes nos agentes signent un accord de confidentialité. Accès aux locaux en toute sécurité, même en votre absence." },
  { icon: "⏰", title: "Horaires flexibles", desc: "Interventions tôt le matin, tard le soir ou les week-ends pour ne pas perturber votre activité." },
  { icon: "📊", title: "Reporting mensuel", desc: "Récapitulatif des interventions, retours qualité et recommandations. Vous gardez la maîtrise." },
  { icon: "🛡️", title: "RC professionnelle", desc: "Couverture assurance sur l'ensemble de nos interventions. Zéro risque pour votre entreprise." },
  { icon: "👩‍💼", title: "Équipe dédiée", desc: "Pour les contrats réguliers, les mêmes agentes interviennent systématiquement. Elles connaissent vos locaux." },
  { icon: "📝", title: "Facturation simplifiée", desc: "Facture mensuelle unique, possibilité de paiement par virement. Comptabilité facilitée." },
];

const processSteps = [
  { num: 1, icon: "📋", title: "Devis gratuit", desc: "Formulaire en ligne ou appel. Réponse sous 24h avec tarification détaillée." },
  { num: 2, icon: "🤝", title: "Visite des locaux", desc: "Notre responsable visite vos locaux pour établir un cahier des charges précis." },
  { num: 3, icon: "👩", title: "Assignation d'équipe", desc: "Nous sélectionnons les agentes adaptées à vos besoins et contraintes." },
  { num: 4, icon: "✨", title: "Démarrage", desc: "Première intervention dans les 48h suivant la validation. Suivi qualité immédiat." },
];

export default function ProPage() {
  useFadeIn();

  const [company, setCompany] = useState("");
  const [secteur, setSecteur] = useState("Bureau / Open space");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [surface, setSurface] = useState("");
  const [freq, setFreq] = useState("Quotidienne");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      type: "devis-pro",
      date: new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" }),
      entreprise: company,
      secteur,
      contact,
      telephone: phone,
      surface,
      frequence: freq,
      notes,
      source: "service-pro",
    };
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      window.fbq?.("track", "Lead", { content_name: "Devis Pro", currency: "MAD", value: 0 });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles["hero-inner"]}>
          <div>
            <div className={`${styles["hero-kpi-badge"]} fi`}>
              <span className={styles["kpi-dot"]}></span>
              <span>Service B2B disponible — Maroc</span>
            </div>
            <h1 className="fi">
              Un environnement de travail <em>propre</em> booste la productivité de 15%
            </h1>
            <p className={`${styles["hero-sub"]} fi`}>
              Vos locaux reflètent votre image de marque. Nos équipes professionnelles assurent une
              propreté irréprochable, en horaires décalés pour ne pas perturber votre activité.
            </p>
            <div className={`${styles["hero-btns"]} fi`}>
              <Link href="#devis" className={styles["btn-hero-green"]}>
                Obtenir un devis gratuit →
              </Link>
              <a href="tel:+212695439595" className={styles["btn-hero-ghost"]}>
                📞 06 95 43 95 95
              </a>
            </div>
            <div className={`${styles["hero-clients"]} fi`}>
              <div className={styles["client-logos"]}>
                <div className={styles["client-logo"]}>BUREAUX</div>
                <div className={styles["client-logo"]}>HÔTELS</div>
                <div className={styles["client-logo"]}>CLINIQUES</div>
                <div className={styles["client-logo"]}>RETAIL</div>
              </div>
            </div>
          </div>

          {/* <div className={`${styles["devis-card"]} fi`}>
            <div className={styles["dc-header"]}>
              <h3>Devis rapide</h3>
              <p>Réponse garantie sous 24h</p>
            </div>
            <div className={styles["dc-body"]}>
              <div className={styles["dc-field"]}>
                <label>TYPE DE LOCAL</label>
                <select defaultValue="Bureau / Open space">
                  <option>Bureau / Open space</option>
                  <option>Hôtel / Résidence</option>
                  <option>Clinique / Cabinet</option>
                  <option>Commerce / Retail</option>
                  <option>Entrepôt / Usine</option>
                </select>
              </div>
              <div className={styles["dc-row"]}>
                <div className={styles["dc-field"]}>
                  <label>SUPERFICIE (m²)</label>
                  <input type="number" placeholder="Ex: 250" />
                </div>
                <div className={styles["dc-field"]}>
                  <label>FRÉQUENCE</label>
                  <select defaultValue="Quotidienne">
                    <option>Quotidienne</option>
                    <option>Hebdomadaire</option>
                    <option>Bihebdo</option>
                    <option>Mensuelle</option>
                  </select>
                </div>
              </div>
              <div className={styles["dc-field"]}>
                <label>VOTRE TÉLÉPHONE</label>
                <input type="tel" placeholder="06 XX XX XX XX" />
              </div>
              <Link href="#devis" className={styles["btn-devis"]} style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                Recevoir mon devis →
              </Link>
              <div className={styles["dc-note"]}>⚡ Devis personnalisé sous 24h · Sans engagement</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles["stats-inner"]}>
          <div className={`${styles["stat-item"]} fi`}>
            <div className={styles["stat-num"]}>200+</div>
            <div className={styles["stat-label"]}>Entreprises clientes</div>
          </div>
          <div className={`${styles["stat-item"]} fi d1`}>
            <div className={styles["stat-num"]}>4.8★</div>
            <div className={styles["stat-label"]}>Satisfaction client B2B</div>
          </div>
          <div className={`${styles["stat-item"]} fi d2`}>
            <div className={styles["stat-num"]}>24h</div>
            <div className={styles["stat-label"]}>Délai devis garanti</div>
          </div>
          <div className={`${styles["stat-item"]} fi d3`}>
            <div className={styles["stat-num"]}>100%</div>
            <div className={styles["stat-label"]}>Agentes assurées RC pro</div>
          </div>
        </div>
      </div>

      {/* SECTEURS */}
      <section className={styles.secteurs}>
        <div className={styles["secteurs-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Secteurs couverts
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 800,
              color: "var(--n900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Nous nettoyons tous types de locaux professionnels
          </h2>
          <div className={styles["secteurs-grid"]}>
            {secteurs.map((s, i) => (
              <div className={`${styles["secteur-card"]} fi ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}`} key={s.title}>
                <span className={styles["s-icon"]}>{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className={styles["secteur-tags"]}>
                  {s.tags.map((t) => (
                    <span className={styles.stag} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className={styles.avantages}>
        <div className={styles["av-inner"]}>
          <span className={`${styles["av-label"]} fi`}>Notre différence</span>
          <h2 className={`${styles["av-title"]} fi`}>Pourquoi les entreprises nous choisissent</h2>
          <div className={styles["av-grid"]}>
            {avantages.map((a, i) => (
              <div className={`${styles["av-card"]} fi ${i % 4 === 1 ? "d1" : i % 4 === 2 ? "d2" : i % 4 === 3 ? "d3" : ""}`} key={a.title}>
                <div className={styles["av-icon-box"]}>{a.icon}</div>
                <div className={styles["av-content"]}>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.process}>
        <div className={styles["process-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Mise en place
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 800,
              color: "var(--n900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Opérationnel en 48h
          </h2>
          <div className={styles["process-steps"]}>
            {processSteps.map((s, i) => (
              <div className={`${styles["ps-item"]} fi ${i === 1 ? "d1" : i === 2 ? "d2" : i === 3 ? "d3" : ""}`} key={s.num}>
                <div className={styles["ps-circle"]}>
                  <span className={styles["ps-num"]}>{s.num}</span>
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className={styles.temoignages}>
        <div className={styles["temo-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Témoignages
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 800,
              color: "var(--n900)",
              letterSpacing: "-1px",
              margin: "10px 0 0",
            }}
          >
            Ils nous font confiance
          </h2>
          <div className={styles["temo-grid"]}>
            <div className={`${styles["temo-card"]} fi`}>
              <div className={styles["temo-top"]}>
                <div className={styles["temo-company"]}>
                  <div className={styles["temo-logo"]}>🏢</div>
                  <div className={styles["temo-company-info"]}>
                    <h4>Groupe Immobilier Casablanca</h4>
                    <p>50 agents · Bureau 800m²</p>
                  </div>
                </div>
                <div className={styles["temo-stars"]}>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <p className={styles["temo-text"]}>
                Après 2 ans avec un prestataire classique, le passage à Femmes de Ménage a été une
                révélation. La qualité est incomparablement supérieure et le prix est similaire.
                L&apos;équipe est discrète et professionnelle.
              </p>
              <div className={styles["temo-author"]}>Karim B. — Directeur Administratif</div>
            </div>
            <div className={`${styles["temo-card"]} fi d1`}>
              <div className={styles["temo-top"]}>
                <div className={styles["temo-company"]}>
                  <div className={styles["temo-logo"]}>🏨</div>
                  <div className={styles["temo-company-info"]}>
                    <h4>Résidence El Fath</h4>
                    <p>45 appartements · Fès</p>
                  </div>
                </div>
                <div className={styles["temo-stars"]}>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <p className={styles["temo-text"]}>
                Nous gérons une résidence hôtelière de 45 appartements. L&apos;équipe FDM est notre bras
                droit pour les remises en état. Réactives, efficaces et toujours disponibles. Je
                recommande sans hésitation.
              </p>
              <div className={styles["temo-author"]}>Asmaa R. — Directrice de résidence</div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVIS SECTION */}
      <section className={styles["devis-section"]} id="devis">
        <div className={styles["devis-section-inner"]}>
          <span
            className="fi"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--g700)" }}
          >
            Demande de devis
          </span>
          <h2
            className="fi"
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(24px,3.5vw,38px)",
              fontWeight: 800,
              color: "var(--n900)",
              letterSpacing: "-1px",
              margin: "10px 0",
            }}
          >
            Devis gratuit et sans engagement
          </h2>
          <p className="fi" style={{ fontSize: 16, color: "var(--n500)" }}>
            Décrivez vos besoins. Notre équipe commerciale vous contacte sous 24h avec une proposition
            personnalisée.
          </p>

          <form className={`${styles["devis-form"]} fi`} onSubmit={handleSubmit}>
            <div className={styles["df-grid"]}>
              <div className={styles["df-field"]}>
                <label>NOM DE L&apos;ENTREPRISE *</label>
                <input
                  type="text"
                  placeholder="Votre société"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className={styles["df-field"]}>
                <label>SECTEUR D&apos;ACTIVITÉ</label>
                <select value={secteur} onChange={(e) => setSecteur(e.target.value)}>
                  <option>Bureau / Open space</option>
                  <option>Hôtel / Résidence</option>
                  <option>Clinique / Cabinet</option>
                  <option>Commerce / Retail</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className={styles["df-field"]}>
                <label>CONTACT / NOM *</label>
                <input
                  type="text"
                  placeholder="Prénom Nom"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className={styles["df-field"]}>
                <label>TÉLÉPHONE *</label>
                <input
                  type="tel"
                  placeholder="06 XX XX XX XX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles["df-field"]}>
                <label>SUPERFICIE APPROXIMATIVE</label>
                <input
                  type="text"
                  placeholder="Ex: 300 m²"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                />
              </div>
              <div className={styles["df-field"]}>
                <label>FRÉQUENCE SOUHAITÉE</label>
                <select value={freq} onChange={(e) => setFreq(e.target.value)}>
                  <option>Quotidienne</option>
                  <option>Plusieurs fois/semaine</option>
                  <option>Hebdomadaire</option>
                  <option>Ponctuelle</option>
                </select>
              </div>
              <div className={`${styles["df-field"]} ${styles["df-full"]}`}>
                <label>BESOINS PARTICULIERS</label>
                <textarea
                  placeholder="Décrivez vos contraintes spécifiques, horaires souhaités, exigences particulières..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className={`${styles["df-field"]} ${styles["df-full"]}`}>
                <button type="submit" className={styles["btn-submit-devis"]} disabled={status === "sending"}>
                  {status === "sending"
                    ? "Envoi en cours..."
                    : status === "sent"
                    ? "✓ Demande envoyée ! Nous vous contactons sous 24h"
                    : status === "error"
                    ? "Erreur — réessayez ou appelez-nous"
                    : "Envoyer ma demande de devis →"}
                </button>
              </div>
            </div>
            <div className={styles["df-guarantees"]}>
              <span className={styles["df-guar"]}>✓ Réponse sous 24h</span>
              <span className={styles["df-guar"]}>✓ Sans engagement</span>
              <span className={styles["df-guar"]}>✓ Devis 100% gratuit</span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
