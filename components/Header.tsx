"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${styles.nav} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        {/* TOP BAR */}
        <div className={styles.navTop}>
          <div className={styles.navTopInner}>
            <a href="tel:+212695439595">
              📞 06 95 43 95 95
            </a>

            <div className={styles.sep}></div>

            <a
              href="https://wa.me/212695439595"
              target="_blank"
            >
              💬 WhatsApp
            </a>

            <div className={styles.sep}></div>

            <span>Lun–Sam · 8h–18h</span>

            <div className={styles.sep}></div>

            <Link href="/inscription">
              Vous êtes agente ? Inscrivez-vous →
            </Link>
          </div>
        </div>

        {/* MAIN BAR */}
        <div className={styles.navMain}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>🧹</div>

              <span className={styles.logoText}>
                Femmes de Ménage
                <small>
                  Casablanca · Fès · Bouskoura
                </small>
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className={styles.navLinks}>
              <Link href="/particuliers">
                Particuliers
              </Link>

              <Link href="/annuaire">
                Annuaire
              </Link>

              <Link href="/entreprises">
                Entreprises
              </Link>

              <Link href="/qui-sommes-nous">
                Qui sommes-nous
              </Link>

              <Link href="/blog">
                Blog
              </Link>
            </div>

            {/* RIGHT */}
            <div className={styles.navRight}>
              <a
                href="https://wa.me/212695439595"
                target="_blank"
                className={styles.navWa}
              >
                💬 WhatsApp
              </a>

              <Link
                href="/particuliers"
                className={styles.navCta}
              >
                Réserver →
              </Link>
            </div>

            {/* HAMBURGER */}
            <button
              className={styles.hamburger}
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.open : ""
        }`}
      >
        <Link
          href="/particuliers"
          onClick={() => setMenuOpen(false)}
        >
          🏠 Particuliers
        </Link>

        <Link
          href="/annuaire"
          onClick={() => setMenuOpen(false)}
        >
          🔍 Annuaire
        </Link>

        <Link
          href="/entreprises"
          onClick={() => setMenuOpen(false)}
        >
          🏢 Entreprises
        </Link>

        <Link
          href="/qui-sommes-nous"
          onClick={() => setMenuOpen(false)}
        >
          ℹ️ Qui sommes-nous
        </Link>

        <Link
          href="/blog"
          onClick={() => setMenuOpen(false)}
        >
          📝 Blog
        </Link>
      </div>
    </>
  );
}