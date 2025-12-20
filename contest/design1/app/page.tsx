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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Philosophy />
      <Testimonials />
      <BlogCTA />
    </main>
  );
}
