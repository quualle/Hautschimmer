import About from '../components/About';
import TreatmentRooms from '../components/TreatmentRooms';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Über Uns | Hautschimmer',
    description: 'Lernen Sie Saskia Heer und unsere Praxis kennen.',
};

export default function UeberUnsPage() {
    return (
        <>
            <About />
            <TreatmentRooms />
        </>
    );
}
