import { Metadata } from 'next';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import BlogCTA from './components/BlogCTA';

export const metadata: Metadata = {
  title: 'Hautschimmer | Ästhetische Medizin Saskia Heer - Botox & Hyaluron',
  description: 'Professionelle Botox- und Hyaluron-Behandlungen durch Ärztin Saskia Heer. Standorte in Neumarkt i.d.Opf. und Königs Wusterhausen bei Berlin. Natürliche Ergebnisse.',
  keywords: 'Botox, Hyaluron, Ästhetische Medizin, Faltenbehandlung, Neumarkt, Königs Wusterhausen, Berlin, Saskia Heer, Lippenunterspritzung',
  openGraph: {
    title: 'Hautschimmer | Ästhetische Medizin für natürliche Schönheit',
    description: 'Botox & Hyaluron durch Ärztin Saskia Heer. Standorte: Neumarkt i.d.Opf. & Königs Wusterhausen/Berlin.',
    url: 'https://hautschimmer.de',
    siteName: 'Hautschimmer',
    type: 'website',
    images: [
      {
        url: 'https://hautschimmer.de/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hautschimmer - Ästhetische Medizin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hautschimmer | Ästhetische Medizin Saskia Heer',
    description: 'Professionelle Botox- und Hyaluron-Behandlungen. Standorte in Neumarkt & Berlin.',
  },
  alternates: {
    canonical: 'https://hautschimmer.de',
  },
};

// Organization Schema for Google Rich Results
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': 'https://hautschimmer.de/#organization',
  name: 'Hautschimmer',
  alternateName: 'Hautschimmer - Ästhetische Medizin Saskia Heer',
  url: 'https://hautschimmer.de',
  logo: 'https://hautschimmer.de/images/logo.jpg',
  description: 'Professionelle Botox- und Hyaluron-Behandlungen durch Ärztin Saskia Heer. Standorte in Neumarkt i.d.Opf. und Königs Wusterhausen bei Berlin.',
  telephone: '+49 173 8615766',
  email: 'saskia.hautschimmer@gmail.com',
  medicalSpecialty: 'Aesthetic Medicine',
  founder: {
    '@type': 'Person',
    name: 'Saskia Heer',
    jobTitle: 'Ärztin',
  },
  sameAs: [
    'https://www.instagram.com/hautschimmer',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Mussinanstraße 65',
      addressLocality: 'Neumarkt in der Oberpfalz',
      postalCode: '92318',
      addressCountry: 'DE',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstraße 8',
      addressLocality: 'Königs Wusterhausen',
      postalCode: '15711',
      addressCountry: 'DE',
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://hautschimmer.de/#website',
  url: 'https://hautschimmer.de',
  name: 'Hautschimmer',
  description: 'Ästhetische Medizin für natürliche Schönheit',
  publisher: {
    '@id': 'https://hautschimmer.de/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://hautschimmer.de/blog?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="min-h-screen">
        <Hero />
        <Philosophy />
        <Testimonials />
        <BlogCTA />
      </main>
    </>
  );
}
