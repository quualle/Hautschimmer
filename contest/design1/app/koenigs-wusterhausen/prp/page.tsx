import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PRP Therapie Königs Wusterhausen | Vampir Lifting | Hautschimmer',
  description: 'PRP-Therapie (Vampir Lifting) in Königs Wusterhausen bei Berlin. Eigenbluttherapie für Hautverjüngung und Haarwachstum. Ärztin Saskia Heer.',
  keywords: 'PRP Therapie KW, Vampir Lifting Berlin Süd, Eigenbluttherapie Brandenburg, PRP Haare',
  openGraph: {
    title: 'PRP-Therapie Königs Wusterhausen | Hautschimmer',
    description: 'Natürliche Hautverjüngung mit PRP in KW. Eigenbluttherapie durch Ärztin Saskia Heer.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen/prp',
  },
  alternates: { canonical: 'https://hautschimmer.de/koenigs-wusterhausen/prp' },
}

const faqs = [
  {
    q: 'Was ist PRP?',
    a: 'Platelet-Rich Plasma – ein Konzentrat aus Ihrem eigenen Blut, reich an Wachstumsfaktoren für natürliche Regeneration.',
  },
  {
    q: 'Wofür wird PRP verwendet?',
    a: 'Hautverjüngung (Vampir Lifting), Hautqualität verbessern, Haarausfall behandeln, Narbenbehandlung.',
  },
  {
    q: 'Ist PRP sicher?',
    a: 'Da nur körpereigenes Material verwendet wird, sind allergische Reaktionen ausgeschlossen.',
  },
  {
    q: 'Wie viele Behandlungen sind nötig?',
    a: '3-4 Behandlungen im Abstand von 4-6 Wochen für optimale Ergebnisse.',
  },
]

export default function PRPKWPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'PRP-Therapie',
    description: 'Eigenbluttherapie zur Hautverjüngung in Königs Wusterhausen.',
    procedureType: 'Therapeutic',
    bodyLocation: 'Face, Scalp',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Königs Wusterhausen', item: 'https://hautschimmer.de/koenigs-wusterhausen' },
      { '@type': 'ListItem', position: 3, name: 'PRP', item: 'https://hautschimmer.de/koenigs-wusterhausen/prp' },
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
            <span className="text-foreground">PRP-Therapie</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Eigenbluttherapie</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              PRP-Therapie in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Natürliche Hautverjüngung mit der Kraft Ihres eigenen Körpers.
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
            <h2 className="font-serif text-3xl text-foreground mb-8">So funktioniert PRP</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="prose text-foreground/70">
                <p>
                  Bei der PRP-Therapie wird eine kleine Menge Blut entnommen und zentrifugiert.
                  Das gewonnene plättchenreiche Plasma enthält hochkonzentrierte Wachstumsfaktoren.
                </p>
                <p>
                  Diese werden durch Microneedling oder Injektionen eingebracht und regen
                  die Kollagenproduktion und natürliche Regeneration an.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground mb-4">Anwendungsgebiete</h3>
                {['Gesichtsverjüngung (Vampir Lifting)', 'Hautstruktur verbessern', 'Haarausfall / dünnes Haar', 'Narbenbehandlung', 'Dekolleté & Hände'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Vorteile der PRP-Therapie</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '100% Körpereigen', desc: 'Keine Fremdstoffe, keine Allergien.' },
              { title: 'Natürliche Ergebnisse', desc: 'Aktivierung der körpereigenen Regeneration.' },
              { title: 'Vielseitig', desc: 'Für Haut und Haare wirksam.' },
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
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">PRP in Königs Wusterhausen</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Bahnhofstraße 8, 15711 Königs Wusterhausen</span>
              </div>
              <p className="text-foreground/50 text-sm mb-4">im Kosmetikstudio Glam & Glow Beauty</p>
              <p className="text-foreground/70 mb-6">
                Ideal erreichbar aus Berlin und Brandenburg.
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
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Natürliche Verjüngung erleben</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Erfahren Sie mehr über die PRP-Therapie im persönlichen Beratungsgespräch.
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
