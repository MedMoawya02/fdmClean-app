"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./annuaire.module.css";
import { AGENTS, METIER_CLASS, METIER_ICON, METIER_LABELS, type Metier } from "@/lib/agents";

const PER_PAGE = 9;

export default function AnnuairePage() {
  const searchParams = useSearchParams();
  const [ville, setVille] = useState("");
  const [metier, setMetier] = useState("");
  const [dispo, setDispo] = useState("");
  const [sleeping, setSleeping] = useState("");
  const [exp, setExp] = useState(0);
  const [rating, setRating] = useState(0);
  const [verified, setVerified] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [sort, setSort] = useState("rating");
  const [page, setPage] = useState(1);

  function toggleTag(t: string) {
    setTags((prev) => (prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]));
    setPage(1);
  }

  useEffect(() => {
    const m = searchParams.get("metier");
    if (m) setMetier(m);
    const v = searchParams.get("ville");
    if (v) setVille(v);
  }, [searchParams]);

  function resetFilters() {
    setVille("");
    setMetier("");
    setDispo("");
    setSleeping("");
    setExp(0);
    setRating(0);
    setVerified("");
    setTags([]);
    setPage(1);
  }

  const filtered = useMemo(() => {
    return AGENTS.filter((a) => {
      if (ville && a.ville !== ville) return false;
      if (metier && a.metier !== metier) return false;
      if (dispo && a.status !== dispo) return false;
      if (sleeping === "oui" && a.couchante !== true) return false;
      if (sleeping === "non" && a.couchante !== false) return false;
      if (exp && a.experience < exp) return false;
      if (rating > 0 && a.rating < rating) return false;
      if (verified && !a.verified) return false;
      if (tags.length && !tags.every((t) => a.langues.includes(t))) return false;
      return true;
    });
  }, [ville, metier, dispo, sleeping, exp, rating, verified, tags]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "exp") list.sort((a, b) => b.experience - a.experience);
    else if (sort === "price-asc") list.sort((a, b) => a.prix_jour - b.prix_jour);
    else if (sort === "price-desc") list.sort((a, b) => b.prix_jour - a.prix_jour);
    return list;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const slice = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function goPage(n: number) {
    setPage(n);
    document.getElementById("pageBody")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const pageNumbers: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) pageNumbers.push(i);
    else if (Math.abs(i - currentPage) === 2) pageNumbers.push("...");
  }

  return (
    <div className={styles.page}>
      {/* HERO SEARCH */}
      <div className={styles["hero-search"]}>
        <h1>Trouvez l&apos;aide à domicile idéale</h1>
        <p>Parcourez notre annuaire d&apos;agentes vérifiées — femme de ménage, nounou, cuisinière, vitrier</p>
        <div className={styles["filter-bar"]}>
          <div className={styles["filter-group"]}>
            <div className={styles["filter-label"]}>Ville</div>
            <select
              className={styles["filter-select"]}
              value={ville}
              onChange={(e) => {
                setVille(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Toutes les villes</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Fès">Fès</option>
              <option value="Bouskoura">Bouskoura</option>
            </select>
          </div>
          <div className={styles["filter-group"]}>
            <div className={styles["filter-label"]}>Métier</div>
            <select
              className={styles["filter-select"]}
              value={metier}
              onChange={(e) => {
                setMetier(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Tous les métiers</option>
              <option value="fdm">🧹 Femme de ménage</option>
              <option value="nounou">👶 Nounou</option>
              <option value="cuisiniere">🍳 Cuisinière</option>
              <option value="vitrier">🪟 Vitrier</option>
            </select>
          </div>
          <div className={styles["filter-group"]}>
            <div className={styles["filter-label"]}>&nbsp;</div>
            <button className={styles["btn-search"]} onClick={() => setPage(1)}>
              🔍 Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className={styles["page-body"]} id="pageBody">
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles["sb-title"]}>
            Filtres{" "}
            <a className={styles["sb-reset"]} onClick={resetFilters}>
              Réinitialiser
            </a>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>Disponibilité</div>
            <div className={styles["sb-options"]}>
              {[
                { v: "", l: "Toutes" },
                { v: "online", l: "🟢 Disponible maintenant" },
                { v: "busy", l: "🔴 Occupée" },
              ].map((o) => (
                <label className={styles["sb-option"]} key={o.v}>
                  <input
                    type="radio"
                    name="dispo"
                    checked={dispo === o.v}
                    onChange={() => {
                      setDispo(o.v);
                      setPage(1);
                    }}
                  />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>À coucher</div>
            <div className={styles["sb-options"]}>
              {[
                { v: "", l: "Peu importe" },
                { v: "oui", l: "🛏 Couchante" },
                { v: "non", l: "🏠 Non couchante" },
              ].map((o) => (
                <label className={styles["sb-option"]} key={o.v}>
                  <input
                    type="radio"
                    name="sleeping"
                    checked={sleeping === o.v}
                    onChange={() => {
                      setSleeping(o.v);
                      setPage(1);
                    }}
                  />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>Langues parlées</div>
            <div className={styles["tags-wrap"]}>
              {["arabe", "darija", "français", "amazigh"].map((t) => (
                <div
                  key={t}
                  className={`${styles["spec-tag"]} ${tags.includes(t) ? styles.active : ""}`}
                  onClick={() => toggleTag(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>Expérience</div>
            <div className={styles["sb-options"]}>
              {[
                { v: 0, l: "Peu importe" },
                { v: 1, l: "1+ an" },
                { v: 3, l: "3+ ans" },
                { v: 5, l: "5+ ans" },
              ].map((o) => (
                <label className={styles["sb-option"]} key={o.v}>
                  <input
                    type="radio"
                    name="exp"
                    checked={exp === o.v}
                    onChange={() => {
                      setExp(o.v);
                      setPage(1);
                    }}
                  />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>Note minimale</div>
            <div className={styles["range-wrap"]}>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={rating}
                onChange={(e) => {
                  setRating(Number(e.target.value));
                  setPage(1);
                }}
              />
              <div className={styles["range-labels"]}>
                <span>Toutes</span>
                <span>{rating === 0 ? "Toutes" : `${rating}★`}</span>
              </div>
            </div>
          </div>

          <div className={styles["sb-section"]}>
            <div className={styles["sb-section-title"]}>ID vérifié</div>
            <div className={styles["sb-options"]}>
              {[
                { v: "", l: "Peu importe" },
                { v: "1", l: "✅ Vérifié uniquement" },
              ].map((o) => (
                <label className={styles["sb-option"]} key={o.v}>
                  <input
                    type="radio"
                    name="verified"
                    checked={verified === o.v}
                    onChange={() => {
                      setVerified(o.v);
                      setPage(1);
                    }}
                  />
                  <span>{o.l}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* RESULTS */}
        <main>
          <div className={styles["main-header"]}>
            <div className={styles["result-count"]}>
              <strong>{sorted.length}</strong> agente{sorted.length !== 1 ? "s" : ""} trouvée
              {sorted.length !== 1 ? "s" : ""}
            </div>
            <div className={styles["sort-wrap"]}>
              Trier par
              <select
                className={styles["sort-select"]}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="rating">Note ↓</option>
                <option value="exp">Expérience ↓</option>
                <option value="price-asc">Prix ↑</option>
                <option value="price-desc">Prix ↓</option>
              </select>
            </div>
          </div>

          <div className={styles["agent-grid"]}>
            {slice.length === 0 && (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>🔍</div>
                <h3>Aucun résultat</h3>
                <p>Essayez d&apos;élargir vos filtres</p>
              </div>
            )}
            {slice.map((a) => {
              const stars = "★".repeat(Math.floor(a.rating)) + "☆".repeat(5 - Math.floor(a.rating));
              return (
                <Link href={`/annuaire/${a.id}`} className={styles["agent-card"]} key={a.id}>
                  <div className={styles["card-top"]}>
                    <div className={styles["card-avatar-row"]}>
                      <div className={styles["c-av"]}>
                        {a.avatar}
                        <div className={`${styles["status-dot"]} ${styles[`status-${a.status}`]}`}></div>
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
            })}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles["pag-btn"]}
                onClick={() => goPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                ‹
              </button>
              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} style={{ padding: "0 4px", color: "var(--n300)" }}>
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={`${styles["pag-btn"]} ${p === currentPage ? styles.active : ""}`}
                    onClick={() => goPage(p)}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                className={styles["pag-btn"]}
                onClick={() => goPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
