import About from '../components/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Über Mich | Hautschimmer',
    description: 'Lernen Sie Saskia Heer kennen - Ihre Expertin für ästhetische Medizin.',
};

export default function UeberUnsPage() {
    return (
        <About />
    );
}
