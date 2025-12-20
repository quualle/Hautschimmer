import Treatments from '../components/Treatments';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Behandlungen | Botox, Hyaluron, PRP & mehr | Hautschimmer',
    description: 'Alle ästhetischen Behandlungen bei Hautschimmer: Botox, Hyaluron-Filler, PRP-Therapie, Lippenunterspritzung, Mesotherapie u.v.m. Ärztlich durchgeführt.',
    keywords: 'Botox Behandlung, Hyaluron Filler, PRP Therapie, Lippenunterspritzung, Faltenbehandlung, ästhetische Medizin',
    openGraph: {
        title: 'Behandlungen | Hautschimmer - Ästhetische Medizin',
        description: 'Botox, Hyaluron, PRP und mehr: Alle ästhetischen Behandlungen von Ärztin Saskia Heer.',
        url: 'https://hautschimmer.de/behandlungen',
    },
    alternates: {
        canonical: 'https://hautschimmer.de/behandlungen',
    },
};

const faqs = [
    {
        q: 'Welche Behandlungen bietet Hautschimmer an?',
        a: 'Wir bieten ein umfassendes Spektrum ästhetischer Behandlungen: Botox (Muskelrelaxans) für Falten, Hyaluron-Filler für Volumen und Kontur, PRP-Therapie, Mesotherapie, Skin Booster, Polynukleotide, Lipolyse und Vitamin-Infusionen.',
    },
    {
        q: 'Werden alle Behandlungen von einer Ärztin durchgeführt?',
        a: 'Ja, alle Behandlungen werden persönlich von Saskia Heer durchgeführt. Sie ist approbierte Ärztin mit Spezialisierung auf ästhetische Medizin.',
    },
    {
        q: 'Wie lange halten die Ergebnisse?',
        a: 'Die Haltbarkeit variiert: Botox hält ca. 3-6 Monate, Hyaluron-Filler 6-18 Monate je nach Behandlungszone, PRP-Effekte bauen sich über mehrere Sitzungen auf.',
    },
    {
        q: 'Sind die Behandlungen schmerzhaft?',
        a: 'Die meisten Behandlungen sind gut verträglich. Wir verwenden feinste Nadeln und bei Bedarf lokale Betäubung. Die meisten Patienten empfinden nur ein leichtes Pieksen.',
    },
    {
        q: 'An welchen Standorten kann ich mich behandeln lassen?',
        a: 'Hautschimmer bietet Behandlungen an zwei Standorten: Neumarkt i.d.Opf. (Bayern) und Königs Wusterhausen bei Berlin (Brandenburg).',
    },
];

export default function BehandlungenPage() {
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
            { '@type': 'ListItem', position: 2, name: 'Behandlungen', item: 'https://hautschimmer.de/behandlungen' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <Treatments />

            {/* FAQ Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Häufige Fragen zu unseren Behandlungen</h2>
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
                        <p className="text-foreground/60 mb-4">Behandlungen an unseren Standorten:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/neumarkt" className="text-primary hover:underline">Neumarkt i.d.Opf.</Link>
                            <span className="text-foreground/30">|</span>
                            <Link href="/koenigs-wusterhausen" className="text-primary hover:underline">Königs Wusterhausen</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
