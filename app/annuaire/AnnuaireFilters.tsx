"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./annuaire.module.css";
import {
  buildAnnuaireUrl,
  parseAnnuaireParams,
  type AnnuaireFilters,
} from "@/lib/annuaire-filters";

const LANGUES = ["arabe", "darija", "français", "amazigh"];

function useFilters(): AnnuaireFilters {
  const searchParams = useSearchParams();
  const raw: Record<string, string> = {};
  searchParams.forEach((v, k) => {
    raw[k] = v;
  });
  return parseAnnuaireParams(raw);
}

function navigate(router: ReturnType<typeof useRouter>, filters: AnnuaireFilters) {
  router.push(buildAnnuaireUrl(filters));
}

export function AnnuaireHeroSearch() {
  const router = useRouter();
  const f = useFilters();

  function update(overrides: Partial<AnnuaireFilters>) {
    navigate(router, { ...f, ...overrides, page: overrides.page ?? 1 });
  }

  return (
    <div className={styles["hero-search"]}>
      <h1>Trouvez l&apos;aide à domicile idéale</h1>
      <p>Parcourez notre annuaire d&apos;agentes vérifiées — femme de ménage, nounou, cuisinière, vitrier</p>
      <div className={styles["filter-bar"]}>
        <div className={styles["filter-group"]}>
          <div className={styles["filter-label"]}>Ville</div>
          <select
            className={styles["filter-select"]}
            value={f.ville}
            onChange={(e) => update({ ville: e.target.value })}
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
            value={f.metier}
            onChange={(e) => update({ metier: e.target.value })}
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
          <button className={styles["btn-search"]} type="button" onClick={() => update({})}>
            🔍 Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export function AnnuaireSidebar() {
  const router = useRouter();
  const f = useFilters();

  function update(overrides: Partial<AnnuaireFilters>) {
    navigate(router, { ...f, ...overrides, page: overrides.page ?? 1 });
  }

  function toggleTag(t: string) {
    const tags = f.tags.includes(t) ? f.tags.filter((v) => v !== t) : [...f.tags, t];
    update({ tags });
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles["sb-title"]}>
        Filtres{" "}
        <Link className={styles["sb-reset"]} href="/annuaire">
          Réinitialiser
        </Link>
      </div>

      <div className={styles["sb-section"]}>
        <div className={styles["sb-section-title"]}>Disponibilité</div>
        <div className={styles["sb-options"]}>
          {[
            { v: "", l: "Toutes" },
            { v: "online", l: "🟢 Disponible maintenant" },
            { v: "busy", l: "🔴 Occupée" },
          ].map((o) => (
            <label className={styles["sb-option"]} key={o.v || "all"}>
              <input
                type="radio"
                name="dispo"
                checked={f.dispo === o.v}
                onChange={() => update({ dispo: o.v })}
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
            <label className={styles["sb-option"]} key={o.v || "all"}>
              <input
                type="radio"
                name="sleeping"
                checked={f.sleeping === o.v}
                onChange={() => update({ sleeping: o.v })}
              />
              <span>{o.l}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles["sb-section"]}>
        <div className={styles["sb-section-title"]}>Langues parlées</div>
        <div className={styles["tags-wrap"]}>
          {LANGUES.map((t) => (
            <div
              key={t}
              className={`${styles["spec-tag"]} ${f.tags.includes(t) ? styles.active : ""}`}
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
                checked={f.exp === o.v}
                onChange={() => update({ exp: o.v })}
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
            value={f.rating}
            onChange={(e) => update({ rating: Number(e.target.value) })}
          />
          <div className={styles["range-labels"]}>
            <span>Toutes</span>
            <span>{f.rating === 0 ? "Toutes" : `${f.rating}★`}</span>
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
            <label className={styles["sb-option"]} key={o.v || "all"}>
              <input
                type="radio"
                name="verified"
                checked={f.verified === o.v}
                onChange={() => update({ verified: o.v })}
              />
              <span>{o.l}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function SortSelect() {
  const router = useRouter();
  const f = useFilters();

  return (
    <div className={styles["sort-wrap"]}>
      Trier par
      <select
        className={styles["sort-select"]}
        value={f.sort}
        onChange={(e) => router.push(buildAnnuaireUrl({ ...f, sort: e.target.value, page: 1 }))}
      >
        <option value="rating">Note ↓</option>
        <option value="exp">Expérience ↓</option>
        <option value="price-asc">Prix ↑</option>
        <option value="price-desc">Prix ↓</option>
      </select>
    </div>
  );
}
