"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

/* ── SVG WhatsApp inline ── */
function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.52 5.824L.057 23.852a.75.75 0 0 0 .916.916l6.029-1.463A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.205-1.434l-.373-.221-3.865.937.956-3.862-.236-.384A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>

        {/* ── TOP BAR ── */}
        <div className={styles.navTop}>
          <div className={styles.navTopInner}>
            <a href="tel:+212695439595">📞 06 95 43 95 95</a>
            <div className={styles.sep} />
            <a href="https://wa.me/212695439595" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <WaIcon size={15} />
              <span>WhatsApp</span>
            </a>
            <div className={styles.sep} />
            <span>Lun–Sam · 8h–18h</span>
            <div className={styles.sep} />
            <Link href="/inscription">Vous êtes agente ? Inscrivez-vous →</Link>
          </div>
        </div>

        {/* ── MAIN BAR ── */}
        <div className={styles.navMain}>
          <div className={styles.navInner}>

            {/* LOGO — img standard, pas next/image */}
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_fdm.png"
                alt="Femmes de Ménage"
                width={120}
                height={46}
                style={{ objectFit: "contain", display: "block" }}
              />
            </Link>

            {/* DESKTOP LINKS */}
            <div className={styles.navLinks}>
              <Link href="/particuliers" className={`${styles.navLink} ${isActive("/particuliers") ? styles.active : ""}`}>
                Particuliers
              </Link>
              <Link href="/annuaire" className={`${styles.navLink} ${isActive("/annuaire") ? styles.active : ""}`}>
                Annuaire
              </Link>
              <Link href="/entreprises" className={`${styles.navLink} ${isActive("/entreprises") ? styles.active : ""}`}>
                Entreprises
              </Link>
              <Link href="/qui-sommes-nous" className={`${styles.navLink} ${isActive("/qui-sommes-nous") ? styles.active : ""}`}>
                Qui sommes-nous
              </Link>
              <Link href="/blog" className={`${styles.navLink} ${isActive("/blog") ? styles.active : ""}`}>
                Blog
              </Link>
            </div>

            {/* RIGHT BUTTONS */}
            <div className={styles.navRight}>
              <a
                href="https://wa.me/212695439595"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navWa}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <WaIcon size={18} />
                <span>WhatsApp</span>
              </a>
              <Link href="/particuliers" className={styles.navCta}>
                Réserver →
              </Link>
            </div>

            {/* HAMBURGER */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <Link href="/particuliers" onClick={() => setMenuOpen(false)}>🏠 Particuliers</Link>
        <Link href="/annuaire"     onClick={() => setMenuOpen(false)}>🔍 Annuaire</Link>
        <Link href="/entreprises"  onClick={() => setMenuOpen(false)}>🏢 Entreprises</Link>
        <Link href="/qui-sommes-nous" onClick={() => setMenuOpen(false)}>ℹ️ Qui sommes-nous</Link>
        <Link href="/blog"         onClick={() => setMenuOpen(false)}>📝 Blog</Link>
        <div style={{ height: 1, background: "#f0f0f0", margin: "8px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
          <Link href="/particuliers#reserver"
            style={{ padding: "12px", background: "var(--g700)", color: "#fff", borderRadius: 10, textAlign: "center", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}>
            Réserver →
          </Link>
          <a href="https://wa.me/212695439595" target="_blank" rel="noopener noreferrer"
            style={{ padding: "12px", background: "rgba(37,211,102,.08)", color: "#1a9c3e", border: "1.5px solid rgba(37,211,102,.25)", borderRadius: 10, textAlign: "center", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <WaIcon size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
