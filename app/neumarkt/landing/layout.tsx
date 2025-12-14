import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ästhetische Medizin Neumarkt i.d.Opf | Hautschimmer - Botox & Hyaluron',
  description: 'Ästhetische Behandlungen in Neumarkt i.d.Opf: Botulinumtoxin, Hyaluronsäure, PRP. Ärztliche Behandlung durch Ärztin Saskia Heer. Natürliche Ergebnisse, individuelle Beratung. Jetzt Termin buchen!',
  keywords: 'Botox Neumarkt, Hyaluron Neumarkt, ästhetische Medizin Neumarkt, Faltenbehandlung Neumarkt, Lippenunterspritzung Neumarkt, PRP Neumarkt, Hautschimmer, Saskia Heer',
  openGraph: {
    title: 'Ästhetische Medizin in Neumarkt i.d.Opf | Hautschimmer',
    description: 'Botulinumtoxin & Hyaluronsäure – natürlich, ärztlich, diskret. Jetzt Termin buchen!',
    url: 'https://hautschimmer.de/neumarkt/landing',
    siteName: 'Hautschimmer',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Hautschimmer - Ästhetische Medizin Neumarkt'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ästhetische Medizin Neumarkt | Hautschimmer',
    description: 'Botulinumtoxin & Hyaluronsäure – natürlich, ärztlich, diskret.',
    images: ['/images/logo.jpg']
  },
  alternates: {
    canonical: 'https://hautschimmer.de/neumarkt/landing'
  },
  robots: {
    index: true,
    follow: true
  }
};

// JSON-LD structured data for local business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Hautschimmer - Ästhetische Medizin Neumarkt',
  description: 'Ästhetische Behandlungen mit Botulinumtoxin und Hyaluronsäure in Neumarkt i.d.Opf. Ärztliche Behandlung, natürliche Ergebnisse.',
  url: 'https://hautschimmer.de/neumarkt/landing',
  telephone: '+491738615766',
  email: 'saskia.hautschimmer@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mussinanstraße 65',
    addressLocality: 'Neumarkt in der Oberpfalz',
    postalCode: '92318',
    addressCountry: 'DE'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.2803,
    longitude: 11.4608
  },
  priceRange: '$$',
  medicalSpecialty: 'Aesthetic Medicine',
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Botulinumtoxin-Behandlung',
      description: 'Faltenbehandlung mit Botulinumtoxin für Stirn, Zornesfalte und Krähenfüße'
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Hyaluronsäure-Filler',
      description: 'Volumenaufbau und Konturierung mit Hyaluronsäure'
    },
    {
      '@type': 'MedicalProcedure',
      name: 'PRP-Behandlung',
      description: 'Eigenblutbehandlung zur Hautregeneration'
    }
  ]
};

export default function NeumarktLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
