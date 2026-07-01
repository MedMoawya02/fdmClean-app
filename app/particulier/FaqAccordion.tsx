"use client";

import { useState } from "react";
import styles from "./particulier.module.css";

const faqs = [
  {
    q: "Dois-je être présent(e) pendant le ménage ?",
    a: "Non, ce n'est pas obligatoire. Vous pouvez être présent au début pour les consignes, ou nous confier les clés en toute confiance. Nos agentes sont sélectionnées et vérifiées.",
  },
  {
    q: "Fournissez-vous le matériel et les produits ?",
    a: "Vous pouvez utiliser votre propre matériel, ou opter pour nos produits en supplément (20 DH). Nos agentes sont formées à l'utilisation des deux.",
  },
  {
    q: "Puis-je annuler ou modifier ma réservation ?",
    a: "Oui, jusqu'à 24h avant la prestation sans frais. Pour les annulations de dernière minute, des frais peuvent s'appliquer selon les conditions générales.",
  },
  {
    q: "Aurai-je toujours la même agente ?",
    a: "Pour les abonnements, nous faisons en sorte que ce soit toujours la même agente. Pour les one-shot, cela dépend des disponibilités, mais nous veillons à la continuité.",
  },
  {
    q: "Comment vous joindre en cas de problème ?",
    a: "Par téléphone au 06 95 43 95 95, par WhatsApp ou via notre formulaire. Nous sommes disponibles 7j/7 pour répondre à toutes vos demandes.",
  },
];

export default function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`${styles["faq-list"]} fi`}>
      {faqs.map((item, i) => {
        const isOpen = openFaq === i;
        return (
          <div
            className={`${styles["faq-item"]} ${isOpen ? styles.open : ""}`}
            key={item.q}
          >
            <div
              className={styles["faq-q"]}
              onClick={() => setOpenFaq(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className={styles["faq-icon-btn"]}>
                {isOpen ? "×" : "+"}
              </span>
            </div>
            <div className={`${styles["faq-a"]} ${isOpen ? styles.open : ""}`}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
