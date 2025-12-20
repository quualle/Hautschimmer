import Pricing from '../components/Pricing';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Preise | Botox ab 199€, Hyaluron ab 189€ | Hautschimmer',
    description: 'Transparente Preise für Botox, Hyaluron, PRP & mehr. Botox ab 199€/Zone, Lippen ab 189€, Hyaluron 299€/ml. Ärztliche Behandlung in Neumarkt & Berlin.',
    keywords: 'Botox Preise, Hyaluron Kosten, Lippenunterspritzung Preise, PRP Kosten, ästhetische Medizin Preise',
    openGraph: {
        title: 'Preise | Hautschimmer - Ästhetische Medizin',
        description: 'Transparente Preise: Botox ab 199€, Lippen ab 189€, Hyaluron 299€/ml. Ärztlich durchgeführt.',
        url: 'https://hautschimmer.de/preise',
    },
    alternates: {
        canonical: 'https://hautschimmer.de/preise',
    },
};

const faqs = [
    {
        q: 'Was kostet eine Botox-Behandlung?',
        a: 'Eine Botox-Zone (z.B. Stirn, Zornesfalte oder Krähenfüße) kostet 199€. Bei 2 Zonen zahlen Sie 299€, bei 3 Zonen 399€. Ein Lip Flip kostet 149€.',
    },
    {
        q: 'Was kostet Lippen aufspritzen mit Hyaluron?',
        a: 'Die Lippenunterspritzung beginnt ab 189€. Der Preis hängt von der gewünschten Menge und dem Behandlungsziel ab. Eine genaue Einschätzung erfolgt im Beratungsgespräch.',
    },
    {
        q: 'Sind die Preise an beiden Standorten gleich?',
        a: 'Ja, unsere Preise gelten einheitlich für beide Standorte in Neumarkt i.d.Opf. und Königs Wusterhausen.',
    },
    {
        q: 'Gibt es eine Beratungsgebühr?',
        a: 'Die Erstberatung ist bei einer anschließenden Behandlung kostenfrei. Eine separate Beratung ohne Behandlung wird mit 50€ berechnet, die bei späterer Behandlung angerechnet wird.',
    },
    {
        q: 'Welche Zahlungsmethoden werden akzeptiert?',
        a: 'Wir akzeptieren Barzahlung, EC-Karte und Kreditkarte. Die Bezahlung erfolgt direkt nach der Behandlung.',
    },
];

export default function PreisePage() {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
            { '@type': 'ListItem', position: 2, name: 'Preise', item: 'https://hautschimmer.de/preise' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <Pricing />

            {/* FAQ Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Häufige Fragen zu unseren Preisen</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="bg-white rounded-2xl shadow-sm group">
                                <summary className="p-6 cursor-pointer font-medium text-foreground hover:text-primary transition-colors list-none flex justify-between items-center">
                                    {faq.q}
                                    <span className="text-primary ml-4">+</span>
                                </summary>
                                <div className="px-6 pb-6 text-foreground/70">{faq.a}</div>
                            </details>
                        ))}
                    </div>

                    {/* Internal Links */}
                    <div className="mt-12 text-center">
                        <p className="text-foreground/60 mb-4">Mehr erfahren:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/behandlungen" className="text-primary hover:underline">Alle Behandlungen</Link>
                            <span className="text-foreground/30">|</span>
                            <Link href="/neumarkt" className="text-primary hover:underline">Standort Neumarkt</Link>
                            <span className="text-foreground/30">|</span>
                            <Link href="/koenigs-wusterhausen" className="text-primary hover:underline">Standort KW</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
