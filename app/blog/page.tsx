"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./blog.module.css";

/* ══════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════ */
const Icons = {
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  calendar: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  clock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  arrow: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  broom: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 2 2-6 7H3v-2l6-7zm9-3-3 3M5 20l-2 2m14-17 2-2"/><path d="M5 20c2-4 4-7 9-9"/>
    </svg>
  ),
  sparkles: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3z"/>
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>
    </svg>
  ),
  home: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  droplets: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 7.5 7 5c-.29 2.51-1.29 3.81-2.29 4.06C3.57 9.99 3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  oven: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/><circle cx="7" cy="6.5" r=".5" fill="currentColor"/><circle cx="12" cy="6.5" r=".5" fill="currentColor"/><circle cx="17" cy="6.5" r=".5" fill="currentColor"/><rect x="6" y="12" width="12" height="5" rx="1"/>
    </svg>
  ),
  carpet: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="11" rx="1"/><path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/><path d="M12 11v3M8 13l4-2 4 2"/>
    </svg>
  ),
  window: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/><path d="M12 3v18M2 12h20"/>
    </svg>
  ),
  euro: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12M4 14h12"/><path d="M15.5 5.5A7.5 7.5 0 0 0 6 12a7.5 7.5 0 0 0 9.5 6.5"/>
    </svg>
  ),
  scale: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  ),
  buildings: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="18"/><rect x="14" y="9" width="7" height="12"/><path d="M10 3h4M10 9h4M10 15h4"/>
    </svg>
  ),
  map: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════
   DATA ARTICLES
══════════════════════════════════════════ */
const FEATURED = [
  {
    slug: "meilleure-methode-nettoyage",
    cat: "Conseils",
    title: "La meilleure méthode de nettoyage",
    excerpt: "Un nettoyage efficace peut éliminer autant de bactéries indésirables que possible en utilisant les femmes de ménage à Casablanca – Bouskoura et la bonne méthode d'application.",
    icon: Icons.broom,
    date: "12 mai 2024",
    readTime: "4 min",
  },
  {
    slug: "comment-nettoyer-four",
    cat: "Guide pratique",
    title: "Comment nettoyer le four ?",
    excerpt: "Les fours sont des compagnons essentiels pour chaque maison dans ce monde. Et comme tout outil, il nécessite des soins pour maintenir son efficacité.",
    icon: Icons.oven,
    date: "28 avr. 2024",
    readTime: "5 min",
  },
  {
    slug: "comment-nettoyer-tapis-pro",
    cat: "Tapis & Moquettes",
    title: "Comment nettoyer un tapis comme un pro",
    excerpt: "Que vous fassiez appel à une entreprise de nettoyage de tapis professionnelle ou que vous le fassiez vous-même, il est essentiel de savoir comment choisir la meilleure méthode de nettoyage pour votre tapis.",
    icon: Icons.carpet,
    date: "15 avr. 2024",
    readTime: "6 min",
  },
  {
    slug: "nettoyer-vitres-sans-traces",
    cat: "Vitrerie",
    title: "Comment puis-je nettoyer mes vitres sans laisser de traces ?",
    excerpt: "Ne laissez pas vos fenêtres sales. Ils empêchent la lumière du soleil d'entrer dans votre maison et vous voyez les allergènes, la poussière, la saleté, etc.",
    icon: Icons.window,
    date: "3 avr. 2024",
    readTime: "5 min",
  },
];

const LATEST = [
  {
    slug: "3-facons-nettoyer-tapis",
    cat: "Tapis",
    title: "3 meilleures façon de nettoyer les tapis",
    excerpt: "Que vous fassiez appel à une entreprise de nettoyage de tapis professionnelle ou que vous le fassiez vous-même, il faut savoir comment choisir la meilleure méthode de nettoyage …",
    icon: Icons.carpet,
    date: "20 mars 2024",
  },
  {
    slug: "comment-nettoyer-vitres-traces",
    cat: "Vitrerie",
    title: "Comment puis-je nettoyer mes vitres sans laisser de traces ?",
    excerpt: "Ne laissez pas vos fenêtres sales. Ils empêchent la lumière du soleil d'entrer dans votre maison et vous voyez les allergènes, la poussière, la saleté, etc.",
    icon: Icons.window,
    date: "10 mars 2024",
  },
  {
    slug: "meilleure-methode-nettoyage-2",
    cat: "Conseils",
    title: "La meilleure méthode de nettoyage",
    excerpt: "Un nettoyage efficace peut éliminer autant de bactéries indésirables que possible en utilisant les femmes de ménage.ma à Casablanca – Bouskoura et la bonne méthode d'application…",
    icon: Icons.broom,
    date: "1 mars 2024",
  },
  {
    slug: "combien-coute-femme-menage-casablanca",
    cat: "Tarifs",
    title: "Combien coûte une femme de ménage à Casablanca ?",
    excerpt: "Découvrez les tarifs exacts du marché, ce qui est inclus, et comment éviter les mauvaises surprises lors de votre réservation.",
    icon: Icons.euro,
    date: "18 févr. 2024",
  },
  {
    slug: "femme-menage-declaree-vs-informelle",
    cat: "Juridique",
    title: "Femme de ménage déclarée vs informelle au Maroc",
    excerpt: "Quelles sont les vraies différences ? Ce que vous risquez vraiment et comment choisir en toute sécurité.",
    icon: Icons.scale,
    date: "5 févr. 2024",
  },
  {
    slug: "grand-menage-vs-menage-normal",
    cat: "Guide pratique",
    title: "Grand ménage vs ménage normal : lequel choisir ?",
    excerpt: "On compare les deux formules pour vous aider à choisir celle qui correspond à votre logement et votre budget.",
    icon: Icons.sparkles,
    date: "22 janv. 2024",
  },
];

const WIDE = [
  {
    slug: "menage-airbnb-casablanca",
    cat: "AirBnB",
    title: "Ménage AirBnB à Casablanca",
    excerpt: "Préparation entre deux voyageurs, changement de linge, nettoyage systématique… Un service spécialement conçu pour les hôtes Airbnb.",
    icon: Icons.home,
    date: "10 janv. 2024",
  },
  {
    slug: "femme-menage-fes",
    cat: "Fès",
    title: "Femme de ménage à Fès : ce qu'il faut savoir avant de réserver",
    excerpt: "Tarifs, profils à éviter, checklist de questions à poser… Le guide complet pour trouver une prestataire fiable à Fès.",
    icon: Icons.map,
    date: "3 janv. 2024",
  },
];

const CATS = [
  { label: "Tous", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label: "Conseils", icon: Icons.sparkles },
  { label: "Guide pratique", icon: Icons.broom },
  { label: "Tapis & Moquettes", icon: Icons.carpet },
  { label: "Vitrerie", icon: Icons.window },
  { label: "Tarifs", icon: Icons.euro },
  { label: "AirBnB", icon: Icons.home },
];

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function BlogPage() {
  const [activeCat, setActiveCat] = useState("Tous");
  const [search, setSearch] = useState("");
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("v"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fi").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className="fi">
            <div className={styles.heroEyebrow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3z"/></svg>
              Blog &amp; Conseils
            </div>
            <h1 className={styles.heroTitle}>Blog et conseils</h1>
            <p className={styles.heroSub}>Astuces, guides pratiques et conseils de pros pour un intérieur toujours propre et bien entretenu.</p>
          </div>
          <div className={`${styles.heroSearch} fi d1`}>
            <input
              type="text"
              className={styles.heroSearchInput}
              placeholder="Rechercher un article…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.heroSearchBtn} type="button">
              {Icons.search}
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* ─── CATÉGORIES ─── */}
      <div className={styles.cats}>
        <div className={styles.catsInner}>
          {CATS.map((c) => (
            <button
              key={c.label}
              type="button"
              className={`${styles.catBtn} ${activeCat === c.label ? styles.active : ""}`}
              onClick={() => setActiveCat(c.label)}
            >
              <span className={styles.catIcon}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── ARTICLES VEDETTES ─── */}
      <section className={styles.featured}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} fi`}>
            <span className={styles.eyebrow}>À la une</span>
            <h2 className={styles.sectionTitle}>Articles en vedette</h2>
          </div>
          <div className={styles.featuredGrid}>
            {FEATURED.map((a, i) => (
              <Link
                href={`/blog/${a.slug}`}
                key={a.slug}
                className={`${styles.featCard} fi ${i % 2 === 1 ? "d1" : ""}`}
              >
                <div className={styles.featImg}>
                  {a.icon}
                  <span className={styles.featImgLabel}>{a.cat}</span>
                </div>
                <div className={styles.featBody}>
                  <h3 className={styles.featTitle}>{a.title}</h3>
                  <p className={styles.featExcerpt}>{a.excerpt}</p>
                  <div className={styles.featMeta}>
                    <div className={styles.featMetaLeft}>
                      <span className={styles.featDate}>{Icons.calendar} {a.date}</span>
                      <span className={styles.featReadTime}>{Icons.clock} {a.readTime}</span>
                    </div>
                    <span className={styles.featBtn}>
                      Lire la suite {Icons.arrow}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DERNIERS ARTICLES ─── */}
      <section className={styles.latest}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} fi`}>
            <span className={styles.eyebrow}>Récents</span>
            <h2 className={styles.sectionTitle}>Derniers articles</h2>
          </div>

          <div className={styles.articlesGrid}>
            {LATEST.map((a, i) => (
              <Link
                href={`/blog/${a.slug}`}
                key={a.slug}
                className={`${styles.artCard} fi ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}`}
              >
                <div className={styles.artImg}>
                  {a.icon}
                  <span className={styles.artLabel}>{a.cat}</span>
                </div>
                <div className={styles.artBody}>
                  <h3 className={styles.artTitle}>{a.title}</h3>
                  <p className={styles.artExcerpt}>{a.excerpt}</p>
                  <div className={styles.artFooter}>
                    <span className={styles.artDate}>{Icons.calendar} {a.date}</span>
                    <span className={styles.artBtn}>
                      Lire la suite {Icons.arrow}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Rangée asymétrique */}
          <div className={styles.wideRow}>
            {WIDE.map((a, i) => (
              <Link
                href={`/blog/${a.slug}`}
                key={a.slug}
                className={`${styles.wideCard} fi ${i === 1 ? "d1" : ""}`}
              >
                <div className={styles.wideCardImg}>{a.icon}</div>
                <div className={styles.wideCardBody}>
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:1, textTransform:"uppercase", color:"var(--g700)", marginBottom:6, display:"block" }}>{a.cat}</span>
                  <h3 className={styles.wideCardTitle}>{a.title}</h3>
                  <p className={styles.wideCardExcerpt}>{a.excerpt}</p>
                  <span className={styles.wideCardBtn}>
                    Lire la suite {Icons.arrow}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <h2 className="fi">Recevez nos conseils par email</h2>
          <p className="fi d1">Les meilleures astuces de nettoyage et nos offres exclusives directement dans votre boîte mail.</p>
          <div className={`${styles.nlForm} fi d2`}>
            <input type="email" className={styles.nlInput} placeholder="Votre adresse email" />
            <button type="button" className={styles.nlBtn}>S&apos;abonner →</button>
          </div>
        </div>
      </section>

    </div>
  );
}
