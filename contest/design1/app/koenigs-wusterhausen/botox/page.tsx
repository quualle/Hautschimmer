import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Syringe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Botox Königs Wusterhausen | Faltenbehandlung Berlin-Süd | Hautschimmer',
  description: 'Professionelle Botox-Behandlung in Königs Wusterhausen bei Berlin. Zornesfalten, Stirnfalten & Krähenfüße sanft glätten. Ärztin Saskia Heer.',
  keywords: 'Botox Königs Wusterhausen, Faltenbehandlung KW, Botox Berlin Süd, Stirnfalten Brandenburg',
  openGraph: {
    title: 'Botox-Behandlung Königs Wusterhausen | Hautschimmer',
    description: 'Professionelle Botox-Behandlung in KW. Natürliche Faltenglättung durch Ärztin Saskia Heer.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen/botox',
  },
  alternates: { canonical: 'https://hautschimmer.de/koenigs-wusterhausen/botox' },
}

const faqs = [
  {
    q: 'Wie läuft eine Botox-Behandlung in Königs Wusterhausen ab?',
    a: 'Nach einem ausführlichen Beratungsgespräch markiert Ärztin Saskia Heer die Behandlungspunkte. Die Injektion erfolgt mit feinsten Nadeln und dauert nur wenige Minuten.',
  },
  {
    q: 'Wie lange hält Botox?',
    a: 'Die Wirkung hält in der Regel 3-6 Monate an. Bei regelmäßiger Behandlung kann sich die Wirkdauer verlängern.',
  },
  {
    q: 'Was kostet Botox in Königs Wusterhausen?',
    a: 'Die Preise beginnen ab 199€ pro Zone. Eine genaue Auskunft erhalten Sie im Beratungsgespräch oder auf unserer Preisseite.',
  },
  {
    q: 'Wie komme ich aus Berlin zur Praxis?',
    a: 'Königs Wusterhausen ist bestens angebunden. Mit der S46 aus Berlin sind Sie in ca. 45 Minuten da. Die Praxis liegt direkt am Bahnhof.',
  },
]

export default function BotoxKWPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Botox-Behandlung',
    description: 'Professionelle Faltenbehandlung mit Botulinumtoxin in Königs Wusterhausen.',
    procedureType: 'Cosmetic',
    bodyLocation: 'Face',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Königs Wusterhausen', item: 'https://hautschimmer.de/koenigs-wusterhausen' },
      { '@type': 'ListItem', position: 3, name: 'Botox', item: 'https://hautschimmer.de/koenigs-wusterhausen/botox' },
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
            <span className="text-foreground">Botox</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Syringe className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Faltenbehandlung</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Botox-Behandlung in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Sanfte Faltenglättung für ein frisches, natürliches Aussehen – ideal erreichbar aus Berlin.
              Ärztin Saskia Heer behandelt Zornesfalten, Stirnfalten und Krähenfüße mit höchster Präzision.
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
            <h2 className="font-serif text-3xl text-foreground mb-8">Was ist Botox?</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="prose text-foreground/70">
                <p>
                  Botulinumtoxin, kurz Botox, ist ein bewährtes Mittel zur Glättung mimischer Falten.
                  Es entspannt gezielt die Muskulatur, die für Falten wie Zornesfalten, Stirnfalten
                  oder Krähenfüße verantwortlich ist.
                </p>
                <p>
                  Die Behandlung ist minimal-invasiv, nahezu schmerzfrei und zeigt nach wenigen Tagen
                  ihre volle Wirkung.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground mb-4">Behandlungszonen</h3>
                {['Zornesfalte (Glabellafalte)', 'Stirnfalten', 'Krähenfüße', 'Bunny Lines', 'Lippenfalten (Lip Flip)', 'Nefertiti Lift'].map((zone, i) => (
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
          <h2 className="font-serif text-3xl text-foreground mb-8">Vorteile der Botox-Behandlung</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Schnell & Effektiv', desc: 'Die Behandlung dauert nur 15-20 Minuten.' },
              { title: 'Natürliche Ergebnisse', desc: 'Erhalt Ihrer natürlichen Mimik.' },
              { title: 'Keine Ausfallzeit', desc: 'Direkt wieder im Alltag einsetzbar.' },
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
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Botox in Königs Wusterhausen</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Bahnhofstraße 8, 15711 Königs Wusterhausen</span>
              </div>
              <p className="text-foreground/50 text-sm mb-4">im Kosmetikstudio Glam & Glow Beauty</p>
              <p className="text-foreground/70 mb-6">
                Direkt am Bahnhof KW – ideal erreichbar aus Berlin-Treptow, Köpenick und ganz Brandenburg.
              </p>
              <Link href="/koenigs-wusterhausen" className="text-primary hover:underline inline-flex items-center gap-2">
                Mehr zum Standort <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Häufige Fragen zu Botox in KW</h2>
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
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Bereit für Ihre Botox-Behandlung?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie Ihr unverbindliches Beratungsgespräch in Königs Wusterhausen.
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
