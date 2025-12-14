import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Car, Train, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ästhetische Medizin Königs Wusterhausen | Botox & Hyaluron | Hautschimmer',
  description: 'Professionelle Botox- und Hyaluron-Behandlungen in Königs Wusterhausen bei Berlin. Ärztin Saskia Heer für natürliche Ergebnisse. Jetzt Termin vereinbaren!',
  keywords: 'Botox Königs Wusterhausen, Hyaluron KW, Faltenbehandlung Brandenburg, Ästhetische Medizin Berlin Süd, Ärztin Königs Wusterhausen',
  openGraph: {
    title: 'Ästhetische Medizin Königs Wusterhausen | Hautschimmer',
    description: 'Professionelle Botox- und Hyaluron-Behandlungen in Königs Wusterhausen. Natürliche Ergebnisse durch ärztliche Expertise.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen',
    type: 'website',
  },
  alternates: {
    canonical: 'https://hautschimmer.de/koenigs-wusterhausen',
  },
}

const services = [
  { name: 'Botox-Behandlung', href: '/koenigs-wusterhausen/botox', desc: 'Zornesfalten, Stirnfalten, Krähenfüße' },
  { name: 'Hyaluron-Filler', href: '/koenigs-wusterhausen/hyaluron', desc: 'Volumen, Konturierung, Faltenunterspritzung' },
  { name: 'Lippen aufspritzen', href: '/koenigs-wusterhausen/lippen', desc: 'Natürliche Lippenvergrößerung' },
  { name: 'Masseter / Bruxismus', href: '/koenigs-wusterhausen/masseter-bruxismus', desc: 'Kieferentspannung, Gesichtsverschmälerung' },
  { name: 'Hyperhidrose', href: '/koenigs-wusterhausen/hyperhidrose', desc: 'Behandlung von übermäßigem Schwitzen' },
  { name: 'PRP-Therapie', href: '/koenigs-wusterhausen/prp', desc: 'Eigenbluttherapie für Haut und Haare' },
]

const faqs = [
  {
    q: 'Wo genau befindet sich die Praxis in Königs Wusterhausen?',
    a: 'Unsere Praxis befindet sich in der Bahnhofstraße 8, 15711 Königs Wusterhausen, im Kosmetikstudio Glam & Glow Beauty. Direkt am Bahnhof gelegen, ist die Praxis sehr gut erreichbar.',
  },
  {
    q: 'Wie kann ich einen Termin in Königs Wusterhausen vereinbaren?',
    a: 'Sie können telefonisch unter 0173 8615766 oder per E-Mail an saskia.hautschimmer@gmail.com einen Termin vereinbaren. Wir bemühen uns um zeitnahe Terminvergabe.',
  },
  {
    q: 'Welche Behandlungen bieten Sie in Königs Wusterhausen an?',
    a: 'In Königs Wusterhausen bieten wir das gesamte Spektrum ästhetischer Behandlungen an: Botox, Hyaluron-Filler, Lippenunterspritzung, Masseter-Behandlung bei Bruxismus, Hyperhidrose-Therapie und PRP.',
  },
  {
    q: 'Führt eine Ärztin die Behandlungen durch?',
    a: 'Ja, alle Behandlungen werden persönlich von Saskia Heer durchgeführt. Sie ist approbierte Ärztin mit Spezialisierung auf ästhetische Medizin.',
  },
  {
    q: 'Wie komme ich aus Berlin nach Königs Wusterhausen?',
    a: 'Königs Wusterhausen ist von Berlin sehr gut erreichbar. Mit der S-Bahn (S46) vom Berliner Zentrum sind Sie in etwa 45 Minuten am Bahnhof KW. Die Praxis befindet sich direkt am Bahnhof.',
  },
]

export default function KoenigsWusterhausenPage() {
  // JSON-LD Schema for LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://hautschimmer.de/koenigs-wusterhausen',
    name: 'Hautschimmer - Ästhetische Medizin Königs Wusterhausen',
    description: 'Professionelle Botox- und Hyaluron-Behandlungen in Königs Wusterhausen bei Berlin. Ärztlich durchgeführt für natürliche Ergebnisse.',
    url: 'https://hautschimmer.de/koenigs-wusterhausen',
    telephone: '+49 173 8615766',
    email: 'saskia.hautschimmer@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstraße 8',
      addressLocality: 'Königs Wusterhausen',
      postalCode: '15711',
      addressRegion: 'Brandenburg',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3016,
      longitude: 13.6314,
    },
    medicalSpecialty: 'Aesthetic Medicine',
    priceRange: '€€',
    image: 'https://hautschimmer.de/images/og-image.jpg',
    sameAs: [
      'https://www.instagram.com/hautschimmer',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: 'https://hautschimmer.de',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Königs Wusterhausen',
        item: 'https://hautschimmer.de/koenigs-wusterhausen',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 mb-8">
          <nav className="text-sm text-foreground/60">
            <Link href="/" className="hover:text-primary">Startseite</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Königs Wusterhausen</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Ästhetische Medizin in <span className="text-primary">Königs Wusterhausen</span>
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Professionelle Botox- und Hyaluron-Behandlungen im Süden von Berlin.
              Ärztin Saskia Heer bietet Ihnen individuelle Beratung und natürliche Ergebnisse
              auf höchstem medizinischem Niveau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="bg-primary text-white px-8 py-4 rounded-full text-center font-medium hover:bg-accent transition-colors"
              >
                Termin in KW buchen
              </Link>
              <a
                href="tel:+491738615766"
                className="border border-primary text-primary px-8 py-4 rounded-full text-center font-medium hover:bg-primary/5 transition-colors"
              >
                0173 8615766
              </a>
            </div>
          </div>
        </section>

        {/* NAP Section */}
        <section className="bg-white py-16 mb-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl text-foreground mb-6">Standort & Kontakt</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium text-foreground">Adresse</p>
                      <p className="text-foreground/70">Bahnhofstraße 8<br />15711 Königs Wusterhausen</p>
                      <p className="text-foreground/50 text-sm mt-1">im Kosmetikstudio Glam & Glow Beauty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium text-foreground">Telefon</p>
                      <a href="tel:+491738615766" className="text-primary hover:underline">0173 8615766</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium text-foreground">E-Mail</p>
                      <a href="mailto:saskia.hautschimmer@gmail.com" className="text-primary hover:underline">
                        saskia.hautschimmer@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-[300px]">
                <iframe
                  src="https://maps.google.com/maps?q=Bahnhofstra%C3%9Fe+8,+15711+K%C3%B6nigs+Wusterhausen&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Königs Wusterhausen"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Anfahrt */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Anfahrt nach Königs Wusterhausen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Car className="text-primary" size={28} />
                <h3 className="font-serif text-xl">Mit dem Auto</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Königs Wusterhausen liegt südöstlich von Berlin und ist über die A10 und A13
                gut erreichbar. Parkplätze befinden sich in direkter Nähe zum Bahnhof.
              </p>
              <p className="text-sm text-foreground/50">
                Von Berlin Mitte: ca. 40 min • Von Potsdam: ca. 50 min • Von Cottbus: ca. 70 min
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Train className="text-primary" size={28} />
                <h3 className="font-serif text-xl">Mit öffentlichen Verkehrsmitteln</h3>
              </div>
              <p className="text-foreground/70 mb-4">
                Der Bahnhof Königs Wusterhausen ist ein wichtiger Knotenpunkt im Berliner Umland.
                Die Praxis befindet sich direkt am Bahnhof – nur 1 Minute zu Fuß!
              </p>
              <p className="text-sm text-foreground/50">
                S46 aus Berlin: ca. 45 min • RE2 aus Berlin Hbf: ca. 25 min
              </p>
            </div>
          </div>
        </section>

        {/* Einzugsgebiet */}
        <section className="bg-secondary/10 py-16 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-foreground mb-6 text-center">Unser Einzugsgebiet</h2>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-8">
              Patienten aus Berlin und Brandenburg vertrauen auf unsere Expertise.
              Wir freuen uns auf Ihren Besuch aus:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Königs Wusterhausen', 'Berlin-Treptow', 'Berlin-Köpenick', 'Berlin-Neukölln',
                'Wildau', 'Zeuthen', 'Eichwalde', 'Schulzendorf', 'Bestensee', 'Mittenwalde',
                'Schönefeld', 'Lübben'].map(city => (
                <span
                  key={city}
                  className="bg-white px-4 py-2 rounded-full text-foreground/80 shadow-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Behandlungen in Königs Wusterhausen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-foreground/60 text-sm">{service.desc}</p>
                  </div>
                  <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-16 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">
              Warum Hautschimmer in Königs Wusterhausen?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Ärztliche Behandlung', desc: 'Alle Eingriffe durch approbierte Ärztin' },
                { title: 'Natürliche Ergebnisse', desc: 'Diskrete Verbesserungen, keine übertriebenen Looks' },
                { title: 'Persönliche Beratung', desc: 'Individuelle Analyse und ehrliche Empfehlung' },
                { title: 'Zentrale Lage', desc: 'Direkt am Bahnhof, ideal erreichbar aus Berlin' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <CheckCircle className="text-primary mx-auto mb-4" size={32} />
                  <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-8">Häufige Fragen zum Standort Königs Wusterhausen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl shadow-sm group"
              >
                <summary className="p-6 cursor-pointer font-medium text-foreground hover:text-primary transition-colors list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-primary ml-4">+</span>
                </summary>
                <div className="px-6 pb-6 text-foreground/70">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Bereit für Ihre Behandlung in Königs Wusterhausen?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie jetzt Ihren persönlichen Beratungstermin.
              Ärztin Saskia Heer nimmt sich Zeit für Ihre Wünsche und erstellt einen
              individuellen Behandlungsplan.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Jetzt Termin vereinbaren
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
