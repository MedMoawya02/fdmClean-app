"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Comment fonctionne le service de réservation ?",
    a: "Vous remplissez le formulaire en choisissant votre ville, le type de logement, le créneau et la prestation. Notre équipe vous rappelle sous 2h pour confirmer et vous attribuer une agente disponible.",
  },
  {
    q: "Quelle est la différence entre le service et l'annuaire ?",
    a: "Le service (particulier) est clé en main : FDM s'occupe de tout. L'annuaire vous permet de parcourir les profils vous-même et de contacter l'agente directement, en gérant la relation par vous-même.",
  },
  {
    q: "Les agentes sont-elles vérifiées ?",
    a: 'Oui. Chaque agente dans notre annuaire a passé un entretien et fourni sa carte d\'identité. Les profils affichant le badge "ID vérifié" ont été contrôlés par notre équipe.',
  },
  {
    q: "Quels services proposez-vous en dehors du ménage ?",
    a: "Femme de ménage, nounou, cuisinière et vitrier. En option, vous pouvez ajouter : nettoyage de vitres, repassage, rangement de placards, nettoyage électroménager, remise en état Airbnb.",
  },
  {
    q: "Quelles villes sont couvertes ?",
    a: "Casablanca, Fès et Bouskoura. Nous étendons régulièrement notre couverture. Contactez-nous si votre ville n'est pas encore disponible.",
  },
  {
    q: "Puis-je annuler ou modifier une réservation ?",
    a: "Oui, jusqu'à 24h avant la prestation sans frais. Après ce délai, des frais peuvent s'appliquer. Contactez-nous par téléphone ou WhatsApp pour toute modification.",
  },
  {
    q: "Comment s'inscrire comme agente ?",
    a: 'Rendez-vous sur la page Inscription, choisissez "Je suis agente" et remplissez votre profil complet. Notre équipe vérifie votre dossier sous 48h et vous contacte pour la validation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header fi">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Questions fréquentes</h2>
        </div>

        <div className="faq-list fi d1">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
                <div
                  className="faq-q"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
