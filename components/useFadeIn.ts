"use client";

import { useEffect } from "react";

/**
 * Reproduit le comportement de l'IntersectionObserver original :
 * ajoute la classe "v" aux éléments ".fi" lorsqu'ils entrent dans le viewport.
 * À monter une seule fois (ex: dans le composant racine de la page).
 */
export default function useFadeIn() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("v");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".fi").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);
}
