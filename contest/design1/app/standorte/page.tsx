import TreatmentRooms from '../components/TreatmentRooms';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standorte | Königs Wusterhausen & Neumarkt i.d.Opf',
    description: 'Hautschimmer Standorte: Ästhetische Medizin in Königs Wusterhausen (Berlin) und NEU ab Oktober 2025 in Neumarkt in der Oberpfalz. Botox, Hyaluron, Faltenbehandlung.',
    keywords: [
        'Hautschimmer Standorte',
        'Ästhetische Medizin Neumarkt',
        'Botox Königs Wusterhausen',
        'Hyaluron Neumarkt Oberpfalz',
        'Kosmetik Neumarkt',
        'Faltenbehandlung Berlin',
    ],
    alternates: {
        canonical: '/standorte',
    },
    openGraph: {
        title: 'Unsere Standorte | Hautschimmer',
        description: 'Besuchen Sie uns in Königs Wusterhausen oder NEU in Neumarkt i.d.Opf. Professionelle ästhetische Behandlungen.',
        url: 'https://hautschimmer.de/standorte',
    },
};

export default function StandortePage() {
    return (
        <div className="pt-24">
            <TreatmentRooms />
        </div>
    );
}
