import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Masseter Botox & Bruxismus Königs Wusterhausen | Hautschimmer',
  description: 'Masseter-Behandlung in Königs Wusterhausen bei Berlin. Hilfe bei Zähneknirschen (Bruxismus) und Gesichtsverschmälerung. Ärztin Saskia Heer.',
  keywords: 'Masseter Botox KW, Bruxismus Behandlung Berlin Süd, Zähneknirschen Brandenburg, Gesichtsverschmälerung',
  openGraph: {
    title: 'Masseter & Bruxismus Behandlung KW | Hautschimmer',
    description: 'Professionelle Masseter-Behandlung in Königs Wusterhausen. Hilfe bei Zähneknirschen.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen/masseter-bruxismus',
  },
  alternates: { canonical: 'https://hautschimmer.de/koenigs-wusterhausen/masseter-bruxismus' },
}

const faqs = [
  {
    q: 'Was ist eine Masseter-Behandlung?',
    a: 'Botulinumtoxin wird in den Kaumuskel injiziert. Dies entspannt den Muskel und kann Beschwerden durch Zähneknirschen lindern.',
  },
  {
    q: 'Hilft die Behandlung bei Zähneknirschen?',
    a: 'Ja, sehr effektiv. Sie reduziert die Kraft des Kaumuskels und kann Kieferschmerzen und Kopfschmerzen vermindern.',
  },
  {
    q: 'Wie funktioniert die Gesichtsverschmälerung?',
    a: 'Durch die Entspannung nimmt der Kaumuskel an Volumen ab. Das Gesicht wirkt schmaler.',
  },
  {
    q: 'Wie lange hält die Wirkung?',
    a: 'Die Wirkung hält 4-6 Monate. Bei regelmäßiger Behandlung verliert der Muskel dauerhaft an Volumen.',
  },
]

export default function MasseterKWPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Masseter-Behandlung',
    description: 'Behandlung des Kaumuskels mit Botulinumtoxin in Königs Wusterhausen.',
    procedureType: 'Cosmetic',
    bodyLocation: 'Jaw',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Königs Wusterhausen', item: 'https://hautschimmer.de/koenigs-wusterhausen' },
      { '@type': 'ListItem', position: 3, name: 'Masseter', item: 'https://hautschimmer.de/koenigs-wusterhausen/masseter-bruxismus' },
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
            <span className="text-foreground">Masseter / Bruxismus</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Kieferbehandlung</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Masseter & Bruxismus in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Effektive Behandlung bei Zähneknirschen und ästhetische Gesichtsverschmälerung.
              Ideal erreichbar aus Berlin.
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
            <h2 className="font-serif text-3xl text-foreground mb-8">Medizinisch & Ästhetisch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Medizinische Vorteile</h3>
                <ul className="space-y-3">
                  {['Linderung von Kieferschmerzen', 'Reduktion von Kopfschmerzen', 'Schutz der Zähne', 'Muskelentspannung', 'Bessere Schlafqualität'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/70">
                      <CheckCircle className="text-primary flex-shrink-0" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-4">Ästhetische Vorteile</h3>
                <ul className="space-y-3">
                  {['Gesichtsverschmälerung', 'Weichere Konturen', 'Feminisierung der Kieferlinie', 'V-Shape Effekt', 'Harmonischere Proportionen'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/70">
                      <CheckCircle className="text-primary flex-shrink-0" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">So läuft die Behandlung ab</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Beratung', desc: 'Analyse Ihrer Beschwerden und Wünsche.' },
              { step: '2', title: 'Behandlung', desc: 'Präzise Injektion, Dauer ca. 10-15 Minuten.' },
              { step: '3', title: 'Ergebnis', desc: 'Volle Wirkung nach ca. 4 Wochen.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-secondary/10 py-16 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Masseter-Behandlung in KW</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Bahnhofstraße 8, 15711 Königs Wusterhausen</span>
              </div>
              <p className="text-foreground/50 text-sm mb-4">im Kosmetikstudio Glam & Glow Beauty</p>
              <p className="text-foreground/70 mb-6">
                Direkt am Bahnhof – schnell erreichbar aus Berlin.
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
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Schluss mit Zähneknirschen</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie Ihr Beratungsgespräch in Königs Wusterhausen.
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
