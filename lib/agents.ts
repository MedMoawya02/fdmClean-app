export type Metier = "fdm" | "nounou" | "cuisiniere" | "vitrier";
export type Status = "online" | "busy";

export interface Agent {
  id: number;
  prenom: string;
  age: number;
  avatar: string;
  metier: Metier;
  ville: string;
  nationalite: string;
  langues: string[];
  status: Status;
  rating: number;
  reviews: number;
  experience: number;
  couchante: boolean;
  prix_jour: number;
  prix_semaine: number;
  verified: boolean;
  desc: string;
}

export const METIER_LABELS: Record<Metier, string> = {
  fdm: "Femme de ménage",
  nounou: "Nounou",
  cuisiniere: "Cuisinière",
  vitrier: "Vitrier",
};

export const METIER_CLASS: Record<Metier, string> = {
  fdm: "metier-fdm",
  nounou: "metier-nounou",
  cuisiniere: "metier-cuisiniere",
  vitrier: "metier-vitrier",
};

export const METIER_ICON: Record<Metier, string> = {
  fdm: "🧹",
  nounou: "👶",
  cuisiniere: "🍳",
  vitrier: "🪟",
};

export const AGENTS: Agent[] = [
  { id: 1, prenom: "Fatima", age: 34, avatar: "👩", metier: "fdm", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "online", rating: 4.9, reviews: 127, experience: 4, couchante: false, prix_jour: 250, prix_semaine: 990, verified: true, desc: "Professionnelle rigoureuse, 4 ans d'expérience en ménage courant et grand ménage." },
  { id: 2, prenom: "Khadija", age: 28, avatar: "👩", metier: "fdm", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija"], status: "online", rating: 4.8, reviews: 89, experience: 3, couchante: false, prix_jour: 230, prix_semaine: 900, verified: true, desc: "Spécialisée dans les appartements. Ponctuelle et discrète." },
  { id: 3, prenom: "Samira", age: 42, avatar: "👩", metier: "nounou", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "amazigh"], status: "online", rating: 5.0, reviews: 64, experience: 8, couchante: true, prix_jour: 280, prix_semaine: 1100, verified: true, desc: "Nounou expérimentée, à l'aise avec les enfants de 0 à 10 ans." },
  { id: 4, prenom: "Naima", age: 38, avatar: "👩", metier: "cuisiniere", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "busy", rating: 4.7, reviews: 42, experience: 5, couchante: true, prix_jour: 300, prix_semaine: 1200, verified: true, desc: "Cuisinière marocaine et internationale. Spécialité tajines et pastilla." },
  { id: 5, prenom: "Zineb", age: 25, avatar: "👩", metier: "fdm", ville: "Fès", nationalite: "Marocaine", langues: ["arabe", "amazigh"], status: "online", rating: 4.6, reviews: 31, experience: 2, couchante: false, prix_jour: 200, prix_semaine: 780, verified: false, desc: "Jeune agente motivée, disponible en semaine à Fès." },
  { id: 6, prenom: "Hassan", age: 45, avatar: "👨", metier: "vitrier", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "online", rating: 4.9, reviews: 88, experience: 12, couchante: false, prix_jour: 350, prix_semaine: 1400, verified: true, desc: "Vitrier professionnel, spécialité baies vitrées et vérandas." },
  { id: 7, prenom: "Halima", age: 50, avatar: "👩", metier: "fdm", ville: "Bouskoura", nationalite: "Marocaine", langues: ["arabe", "darija"], status: "online", rating: 4.8, reviews: 105, experience: 10, couchante: true, prix_jour: 260, prix_semaine: 1050, verified: true, desc: "Grande expérience villas et résidences à Bouskoura." },
  { id: 8, prenom: "Rajae", age: 30, avatar: "👩", metier: "nounou", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "online", rating: 4.7, reviews: 55, experience: 4, couchante: true, prix_jour: 270, prix_semaine: 1050, verified: true, desc: "Nounou diplômée petite enfance, très patiente et créative." },
  { id: 9, prenom: "Souad", age: 36, avatar: "👩", metier: "cuisiniere", ville: "Fès", nationalite: "Marocaine", langues: ["arabe", "amazigh"], status: "busy", rating: 4.5, reviews: 28, experience: 6, couchante: false, prix_jour: 280, prix_semaine: 1100, verified: true, desc: "Cuisinière traditionnelle fassi, spécialité pastilla et harira." },
  { id: 10, prenom: "Meryem", age: 27, avatar: "👩", metier: "fdm", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "online", rating: 4.9, reviews: 72, experience: 3, couchante: false, prix_jour: 240, prix_semaine: 950, verified: true, desc: "Agente fiable, spécialisée remise en état Airbnb." },
  { id: 11, prenom: "Aicha", age: 44, avatar: "👩", metier: "fdm", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija"], status: "busy", rating: 4.6, reviews: 91, experience: 9, couchante: true, prix_jour: 260, prix_semaine: 1020, verified: false, desc: "Agente confirmée, à l'aise avec familles nombreuses." },
  { id: 12, prenom: "Karima", age: 33, avatar: "👩", metier: "vitrier", ville: "Casablanca", nationalite: "Marocaine", langues: ["arabe", "darija", "français"], status: "online", rating: 4.8, reviews: 39, experience: 5, couchante: false, prix_jour: 320, prix_semaine: 1280, verified: true, desc: "Spécialiste vitrerie et miroirs, matériel professionnel." },
];

export function getAgentById(id: number): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function getSimilarAgents(agent: Agent, count = 3): Agent[] {
  const sameMetier = AGENTS.filter((a) => a.id !== agent.id && a.metier === agent.metier);
  const sameVilleFirst = [...sameMetier].sort((a, b) =>
    a.ville === agent.ville && b.ville !== agent.ville ? -1 : 0
  );
  if (sameVilleFirst.length >= count) return sameVilleFirst.slice(0, count);
  const rest = AGENTS.filter((a) => a.id !== agent.id && !sameMetier.includes(a));
  return [...sameVilleFirst, ...rest].slice(0, count);
}

// Données démo additionnelles, déterministes par agente (pour compléter le profil)
const MARITAL = ["Célibataire", "Mariée", "Mariée", "Divorcée"];
const REVIEW_TEMPLATES = [
  (a: Agent) => `${a.prenom} est tout simplement parfaite. Ponctuelle, efficace et très agréable. Travail impeccable à chaque passage.`,
  (a: Agent) => `Très satisfait(e) de la prestation de ${a.prenom}. Sérieuse, discrète, je recommande sans hésiter.`,
  (a: Agent) => `${a.prenom} fait un travail exceptionnel. Rapide et minutieuse, exactement ce qu'on attendait.`,
];
const REVIEW_AUTHORS = [
  { name: "Soraya B.", avatar: "👩", date: "Il y a 3 jours" },
  { name: "Mehdi A.", avatar: "👨", date: "Il y a 1 semaine" },
  { name: "Nadia K.", avatar: "👩", date: "Il y a 2 semaines" },
];

export function getAgentDetails(agent: Agent) {
  const seed = agent.id;
  return {
    maritalStatus: MARITAL[seed % MARITAL.length],
    enfants: seed % 4,
    memberSince: 2019 + (seed % 5),
    bio: `${
      METIER_LABELS[agent.metier]
    } professionnelle depuis ${agent.experience} ans, je suis rigoureuse, ponctuelle et discrète. ${agent.desc} J'ai l'habitude de travailler avec des familles exigeantes et je porte une grande attention aux détails.`,
    avis: REVIEW_AUTHORS.map((author, i) => ({
      ...author,
      text: REVIEW_TEMPLATES[i](agent),
      presta: `${METIER_ICON[agent.metier]} ${METIER_LABELS[agent.metier]} · ${agent.ville}`,
    })),
    ratingBreakdown: computeBreakdown(agent.rating, agent.reviews),
    dispo: WEEK_PATTERN[seed % WEEK_PATTERN.length],
  };
}

function computeBreakdown(rating: number, reviews: number) {
  // Répartition approximative et déterministe basée sur la note moyenne
  const fiveRatio = Math.max(0.55, Math.min(0.95, (rating - 3) / 2));
  const five = Math.round(reviews * fiveRatio);
  const four = Math.round(reviews * (1 - fiveRatio) * 0.7);
  const three = Math.round(reviews * (1 - fiveRatio) * 0.2);
  const two = Math.round(reviews * (1 - fiveRatio) * 0.07);
  const one = Math.max(0, reviews - five - four - three - two);
  const max = Math.max(five, 1);
  return [
    { stars: 5, count: five, pct: Math.round((five / max) * 100) },
    { stars: 4, count: four, pct: Math.round((four / max) * 100) },
    { stars: 3, count: three, pct: Math.round((three / max) * 100) },
    { stars: 2, count: two, pct: Math.round((two / max) * 100) },
    { stars: 1, count: one, pct: Math.round((one / max) * 100) },
  ];
}

const WEEK_PATTERN = [
  [
    ["free", "taken"], ["taken", "free"], ["free", "free"], ["free", "taken"],
    ["free", "taken"], ["taken", "free"], ["taken", "taken"],
  ],
  [
    ["free", "free"], ["free", "taken"], ["taken", "free"], ["free", "free"],
    ["taken", "taken"], ["free", "taken"], ["free", "free"],
  ],
  [
    ["taken", "free"], ["free", "free"], ["free", "taken"], ["taken", "free"],
    ["free", "free"], ["taken", "taken"], ["free", "taken"],
  ],
];
