import Link from "next/link";
import styles from "./annuaire.module.css";
import {
  buildAnnuaireUrl,
  getPageNumbers,
  type AnnuaireFilters,
} from "@/lib/annuaire-filters";

export default function Pagination({
  filters,
  currentPage,
  totalPages,
}: {
  filters: AnnuaireFilters;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 ? (
        <Link
          href={`${buildAnnuaireUrl({ page: currentPage - 1 }, filters)}#pageBody`}
          className={styles["pag-btn"]}
          scroll={false}
        >
          ‹
        </Link>
      ) : (
        <span className={styles["pag-btn"]} style={{ opacity: 0.35, pointerEvents: "none" }} aria-disabled>
          ‹
        </span>
      )}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} style={{ padding: "0 4px", color: "var(--n300)" }}>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={`${buildAnnuaireUrl({ page: p }, filters)}#pageBody`}
            className={`${styles["pag-btn"]} ${p === currentPage ? styles.active : ""}`}
            scroll={false}
          >
            {p}
          </Link>
        )
      )}
      {currentPage < totalPages ? (
        <Link
          href={`${buildAnnuaireUrl({ page: currentPage + 1 }, filters)}#pageBody`}
          className={styles["pag-btn"]}
          scroll={false}
        >
          ›
        </Link>
      ) : (
        <span className={styles["pag-btn"]} style={{ opacity: 0.35, pointerEvents: "none" }} aria-disabled>
          ›
        </span>
      )}
    </div>
  );
}
