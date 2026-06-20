import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Femmes de Ménage Maroc — Particuliers, Entreprises & Annuaire d'agentes",
  description:
    "Service de nettoyage clé en main pour particuliers et entreprises, ou trouvez votre agente en direct dans notre annuaire. Casablanca, Fès, Bouskoura.",
  alternates: {
    canonical: "https://femmesdemenage.ma/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Femmes de Ménage Maroc",
  url: "https://femmesdemenage.ma",
  logo: "https://femmesdemenage.ma/logo.png",
  telephone: "+212695439595",
  email: "contact@femmesdemenage.ma",
  priceRange: "250–2890 DH",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "6000",
    bestRating: "5",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressRegion: "Casablanca-Settat",
    addressCountry: "MA",
  },
  areaServed: [
    { "@type": "City", name: "Casablanca" },
    { "@type": "City", name: "Fès" },
    { "@type": "City", name: "Bouskoura" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de nettoyage",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Femme de ménage Casablanca" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nounou à domicile Casablanca" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cuisinière à domicile" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage vitres" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nettoyage bureaux Casablanca" } },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}

        {/* Meta / Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1371745494114088');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1371745494114088&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
