import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hyaluron Filler Königs Wusterhausen | Volumen & Kontur | Hautschimmer',
  description: 'Professionelle Hyaluron-Behandlung in Königs Wusterhausen bei Berlin. Volumenaufbau & Konturierung. Ärztin Saskia Heer für natürliche Ergebnisse.',
  keywords: 'Hyaluron Königs Wusterhausen, Filler KW, Volumenaufbau Berlin Süd, Faltenunterspritzung Brandenburg',
  openGraph: {
    title: 'Hyaluron-Behandlung Königs Wusterhausen | Hautschimmer',
    description: 'Professionelle Hyaluron-Filler in KW. Natürlicher Volumenaufbau durch Ärztin Saskia Heer.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen/hyaluron',
  },
  alternates: { canonical: 'https://hautschimmer.de/koenigs-wusterhausen/hyaluron' },
}

const faqs = [
  {
    q: 'Welche Bereiche können mit Hyaluron behandelt werden?',
    a: 'Hyaluron-Filler eignen sich für Lippen, Wangen, Kinn, Jawline, Nasolabialfalten, Marionettenfalten, Tränenrinne und mehr.',
  },
  {
    q: 'Wie lange hält Hyaluron?',
    a: 'Je nach Behandlungszone hält Hyaluron zwischen 6 und 18 Monaten.',
  },
  {
    q: 'Ist die Behandlung schmerzhaft?',
    a: 'Die meisten Filler enthalten bereits ein Betäubungsmittel. Die Behandlung ist gut tolerierbar.',
  },
  {
    q: 'Wie erreiche ich die Praxis aus Berlin?',
    a: 'Mit der S46 oder RE2 aus Berlin sind Sie schnell am Bahnhof KW. Die Praxis liegt direkt dort.',
  },
]

export default function HyaluronKWPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Hyaluron-Filler-Behandlung',
    description: 'Professioneller Volumenaufbau und Konturierung mit Hyaluronsäure in Königs Wusterhausen.',
    procedureType: 'Cosmetic',
    bodyLocation: 'Face',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Königs Wusterhausen', item: 'https://hautschimmer.de/koenigs-wusterhausen' },
      { '@type': 'ListItem', position: 3, name: 'Hyaluron', item: 'https://hautschimmer.de/koenigs-wusterhausen/hyaluron' },
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
            <span className="text-foreground">Hyaluron</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Droplets className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Volumenaufbau</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Hyaluron-Filler in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Natürlicher Volumenaufbau und Konturierung mit hochwertiger Hyaluronsäure.
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
            <h2 className="font-serif text-3xl text-foreground mb-8">Was ist Hyaluronsäure?</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="prose text-foreground/70">
                <p>
                  Hyaluronsäure ist ein natürlicher Bestandteil unserer Haut. Mit dem Alter nimmt
                  der körpereigene Hyalurongehalt ab.
                </p>
                <p>
                  Mit hochwertigen Fillern können wir gezielt Volumenverluste ausgleichen und
                  Konturen definieren – für ein frisches, natürliches Aussehen.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground mb-4">Behandlungsbereiche</h3>
                {['Lippen (Volumen & Definition)', 'Wangen & Wangenknochen', 'Nasolabialfalten', 'Marionettenfalten', 'Kinn & Jawline', 'Tränenrinne'].map((zone, i) => (
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
          <h2 className="font-serif text-3xl text-foreground mb-8">Vorteile von Hyaluron-Fillern</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Sofort sichtbar', desc: 'Ergebnisse unmittelbar nach der Behandlung.' },
              { title: 'Reversibel', desc: 'Kann bei Bedarf aufgelöst werden.' },
              { title: 'Natürliches Gefühl', desc: 'Moderne Filler fühlen sich natürlich an.' },
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
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Hyaluron in Königs Wusterhausen</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Bahnhofstraße 8, 15711 Königs Wusterhausen</span>
              </div>
              <p className="text-foreground/50 text-sm mb-4">im Kosmetikstudio Glam & Glow Beauty</p>
              <p className="text-foreground/70 mb-6">
                Direkt am Bahnhof – ideal für Patienten aus Berlin und Brandenburg.
              </p>
              <Link href="/koenigs-wusterhausen" className="text-primary hover:underline inline-flex items-center gap-2">
                Mehr zum Standort <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Häufige Fragen zu Hyaluron in KW</h2>
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
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Bereit für Ihre Hyaluron-Behandlung?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich persönlich von Ärztin Saskia Heer beraten.
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
