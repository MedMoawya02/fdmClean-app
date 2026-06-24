"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
const GS_URL =
  "https://script.google.com/macros/s/AKfycbwtUQdKdMY6EKrR9gNBk8ker9SbcphNDIhe2DQwHVZr0FeI08DgzOhBXXccK-ssFmcK/exec";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function submitCallback(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tel = phone.trim();
    const ok = /^(00212|\+212|0)[5-7][0-9]{8}$/.test(tel.replace(/\s/g, ""));
    if (!ok) {
      alert("Numéro invalide. Format: 06 12 34 56 78");
      return;
    }
    fetch(GS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "callback",
        tel,
        source: "footer",
        ts: new Date().toISOString(),
      }),
    }).catch(() => { });

    setSent(true);
    setPhone("");
    window.fbq?.("track", "Lead", { content_name: "footer-callback" });
  }

  return (
    <footer itemScope itemType="https://schema.org/LocalBusiness">
      {/* Bande lead capture : rappel + WhatsApp */}
     {/*  <div className="footer-lead">
        <div className="footer-inner">
          <h3>Pas encore prêt à réserver ? On vous rappelle.</h3>
          <p>Laissez votre numéro, notre équipe vous contacte sous 1h — sans engagement.</p>
          <form className="footer-lead-form" onSubmit={submitCallback}>
            <input
              type="tel"
              id="cbPhone"
              placeholder="Ex : 06 12 34 56 78"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" disabled={sent}>
              {sent ? "✅ On vous rappelle bientôt !" : "Me faire rappeler →"}
            </button>
          </form>
          <a
            href="https://wa.me/212695439595?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20vos%20services"
            className="footer-wa-link"
            target="_blank"
            rel="noopener"
          >
            ou discutez directement sur 💬 WhatsApp
          </a>
        </div>
      </div> */}

      {/* Corps footer : 4 colonnes */}
      <div className="footer-inner">
        <div className="footer-body">
          {/* Colonne brand */}
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div style={{
                background: "#fff",
                borderRadius: 10,
                padding: "6px 12px",
                display: "inline-flex",
                alignItems: "center",
              }}>
                <Image
                  src="/logo_fdm.png"
                  alt="Femmes de Ménage"
                  width={110}
                  height={44}
                  style={{ objectFit: "contain", display: "block" }}
                />
              </div>
            </Link>
            <p className="footer-desc" itemProp="description">
              Société qui met à disposition des agentes qualifiées — femme de ménage, nounou,
              cuisinière, vitrier — avec produits et matériel inclus. Pour particuliers et
              entreprises.
            </p>
            <div className="footer-social">

              <a
                href="https://www.facebook.com/femmesdemenage.ma"
                className="footer-soc facebook"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/femmesdemenage.ma"
                className="footer-soc instagram"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/femmesdemenage-ma/"
                className="footer-soc linkedin"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Liens */}
          <div className="footer-col">
            <h4>Liens</h4>
            <Link href="/particulier">Nos services</Link>
            <a href="https://femmesdemenage.ma/nos-packs/" target="_blank" rel="noopener">
              Nos packs
            </a>
            <Link href="/annuaire">Annuaire d&apos;agentes</Link>
            <a href="https://femmesdemenage.ma/quisommesnous/" target="_blank" rel="noopener">
              Qui sommes-nous
            </a>
            <a href="https://femmesdemenage.ma/blogs/" target="_blank" rel="noopener">
              Blog et articles
            </a>
            <a
              href="https://equable-python-88a.notion.site/Offres-d-emploi-98a36c09864b4e839c4bdc537927115f"
              target="_blank"
              rel="noopener"
            >
              Recrutement
            </a>
            <a href="https://femmesdemenage.ma/conditions-generales-dutilisation-cgu/" target="_blank" rel="noopener">
              CGU
            </a>
            <a href="https://femmesdemenage.ma/conditions-generales-de-vente-cgv/" target="_blank" rel="noopener">
              CGV
            </a>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <Link href="/particulier">Ménage normal</Link>
            <Link href="/particulier">Grand ménage</Link>
            <Link href="/pro">Nettoyage de bureau</Link>
            <Link href="/particulier">Nettoyage fin de chantier</Link>
            <Link href="/particulier">Nettoyage AirBnB</Link>
            <Link href="/particulier">Nettoyage des moquettes</Link>
            <Link href="/particulier">Nettoyage des canapés</Link>
            <Link href="/annuaire?metier=vitrier">Nettoyage des vitres</Link>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Réserver</h4>
            <a href="tel:+212695439595" className="footer-tel">
              <span className="footer-tel-num">
  📞 06 95 43 95 95
</span>
                <span className="footer-tel-sub">Lun au Sam 8h–18h</span>
              
            </a>
           {/*  <a
              href="https://wa.me/212695439595"
              className="footer-wa-btn"
              target="_blank"
              rel="noopener"
            >
              💬 WhatsApp direct
            </a> */}
            <a
                href="https://wa.me/212695439595"
                className="footer-wa-btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            <p className="footer-addr" itemProp="address">
              Boulevard Abdel Moumen, <strong>Casablanca</strong>
              <br />
              101 Avenue Moulay Rachid, Atlas, <strong>Fès</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="footer-inner">
        <div className="footer-bottom">
          <span className="footer-bottom-left">
            © 2026 <span itemProp="name">FDM Clean</span> ·{" "}
            <a
              href="https://fdmclean.ma"
              target="_blank"
              rel="noopener"
              style={{ color: "rgba(255,255,255,.32)", textDecoration: "none" }}
            >
              fdmclean.ma
            </a>
          </span>
          <div className="footer-bottom-links">
            <a href="https://femmesdemenage.ma/conditions-generales-dutilisation-cgu/" target="_blank" rel="noopener">
              CGU
            </a>
            <a href="https://femmesdemenage.ma/conditions-generales-de-vente-cgv/" target="_blank" rel="noopener">
              CGV
            </a>
            <Link href="/fdm-inscription?type=agent">Inscription agente</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
