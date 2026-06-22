/**
 * Layout local pour /fdm-inscription.
 * Cette page est un layout plein écran 2 colonnes (panel vert gauche + formulaire droit).
 * Elle n'utilise pas le header global — on l'isole ici avec un layout propre.
 */
export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
