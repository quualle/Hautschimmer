import TreatmentRooms from '../components/TreatmentRooms';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standorte | Neumarkt i.d.Opf & Königs Wusterhausen | Hautschimmer',
    description: 'Hautschimmer Standorte: Ästhetische Medizin in Neumarkt i.d.Opf und Königs Wusterhausen bei Berlin. Botox, Hyaluron, Faltenbehandlung durch Ärztin Saskia Heer.',
    keywords: [
        'Hautschimmer Standorte',
        'Ästhetische Medizin Neumarkt',
        'Botox Königs Wusterhausen',
        'Hyaluron Neumarkt Oberpfalz',
        'Kosmetik Neumarkt',
        'Faltenbehandlung Brandenburg',
    ],
    alternates: {
        canonical: 'https://hautschimmer.de/standorte',
    },
    openGraph: {
        title: 'Unsere Standorte | Hautschimmer',
        description: 'Besuchen Sie uns in Neumarkt i.d.Opf oder Königs Wusterhausen. Professionelle ästhetische Behandlungen durch Ärztin Saskia Heer.',
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
