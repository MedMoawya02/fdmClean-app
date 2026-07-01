"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./particulier.module.css";

export default function PrestaCard() {
  const [tab, setTab] = useState<"one" | "abo">("one");

  return (
    <div className={`${styles["presta-card"]} fi`}>
      <div className={styles["pcard-tabs"]}>
        <div
          className={`${styles.ptab} ${tab === "one" ? styles.active : ""}`}
          onClick={() => setTab("one")}
        >
          One shot
        </div>
        <div
          className={`${styles.ptab} ${tab === "abo" ? styles.active : ""}`}
          onClick={() => setTab("abo")}
        >
          Abonnement
        </div>
      </div>

      {tab === "one" && (
        <div className={styles["pcard-content"]}>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>🏠</div>
            <div className={styles["pi-info"]}>
              <h4>Ménage normal</h4>
              <p>4h · Sols, surfaces, cuisine, sdb</p>
            </div>
            <div className={styles["pi-price"]}>250 DH</div>
          </div>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>🧹</div>
            <div className={styles["pi-info"]}>
              <h4>Grand ménage</h4>
              <p>Journée · En profondeur</p>
            </div>
            <div className={styles["pi-price"]}>480 DH</div>
          </div>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>🌅</div>
            <div className={styles["pi-info"]}>
              <h4>Journée complète</h4>
              <p>8h · Villa ou grand appartement</p>
            </div>
            <div className={styles["pi-price"]}>480 DH</div>
          </div>
        </div>
      )}

      {tab === "abo" && (
        <div className={styles["pcard-content"]}>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>📅</div>
            <div className={styles["pi-info"]}>
              <h4>1 fois/semaine</h4>
              <p>~4 interventions/mois</p>
            </div>
            <div className={styles["pi-price"]}>990 DH</div>
          </div>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>⭐</div>
            <div className={styles["pi-info"]}>
              <h4>2 fois/semaine</h4>
              <p>~8 interventions/mois · Populaire</p>
            </div>
            <div className={styles["pi-price"]}>1 900 DH</div>
          </div>
          <div className={styles["presta-item"]}>
            <div className={styles["pi-icon"]}>💎</div>
            <div className={styles["pi-info"]}>
              <h4>3 fois/semaine</h4>
              <p>~12 interventions/mois</p>
            </div>
            <div className={styles["pi-price"]}>2 890 DH</div>
          </div>
        </div>
      )}

      <div className={styles["pcard-cta"]}>
        <Link href="#reserver" className={styles["btn-pcard"]}>
          Configurer ma prestation →
        </Link>
      </div>
    </div>
  );
}
