"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import styles from "./profil.module.css";
import useFadeIn from "@/components/useFadeIn";
import { getAgentById, getAgentDetails, getSimilarAgents, METIER_ICON, METIER_LABELS, type Metier } from "@/lib/agents";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function ProfilAgentPage() {
  useFadeIn();

  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = Number(idParam);
  const agent = getAgentById(id);

  const [unlocked, setUnlocked] = useState(false);

  if (!agent) {
    notFound();
  }

  const details = getAgentDetails(agent!);
  const similar = getSimilarAgents(agent!);
  const metierLabel = METIER_LABELS[agent!.metier as Metier];
  const metierIcon = METIER_ICON[agent!.metier as Metier];

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/annuaire">Annuaire</Link>
        <span className={styles.sep}>›</span>
        <span>{agent!.prenom}</span>
      </div>

      <div className={styles.main}>
        {/* LEFT COL */}
        <div>
          {/* PROFIL HERO */}
          <div className={`${styles["profile-hero"]} fi`}>
            <div className={styles.banner}></div>
            <div className={styles["avatar-wrap"]}>
              <div className={styles.avatar}>
                {agent!.avatar}
                <div
                  className={`${styles["id-badge"]} ${agent!.verified ? styles["id-verified"] : styles["id-unverified"]}`}
                  title={agent!.verified ? "Carte d'identité vérifiée" : "Non vérifié"}
                >
                  {agent!.verified ? "✓" : "?"}
                </div>
              </div>
            </div>
            <div className={styles["profile-body"]}>
              <div className={styles["profile-top-row"]}>
                <div>
                  <div className={styles["profile-name"]}>{agent!.prenom}</div>
                  <div className={styles["metier-tag"]}>
                    {metierIcon} {metierLabel}
                  </div>
                </div>
                <div className={styles["online-pill"]} style={agent!.status === "busy" ? { background: "rgba(239,83,80,.1)", color: "var(--busy, #ef5350)", borderColor: "rgba(239,83,80,.2)" } : undefined}>
                  <span className={styles["online-dot"]}></span> {agent!.status === "online" ? "Disponible" : "Occupée"}
                </div>
              </div>
              <div className={styles["profile-bio"]}>{details.bio}</div>
            </div>
          </div>

          {/* INFO GRID */}
          <div className={`${styles["info-grid"]} fi`}>
            <div className={styles["ig-title"]}>📋 Informations</div>
            <div className={styles["info-table"]}>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Âge</div>
                <div className={styles["info-value"]}>{agent!.age} ans</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Ville</div>
                <div className={styles["info-value"]}>📍 {agent!.ville}</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Nationalité</div>
                <div className={styles["info-value"]}>{agent!.nationalite}</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Langues</div>
                <div className={styles["info-value"]}>
                  {agent!.langues.map((l) => l.charAt(0).toUpperCase() + l.slice(1)).join(" · ")}
                </div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Expérience</div>
                <div className={styles["info-value"]}>{agent!.experience} ans</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Situation maritale</div>
                <div className={styles["info-value"]}>{details.maritalStatus}</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>Nombre d&apos;enfants</div>
                <div className={styles["info-value"]}>{details.enfants}</div>
              </div>
              <div className={styles["info-row"]}>
                <div className={styles["info-label"]}>À coucher</div>
                <div className={styles["info-value"]}>{agent!.couchante ? "🛏 Couchante" : "🏠 Non couchante"}</div>
              </div>
              <div className={`${styles["info-row"]} ${styles.full}`}>
                <div className={styles["info-label"]}>Carte d&apos;identité</div>
                <div className={`${styles["info-value"]} ${agent!.verified ? styles.green : ""}`}>
                  {agent!.verified ? "✅ Vérifiée par Femmes de Ménage" : "⬜ Non vérifiée"}
                </div>
              </div>
            </div>
          </div>

          {/* PRIX */}
          <div className={`${styles["prix-section"]} fi`}>
            <div className={styles["ig-title"]}>💰 Tarifs</div>
            <div className={styles["prix-row"]}>
              <div className={`${styles["prix-card"]} ${styles.jour}`}>
                <div className={styles["prix-label"]}>Prix / jour</div>
                <div className={styles["prix-num"]}>{agent!.prix_jour} DH</div>
                <div className={styles["prix-unit"]}>demi-journée (4h)</div>
              </div>
              <div className={`${styles["prix-card"]} ${styles.semaine}`}>
                <div className={styles["prix-label"]}>Prix / semaine</div>
                <div className={styles["prix-num"]}>{agent!.prix_semaine} DH</div>
                <div className={styles["prix-unit"]}>4 interventions</div>
              </div>
            </div>
          </div>

          {/* DISPONIBILITE */}
          <div className={`${styles["dispo-section"]} fi`}>
            <div className={styles["ig-title"]}>📅 Disponibilités</div>
            <div className={styles["dispo-week"]}>
              {DAY_LABELS.map((label, i) => (
                <div className={styles.dday} key={label}>
                  <div className={styles["dday-label"]}>{label}</div>
                  <div className={styles.dslots}>
                    <div className={`${styles.ds} ${details.dispo[i][0] === "free" ? styles["ds-free"] : styles["ds-taken"]}`}>
                      M
                    </div>
                    <div className={`${styles.ds} ${details.dispo[i][1] === "free" ? styles["ds-free"] : styles["ds-taken"]}`}>
                      AM
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--n400)" }}>
                <span style={{ width: 10, height: 10, background: "var(--g50)", border: "1px solid var(--g100)", borderRadius: 3, display: "inline-block" }}></span>
                Disponible
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--n400)" }}>
                <span style={{ width: 10, height: 10, background: "var(--n100)", borderRadius: 3, display: "inline-block" }}></span>
                Occupée
              </span>
            </div>
          </div>

          {/* AVIS */}
          <div className={`${styles["avis-section"]} fi`}>
            <div className={styles["avis-header"]}>
              <div className={styles["score-row"]}>
                <div className={styles["score-big"]}>{agent!.rating}</div>
                <div className={styles["score-details"]}>
                  <div className={styles["score-stars"]}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className={styles["score-sub"]}>{agent!.reviews} avis vérifiés</div>
                </div>
              </div>
              <div className={styles["rb-grid"]}>
                {details.ratingBreakdown.map((rb) => (
                  <div className={styles.rb} key={rb.stars}>
                    <span className={styles["rb-lbl"]}>{rb.stars}</span>
                    <div className={styles["rb-track"]}>
                      <div className={styles["rb-fill"]} style={{ width: `${rb.pct}%` }}></div>
                    </div>
                    <span className={styles["rb-cnt"]}>{rb.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["avis-list"]}>
              {details.avis.map((av) => (
                <div className={styles["avis-item"]} key={av.name}>
                  <div className={styles["avis-top"]}>
                    <div className={styles["avis-author"]}>
                      <div className={styles["a-av"]}>{av.avatar}</div>
                      <div>
                        <div className={styles["a-name"]}>{av.name}</div>
                        <div className={styles["a-date"]}>{av.date}</div>
                      </div>
                    </div>
                    <div className={styles["a-stars"]}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className={styles["a-text"]}>{av.text}</p>
                  <span className={styles["a-presta"]}>{av.presta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className={styles["right-col"]}>
          {/* PHONE WALL */}
          <div className={`${styles["phone-card"]} fi`}>
            <div className={styles["phone-card-title"]}>📞 Contacter {agent!.prenom}</div>
            {!unlocked ? (
              <div>
                <p>
                  Inscrivez-vous gratuitement pour accéder au numéro de téléphone de {agent!.prenom} et la
                  contacter directement.
                </p>
                <div className={styles["phone-blurred"]}>06 XX XX XX XX</div>
                <button className={styles["btn-unlock"]} onClick={() => setUnlocked(true)}>
                  🔓 Voir le numéro — S&apos;inscrire
                </button>
                <Link href="/fdm-inscription#login" className={styles["btn-whatsapp"]}>
                  Déjà inscrit ? Se connecter
                </Link>
              </div>
            ) : (
              <div>
                <div className={styles["phone-shown"]}>📞 06 95 43 95 95</div>
                <a href="https://wa.me/212695439595" className={styles["btn-whatsapp"]} target="_blank" rel="noopener">
                  💬 Envoyer un WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* TRUST */}
          <div className={`${styles["trust-card"]} fi d1`}>
            <h4>✅ Profil certifié</h4>
            <div className={styles["trust-lines"]}>
              <div className={styles["trust-line"]}>🪪 Carte d&apos;identité vérifiée par FDM</div>
              <div className={styles["trust-line"]}>⭐ {agent!.reviews} avis clients authentiques</div>
              <div className={styles["trust-line"]}>📅 Disponibilités à jour</div>
              <div className={styles["trust-line"]}>🔄 Profil actif depuis {details.memberSince}</div>
            </div>
          </div>

          {/* SIMILAR */}
          <div className={`${styles["similar-card"]} fi d2`}>
            <h4>Profils similaires</h4>
            {similar.map((s) => (
              <Link href={`/annuaire/${s.id}`} className={styles["sim-item"]} key={s.id}>
                <div className={styles["sim-av"]}>{s.avatar}</div>
                <div className={styles["sim-info"]}>
                  <h5>{s.prenom}</h5>
                  <p>
                    {METIER_LABELS[s.metier as Metier]} · {s.ville}
                  </p>
                </div>
                <span className={styles["sim-score"]}>{s.rating}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
