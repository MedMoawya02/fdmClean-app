"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./inscription.module.css";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec";
const PHONE_RE = /^(00212|\+212|0)[5-7][0-9]{8}$/;

declare global {
  interface Window { fbq?: (...a: unknown[]) => void }
}

/* ─── SPECS LIST ─── */
const SPECS = [
  { key: "menage-courant", label: "🧹 Ménage courant" },
  { key: "grand-menage",   label: "🧽 Grand ménage" },
  { key: "cuisine",        label: "🍳 Cuisine" },
  { key: "vitrerie",       label: "🪟 Vitrerie" },
  { key: "repassage",      label: "👕 Repassage" },
  { key: "airbnb",         label: "🏨 Airbnb" },
  { key: "enfants",        label: "👶 Avec enfants" },
  { key: "animaux",        label: "🐾 Animaux ok" },
];

const DISPOS = [
  "🌅 Lun M","☀️ Lun AM","🌅 Mar M","☀️ Mar AM",
  "🌅 Mer M","☀️ Mer AM","🌅 Jeu M","🌅 Sam M",
];

/* ─── LEFT PANEL CONTENT BY TYPE ─── */
const LEFT_CONTENT = {
  agent: {
    eyebrow: "Rejoignez-nous",
    title: "Développez votre activité avec FDM",
    sub: "Rejoignez notre réseau à Casablanca, Fès et Bouskoura. Accédez à des clients vérifiés, gérez votre agenda, augmentez vos revenus.",
    benefits: [
      { icon: "💼", title: "Missions régulières", desc: "Des clients vérifiés dès votre inscription validée" },
      { icon: "💰", title: "Revenus maîtrisés",  desc: "Fixez vos disponibilités, acceptez ou refusez les missions" },
      { icon: "🌟", title: "Profil mis en avant", desc: "Vos notes clients boostent votre visibilité dans l'annuaire" },
    ],
  },
  client: {
    eyebrow: "Accédez à l'annuaire",
    title: "Trouvez votre agente idéale",
    sub: "Accédez aux profils complets, contactez les agentes directement et gérez vos réservations.",
    benefits: [
      { icon: "🔍", title: "Profils vérifiés",     desc: "Toutes nos agentes ont été contrôlées par notre équipe" },
      { icon: "📞", title: "Contact direct",       desc: "Appelez ou WhatsApp l'agente que vous avez choisie" },
      { icon: "⭐", title: "+6 000 avis clients",  desc: "Notes authentiques pour vous aider à choisir" },
    ],
  },
};

/* ─── VALIDATION HELPER ─── */
function validate(
  value: string,
  checks: { req?: boolean; phone?: boolean; email?: boolean; min?: number; match?: string }
) {
  const v = value.trim();
  if (checks.req && !v) return false;
  if (checks.phone && v && !PHONE_RE.test(v)) return false;
  if (checks.email && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
  if (checks.min && v && v.length < checks.min) return false;
  if (checks.match !== undefined && v !== checks.match) return false;
  return true;
}

/* ══════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════ */
export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") === "client" ? "client" : "agent";

  const [type, setType] = useState<"agent" | "client">(defaultType);
  const [submitted, setSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState<"agent" | "client">("agent");

  function switchType(t: "agent" | "client") {
    setType(t);
    window.fbq?.("track", "InitiateCheckout", { content_name: "Inscription-" + t });
  }

  const content = LEFT_CONTENT[type];

  return (
    <div className={styles.page}>
      {/* ─── LEFT PANEL ─── */}
      <aside className={styles.left}>
        <div className={styles.lMain}>
          <div className={styles.lEyebrow}>{content.eyebrow}</div>
          <h1 className={styles.lTitle}>{content.title}</h1>
          <p className={styles.lSub}>{content.sub}</p>
          <div className={styles.lBenefits}>
            {content.benefits.map((b) => (
              <div className={styles.lBen} key={b.title}>
                <div className={styles.lBenIcon}>{b.icon}</div>
                <div className={styles.lBenText}>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.lFooter}>
          <p>© 2026 Femmes de Ménage · femmesdemenage.ma · 06 95 43 95 95</p>
        </div>
      </aside>

      {/* ─── RIGHT PANEL ─── */}
      <main className={styles.right}>
        <div className={styles.rInner}>
          {!submitted ? (
            <>
              {/* TOGGLE */}
              <div className={styles.typeToggle}>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${type === "agent" ? styles.active : ""}`}
                  onClick={() => switchType("agent")}
                >
                  🧹 Je suis agente
                </button>
                <button
                  type="button"
                  className={`${styles.typeBtn} ${type === "client" ? styles.active : ""}`}
                  onClick={() => switchType("client")}
                >
                  🏠 Je cherche une agente
                </button>
              </div>

              {/* FORM HEADER */}
              <div className={styles.formHdr}>
                <h2>{type === "agent" ? "Inscription agente" : "Inscription client"}</h2>
                <p>
                  {type === "agent"
                    ? "Remplissez votre profil complet. Notre équipe valide votre dossier sous 48h."
                    : "Créez votre compte gratuit en 30 secondes."}
                </p>
              </div>

              {type === "agent"
                ? <AgentForm onSuccess={() => { setSubmittedType("agent"); setSubmitted(true); }} />
                : <ClientForm onSuccess={() => { setSubmittedType("client"); setSubmitted(true); }} />
              }
            </>
          ) : (
            <SuccessScreen type={submittedType} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   AGENT FORM
══════════════════════════════════════════ */
function AgentForm({ onSuccess }: { onSuccess: () => void }) {
  const startTime = useRef(Date.now());
  const submitCount = useRef(0);

  /* identity */
  const [prenom, setPrenom]     = useState("");
  const [nom, setNom]           = useState("");
  const [age, setAge]           = useState("");
  const [natl, setNatl]         = useState("");
  const [tel, setTel]           = useState("");
  const [email, setEmail]       = useState("");
  /* pro */
  const [ville, setVille]       = useState("");
  const [metier, setMetier]     = useState("");
  const [exp, setExp]           = useState("");
  const [langues, setLangues]   = useState("");
  const [prixJour, setPrixJour] = useState("");
  const [prixSem, setPrixSem]   = useState("");
  /* personal */
  const [marital, setMarital]   = useState("");
  const [enfants, setEnfants]   = useState("");
  const [couchante, setCouchante] = useState("non");
  /* specs & dispos */
  const [specs, setSpecs]       = useState<string[]>([]);
  const [dispos, setDispos]     = useState<string[]>([]);
  /* bio */
  const [bio, setBio]           = useState("");
  /* photos */
  const [photoLabel, setPhotoLabel] = useState("Ajouter une photo de profil");
  const [photoIcon,  setPhotoIcon]  = useState("📷");
  const [cinLabel,   setCinLabel]   = useState("Ajouter votre CIN (recto)");
  const [cinIcon,    setCinIcon]    = useState("🪪");
  /* passwords */
  const [pass, setPass]         = useState("");
  const [pass2, setPass2]       = useState("");
  /* honeypot */
  const [hp, setHp]             = useState("");
  /* errors */
  const [errs, setErrs]         = useState<Record<string, boolean>>({});
  const [sending, setSending]   = useState(false);

  function toggleSpec(key: string) {
    setSpecs((prev) => prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]);
  }
  function toggleDispo(d: string) {
    setDispos((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (hp) return;
    if (Date.now() - startTime.current < 5000 || submitCount.current >= 3) return;

    const newErrs: Record<string, boolean> = {};
    const checks: Array<[string, string, object]> = [
      ["prenom", prenom, { req: true }],
      ["nom",    nom,    { req: true }],
      ["age",    age,    { req: true }],
      ["tel",    tel,    { req: true, phone: true }],
      ["email",  email,  { req: true, email: true }],
      ["ville",  ville,  { req: true }],
      ["metier", metier, { req: true }],
      ["exp",    exp,    { req: true }],
      ["pass",   pass,   { req: true, min: 8 }],
      ["pass2",  pass2,  { req: true }],
    ];
    checks.forEach(([key, val, chk]) => {
      if (!validate(val, chk as Parameters<typeof validate>[1])) newErrs[key] = true;
    });
    if (pass !== pass2) newErrs["pass2"] = true;

    if (Object.keys(newErrs).length) { setErrs(newErrs); return; }
    setErrs({});
    setSending(true);
    submitCount.current += 1;

    const payload = {
      type: "inscription-agente",
      timestamp: new Date().toISOString(),
      prenom, nom, age, tel, email, ville, metier,
      experience: exp, nationalite: natl, langues,
      prix_jour: prixJour, prix_semaine: prixSem,
      marital, enfants, couchante,
      specialites: specs.join(","),
      disponibilites: dispos.join(","),
      bio,
    };

    try {
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
    } catch {/* no-cors → always throws, normal */}
    window.fbq?.("track", "CompleteRegistration", { content_name: "InscriptionAgent", status: "success" });
    setSending(false);
    onSuccess();
  }

  const e = (key: string) => errs[key] ? styles.err : "";

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* IDENTITÉ */}
      <div className={styles.secTitleFirst}>Identité</div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Prénom <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("prenom")}`} type="text" placeholder="Fatima" value={prenom} onChange={(x) => setPrenom(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Nom <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("nom")}`} type="text" placeholder="Zahra" value={nom} onChange={(x) => setNom(x.target.value)} />
        </div>
      </div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Âge <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("age")}`} type="number" placeholder="28" min={18} max={70} value={age} onChange={(x) => setAge(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Nationalité</label>
          <input className={styles.fgInput} type="text" placeholder="Marocaine" value={natl} onChange={(x) => setNatl(x.target.value)} />
        </div>
      </div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Téléphone <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("tel")}`} type="tel" placeholder="06 XX XX XX XX" value={tel} onChange={(x) => setTel(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Email <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("email")}`} type="email" placeholder="fatima@exemple.com" value={email} onChange={(x) => setEmail(x.target.value)} />
        </div>
      </div>

      {/* INFOS PRO */}
      <div className={styles.secTitle}>Informations professionnelles</div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Ville <span className={styles.req}>*</span></label>
          <select className={`${styles.fgSelect} ${e("ville")}`} value={ville} onChange={(x) => setVille(x.target.value)}>
            <option value="">Sélectionnez...</option>
            <option>Casablanca</option><option>Fès</option><option>Bouskoura</option>
          </select>
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Métier <span className={styles.req}>*</span></label>
          <select className={`${styles.fgSelect} ${e("metier")}`} value={metier} onChange={(x) => setMetier(x.target.value)}>
            <option value="">Sélectionnez...</option>
            <option>Femme de ménage</option><option>Nounou</option><option>Cuisinière</option><option>Vitrier</option>
          </select>
        </div>
      </div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Expérience <span className={styles.req}>*</span></label>
          <select className={`${styles.fgSelect} ${e("exp")}`} value={exp} onChange={(x) => setExp(x.target.value)}>
            <option value="">Sélectionnez...</option>
            <option>Moins d&apos;1 an</option><option>1 à 2 ans</option><option>3 à 5 ans</option><option>Plus de 5 ans</option>
          </select>
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Langues parlées</label>
          <input className={styles.fgInput} type="text" placeholder="Arabe, Darija, Français..." value={langues} onChange={(x) => setLangues(x.target.value)} />
        </div>
      </div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Prix / jour (DH)</label>
          <input className={styles.fgInput} type="number" placeholder="250" min={100} value={prixJour} onChange={(x) => setPrixJour(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Prix / semaine (DH)</label>
          <input className={styles.fgInput} type="number" placeholder="990" min={400} value={prixSem} onChange={(x) => setPrixSem(x.target.value)} />
        </div>
      </div>

      {/* SITUATION PERSONNELLE */}
      <div className={styles.secTitle}>Situation personnelle</div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Situation maritale</label>
          <select className={styles.fgSelect} value={marital} onChange={(x) => setMarital(x.target.value)}>
            <option value="">Sélectionnez...</option>
            <option>Célibataire</option><option>Mariée</option><option>Divorcée</option><option>Veuve</option>
          </select>
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Nombre d&apos;enfants</label>
          <input className={styles.fgInput} type="number" placeholder="0" min={0} max={15} value={enfants} onChange={(x) => setEnfants(x.target.value)} />
        </div>
      </div>
      <div className={styles.fg}>
        <label className={styles.fl}>À coucher</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" name="couchante" value="non" checked={couchante === "non"} onChange={() => setCouchante("non")} />
            🏠 Non couchante
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="couchante" value="oui" checked={couchante === "oui"} onChange={() => setCouchante("oui")} />
            🛏 Couchante
          </label>
        </div>
      </div>

      {/* SPÉCIALITÉS */}
      <div className={styles.secTitle}>Spécialités</div>
      <div className={styles.specGrid}>
        {SPECS.map((s) => (
          <div
            key={s.key}
            className={`${styles.scheck} ${specs.includes(s.key) ? styles.on : ""}`}
            onClick={() => toggleSpec(s.key)}
          >
            <div className={styles.sbox}>✓</div>
            <span className={styles.slbl}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* DISPONIBILITÉS */}
      <div className={styles.secTitle}>Disponibilités habituelles</div>
      <div className={styles.availGrid}>
        {DISPOS.map((d) => (
          <div
            key={d}
            className={`${styles.availBtn} ${dispos.includes(d) ? styles.on : ""}`}
            onClick={() => toggleDispo(d)}
          >
            {d}
          </div>
        ))}
      </div>

      {/* PRÉSENTATION */}
      <div className={styles.secTitle}>Présentation</div>
      <div className={styles.fg}>
        <label className={styles.fl}>Description courte</label>
        <textarea className={styles.fgTextarea} placeholder="Décrivez votre expérience, vos points forts..." value={bio} onChange={(x) => setBio(x.target.value)} />
      </div>

      {/* PHOTO DE PROFIL */}
      <div className={styles.secTitle}>Photo de profil</div>
      <label className={styles.photoZone}>
        <div className={styles.photoIcon}>{photoIcon}</div>
        <h4>{photoLabel}</h4>
        <p>JPG ou PNG · max 5 Mo</p>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setPhotoIcon("✅");
              setPhotoLabel(e.target.files[0].name);
            }
          }}
        />
      </label>

      {/* CIN */}
      <div className={styles.secTitle}>Pièce d&apos;identité</div>
      <div className={styles.infoBox}>
        🪪 Pour être affiché(e) avec le badge <strong>ID vérifié</strong> dans l&apos;annuaire, uploadez une photo de votre CIN (recto). Vos données restent confidentielles.
      </div>
      <label className={styles.photoZone}>
        <div className={styles.photoIcon}>{cinIcon}</div>
        <h4>{cinLabel}</h4>
        <p>JPG, PNG ou PDF · max 5 Mo</p>
        <input
          type="file"
          accept="image/*,application/pdf"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setCinIcon("✅");
              setCinLabel(e.target.files[0].name);
            }
          }}
        />
      </label>

      {/* MOT DE PASSE */}
      <div className={styles.secTitle}>Mot de passe</div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Mot de passe <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("pass")}`} type="password" placeholder="Min. 8 caractères" value={pass} onChange={(x) => setPass(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Confirmation <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("pass2")}`} type="password" placeholder="Répétez" value={pass2} onChange={(x) => setPass2(x.target.value)} />
        </div>
      </div>

      {/* HONEYPOT */}
      <div className={styles.hp} aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(x) => setHp(x.target.value)} />
      </div>

      <button type="submit" className={styles.btnSubmit} disabled={sending}>
        {sending ? "Envoi en cours..." : "Envoyer mon dossier →"}
      </button>
      <div className={styles.mentions}>
        En soumettant, vous acceptez nos <a href="/cgu">CGU</a> et notre <a href="/confidentialite">politique de confidentialité</a>.
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════
   CLIENT FORM
══════════════════════════════════════════ */
function ClientForm({ onSuccess }: { onSuccess: () => void }) {
  const startTime = useRef(Date.now());
  const submitCount = useRef(0);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom]       = useState("");
  const [tel, setTel]       = useState("");
  const [email, setEmail]   = useState("");
  const [hp, setHp]         = useState("");
  const [errs, setErrs]     = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (hp) return;
    if (Date.now() - startTime.current < 5000 || submitCount.current >= 3) return;

    const newErrs: Record<string, boolean> = {};
    if (!validate(prenom, { req: true })) newErrs["prenom"] = true;
    if (!validate(nom, { req: true }))    newErrs["nom"]    = true;
    if (!validate(tel, { req: true, phone: true }))   newErrs["tel"]   = true;
    if (!validate(email, { req: true, email: true })) newErrs["email"] = true;
    if (Object.keys(newErrs).length) { setErrs(newErrs); return; }

    setErrs({});
    setSending(true);
    submitCount.current += 1;

    const payload = {
      type: "inscription-client",
      timestamp: new Date().toISOString(),
      prenom, nom, tel, email,
    };
    try {
      await fetch(SHEET_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
    } catch {/* no-cors */}
    window.fbq?.("track", "CompleteRegistration", { content_name: "InscriptionClient", status: "success" });
    setSending(false);
    onSuccess();
  }

  const e = (key: string) => errs[key] ? styles.err : "";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.clientWelcome}>
        ✅ Inscrivez-vous gratuitement pour accéder aux profils complets de nos agentes et les contacter directement.
      </div>
      <div className={styles.fg2}>
        <div className={styles.fg}>
          <label className={styles.fl}>Prénom <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("prenom")}`} type="text" placeholder="Sarah" value={prenom} onChange={(x) => setPrenom(x.target.value)} />
        </div>
        <div className={styles.fg}>
          <label className={styles.fl}>Nom <span className={styles.req}>*</span></label>
          <input className={`${styles.fgInput} ${e("nom")}`} type="text" placeholder="El Idrissi" value={nom} onChange={(x) => setNom(x.target.value)} />
        </div>
      </div>
      <div className={styles.fg}>
        <label className={styles.fl}>Mobile <span className={styles.req}>*</span></label>
        <input className={`${styles.fgInput} ${e("tel")}`} type="tel" placeholder="06 XX XX XX XX" value={tel} onChange={(x) => setTel(x.target.value)} />
      </div>
      <div className={styles.fg}>
        <label className={styles.fl}>Email <span className={styles.req}>*</span></label>
        <input className={`${styles.fgInput} ${e("email")}`} type="email" placeholder="sarah@exemple.com" value={email} onChange={(x) => setEmail(x.target.value)} />
      </div>
      <div className={styles.clientInfoBox}>
        Un SMS de confirmation vous sera envoyé pour vérifier votre numéro. Aucune autre information n&apos;est requise.
      </div>
      <div className={styles.hp} aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(x) => setHp(x.target.value)} />
      </div>
      <button type="submit" className={styles.btnSubmit} disabled={sending}>
        {sending ? "Envoi en cours..." : "Créer mon compte →"}
      </button>
      <div className={styles.mentions}>
        En vous inscrivant, vous acceptez nos <a href="/cgu">CGU</a>.
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════════ */
function SuccessScreen({ type }: { type: "agent" | "client" }) {
  const isClient = type === "client";
  return (
    <div className={styles.successScreen}>
      <div className={styles.sIcon}>{isClient ? "✅" : "🎉"}</div>
      <h2>{isClient ? "Compte créé !" : "Dossier envoyé !"}</h2>
      <p>
        {isClient
          ? "Votre compte est actif. Accédez à notre annuaire et contactez vos agentes directement."
          : "Votre dossier est bien reçu. Notre équipe le vérifie sous 48h. Vous recevrez un SMS et un email de confirmation."}
      </p>
      <div className={styles.sBtns}>
        <Link href="/" className={`${styles.sBtn} ${styles.sBtnP}`}>
          ← Retour à l&apos;accueil
        </Link>
        <a
          href="https://wa.me/212695439595"
          className={`${styles.sBtn} ${styles.sBtnS}`}
          target="_blank"
          rel="noopener"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}
