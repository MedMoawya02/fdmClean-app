// Server Component — pas de "use client".
// Filtres via URL searchParams, résultats rendus côté serveur.
// Hero, sidebar et tri restent des client islands (Suspense).

import { Suspense } from "react";
import styles from "./annuaire.module.css";
import { parseAnnuaireParams, queryAnnuaire } from "@/lib/annuaire-filters";
import { AnnuaireHeroSearch, AnnuaireSidebar, SortSelect } from "./AnnuaireFilters";
import AgentCard from "./AgentCard";
import Pagination from "./Pagination";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AnnuairePage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const filters = parseAnnuaireParams(raw);
  const { slice, total, totalPages, currentPage } = queryAnnuaire(filters);

  return (
    <div className={styles.page}>
      <Suspense
        fallback={
          <div className={styles["hero-search"]}>
            <h1>Trouvez l&apos;aide à domicile idéale</h1>
            <p>Parcourez notre annuaire d&apos;agentes vérifiées — femme de ménage, nounou, cuisinière, vitrier</p>
          </div>
        }
      >
        <AnnuaireHeroSearch />
      </Suspense>

      <div className={styles["page-body"]} id="pageBody">
        <Suspense fallback={<aside className={styles.sidebar} aria-hidden />}>
          <AnnuaireSidebar />
        </Suspense>

        <main>
          <div className={styles["main-header"]}>
            <div className={styles["result-count"]}>
              <strong>{total}</strong> agente{total !== 1 ? "s" : ""} trouvée
              {total !== 1 ? "s" : ""}
            </div>
            <Suspense fallback={<div className={styles["sort-wrap"]}>Trier par…</div>}>
              <SortSelect />
            </Suspense>
          </div>

          <div className={styles["agent-grid"]}>
            {slice.length === 0 && (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>🔍</div>
                <h3>Aucun résultat</h3>
                <p>Essayez d&apos;élargir vos filtres</p>
              </div>
            )}
            {slice.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>

          <Pagination filters={filters} currentPage={currentPage} totalPages={totalPages} />
        </main>
      </div>
    </div>
  );
}
