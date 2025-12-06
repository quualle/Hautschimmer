import Pricing from '../components/Pricing';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preise | Hautschimmer',
    description: 'Transparente Preise für unsere ästhetischen Behandlungen.',
};

export default function PreisePage() {
    return (
        <>
            <Pricing />
        </>
    );
}
