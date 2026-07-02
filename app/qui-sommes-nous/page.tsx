"use client";

import Link from "next/link";
import styles from "./qsn.module.css";
import useFadeIn from "@/components/useFadeIn";
import Image from "next/image";
const SERVICES = [
  {
    icon: "🏠",
    title: "Ménage à domicile",
    desc: "Votre maison est nettoyée en fonction de vos besoins. Vous avez le choix entre un ménage unique et des ménages réguliers avec des agents expérimentés et de confiance. Ils sont hautement qualifiés et feront briller votre maison.",
  },
  {
    icon: "🏢",
    title: "Ménage commercial",
    desc: "Qu'il s'agisse d'un bureau, d'un espace de travail, d'une boutique ou d'un centre de beauté, nos professionnels du B2B s'occupent de vos locaux. Hautement formés, nos agents vous fourniront un service de première qualité.",
  },
  {
    icon: "🔑",
    title: "Ménage de fin de bail",
    desc: "Vous pouvez réserver vos ménages de début et fin de bail en quelques clics et dans un délai très court. Pas besoin d'attendre, il vous suffit de contacter notre équipe à Casablanca – Bouskoura pour une réservation.",
  },
  {
    icon: "🪟",
    title: "Nettoyage de vitres",
    desc: "Baies vitrées, vérandas, garde-corps, balcons et miroirs. Nos vitriers professionnels interviennent dans vos locaux résidentiels et commerciaux avec du matériel adapté.",
  },
  {
    icon: "👶",
    title: "Garde d'enfants",
    desc: "Nos nounous qualifiées assurent la garde de vos enfants à domicile, avec ou sans hébergement. Sélectionnées pour leur sérieux et leur bienveillance, elles prennent soin de vos tout-petits.",
  },
  {
    icon: "🍳",
    title: "Cuisinière à domicile",
    desc: "Cuisine marocaine traditionnelle ou internationale, préparation des repas familiaux et réceptions. Nos cuisinières expérimentées s'adaptent à vos goûts et à vos contraintes.",
  },
];

const VALUES = [
  {
    icon: "⚖️",
    title: "Justice sociale",
    desc: "Nous luttons contre le travail non déclaré en donnant à chaque agente un statut reconnu et une couverture sociale.",
  },
  {
    icon: "🛡️",
    title: "Fiabilité & sécurité",
    desc: "Chaque profil est vérifié, chaque agente est assurée. Vous pouvez nous confier votre domicile les yeux fermés.",
  },
  {
    icon: "🌱",
    title: "Impact durable",
    desc: "En choisissant FDM, vous contribuez directement à l'amélioration des conditions de travail du secteur.",
  },
];

export default function QuiSommesNousPage() {
  useFadeIn();

  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={`${styles.heroEyebrow} fi`}>Notre histoire</div>
          <h1 className={`${styles.heroTitle} fi`}>Qui sommes nous</h1>
          <p className={`${styles.heroSub} fi`}>
            FemmesDeMenage.Ma, la plateforme de référence pour l&apos;aide à domicile au Maroc —
            Casablanca, Fès et Bouskoura.
          </p>
        </div>
      </section>

      {/* ─── NOTRE VISION ─── */}
      <section className={styles.vision}>
        <div className={styles.visionInner}>
          <div className={styles.visionText}>
            <span className={`${styles.eyebrow} fi`}>Notre vision</span>
            <h2 className="fi">Une maison propre, chaque jour, sans effort</h2>

            <p className={`${styles.visionPara} fi`}>
              <span className={styles.accent}>FemmesDeMenage.Ma</span> a vu le jour pour répondre
              à un vrai besoin du quotidien : vivre dans l&apos;ordre c&apos;est possible, sans attendre la
              fin de semaine pour s&apos;en occuper soi-même. Nos collaborateurs et collaboratrices sont
              là pour vous — elles prennent soin de votre chez-soi avec passion et engagement.
            </p>

            <p className={`${styles.visionPara} fi d1`}>
              <span className={styles.accent}>FemmesDeMenage.Ma</span> a aidé plus de{" "}
              <strong>100 professionnels du ménage</strong> à quitter le marché au noir du secteur
              depuis sa création, et a accompagné environ{" "}
              <strong>1 500 clients</strong> dans la recherche d&apos;un agent de ménage fiable. Ces
              travailleurs ont l&apos;avantage d&apos;être assurés et déclarés — ils travaillent en toute
              sécurité à nos côtés.
            </p>

            <p className={`${styles.visionPara} fi d2`}>
              Nous avons fondé <span className={styles.accent}>FemmesDeMenage.Ma</span> avec une
              mission claire en tête : apporter plus de justice au monde du ménage, en faisant de la
              lutte contre le travail non déclaré notre priorité.
            </p>
          </div>

          <div className={`${styles.visionImg} fi d1`}>
            {/* Image de remplacement — remplacez src par votre vraie photo */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                background: "linear-gradient(160deg, #e8f5e9 0%, #c8e6c9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
              }}
            >
              <Image
                src="/femme.jpg"
                alt="Femme de ménage"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className={styles.visionImgOverlay} />
            <div className={styles.visionBadge}>
              <span>⭐</span>
              <div className={styles.visionBadgeText}>
                <strong>4.8 / 5</strong>
                <span>+6 000 avis vérifiés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <div className={styles.statsBand}>
        <div className={styles.statsBandInner}>
          {[
            { num: "+1 500", label: "Clients accompagnés" },
            { num: "+100", label: "Agentes déclarées" },
            { num: "8 ans", label: "D'expérience dans les services" },
            { num: "3", label: "Villes couvertes" },
          ].map((s, i) => (
            <div className={`${styles.statItem} fi ${i > 0 ? `d${i}` : ""}`} key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── NOTRE GROUPE ─── */}
      <section className={styles.groupe}>
        <div className={styles.groupeInner}>
          <div className={styles.groupeHeader}>
            <span className={`${styles.eyebrow} fi`}>Notre groupe</span>
            <h2 className="fi">FDM Clean, notre filiale B2B</h2>
            <p className="fi">
              FemmesDeMenage.Ma fait partie d&apos;un groupe qui dispose de plus de{" "}
              <strong>8 ans d&apos;expérience</strong> dans les métiers de service et dans le
              nettoyage avec sa filiale.
            </p>
          </div>

          <div className={styles.groupeGrid}>
            <div className={`${styles.groupeImg} fi`}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(160deg, #e8f5e9 0%, #a5d6a7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                }}
              >
                <Image
                  src="/office.jpg"
                  alt="Bureau professionnel"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
  {/*             <div className={styles.groupeImgBadge}>femmes de ménage .ma</div> */}
            </div>

            <div className="fi d1">
              <div className={styles.fdmCleanCard}>
                <h4>La société FDM Clean</h4>
                <p>
                  <span className={styles.accent}>La société FDM Clean</span>, qui depuis plusieurs
                  années est au service des entreprises. Aujourd&apos;hui, via la marque
                  FemmesDeMenage.Ma, nos collaborateurs se sont lancé une nouvelle mission : œuvrer
                  pour le confort des particuliers avec une équipe de professionnels qui ne cesse
                  d&apos;augmenter jour après jour.
                </p>
              </div>

              <div className={styles.fdmCleanCard}>
                <h4>Une double expertise</h4>
                <p>
                  Forts de notre expérience B2B acquise avec FDM Clean, nous apportons les mêmes
                  standards de qualité et de rigueur dans les foyers marocains. Une même exigence,
                  deux marchés complémentaires.
                </p>
              </div>

              <div className={styles.fdmCleanCard}>
                <h4>Un réseau qui grandit</h4>
                <p>
                  Présents à Casablanca, Fès et Bouskoura, nous étendons continuellement notre
                  réseau d&apos;agentes vérifiées pour couvrir de nouvelles villes et répondre à
                  la demande croissante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOS SERVICES ─── */}
      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesHeader}>
            <span className={`${styles.eyebrow} fi`}>Ce que nous offrons</span>
            <h2 className="fi">Quels sont les services offerts par FemmesDeMenage.Ma</h2>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div
                className={`${styles.serviceCard} fi ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}`}
                key={s.title}
              >
                <div className={styles.svcIcon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOTRE MISSION ─── */}
      <section className={styles.mission}>
        <div className={styles.missionInner}>
          <div className={styles.missionText}>
            <span className={`${styles.eyebrow} fi`}>Notre mission</span>
            <h2 className="fi">Donner de la valeur au travail domestique</h2>
            <p className={`fi d1`}>
              Nous croyons que chaque personne qui travaille mérite d&apos;être reconnue, protégée et
              rémunérée équitablement. C&apos;est pourquoi nous refusons le travail informel et
              accompagnons chaque agente vers un statut déclaré.
            </p>
            <p className={`fi d2`}>
              Notre mission va au-delà du simple service de nettoyage : nous construisons un écosystème
              équitable entre employeurs et employés, fondé sur la confiance et la transparence.
            </p>
          </div>

          <div className={styles.missionValues}>
            {VALUES.map((v, i) => (
              <div
                className={`${styles.missionVal} fi ${i > 0 ? `d${i}` : ""}`}
                key={v.title}
              >
                <div className={styles.missionValIcon}>{v.icon}</div>
                <div className={styles.missionValText}>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <span className={`${styles.eyebrow} fi`}>Rejoignez-nous</span>
          <h2 className="fi">Prêt à travailler avec nous ?</h2>
          <p className="fi">
            Que vous soyez à la recherche d&apos;une agente fiable ou que vous souhaitiez rejoindre
            notre réseau, nous avons la solution pour vous.
          </p>
          <div className={`${styles.ctaBtns} fi`}>
            <Link href="/particulier#reserver" className={styles.btnPrimary}>
              Réserver une prestation →
            </Link>
            <Link href="/fdm-inscription?type=agent" className={styles.btnOutline}>
              🧹 Je suis agente, m&apos;inscrire
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
