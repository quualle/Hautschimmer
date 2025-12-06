import TreatmentRooms from '../components/TreatmentRooms';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Unsere Standorte | Hautschimmer',
    description: 'Besuchen Sie uns an unseren exklusiven Standorten in Königs Wusterhausen und Neumarkt i.d.Opf.',
};

export default function StandortePage() {
    return (
        <div className="pt-24">
            <TreatmentRooms />
        </div>
    );
}
