import Link from "next/link";
import styles from "./annuaire.module.css";
import { METIER_CLASS, METIER_ICON, METIER_LABELS, type Agent, type Metier } from "@/lib/agents";

export default function AgentCard({ agent: a }: { agent: Agent }) {
  const stars = "★".repeat(Math.floor(a.rating)) + "☆".repeat(5 - Math.floor(a.rating));

  return (
    <Link href={`/annuaire/${a.id}`} className={styles["agent-card"]}>
      <div className={styles["card-top"]}>
        <div className={styles["card-avatar-row"]}>
          <div className={styles["c-av"]}>
            {a.avatar}
            <div className={`${styles["status-dot"]} ${styles[`status-${a.status}`]}`} />
          </div>
          <div className={styles["c-av-info"]}>
            <div className={styles["c-name"]}>
              {a.prenom}
              {a.verified ? (
                <span className={styles["verified-badge"]} title="ID vérifié">
                  ✓
                </span>
              ) : (
                <span className={styles["unverified-badge"]} title="Non vérifié">
                  ?
                </span>
              )}
            </div>
            <div className={`${styles["c-metier"]} ${styles[METIER_CLASS[a.metier as Metier]]}`}>
              {METIER_ICON[a.metier as Metier]} {METIER_LABELS[a.metier as Metier]}
            </div>
            <div className={styles["c-location"]}>
              📍 {a.ville} · {a.age} ans
            </div>
          </div>
        </div>
        <div className={styles["c-rating"]}>
          <span className={styles["c-stars"]}>{stars}</span>
          <span className={styles["c-score"]}>{a.rating}</span>
          <span className={styles["c-reviews"]}>({a.reviews})</span>
        </div>
      </div>
      <div className={styles["c-details"]}>
        <div className={styles["c-detail-item"]}>
          <div className={styles["c-detail-label"]}>Expérience</div>
          <div className={styles["c-detail-value"]}>{a.experience} ans</div>
        </div>
        <div className={styles["c-detail-item"]}>
          <div className={styles["c-detail-label"]}>Nationalité</div>
          <div className={styles["c-detail-value"]}>{a.nationalite}</div>
        </div>
        <div className={styles["c-detail-item"]}>
          <div className={styles["c-detail-label"]}>Langues</div>
          <div className={styles["c-detail-value"]}>{a.langues.join(", ")}</div>
        </div>
        <div className={styles["c-detail-item"]}>
          <div className={styles["c-detail-label"]}>ID vérifié</div>
          <div className={`${styles["c-detail-value"]} ${a.verified ? styles.green : ""}`}>
            {a.verified ? "✅ Oui" : "⬜ Non"}
          </div>
        </div>
      </div>
      <div className={`${styles["c-sleeping"]} ${a.couchante ? styles["sleeping-yes"] : styles["sleeping-no"]}`}>
        {a.couchante ? "🛏 Couchante disponible" : "🏠 Non couchante"}
      </div>
      <div className={styles["card-footer"]}>
        <div className={styles["price-info"]}>
          <div className={styles["price-day"]}>
            {a.prix_jour} DH<span> / jour</span>
          </div>
          <div className={styles["price-week"]}>{a.prix_semaine} DH / semaine</div>
        </div>
        <span className={styles["btn-voir"]}>Voir profil →</span>
      </div>
    </Link>
  );
}
