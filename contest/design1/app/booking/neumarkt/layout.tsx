import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termin buchen Neumarkt i.d.Opf | Botox & Hyaluron',
  description: 'Online Terminbuchung für ästhetische Behandlungen in Neumarkt in der Oberpfalz. Botox, Hyaluron, Lippenunterspritzung bei Hautschimmer. Jetzt Termin vereinbaren!',
  keywords: [
    'Botox Neumarkt',
    'Hyaluron Neumarkt',
    'Faltenbehandlung Neumarkt',
    'Ästhetische Medizin Neumarkt',
    'Lippenunterspritzung Neumarkt',
    'Hautschimmer Neumarkt',
    'Kosmetische Behandlung Neumarkt Oberpfalz',
    'Anti-Aging Neumarkt',
    'Termin buchen Neumarkt'
  ],
  alternates: {
    canonical: '/booking/neumarkt',
  },
  openGraph: {
    title: 'Termin buchen | Hautschimmer Neumarkt i.d.Opf',
    description: 'Online Terminbuchung für Botox, Hyaluron und weitere ästhetische Behandlungen in Neumarkt. Professionell & ärztlich durchgeführt.',
    url: 'https://hautschimmer.de/booking/neumarkt',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function NeumarktBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
