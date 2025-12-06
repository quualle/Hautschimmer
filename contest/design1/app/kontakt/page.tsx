import Contact from '../components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakt | Hautschimmer',
    description: 'Vereinbaren Sie Ihren Termin bei Hautschimmer.',
};

export default function KontaktPage() {
    return (
        <>
            <Contact />
        </>
    );
}
