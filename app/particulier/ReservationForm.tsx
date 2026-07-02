"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./particulier.module.css";

/* ─── CONSTANTES ─── */
const PRICES: Record<string, number> = {
  "One shot": 250, "Abonnement hebdo": 990,
  "Abonnement mensuel": 1900, "Grand ménage": 960, "AirBnB": 350,
};

const nameRegex = /^[\p{L}\s\-']{2,40}$/u;
const phoneRegex = /^(00212|\+212|0)[5-7][0-9]{8}$/;
/* const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec"; */
const MAX_SUBMISSIONS = 3;
const MIN_FILL_TIME_MS = 5000;
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const MONTHS_SHORT = ["jan.","fév.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const DAYS_FR = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

declare global { interface Window { fbq?: (...args: unknown[]) => void } }

/* ─── DISPONIBILITÉS MOCK (remplacer par API réelle) ─── */
const availCache: Record<string, { matin: boolean; am: boolean }> = {};
function getAvailability(dateStr: string) {
  if (availCache[dateStr]) return availCache[dateStr];
  const seed = dateStr.split("-").reduce((a, b) => a + parseInt(b), 0);
  const r = (n: number) => ((seed * n * 1103515245 + 12345) & 0x7fffffff) % 100;
  const result = { matin: r(7) > 30, am: r(13) > 35 };
  availCache[dateStr] = result;
  return result;
}

function pad(n: number) { return n < 10 ? "0" + n : String(n); }
function toDateStr(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function getMonday(weekOffset: number): Date {
  const today = new Date(); today.setHours(0,0,0,0);
  const dow = today.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  const mon = new Date(today);
  mon.setDate(today.getDate() + diff + weekOffset * 7);
  return mon;
}

/* ══════════════════════════════════════════
   COMPOSANT CALENDRIER
══════════════════════════════════════════ */
interface CalendarProps {
  selectedDate: string | null;
  selectedCreneau: string | null;
  onDateSelect: (dateStr: string) => void;
  onCreneauSelect: (creneau: string) => void;
}

function Calendar({ selectedDate, selectedCreneau, onDateSelect, onCreneauSelect }: CalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const monday = useMemo(() => getMonday(weekOffset), [weekOffset]);
  const sunday = useMemo(() => { const d = new Date(monday); d.setDate(monday.getDate()+6); return d; }, [monday]);

  const monthLabel = useMemo(() => {
    const sm = MONTHS_FR[monday.getMonth()];
    const em = MONTHS_FR[sunday.getMonth()];
    return sm === em
      ? `${sm} ${monday.getFullYear()}`
      : `${sm} / ${em} ${sunday.getFullYear()}`;
  }, [monday, sunday]);

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday); d.setDate(monday.getDate() + i);
      const ds = toDateStr(d);
      const isSun = d.getDay() === 0;
      const isPast = d < today;
      const avail = (!isSun && !isPast) ? getAvailability(ds) : { matin: false, am: false };
      return { d, ds, isSun, isPast, avail, hasAny: avail.matin || avail.am };
    });
  }, [monday, today]);

  /* CSS inline pour le calendrier — même style que le HTML original */
  const css = {
    wrap: { marginBottom: 8 } as React.CSSProperties,
    header: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 } as React.CSSProperties,
    month: { fontFamily:"'Outfit',sans-serif", fontSize:16, fontWeight:800, color:"var(--n800)", textTransform:"capitalize" as const },
    nav: { display:"flex", gap:6 } as React.CSSProperties,
    navBtn: (disabled: boolean) => ({
      width:34, height:34, border:"1.5px solid var(--n200)", borderRadius:9,
      background:"#fff", cursor: disabled ? "not-allowed" : "pointer",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:16, color: disabled ? "var(--n300)" : "var(--n600)",
      opacity: disabled ? 0.3 : 1, transition:"all var(--tr)",
    } as React.CSSProperties),
    weekRow: { display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6, marginBottom:4 } as React.CSSProperties,
    dayName: { textAlign:"center" as const, fontSize:11, fontWeight:700, color:"var(--n400)", textTransform:"uppercase" as const, letterSpacing:".5px", paddingBottom:6 },
    daysGrid: { display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6 } as React.CSSProperties,
    day: (ds: string, isPast: boolean, isSun: boolean, hasAny: boolean) => ({
      border: ds === selectedDate ? "1.5px solid var(--g700)" : "1.5px solid var(--n100)",
      borderRadius:12, padding:"8px 4px", textAlign:"center" as const,
      cursor: (!isPast && !isSun && hasAny) ? "pointer" : "default",
      transition:"all var(--tr)", minHeight:72,
      display:"flex", flexDirection:"column" as const, alignItems:"center", gap:4,
      opacity: (isPast || isSun || (!hasAny && !isPast && !isSun)) ? 0.25 : 1,
      background: ds === selectedDate ? "var(--g50)" : "#fff",
      pointerEvents: (!isPast && !isSun && hasAny) ? "auto" as const : "none" as const,
    }),
    dayNum: (isToday: boolean, isSelected: boolean) => ({
      fontSize:13, fontWeight:700,
      color: isSelected ? "var(--g700)" : isToday ? "var(--g700)" : "var(--n700)",
      lineHeight:1,
    } as React.CSSProperties),
    slotBadge: (type: "matin" | "am", avail: boolean) => ({
      fontSize:10, fontWeight:700, borderRadius:5, padding:"2px 4px",
      textAlign:"center" as const, whiteSpace:"nowrap" as const,
      background: !avail ? "var(--n100)" : type === "matin" ? "var(--g100)" : "#e3f2fd",
      color: !avail ? "var(--n400)" : type === "matin" ? "var(--g700)" : "#1565c0",
      textDecoration: !avail ? "line-through" : "none",
      width:"100%",
    } as React.CSSProperties),
    legend: { display:"flex", gap:14, marginTop:12, flexWrap:"wrap" as const } as React.CSSProperties,
    legendItem: { display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--n500)" } as React.CSSProperties,
    legendDot: (bg: string, border?: string) => ({ width:10, height:10, borderRadius:3, background:bg, border: border || "none", flexShrink:0 } as React.CSSProperties),
    slotDetail: { marginTop:18, padding:18, background:"var(--n50)", borderRadius:12, border:"1px solid var(--n100)" } as React.CSSProperties,
    slotTitle: { fontSize:13, fontWeight:700, color:"var(--n700)", marginBottom:12, display:"flex", alignItems:"center", gap:6 } as React.CSSProperties,
    slotsRow: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 } as React.CSSProperties,
    slotBtn: (avail: boolean, selected: boolean) => ({
      padding:"14px 12px", border: selected ? "2px solid var(--g700)" : avail ? "2px solid var(--n200)" : "2px solid var(--n200)",
      borderRadius:12, background: selected ? "var(--g50)" : avail ? "#fff" : "var(--n50)",
      cursor: avail ? "pointer" : "default", textAlign:"left" as const,
      transition:"all var(--tr)", position:"relative" as const, opacity: avail ? 1 : 0.4,
      pointerEvents: avail ? "auto" as const : "none" as const,
    }),
    slotTime: { fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:800, color:"var(--n800)", display:"block", marginBottom:2 },
    slotHours: { fontSize:11, color:"var(--n400)" },
    slotBadgeAbs: (avail: boolean, selected: boolean) => ({
      position:"absolute" as const, top:8, right:8, fontSize:10, fontWeight:700,
      padding:"2px 7px", borderRadius:20,
      background: selected ? "var(--g700)" : avail ? "var(--g100)" : "var(--n100)",
      color: selected ? "#fff" : avail ? "var(--g700)" : "var(--n400)",
    }),
    hint: { textAlign:"center" as const, padding:16, color:"var(--n400)", fontSize:13 },
  };

  const selDayFull = selectedDate ? new Date(selectedDate) : null;
  const selAvail = selectedDate ? getAvailability(selectedDate) : null;
  const selDateLabel = selDayFull
    ? `${DAYS_FR[selDayFull.getDay()]} ${selDayFull.getDate()} ${MONTHS_SHORT[selDayFull.getMonth()]}`
    : "";

  return (
    <div style={css.wrap}>
      {/* Header mois + navigation */}
      <div style={css.header}>
        <span style={css.month}>{monthLabel}</span>
        <div style={css.nav}>
          <button
            type="button"
            style={css.navBtn(weekOffset <= 0)}
            disabled={weekOffset <= 0}
            onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
          >‹</button>
          <button
            type="button"
            style={css.navBtn(false)}
            onClick={() => setWeekOffset(w => w + 1)}
          >›</button>
        </div>
      </div>

      {/* Noms des jours */}
      <div style={css.weekRow}>
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((n, i) => (
          <div key={n} style={{ ...css.dayName, opacity: i === 6 ? 0.35 : 1 }}>{n}</div>
        ))}
      </div>

      {/* Grille des 7 jours */}
      <div style={css.daysGrid}>
        {days.map(({ d, ds, isSun, isPast, avail, hasAny }) => {
          const isToday = d.getTime() === today.getTime();
          const isSelected = ds === selectedDate;
          return (
            <div
              key={ds}
              style={css.day(ds, isPast, isSun, hasAny)}
              onClick={() => !isPast && !isSun && hasAny && onDateSelect(ds)}
            >
              <span style={css.dayNum(isToday, isSelected)}>{d.getDate()}</span>
              <div style={{ display:"flex", flexDirection:"column", gap:3, width:"100%" }}>
                <div style={css.slotBadge("matin", avail.matin)}>Matin</div>
                <div style={css.slotBadge("am", avail.am)}>Après-m.</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div style={css.legend}>
        <div style={css.legendItem}><div style={css.legendDot("var(--g100)","1px solid var(--g500)")} />Matin dispo</div>
        <div style={css.legendItem}><div style={css.legendDot("#e3f2fd","1px solid #1565c0")} />Après-midi dispo</div>
        <div style={css.legendItem}><div style={css.legendDot("var(--n100)")} />Indisponible</div>
      </div>

      {/* Détail créneaux du jour sélectionné */}
      {selectedDate && selAvail ? (
        <div style={css.slotDetail}>
          <div style={css.slotTitle}>📅 <span>{selDateLabel}</span></div>
          <div style={css.slotsRow}>
            {/* Matin */}
            <button
              type="button"
              style={css.slotBtn(selAvail.matin, selectedCreneau === "Matin")}
              onClick={() => selAvail.matin && onCreneauSelect("Matin")}
            >
              <span style={css.slotTime}>🌅 Matin</span>
              <span style={css.slotHours}>8h00 → 12h00</span>
              <span style={css.slotBadgeAbs(selAvail.matin, selectedCreneau === "Matin")}>
                {selectedCreneau === "Matin" ? "✓ Choisi" : selAvail.matin ? "✓ Disponible" : "Complet"}
              </span>
            </button>
            {/* Après-midi */}
            <button
              type="button"
              style={css.slotBtn(selAvail.am, selectedCreneau === "Après-midi")}
              onClick={() => selAvail.am && onCreneauSelect("Après-midi")}
            >
              <span style={css.slotTime}>🌤 Après-midi</span>
              <span style={css.slotHours}>13h00 → 17h00</span>
              <span style={css.slotBadgeAbs(selAvail.am, selectedCreneau === "Après-midi")}>
                {selectedCreneau === "Après-midi" ? "✓ Choisi" : selAvail.am ? "✓ Disponible" : "Complet"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div style={css.hint}>Cliquez sur un jour disponible pour voir les créneaux</div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   FORMULAIRE PRINCIPAL
══════════════════════════════════════════ */
export default function ReservationForm() {
  const searchParams = useSearchParams();

  /* ── State formulaire ── */
  const [ville, setVille]               = useState<string>("Casablanca");
  const [logement, setLogement]         = useState<string>("Appartement");
  const [surface, setSurface]           = useState(80);
  const [surfaceTouched, setSurfaceTouched] = useState(false);
  const [service, setService]           = useState<string>("One shot");

  /* ── State calendrier ── */
  const [selectedDate, setSelectedDate]     = useState<string | null>(null);
  const [selectedCreneau, setSelectedCreneau] = useState<string | null>(null);

  /* ── State extras ── */
  const [extras, setExtras] = useState<{ name: string; price: number }[]>([]);
  const [animaux, setAnimaux]   = useState(false);
  const [materiel, setMateriel] = useState(false);

  /* ── State coordonnées ── */
  const [prenom, setPrenom]   = useState("");
  const [phone, setPhone]     = useState("");
  const [adresse, setAdresse] = useState("");
  const [note, setNote]       = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [cgu, setCgu]         = useState(false);

  /* ── State UI ── */
  const [errPhone, setErrPhone]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [popupOpen, setPopupOpen]   = useState(false);
  const [toast, setToast]           = useState<string | null>(null);
  const submitCountRef  = useRef(0);
  const pageLoadTimeRef = useRef(Date.now());
  const toastTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ph = phone.replace(/\s/g, "");
    setErrPhone(ph && !phoneRegex.test(ph) ? "Format : 06XXXXXXXX ou +212XXXXXXXXX" : "");
  }, [phone]);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  }

  function toggleExtra(name: string, price: number) {
    setExtras(prev => {
      const idx = prev.findIndex(e => e.name === name);
      return idx >= 0 ? prev.filter((_, i) => i !== idx) : [...prev, { name, price }];
    });
  }

  const handleDateSelect = useCallback((ds: string) => {
    setSelectedDate(ds);
    setSelectedCreneau(null);
  }, []);

  const handleCreneauSelect = useCallback((c: string) => {
    setSelectedCreneau(c);
  }, []);

  /* ── Prix ── */
  const totalPrice = useMemo(() => {
    let p = PRICES[service] || 250;
    extras.forEach(e => p += e.price);
    return p;
  }, [service, extras]);

  /* ── Date label pour résumé ── */
  const dateLabelResume = useMemo(() => {
    if (!selectedDate) return null;
    const d = new Date(selectedDate);
    return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
  }, [selectedDate]);

  /* ── Validation ── */
  const isValid = useMemo(() => {
    if (!prenom.trim()) return false;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) return false;
    if (!adresse.trim()) return false;
    if (!selectedDate) return false;
    if (!selectedCreneau) return false;
    if (!cgu) return false;
    return true;
  }, [prenom, phone, adresse, selectedDate, selectedCreneau, cgu]);

  async function handleSubmit() {
    if (website) { setPopupOpen(true); return; }
    if (Date.now() - pageLoadTimeRef.current < MIN_FILL_TIME_MS) {
      showToast("Veuillez prendre le temps de remplir le formulaire.");
      return;
    }
    if (submitCountRef.current >= MAX_SUBMISSIONS) {
      showToast("Trop de tentatives. Contactez-nous directement au 06 95 43 95 95.");
      return;
    }
    if (!prenom.trim()) { showToast("Veuillez indiquer votre prénom."); return; }
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) { showToast("Numéro de téléphone invalide."); return; }
    if (!adresse.trim()) { showToast("Veuillez indiquer votre adresse."); return; }
    if (!selectedDate) { showToast("Veuillez choisir une date dans le calendrier."); return; }
    if (!selectedCreneau) { showToast("Veuillez choisir un créneau (Matin ou Après-midi)."); return; }
    if (!cgu) { showToast("Veuillez accepter les CGU pour continuer."); return; }

    const payload = {
      type: "reservation-particulier",
      ts: new Date().toISOString(),
      ville, logement,
      superficie: surfaceTouched ? `${surface} m²` : "-",
      service,
      date: selectedDate,
      creneau: selectedCreneau,
      extras: extras.map(e => e.name).join(", "),
      animaux, materiel,
      prenom, tel: phone.replace(/[^0-9+]/g, ""),
      adresse, notes: note.trim().substring(0, 300),
      prix: `${totalPrice} DH`,
      statut: "Nouveau",
      source: "formulaire-particulier",
    };

    setSubmitting(true);
    try {
      await fetch("api/reservation", {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      submitCountRef.current += 1;
      window.fbq?.("track", "Lead", {
        content_name: `${service} - ${ville}`,
        value: totalPrice, currency: "MAD",
      });
      setPopupOpen(true);
    } catch {
      showToast("Erreur réseau. Réessayez ou appelez-nous directement.");
    } finally {
      setSubmitting(false);
    }
  }

  const EXTRAS_LIST = [
    { name:"Vitres",         price:100, icon:"🪟" },
    { name:"Repassage",      price:80,  icon:"👔" },
    { name:"Placards",       price:60,  icon:"🗄️" },
    { name:"Électroménager", price:80,  icon:"🫙" },
    { name:"Cuisine profonde", price:120, icon:"🍳" },
    { name:"Moquette/Canapé",  price:150, icon:"🛋️" },
  ];

  return (
    <section id="reserver" className={styles["resa-section"]}>
      <div className={styles["resa-header"]}>
        <h2>Réserver votre ménage</h2>
        <p>En quelques clics, planifiez un ménage professionnel à domicile.</p>
      </div>

      <div className={styles["resa-grid"]}>
        {/* ═══ LEFT — FORMULAIRE ═══ */}
        <div>

          {/* ÉTAPE 1 — Logement */}
          <div className={styles.card}>
            <h4><span className={styles["step-num"]}>1</span> Votre logement</h4>

            <div className={styles["pill-label"]}>Ville</div>
            <div className={styles["pill-group"]}>
              {["Casablanca","Bouskoura","Fès"].map(v => (
                <div key={v}
                  className={`${styles.pill} ${ville === v ? styles.active : ""}`}
                  onClick={() => setVille(v)}>{v}</div>
              ))}
            </div>

            <div className={styles["pill-label"]}>Type de logement</div>
            <div className={styles["pill-group"]}>
              {["Appartement","Villa","Bureau","Autre"].map(v => (
                <div key={v}
                  className={`${styles.pill} ${logement === v ? styles.active : ""}`}
                  onClick={() => setLogement(v)}>{v}</div>
              ))}
            </div>

            <div className={styles["surface-block"]}>
              <div className={styles["surface-row"]}>
                <span className={styles["surface-label"]}>Superficie</span>
                <span className={styles["surface-value"]}>{surfaceTouched ? `${surface} m²` : "— m²"}</span>
              </div>
              <input
                type="range" min={20} max={400} step={10} value={surface}
                className={styles["surface-slider"]}
                onChange={e => { setSurface(Number(e.target.value)); setSurfaceTouched(true); }}
              />
              <div className={styles["surface-scale"]}><span>20 m²</span><span>400 m²</span></div>
            </div>
          </div>

          {/* ÉTAPE 2 — Type de service */}
          <div className={styles.card}>
            <h4><span className={styles["step-num"]}>2</span> Type de service</h4>
            <div className={styles["pill-group"]}>
              {[
                { val:"One shot",          label:"🧹 Ménage ponctuel" },
                { val:"Abonnement hebdo",  label:"📅 Abonnement hebdo" },
                { val:"Abonnement mensuel",label:"🗓 Abonnement mensuel" },
                { val:"Grand ménage",      label:"✨ Grand ménage" },
                { val:"AirBnB",            label:"🏡 AirBnB" },
              ].map(s => (
                <div key={s.val}
                  className={`${styles.pill} ${service === s.val ? styles.active : ""}`}
                  onClick={() => setService(s.val)}>{s.label}</div>
              ))}
            </div>
          </div>

          {/* ÉTAPE 3 — Calendrier & créneaux */}
          <div className={styles.card}>
            <h4><span className={styles["step-num"]}>3</span> Choisissez votre créneau</h4>
            <Calendar
              selectedDate={selectedDate}
              selectedCreneau={selectedCreneau}
              onDateSelect={handleDateSelect}
              onCreneauSelect={handleCreneauSelect}
            />
          </div>

          {/* ÉTAPE 4 — Services annexes */}
          <div className={styles.card}>
            <h4>
              <span className={styles["step-num"]}>4</span> Services annexes{" "}
              <span style={{fontSize:12,fontWeight:500,color:"var(--n400)"}}>optionnel</span>
            </h4>
            <div className={styles["extras-grid"]}>
              {EXTRAS_LIST.map(e => {
                const on = extras.some(x => x.name === e.name);
                return (
                  <div key={e.name}
                    className={`${styles["extra-item"]} ${on ? styles.on : ""}`}
                    onClick={() => toggleExtra(e.name, e.price)}>
                    <span className={styles["extra-ico"]}>{e.icon}</span>
                    <span className={styles["extra-name"]}>{e.name}</span>
                    <span className={styles["extra-price"]}>+{e.price} DH</span>
                  </div>
                );
              })}
            </div>
            <label className={`${styles["check-row"]}`} onClick={() => setAnimaux(a => !a)}>
              <input type="checkbox" checked={animaux} onChange={() => {}} style={{accentColor:"var(--g700)",width:18,height:18}} />
              <span style={{fontSize:13,fontWeight:600,color:"var(--n700)"}}>J&apos;ai des animaux de compagnie</span>
              <small style={{fontSize:11,color:"var(--n400)",marginLeft:"auto"}}>ⓘ Signalé à l&apos;agente</small>
            </label>
            <label className={`${styles["check-row"]}`} style={{marginTop:8}} onClick={() => setMateriel(m => !m)}>
              <input type="checkbox" checked={materiel} onChange={() => {}} style={{accentColor:"var(--g700)",width:18,height:18}} />
              <span style={{fontSize:13,fontWeight:600,color:"var(--n700)"}}>Je fournis mes propres produits</span>
              <small style={{fontSize:11,color:"var(--n400)",marginLeft:"auto"}}>Optionnel</small>
            </label>
          </div>

          {/* ÉTAPE 5 — Coordonnées */}
          <div className={styles.card}>
            <h4><span className={styles["step-num"]}>5</span> Vos coordonnées</h4>
            {/* Honeypot */}
            <div style={{position:"absolute",left:-9999,opacity:0,height:0,overflow:"hidden"}} aria-hidden="true">
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
            </div>
            <div className={styles["input-grid"]}>
              <div>
                <label className={styles["inp-label"]}>Prénom *</label>
                <input className={styles.inp} type="text" placeholder="Votre prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
              </div>
              <div>
                <label className={styles["inp-label"]}>Téléphone *</label>
                <input className={`${styles.inp} ${errPhone ? styles.err : ""}`} type="tel" placeholder="06 XX XX XX XX" value={phone} onChange={e => setPhone(e.target.value)} />
                {errPhone && <span style={{fontSize:11,color:"var(--red)",marginTop:3,display:"block"}}>{errPhone}</span>}
              </div>
            </div>
            <div className={styles["input-full"]}>
              <label className={styles["inp-label"]}>Adresse complète *</label>
              <input className={styles.inp} type="text" placeholder="Rue, quartier, ville" value={adresse} onChange={e => setAdresse(e.target.value)} />
            </div>
            <div className={styles["input-full"]}>
              <label className={styles["inp-label"]}>Notes pour l&apos;agente</label>
              <textarea className={styles.inp} placeholder="Instructions particulières, code d'entrée, pièces prioritaires…" value={note} onChange={e => setNote(e.target.value)} />
            </div>
            <div className={styles["cgu-row"]}>
              <input type="checkbox" checked={cgu} onChange={e => setCgu(e.target.checked)} id="cbCGU" />
              <label htmlFor="cbCGU" style={{fontSize:12,color:"var(--n500)",lineHeight:1.6,cursor:"pointer"}}>
                J&apos;accepte les <a href="https://femmesdemenage.ma/conditions-generales-dutilisation-cgu/" target="_blank" rel="noopener" style={{color:"var(--g700)"}}>CGU</a> et les <a href="https://femmesdemenage.ma/conditions-generales-de-vente-cgv/" target="_blank" rel="noopener" style={{color:"var(--g700)"}}>CGV</a>.
              </label>
            </div>
          </div>

        </div>

        {/* ═══ RIGHT — RÉSUMÉ ═══ */}
        <div className={styles.summary}>
          <h3>🧹 Votre réservation</h3>

            {[
              { k:"Ville",      v: ville },
              { k:"Logement",   v: logement },
              { k:"Superficie", v: surfaceTouched ? `${surface} m²` : null },
              { k:"Service",    v: service },
              { k:"Date",       v: dateLabelResume, placeholder: "Non choisie" },
              { k:"Créneau",    v: selectedCreneau
                  ? (selectedCreneau === "Matin" ? "Matin (8h–12h)" : "Après-midi (13h–17h)")
                  : null,
                placeholder: "Non choisi" },
              extras.length ? { k:"Extras", v: extras.map(e => e.name).join(", ") } : null,
              { k:"Client",     v: [prenom, phone].filter(Boolean).join(" · ") || null, placeholder: "—" },
            ].filter(Boolean).map(row => row && (
              <div className={styles["summary-row"]} key={row.k}>
                <span className={styles.label}>{row.k}</span>
                <span className={`${styles.val} ${!row.v ? styles.placeholder : ""}`}>
                  {row.v || row.placeholder || "—"}
                </span>
              </div>
            ))}

            <div className={styles["sum-total"]}>
              <span className={styles["sum-total-label"]}>Estimation</span>
              <span className={styles["sum-total-price"]}>{totalPrice} DH</span>
            </div>
            <p className={styles["sum-note"]}>Prix indicatif · Confirmé par notre équipe</p>

            <button
              type="button"
              className={styles["btn-submit"]}
              disabled={!isValid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Envoi en cours..." : "Confirmer ma réservation →"}
            </button>

            <a
              href="https://wa.me/212695439595?text=Bonjour%2C%20je%20voudrais%20r%C3%A9server%20un%20m%C3%A9nage"
              className={styles["btn-wa"]}
              target="_blank" rel="noopener"
            >
              💬 Réserver par WhatsApp
            </a>

            <div className={styles["trust-small"]}>
              <div className={styles["trust-item"]}>✅ Agentes vérifiées · ID contrôlée</div>
              <div className={styles["trust-item"]}>🔒 Données sécurisées · Sans engagement</div>
              <div className={styles["trust-item"]}>⏱ Confirmation sous 2h par notre équipe</div>
            </div>
        </div>
      </div>

      {/* POPUP SUCCÈS */}
      <div
        className={`${styles.overlay} ${popupOpen ? styles.active : ""}`}
        onClick={e => { if (e.target === e.currentTarget) setPopupOpen(false); }}
      >
        <div className={styles["popup-box"]}>
          <div className={styles["check-icon"]}>🎉</div>
          <h3>Demande envoyée !</h3>
          <p>Notre équipe vous contacte sous 2h pour confirmer votre réservation.<br />Pour toute question : <a href="tel:+212695439595" style={{color:"var(--g700)"}}>06 95 43 95 95</a></p>
          <button type="button" className={styles["btn-new"]} onClick={() => window.location.reload()}>
            Nouvelle réservation
          </button>
        </div>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </section>
  );
}
