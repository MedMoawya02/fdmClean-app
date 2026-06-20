"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./particulier.module.css";

const PRICES: Record<string, number> = { half: 250, half2: 250, full: 480 };
const DUREE_LABELS: Record<string, string> = {
  half: "8h → 12h",
  half2: "13h → 17h",
  full: "Journée complète",
};

type PackKey = "menage-normal" | "grand-menage" | "abo-1x" | "abo-2x" | "abo-3x";
const PACKS: Record<PackKey, { service: "one" | "sub"; duree?: string; agents?: number; sub?: number; subLabel?: string }> = {
  "menage-normal": { service: "one", duree: "half", agents: 1 },
  "grand-menage": { service: "one", duree: "full", agents: 2 },
  "abo-1x": { service: "sub", sub: 990, subLabel: "1×/semaine" },
  "abo-2x": { service: "sub", sub: 1900, subLabel: "2×/semaine" },
  "abo-3x": { service: "sub", sub: 2890, subLabel: "3×/semaine" },
};

const FAQS = [
  { q: "Comment fonctionne votre service de ménage ?", a: "Vous choisissez un créneau, le nombre d'agents et le type de ménage. Notre équipe intervient chez vous selon vos besoins. Nos femmes de ménage sont déclarées, formées et assurées." },
  { q: "Comment vous calculez le prix ?", a: "Le prix dépend du nombre d'agents, de la durée (demi-journée ou journée) et du type de ménage. Des options peuvent s'ajouter si besoin." },
  { q: "C'est quoi un ménage \"normal\" ?", a: "C'est un entretien classique : sols, poussière, cuisine, salle de bain, surfaces visibles et rangement léger." },
  { q: "Et le \"grand ménage\", ça change quoi ?", a: "C'est un nettoyage en profondeur : sous les lits et matelas, à l'intérieur des placards, zones difficiles d'accès, graisse, calcaire… Nous recommandons un nombre d'agents selon votre logement." },
  { q: "Combien de personnes viennent chez moi ?", a: "Généralement 1 à 3 agents selon la superficie et la prestation. Vous pouvez suivre notre recommandation ou choisir vous-même." },
  { q: "Est-ce que vous fournissez le matériel et les produits ?", a: "Oui, si besoin. Le matériel et les produits peuvent être fournis en option et sont facturés en supplément." },
  { q: "Dois-je être présent pendant le ménage ?", a: "Non, ce n'est pas obligatoire. Vous pouvez être présent au début ou nous confier les clés." },
  { q: "Qu'est-ce que vous nettoyez exactement ?", a: "Toutes les pièces principales : salon, chambres, cuisine, salle de bain. Vous pouvez préciser vos priorités." },
  { q: "Les femmes de ménage sont-elles fiables ?", a: "Oui, nos femmes de ménage sont déclarées, formées, encadrées et couvertes par une assurance." },
  { q: "Puis-je demander des tâches spécifiques ?", a: "Oui, vous pouvez indiquer vos besoins particuliers lors de la réservation dans le champ instructions." },
  { q: "Comment je réserve concrètement ?", a: "Vous remplissez le formulaire, choisissez votre prestation, et on vous appelle pour confirmer les informations." },
  { q: "Comment se passe le paiement ?", a: "Paiement en espèces ou selon les options disponibles. Une avance peut être demandée." },
  { q: "Puis-je modifier ou annuler ?", a: "Oui, jusqu'à 24h avant la prestation. Des frais peuvent s'appliquer après ce délai." },
];

const nameRegex = /^[\p{L}\s\-']{2,40}$/u;
const phoneRegex = /^(00212|\+212|0)[5-7][0-9]{8}$/;
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec";
const MAX_SUBMISSIONS = 3;
const MIN_FILL_TIME_MS = 5000;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ReservationForm() {
  const searchParams = useSearchParams();

  const [ville, setVille] = useState<string | null>(null);
  const [logement, setLogement] = useState<string | null>(null);
  const [surface, setSurface] = useState(80);
  const [surfaceTouched, setSurfaceTouched] = useState(false);
  const [agents, setAgents] = useState(1);
  const [duree, setDuree] = useState<string | null>(null);
  const [produits, setProduits] = useState(false);
  const [service, setService] = useState<"one" | "sub" | null>(null);
  const [sub, setSub] = useState<number | null>(null);
  const [subLabel, setSubLabel] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [cgu, setCgu] = useState(false);

  const [errName, setErrName] = useState("");
  const [errPhone, setErrPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const submitCountRef = useRef(0);
  const pageLoadTimeRef = useRef<number>(Date.now());
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Prefill via ?pack=... ──
  useEffect(() => {
    const packKey = searchParams.get("pack") as PackKey | null;
    if (!packKey || !PACKS[packKey]) return;
    const p = PACKS[packKey];
    setService(p.service);
    if (p.duree) setDuree(p.duree);
    if (p.sub) {
      setSub(p.sub);
      setSubLabel(p.subLabel ?? null);
    }
    if (p.agents && p.agents > 1) setAgents(p.agents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }

  function handleDureeClick(val: string) {
    if (val === "full" && service === "sub") {
      showToast("L'abonnement n'est pas disponible en journée complète.");
      return;
    }
    setDuree(val);
  }

  function handleServiceClick(val: "one" | "sub") {
    setService(val);
    if (val === "sub") {
      if (duree === "full") setDuree(null);
    } else {
      setSub(null);
      setSubLabel(null);
    }
  }

  function handleSubClick(value: number, label: string) {
    setSub(value);
    setSubLabel(label);
  }

  // ── Prix ──
  const { priceText, priceSub } = useMemo(() => {
    if (service === "sub") {
      if (!sub) return { priceText: "—", priceSub: "Choisissez une fréquence" };
      const total = sub * agents + (produits ? 20 : 0);
      return {
        priceText: `${total} DH`,
        priceSub: `/ mois • ${subLabel}` + (agents > 1 ? ` • ${agents} agents` : ""),
      };
    }
    if (!ville || !logement || !duree) {
      return { priceText: "—", priceSub: "Complétez les étapes ci-dessus" };
    }
    const base = (PRICES[duree] || 0) * agents;
    const total = base + (produits ? 20 : 0);
    return {
      priceText: `${total} DH`,
      priceSub: "prestation unique" + (agents > 1 ? ` • ${agents} agents` : ""),
    };
  }, [service, sub, subLabel, agents, produits, ville, logement, duree]);

  // ── Validation ──
  function validatePhone(val: string) {
    return val.replace(/[^0-9+\s]/g, "").substring(0, 14);
  }

  useEffect(() => {
    const nameVal = name.trim();
    setErrName(nameVal && !nameRegex.test(nameVal) ? "Nom invalide (lettres et espaces uniquement)" : "");
  }, [name]);

  useEffect(() => {
    const phoneVal = phone.replace(/\s/g, "");
    setErrPhone(phoneVal && !phoneRegex.test(phoneVal) ? "Format : 06XXXXXXXX ou +212XXXXXXXXX" : "");
  }, [phone]);

  const isValid = useMemo(() => {
    const nameVal = name.trim();
    const phoneVal = phone.replace(/\s/g, "");
    if (!nameVal || !nameRegex.test(nameVal)) return false;
    if (!phoneVal || !phoneRegex.test(phoneVal)) return false;
    if (!cgu) return false;
    if (!ville || !logement || !service) return false;
    if (service === "one" && !duree) return false;
    if (service === "sub" && !sub) return false;
    return true;
  }, [name, phone, cgu, ville, logement, service, duree, sub]);

  function getTrackingSource() {
    if (typeof window === "undefined") return "direct";
    const parts: string[] = [];
    const pack = searchParams.get("pack");
    const utm_source = searchParams.get("utm_source");
    const utm_campaign = searchParams.get("utm_campaign");
    const utm_content = searchParams.get("utm_content");
    if (pack) parts.push("pack=" + pack);
    if (utm_source) parts.push(utm_source);
    if (utm_campaign) parts.push(utm_campaign);
    if (utm_content) parts.push(utm_content);
    if (!parts.length) {
      const ref = document.referrer;
      if (ref && !ref.includes(window.location.hostname)) {
        try {
          parts.push("external: " + new URL(ref).hostname);
        } catch {
          parts.push("external");
        }
      } else if (ref) parts.push("interne");
      else parts.push("direct");
    }
    return parts.join(" | ");
  }

  async function handleSubmit() {
    if (website) {
      setPopupOpen(true);
      return;
    }
    if (Date.now() - pageLoadTimeRef.current < MIN_FILL_TIME_MS) {
      setPopupOpen(true);
      return;
    }
    if (submitCountRef.current >= MAX_SUBMISSIONS) {
      showToast("Vous avez atteint la limite de réservations. Appelez-nous au 06 95 43 95 95.");
      return;
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) return;
    if (!nameRegex.test(name.trim())) return;

    const payload = {
      date: new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" }),
      nom: name.trim(),
      telephone: phone.replace(/[^0-9+]/g, ""),
      ville: ville || "",
      logement: logement || "",
      superficie: surfaceTouched ? `${surface} m²` : "-",
      agents,
      creneau: duree ? DUREE_LABELS[duree] : "Abonnement",
      service: service === "sub" ? "Abonnement" : "One shot",
      frequence: subLabel || "-",
      produits: produits ? "Oui" : "Non",
      prix: priceText,
      note: note.trim().substring(0, 300),
      statut: "Nouveau",
      source: getTrackingSource(),
    };

    setSubmitting(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      submitCountRef.current += 1;
      window.fbq?.("track", "Lead", {
        content_name: payload.service + " - " + payload.ville,
        content_category: payload.logement,
        value: parseFloat(priceText) || 0,
        currency: "MAD",
      });
      setPopupOpen(true);
    } catch (err) {
      console.error("Erreur envoi:", err);
      showToast("Erreur réseau. Réessayez ou appelez-nous directement.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleNewReservation() {
    window.location.reload();
  }

  return (
    <section id="reserver" className={styles["resa-section"]}>
      <div className={styles["resa-header"]}>
        <h2>Réserver votre ménage</h2>
        <p>En quelques clics, planifiez un ménage professionnel à domicile.</p>
      </div>

      <div className={styles["resa-grid"]}>
        {/* LEFT — CARDS */}
        <div>
          {/* VILLE */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>1</span> Ville
            </h4>
            <div className={styles.grid}>
              {["Casablanca", "Bouskoura", "Fès"].map((v) => (
                <div
                  key={v}
                  className={`${styles.opt} ${ville === v ? styles.active : ""}`}
                  onClick={() => setVille(v)}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* LOGEMENT */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>2</span> Votre logement
            </h4>
            <div className={styles.grid}>
              {["Appartement", "Villa"].map((v) => (
                <div
                  key={v}
                  className={`${styles.opt} ${logement === v ? styles.active : ""}`}
                  onClick={() => setLogement(v)}
                >
                  {v}
                </div>
              ))}
            </div>
            <div className={styles["surface-block"]}>
              <div className={styles["surface-row"]}>
                <span className={styles["surface-label"]}>Superficie approximative</span>
                <span className={styles["surface-value"]}>{surfaceTouched ? `${surface} m²` : "— m²"}</span>
              </div>
              <input
                type="range"
                min={20}
                max={300}
                step={10}
                value={surface}
                onChange={(e) => {
                  setSurface(Number(e.target.value));
                  setSurfaceTouched(true);
                }}
                className={styles["surface-slider"]}
              />
              <div className={styles["surface-scale"]}>
                <span>20 m²</span>
                <span>300 m²</span>
              </div>
            </div>
          </div>

          {/* PRESTATION */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>3</span> Prestation
            </h4>
            <div className={styles["agents-row"]}>
              <span>Nombre d&apos;agents de nettoyage</span>
              <div className={styles.counter}>
                <button type="button" onClick={() => setAgents((a) => Math.max(1, a - 1))} aria-label="Réduire">
                  −
                </button>
                <span>{agents}</span>
                <button type="button" onClick={() => setAgents((a) => Math.min(10, a + 1))} aria-label="Augmenter">
                  +
                </button>
              </div>
            </div>
            <div className={styles.grid}>
              {[
                { v: "half", l: "8h → 12h" },
                { v: "half2", l: "13h → 17h" },
                { v: "full", l: "Journée complète" },
              ].map((d) => (
                <div
                  key={d.v}
                  className={`${styles.opt} ${duree === d.v ? styles.active : ""}`}
                  onClick={() => handleDureeClick(d.v)}
                >
                  {d.l}
                </div>
              ))}
            </div>
            <label className={styles.check}>
              <input type="checkbox" checked={produits} onChange={(e) => setProduits(e.target.checked)} />
              Je n&apos;ai pas de matériel / produits de nettoyage (+20 DH)
            </label>
          </div>

          {/* TYPE */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>4</span> Type de service
            </h4>
            <div className={styles.grid}>
              <div
                className={`${styles.opt} ${service === "one" ? styles.active : ""}`}
                onClick={() => handleServiceClick("one")}
              >
                One shot
              </div>
              <div
                className={`${styles.opt} ${service === "sub" ? styles.active : ""}`}
                onClick={() => handleServiceClick("sub")}
              >
                Abonnement
              </div>
            </div>
            <div className={`${styles["sub-section"]} ${service === "sub" ? styles.visible : ""}`}>
              <div className={styles["sub-label"]}>Fréquence hebdomadaire</div>
              <div className={`${styles.grid} ${styles["grid-3"]}`}>
                {[
                  { v: 990, l: "1×/semaine", txt: "1 fois" },
                  { v: 1900, l: "2×/semaine", txt: "2 fois ⭐" },
                  { v: 2890, l: "3×/semaine", txt: "3 fois" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className={`${styles.opt} ${sub === s.v ? styles.active : ""}`}
                    onClick={() => handleSubClick(s.v, s.l)}
                  >
                    {s.txt}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* INFOS */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>5</span> Vos informations
            </h4>
            <div className={styles["field-group"]}>
              <input
                type="text"
                maxLength={40}
                placeholder="Nom et prénom *"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errName ? styles.invalid : ""}
              />
              <span className={styles["error-msg"]}>{errName}</span>
            </div>
            <div className={styles["field-group"]}>
              <input
                type="tel"
                maxLength={14}
                placeholder="Téléphone *"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(validatePhone(e.target.value))}
                className={errPhone ? styles.invalid : ""}
              />
              <span className={styles["error-msg"]}>{errPhone}</span>
            </div>
            <div className={styles["field-group"]}>
              <textarea
                maxLength={300}
                placeholder="Instructions particulières (facultatif)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div style={{ position: "absolute", left: -9999, top: -9999, opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — SUMMARY */}
        <div className={styles.summarySticky}>
          <div className={styles.summary}>
            <h3>Résumé</h3>
            <div className={styles["summary-row"]}>
              <span className={styles.label}>Ville</span>
              <span className={styles.val}>{ville || "—"}</span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles.label}>Logement</span>
              <span className={styles.val}>{logement || "—"}</span>
            </div>
            {surfaceTouched && (
              <div className={styles["summary-row"]}>
                <span className={styles.label}>Superficie</span>
                <span className={styles.val}>{surface} m²</span>
              </div>
            )}
            <div className={styles["summary-row"]}>
              <span className={styles.label}>Agents</span>
              <span className={styles.val}>{agents}</span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles.label}>Créneau</span>
              <span className={styles.val}>{duree ? DUREE_LABELS[duree] : "—"}</span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles.label}>Produits fournis</span>
              <span className={styles.val}>{produits ? "Oui (+20 DH)" : "Non"}</span>
            </div>
            {service === "sub" && subLabel && (
              <div className={styles["summary-row"]}>
                <span className={styles.label}>Fréquence</span>
                <span className={styles.val}>{subLabel}</span>
              </div>
            )}
            <div className={styles["price-box"]}>
              <div className={styles.amount}>{priceText}</div>
              <div className={styles["sub-text"]}>{priceSub}</div>
            </div>

            <label className={styles["cgu-label"]}>
              <input type="checkbox" checked={cgu} onChange={(e) => setCgu(e.target.checked)} />
              J&apos;accepte les{" "}
              <a
                href="https://femmesdemenage.ma/conditions-generales-dutilisation-cgu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CGU
              </a>
            </label>

            <button
              type="button"
              className={styles["btn-reserve"]}
              disabled={!isValid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Envoi en cours..." : "Réserver maintenant"}
            </button>

            {/* FAQ */}
           {/*  <div className={styles.faq}>
              <h4>Questions fréquentes</h4>
              {FAQS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q}>
                    <div
                      className={`${styles["faq-item"]} ${isOpen ? styles.open : ""}`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span>{item.q}</span>
                      <span className={styles["faq-arrow"]}>⌄</span>
                    </div>
                    <div className={`${styles["faq-body"]} ${isOpen ? styles.open : ""}`}>{item.a}</div>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>

      {/* POPUP */}
      <div
        className={`${styles.overlay} ${popupOpen ? styles.active : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPopupOpen(false);
        }}
      >
        <div className={styles["popup-box"]}>
          <div className={styles["check-icon"]}>✓</div>
          <h3>Demande envoyée !</h3>
          <p>Merci pour votre confiance. Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.</p>
          <button type="button" className={styles["btn-new"]} onClick={handleNewReservation}>
            Nouvelle réservation
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </section>
  );
}
