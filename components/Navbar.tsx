"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("nav") && !target.closest(".mobile-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <>
      <nav id="mainNav" className={scrolled ? "scrolled" : ""}>
        {/* Top bar : tel + WA + horaires */}
        <div className="nav-top">
          <div className="nav-top-inner">
            <a href="tel:+212695439595">📞 06 95 43 95 95</a>
            <div className="sep"></div>
            <a href="https://wa.me/212695439595" target="_blank" rel="noopener">
              💬 WhatsApp
            </a>
            <div className="sep"></div>
            <span>Lun–Sam · 8h–18h</span>
            <div className="sep"></div>
            <Link href="/fdm-inscription?type=agent">Vous êtes agente ? Inscrivez-vous →</Link>
          </div>
        </div>

        {/* Barre principale */}
        <div className="nav-main">
          <div className="nav-inner">
            <Link href="/" className="logo">
              <div className="logo-icon">🧹</div>
              <span className="logo-text">
                Femmes de Ménage
                <small>Casablanca · Fès · Bouskoura</small>
              </span>
            </Link>

            <div className="nav-links">
              <Link href="/particulier" className="nav-link">
                Particuliers
              </Link>
              <Link href="/annuaire" className="nav-link">
                Annuaire
              </Link>
              <Link href="/pro" className="nav-link">
                Entreprises
              </Link>
              <a
                href="/qui-sommes-nous"
                className="nav-link">
                Qui sommes-nous
              </a>
              <a
                href="https://femmesdemenage.ma/blogs/"
                className="nav-link"
                target="_blank"
                rel="noopener"
              >
                Blog
              </a>
            </div>

            <div className="nav-right">
              <a href="https://wa.me/212695439595" className="nav-wa" target="_blank" rel="noopener">
                💬 WhatsApp
              </a>
              <Link href="/particulier#reserver" className="nav-cta">
                Réserver →
              </Link>
              <div
                className="nav-hamburger"
                onClick={() => setMenuOpen((o) => !o)}
                id="hamburger"
                aria-expanded={menuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <Link href="/particulier" className="mm-link" onClick={() => setMenuOpen(false)}>
          🏠 Particuliers
        </Link>
        <Link href="/annuaire" className="mm-link" onClick={() => setMenuOpen(false)}>
          🔍 Annuaire d&apos;agentes
        </Link>
        <Link href="/pro" className="mm-link" onClick={() => setMenuOpen(false)}>
          🏢 Entreprises
        </Link>
        <a href="https://femmesdemenage.ma/quisommesnous/" className="mm-link" target="_blank" rel="noopener">
          ℹ️ Qui sommes-nous
        </a>
        <a href="https://femmesdemenage.ma/blogs/" className="mm-link" target="_blank" rel="noopener">
          📝 Blog
        </a>
        <div className="mm-divider"></div>
        <Link href="/fdm-inscription?type=agent" className="mm-link" onClick={() => setMenuOpen(false)}>
          👤 Inscription / Connexion
        </Link>
        <div className="mm-actions">
          <Link href="/particulier#reserver" className="mm-cta-main">
            Réserver →
          </Link>
          <a href="https://wa.me/212695439595" className="mm-cta-wa" target="_blank" rel="noopener">
            💬 WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
