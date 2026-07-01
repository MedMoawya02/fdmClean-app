import { AGENTS, type Agent } from "@/lib/agents";

export const PER_PAGE = 9;

export interface AnnuaireFilters {
  ville: string;
  metier: string;
  dispo: string;
  sleeping: string;
  exp: number;
  rating: number;
  verified: string;
  tags: string[];
  sort: string;
  page: number;
}

export function defaultFilters(): AnnuaireFilters {
  return {
    ville: "",
    metier: "",
    dispo: "",
    sleeping: "",
    exp: 0,
    rating: 0,
    verified: "",
    tags: [],
    sort: "rating",
    page: 1,
  };
}

export function parseAnnuaireParams(
  raw: Record<string, string | string[] | undefined>
): AnnuaireFilters {
  const get = (k: string) => {
    const v = raw[k];
    return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
  };

  const languesRaw = get("langues");
  const tags = languesRaw ? languesRaw.split(",").filter(Boolean) : [];

  return {
    ville: get("ville"),
    metier: get("metier"),
    dispo: get("dispo"),
    sleeping: get("sleeping"),
    exp: Number(get("exp")) || 0,
    rating: Number(get("rating")) || 0,
    verified: get("verified"),
    tags,
    sort: get("sort") || "rating",
    page: Math.max(1, Number(get("page")) || 1),
  };
}

export function buildAnnuaireUrl(
  overrides: Partial<AnnuaireFilters>,
  base?: AnnuaireFilters
): string {
  const f: AnnuaireFilters = { ...defaultFilters(), ...base, ...overrides };
  const sp = new URLSearchParams();
  if (f.ville) sp.set("ville", f.ville);
  if (f.metier) sp.set("metier", f.metier);
  if (f.dispo) sp.set("dispo", f.dispo);
  if (f.sleeping) sp.set("sleeping", f.sleeping);
  if (f.exp) sp.set("exp", String(f.exp));
  if (f.rating) sp.set("rating", String(f.rating));
  if (f.verified) sp.set("verified", f.verified);
  if (f.tags.length) sp.set("langues", f.tags.join(","));
  if (f.sort !== "rating") sp.set("sort", f.sort);
  if (f.page > 1) sp.set("page", String(f.page));
  const qs = sp.toString();
  return qs ? `/annuaire?${qs}` : "/annuaire";
}

export function filterAgents(agents: Agent[], filters: AnnuaireFilters): Agent[] {
  return agents.filter((a) => {
    if (filters.ville && a.ville !== filters.ville) return false;
    if (filters.metier && a.metier !== filters.metier) return false;
    if (filters.dispo && a.status !== filters.dispo) return false;
    if (filters.sleeping === "oui" && a.couchante !== true) return false;
    if (filters.sleeping === "non" && a.couchante !== false) return false;
    if (filters.exp && a.experience < filters.exp) return false;
    if (filters.rating > 0 && a.rating < filters.rating) return false;
    if (filters.verified && !a.verified) return false;
    if (filters.tags.length && !filters.tags.every((t) => a.langues.includes(t))) return false;
    return true;
  });
}

export function sortAgents(agents: Agent[], sort: string): Agent[] {
  const list = [...agents];
  if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  else if (sort === "exp") list.sort((a, b) => b.experience - a.experience);
  else if (sort === "price-asc") list.sort((a, b) => a.prix_jour - b.prix_jour);
  else if (sort === "price-desc") list.sort((a, b) => b.prix_jour - a.prix_jour);
  return list;
}

export function paginateAgents(agents: Agent[], page: number) {
  const totalPages = Math.max(1, Math.ceil(agents.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const slice = agents.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  return { slice, totalPages, currentPage, total: agents.length };
}

export function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  const pageNumbers: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) pageNumbers.push(i);
    else if (Math.abs(i - currentPage) === 2) pageNumbers.push("...");
  }
  return pageNumbers;
}

export function queryAnnuaire(filters: AnnuaireFilters) {
  const filtered = filterAgents(AGENTS, filters);
  const sorted = sortAgents(filtered, filters.sort);
  const pagination = paginateAgents(sorted, filters.page);
  return { ...pagination, sorted };
}
