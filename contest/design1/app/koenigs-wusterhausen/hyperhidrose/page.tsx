import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hyperhidrose Behandlung Königs Wusterhausen | Schwitzen | Hautschimmer',
  description: 'Hyperhidrose-Behandlung in Königs Wusterhausen bei Berlin. Übermäßiges Schwitzen effektiv behandeln. Ärztin Saskia Heer.',
  keywords: 'Hyperhidrose KW, Schwitzen behandeln Berlin Süd, Achselschweiß Brandenburg, Botox Schwitzen',
  openGraph: {
    title: 'Hyperhidrose Behandlung KW | Hautschimmer',
    description: 'Effektive Behandlung bei übermäßigem Schwitzen in Königs Wusterhausen.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen/hyperhidrose',
  },
  alternates: { canonical: 'https://hautschimmer.de/koenigs-wusterhausen/hyperhidrose' },
}

const faqs = [
  {
    q: 'Was ist Hyperhidrose?',
    a: 'Übermäßiges Schwitzen, das über das normale Maß hinausgeht – oft unabhängig von Temperatur oder Anstrengung.',
  },
  {
    q: 'Wie funktioniert die Behandlung?',
    a: 'Botulinumtoxin blockiert die Nervenimpulse zu den Schweißdrüsen und reduziert die Schweißproduktion deutlich.',
  },
  {
    q: 'Welche Körperstellen können behandelt werden?',
    a: 'Am häufigsten Achseln, aber auch Hände, Füße und Stirn.',
  },
  {
    q: 'Wie lange hält die Wirkung?',
    a: '6-12 Monate, bei Achseln oft sogar länger.',
  },
]

export default function HyperhidroseKWPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Hyperhidrose-Behandlung',
    description: 'Behandlung von übermäßigem Schwitzen in Königs Wusterhausen.',
    procedureType: 'Therapeutic',
    bodyLocation: 'Axillae, Hands, Feet',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Königs Wusterhausen', item: 'https://hautschimmer.de/koenigs-wusterhausen' },
      { '@type': 'ListItem', position: 3, name: 'Hyperhidrose', item: 'https://hautschimmer.de/koenigs-wusterhausen/hyperhidrose' },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-6 mb-8">
          <nav className="text-sm text-foreground/60">
            <Link href="/" className="hover:text-primary">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/koenigs-wusterhausen" className="hover:text-primary">Königs Wusterhausen</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Hyperhidrose</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Droplets className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Schweißbehandlung</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Hyperhidrose-Behandlung in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Übermäßiges Schwitzen effektiv reduzieren – für mehr Lebensqualität im Alltag.
              Ideal erreichbar aus Berlin und Brandenburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kontakt" className="bg-primary text-white px-8 py-4 rounded-full text-center font-medium hover:bg-accent transition-colors">
                Beratungstermin buchen
              </Link>
              <Link href="/preise" className="border border-primary text-primary px-8 py-4 rounded-full text-center font-medium hover:bg-primary/5 transition-colors">
                Preise ansehen
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-foreground mb-8">Leben ohne übermäßiges Schwitzen</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="prose text-foreground/70">
                <p>
                  Hyperhidrose beeinträchtigt den Alltag erheblich. Ständig nasse Achseln oder
                  schweißnasse Hände können das Selbstbewusstsein stark belasten.
                </p>
                <p>
                  Die Behandlung mit Botulinumtoxin ist eine bewährte, sichere Methode, die
                  übermäßige Schweißproduktion effektiv zu reduzieren.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground mb-4">Behandelbare Bereiche</h3>
                {['Achseln (häufigste Anwendung)', 'Hände', 'Füße', 'Stirn', 'Haaransatz'].map((zone, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground/70">{zone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Vorteile der Behandlung</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Hohe Wirksamkeit', desc: 'Bis zu 90% weniger Schwitzen.' },
              { title: 'Lange Wirkdauer', desc: '6-12 Monate, bei Achseln oft länger.' },
              { title: 'Mehr Lebensqualität', desc: 'Endlich sorglos Kleidung wählen.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/10 py-16 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Hyperhidrose-Behandlung in KW</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Bahnhofstraße 8, 15711 Königs Wusterhausen</span>
              </div>
              <p className="text-foreground/50 text-sm mb-4">im Kosmetikstudio Glam & Glow Beauty</p>
              <p className="text-foreground/70 mb-6">
                Diskreter Service für Patienten aus Berlin und Brandenburg.
              </p>
              <Link href="/koenigs-wusterhausen" className="text-primary hover:underline inline-flex items-center gap-2">
                Mehr zum Standort <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl shadow-sm group">
                <summary className="p-6 cursor-pointer font-medium text-foreground hover:text-primary transition-colors list-none flex justify-between items-center">
                  {faq.q}<span className="text-primary ml-4">+</span>
                </summary>
                <div className="px-6 pb-6 text-foreground/70">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Endlich trocken bleiben</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich beraten, wie wir bei übermäßigem Schwitzen helfen können.
            </p>
            <Link href="/kontakt" className="inline-block bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors">
              Jetzt Termin vereinbaren
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
