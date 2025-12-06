import Treatments from '../components/Treatments';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Behandlungen | Hautschimmer',
    description: 'Entdecken Sie unser exklusives Angebot an ästhetischen Behandlungen.',
};

export default function BehandlungenPage() {
    return (
        <>
            <Treatments />
        </>
    );
}
