import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, ArrowRight, Smile } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lippen aufspritzen Neumarkt i.d.Opf | Lippenvergrößerung | Hautschimmer',
  description: 'Natürliche Lippenvergrößerung in Neumarkt i.d.Opf. Lippen aufspritzen mit Hyaluron für volle, definierte Lippen. Ärztin Saskia Heer.',
  keywords: 'Lippen aufspritzen Neumarkt, Lippenvergrößerung Oberpfalz, Lippen Hyaluron Neumarkt, Lippenfiller',
  openGraph: {
    title: 'Lippen aufspritzen Neumarkt | Hautschimmer',
    description: 'Natürliche Lippenvergrößerung in Neumarkt. Schöne, volle Lippen durch Ärztin Saskia Heer.',
    url: 'https://hautschimmer.de/neumarkt/lippen',
  },
  alternates: { canonical: 'https://hautschimmer.de/neumarkt/lippen' },
}

const faqs = [
  {
    q: 'Wie viel Hyaluron benötige ich für schöne Lippen?',
    a: 'Für ein dezentes Ergebnis reichen oft 0,5-1 ml Hyaluron. Für deutlichere Vergrößerung können auch 1-2 ml sinnvoll sein. In der Beratung besprechen wir Ihre Wünsche und empfehlen die passende Menge.',
  },
  {
    q: 'Sehen die Lippen danach natürlich aus?',
    a: 'Natürlichkeit hat bei uns höchste Priorität. Ärztin Saskia Heer achtet auf harmonische Proportionen und ein Ergebnis, das zu Ihrem Gesicht passt – keine "Schlauchboot-Lippen".',
  },
  {
    q: 'Wie lange halten Lippenfiller?',
    a: 'Hyaluron in den Lippen hält in der Regel 6-12 Monate, da die Lippen stark durchblutet sind und das Produkt schneller abgebaut wird.',
  },
  {
    q: 'Ist Lippen aufspritzen schmerzhaft?',
    a: 'Die meisten Patienten empfinden nur ein leichtes Pieksen. Die Lippen werden vor der Behandlung betäubt, sodass der Eingriff gut tolerierbar ist.',
  },
]

export default function LippenNeumarktPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Lippenaugmentation',
    description: 'Natürliche Lippenvergrößerung und -definition mit Hyaluronsäure.',
    procedureType: 'Cosmetic',
    bodyLocation: 'Lips',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://hautschimmer.de' },
      { '@type': 'ListItem', position: 2, name: 'Neumarkt', item: 'https://hautschimmer.de/neumarkt' },
      { '@type': 'ListItem', position: 3, name: 'Lippen', item: 'https://hautschimmer.de/neumarkt/lippen' },
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
            <Link href="/neumarkt" className="hover:text-primary">Neumarkt</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Lippen</span>
          </nav>
        </div>

        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Smile className="text-primary" size={24} />
              </div>
              <span className="text-primary text-sm uppercase tracking-widest">Lippenbehandlung</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Lippen aufspritzen in <span className="text-primary">Neumarkt i.d.Opf</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Natürlich volle, schön definierte Lippen mit Premium-Hyaluronsäure.
              Ärztin Saskia Heer kreiert harmonische Ergebnisse, die Ihre Persönlichkeit unterstreichen.
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
            <h2 className="font-serif text-3xl text-foreground mb-8">Was wir für Ihre Lippen tun können</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="prose text-foreground/70">
                <p>
                  Die Lippen sind ein zentrales Merkmal unseres Gesichts. Mit Hyaluronsäure können
                  wir Volumen hinzufügen, die Lippenkontur definieren oder Asymmetrien ausgleichen.
                </p>
                <p>
                  Ob Sie sich mehr Volumen wünschen, eine schärfere Kontur oder einfach etwas
                  mehr Definition – wir finden gemeinsam das perfekte Ergebnis für Sie.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-foreground mb-4">Möglichkeiten</h3>
                {['Volumenaufbau', 'Konturdefinition', 'Asymmetrie-Korrektur', 'Lip Flip (mit Botox)', 'Barcode-Linien behandeln', 'Russian Lips Technik'].map((item, i) => (
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
          <h2 className="font-serif text-3xl text-foreground mb-8">Unsere Philosophie für schöne Lippen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Natürlichkeit', desc: 'Harmonische Proportionen, die zu Ihrem Gesicht passen.' },
              { title: 'Individualität', desc: 'Jedes Gesicht ist einzigartig – Ihre Lippen auch.' },
              { title: 'Sicherheit', desc: 'Nur hochwertige, zertifizierte Produkte.' },
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
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Lippen aufspritzen in Neumarkt</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-primary" size={20} />
                <span className="text-foreground">Mussinanstraße 65, 92318 Neumarkt i.d.Opf</span>
              </div>
              <p className="text-foreground/70 mb-6">
                Zentral gelegen für Patienten aus der Oberpfalz, Nürnberg und Regensburg.
              </p>
              <Link href="/neumarkt" className="text-primary hover:underline inline-flex items-center gap-2">
                Mehr zum Standort <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Häufige Fragen zur Lippenbehandlung</h2>
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
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Ihr Traum von schönen Lippen</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie Ihr persönliches Beratungsgespräch und lassen Sie sich von
              Ärztin Saskia Heer zu Ihren Möglichkeiten beraten.
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
