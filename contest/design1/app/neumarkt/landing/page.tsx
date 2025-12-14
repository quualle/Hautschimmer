"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserRound,
  Leaf,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Syringe,
  Droplet,
  TestTube
} from 'lucide-react';

// Alias for compatibility
const FaUserDoctor = UserRound;
const FaLeaf = Leaf;
const FaClock = Clock;
const FaCheck = Check;
const FaChevronDown = ChevronDown;
const FaChevronUp = ChevronUp;
const FaLocationDot = MapPin;
const FaPhone = Phone;
const FaWhatsapp = MessageCircle;
const FaEnvelope = Mail;
const FaSyringe = Syringe;
const FaDroplet = Droplet;
const FaVial = TestTube;

// Pricing data from existing Pricing component
const pricingData = {
  muskelrelaxans: [
    { name: '1 Zone (flexibel)', price: 199, duration: '15-20 Min' },
    { name: '2 Zonen (flexibel)', price: 299, duration: '20-25 Min' },
    { name: '3 Zonen (flexibel)', price: 399, duration: '25-35 Min' },
  ],
  hyaluron: [
    { name: 'Lippen', price: 189, duration: '30-40 Min' },
    { name: 'Standard (1 ml)', price: 299, duration: '20-40 Min', unit: '/ ml' },
  ],
};

// Tracking helper
const trackEvent = (eventName: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// FAQ data
const faqData = [
  {
    question: "Tut das weh?",
    answer: "Meist nur kurz und gut auszuhalten. Details besprechen wir vor Ort."
  },
  {
    question: "Wann sehe ich Ergebnisse?",
    answer: "Je nach Behandlung unterschiedlich. Wir erklären Ihnen den typischen Zeitverlauf im Gespräch."
  },
  {
    question: "Wie lange hält das?",
    answer: "Das ist individuell. Faktoren sind Stoffwechsel, Mimik und Behandlungsplan."
  },
  {
    question: "Kann ich natürlich aussehen?",
    answer: "Ja. Unser Ziel ist ein frischer Eindruck - nicht 'gemacht'."
  },
  {
    question: "Was muss ich danach beachten?",
    answer: "Sie bekommen klare Nachsorge-Hinweise - passend zur Behandlung."
  },
  {
    question: "Ich bin unsicher, was zu mir passt.",
    answer: "Dann ist ein Beratungstermin der beste Start. Wir klären Ziele und Möglichkeiten."
  }
];

// Treatment cards data
const treatmentCards = [
  {
    id: 'botox',
    title: 'Botulinumtoxin: Stirn, Zornesfalte, Krähenfüße',
    description: 'Glättet mimische Falten und kann vorbeugend wirken - ohne starren Look.',
    icon: FaSyringe,
    href: '#termin'
  },
  {
    id: 'lipflip',
    title: 'Lip Flip',
    description: 'Dezente Oberlippenbetonung für ein weicheres Lippenbild.',
    icon: FaDroplet,
    href: '#termin'
  },
  {
    id: 'lippen',
    title: 'Hyaluronsäure: Lippen & Kontur',
    description: 'Sanfter Volumenaufbau und Harmonisierung - Schritt für Schritt.',
    icon: FaDroplet,
    href: '#termin'
  },
  {
    id: 'masseter',
    title: 'Masseter / Zähneknirschen',
    description: 'Entlastung und Kontur - individuell nach Ausprägung.',
    icon: FaSyringe,
    href: '#termin'
  },
  {
    id: 'hyperhidrose',
    title: 'Hyperhidrose (Achseln)',
    description: 'Gegen starkes Schwitzen - nach ärztlicher Abklärung.',
    icon: FaSyringe,
    href: '#termin'
  },
  {
    id: 'prp',
    title: 'PRP / regenerative Behandlungen',
    description: 'Unterstützt Hautqualität und Regeneration - realistisch und planbar.',
    icon: FaVial,
    href: '#termin'
  }
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Ankommen & Ziel klären',
    description: 'Was stört Sie, was soll sich verändern?'
  },
  {
    step: 2,
    title: 'Ärztliche Beratung',
    description: 'Eignung, Risiken, Alternativen, realistische Erwartungen.'
  },
  {
    step: 3,
    title: 'Behandlung',
    description: 'Sorgfältig, steril, in ruhiger Atmosphäre.'
  },
  {
    step: 4,
    title: 'Nachsorge',
    description: 'Was Sie heute und in den nächsten Tagen beachten sollten.'
  },
  {
    step: 5,
    title: 'Follow-up',
    description: 'Falls sinnvoll: kurzer Check zur Feinabstimmung.'
  }
];

export default function NeumarktLandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track page view
    trackEvent('view_content', {
      content_type: 'landing_page',
      content_id: 'neumarkt_ads'
    });

    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    trackEvent('click_cta', { cta_type: 'scroll_to_booking', location: 'sticky_bar' });
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingClick = (source: string) => {
    trackEvent('schedule', { source, location: 'neumarkt' });
    window.location.href = '/booking/neumarkt';
  };

  const handleWhatsAppClick = () => {
    trackEvent('lead', { lead_type: 'whatsapp', location: 'neumarkt' });
    window.open('https://wa.me/491738615766', '_blank');
  };

  const handlePhoneClick = () => {
    trackEvent('lead', { lead_type: 'phone', location: 'neumarkt' });
    window.location.href = 'tel:+491738615766';
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Minimal Header */}
      <header className="fixed w-full z-50 bg-light/95 backdrop-blur-md shadow-elegant py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src="/images/logo.jpg"
                alt="Hautschimmer Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <Image
              src="/images/Hautschimmer.png"
              alt="Hautschimmer"
              width={140}
              height={30}
              className="h-auto"
              style={{ maxWidth: '140px' }}
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/preise"
              className="hidden sm:inline-block text-sm text-primary/80 hover:text-primary transition-colors"
              onClick={() => trackEvent('click_cta', { cta_type: 'view_prices', location: 'header' })}
            >
              Preise
            </Link>
            <button
              onClick={() => handleBookingClick('header')}
              className="button-holo text-sm py-2 px-4"
            >
              Termin buchen
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-light via-white to-light relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="heading-1 text-primary mb-6">
              Ästhetische Medizin in Neumarkt i.d.Opf – <span className="text-secondary">natürlich, ärztlich, diskret.</span>
            </h1>

            <p className="paragraph text-primary/80 mb-6 max-w-2xl mx-auto">
              Behandlungen mit Botulinumtoxin und Hyaluronsäure – mit Zeit für Beratung und einem Ergebnis, das nach Ihnen aussieht.
            </p>

            {/* Trust Microline */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary/70 mb-8">
              <span className="flex items-center gap-1">
                <FaCheck className="text-secondary text-xs" />
                Behandlung durch Ärztin
              </span>
              <span className="flex items-center gap-1">
                <FaCheck className="text-secondary text-xs" />
                Aufklärung & Nachsorge
              </span>
              <span className="flex items-center gap-1">
                <FaCheck className="text-secondary text-xs" />
                Sterile Einmalinstrumente
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => handleBookingClick('hero')}
                className="button-holo text-base py-3 px-8 w-full sm:w-auto"
              >
                Termin in Neumarkt buchen
              </button>
              <Link
                href="#pricing"
                onClick={() => trackEvent('click_cta', { cta_type: 'view_prices', location: 'hero' })}
                className="button-secondary text-base py-3 px-8 w-full sm:w-auto text-center"
              >
                Preise ansehen
              </Link>
            </div>

            <p className="text-sm text-primary/60 mt-4">
              Sie sind unsicher, was passt? Buchen Sie einfach ein Beratungsgespräch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust / Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUserDoctor,
                title: 'Ärztliche Behandlung',
                description: 'Bei Hautschimmer behandeln wir ausschließlich ärztlich – mit Aufklärung und Sorgfalt.'
              },
              {
                icon: FaLeaf,
                title: "Natürlich statt 'gemacht'",
                description: 'Ziel sind frische, harmonische Ergebnisse – ohne Maskeneffekt.'
              },
              {
                icon: FaClock,
                title: 'Zeit & Diskretion',
                description: 'Ruhige Atmosphäre, klare Empfehlungen, kein Fließband.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-light/50 rounded-2xl p-8 text-center border border-gray-100 hover:border-secondary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <item.icon className="text-2xl text-secondary" />
                </div>
                <h3 className="font-serif text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-primary/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum Hautschimmer in Neumarkt? */}
      <section className="py-16 bg-gradient-to-b from-white to-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 text-primary text-center mb-8">
              Warum <span className="text-secondary">Hautschimmer</span> in Neumarkt?
            </h2>

            <p className="paragraph text-primary/80 mb-8 text-center">
              In Neumarkt gibt es unterschiedliche Wege zur ästhetischen Behandlung: medizinische Großpraxen, nicht-ärztliche Angebote und Low-Price-Ketten im Umkreis. Hautschimmer steht für eine klare Mitte: ärztlich, spezialisiert, natürlich – und mit Zeit.
            </p>

            <div className="space-y-4">
              {[
                'Spezialisierung auf minimal-invasive ästhetische Medizin',
                'Ehrliche Beratung: Wir sagen auch, wenn etwas (noch) nicht sinnvoll ist.',
                'Individuelle Planung statt Standardpakete',
                'Sicherheit, Hygiene, Nachsorge – verständlich erklärt',
                'Geeignet für Frauen und Männer – auch für Einsteiger'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheck className="text-secondary text-xs" />
                  </div>
                  <p className="text-primary/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beliebte Behandlungen */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              Beliebte Behandlungen in <span className="text-secondary">Neumarkt</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCards.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-secondary/30 hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                onClick={() => handleBookingClick(`treatment_${treatment.id}`)}
              >
                <div className="w-12 h-12 mb-4 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <treatment.icon className="text-xl text-secondary" />
                </div>
                <h3 className="font-serif text-lg text-primary mb-2">{treatment.title}</h3>
                <p className="text-primary/70 text-sm mb-4">{treatment.description}</p>
                <span className="text-secondary text-sm font-medium group-hover:underline">
                  Termin buchen →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              So läuft Ihr <span className="text-secondary">Termin</span> ab
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 mb-6 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-serif text-lg">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-px h-full bg-secondary/30 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-serif text-lg text-primary mb-1">{step.title}</h3>
                  <p className="text-primary/70 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-white to-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              Transparente <span className="text-secondary">Preise</span>
            </h2>
            <p className="text-primary/70">Preise inkl. MwSt. und ärztlicher Beratung</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Muskelrelaxans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-elegant"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <FaSyringe className="text-secondary" />
                </div>
                <h3 className="font-serif text-xl text-primary">Muskelrelaxans</h3>
              </div>
              <div className="space-y-3">
                {pricingData.muskelrelaxans.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-primary font-medium">{item.name}</p>
                      <p className="text-xs text-primary/60">{item.duration}</p>
                    </div>
                    <p className="text-secondary font-semibold">ab {item.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hyaluron */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-elegant"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <FaDroplet className="text-secondary" />
                </div>
                <h3 className="font-serif text-xl text-primary">Hyaluron-Filler</h3>
              </div>
              <div className="space-y-3">
                {pricingData.hyaluron.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-primary font-medium">{item.name}</p>
                      <p className="text-xs text-primary/60">{item.duration}</p>
                    </div>
                    <p className="text-secondary font-semibold">
                      ab {item.price}{item.unit ? ` ${item.unit}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/preise"
              onClick={() => trackEvent('click_cta', { cta_type: 'view_all_prices', location: 'pricing_section' })}
              className="button-secondary inline-block"
            >
              Alle Preise ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Sicherheit & Erwartungen */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="heading-2 text-primary text-center mb-8">
              Sicherheit & <span className="text-secondary">Erwartungen</span>
            </h2>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-elegant">
              <p className="text-primary/80 mb-6">
                Ästhetische Medizin ist Medizin. Deshalb setzen wir auf ärztliche Aufklärung, sterile Standards und realistische Ziele. Ergebnisse sind individuell und hängen von Ausgangssituation, Stoffwechsel und Nachsorge ab.
              </p>

              <div className="space-y-3">
                {[
                  'Behandlung nur nach ärztlicher Einschätzung',
                  "Individuelle Dosierung statt 'One size fits all'",
                  'Transparente Risiken & Nebenwirkungen – verständlich erklärt'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-secondary text-xs" />
                    </div>
                    <p className="text-primary/80 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              Häufige <span className="text-secondary">Fragen</span>
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-light rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-primary">{faq.question}</span>
                  {expandedFaq === index ? (
                    <FaChevronUp className="text-secondary flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-secondary flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-primary/70 text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="termin" ref={bookingRef} className="py-16 bg-gradient-to-b from-white to-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              Termin in <span className="text-secondary">Neumarkt</span> buchen
            </h2>
            <p className="text-primary/70 max-w-xl mx-auto">
              Wählen Sie Ihre gewünschte Behandlung und einen passenden Termin. Bei Fragen sind wir auch per WhatsApp oder Telefon erreichbar.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-elegant mb-6"
            >
              <button
                onClick={() => handleBookingClick('booking_section')}
                className="button-holo w-full text-lg py-4"
              >
                Zur Terminbuchung
              </button>
              <p className="text-center text-sm text-primary/60 mt-3">
                Standort: Neumarkt i.d.Opf ist automatisch vorausgewählt
              </p>
            </motion.div>

            {/* Alternative Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-green-500/50 hover:bg-green-50/30 transition-all group"
              >
                <FaWhatsapp className="text-2xl text-green-600" />
                <span className="text-primary group-hover:text-green-700">WhatsApp schreiben</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-secondary/50 hover:bg-secondary/5 transition-all group"
              >
                <FaPhone className="text-xl text-secondary" />
                <span className="text-primary">Anrufen</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 text-primary mb-4">
              Standort <span className="text-secondary">Neumarkt</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Address Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-elegant"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaLocationDot className="text-xl text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-1">Hautschimmer Neumarkt</h3>
                    <p className="text-primary/70">Mussinanstraße 65</p>
                    <p className="text-primary/70">92318 Neumarkt i.d.Opf</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-secondary" />
                    <a href="tel:+491738615766" className="text-primary hover:text-secondary transition-colors">
                      0173 8615766
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-secondary" />
                    <a href="mailto:saskia.hautschimmer@gmail.com" className="text-primary hover:text-secondary transition-colors">
                      saskia.hautschimmer@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-primary/70">
                    Details zur Anfahrt und Parkmöglichkeiten erhalten Sie in der Terminbestätigung.
                  </p>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-elegant"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Neumarkt Standort"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link href="/impressum" className="text-sm text-white/80 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-white/80 hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="#contact" className="text-sm text-white/80 hover:text-white transition-colors">
                Kontakt
              </Link>
            </div>
            <p className="text-xs text-white/60 text-center">
              Informationen ersetzen keine ärztliche Beratung. Behandlungen erfolgen nach individueller Aufklärung.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl py-3"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
              <p className="hidden sm:block text-primary font-medium">
                Jetzt Termin in Neumarkt sichern
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleBookingClick('sticky_bar')}
                  className="button-holo flex-1 sm:flex-none py-2.5 px-6 text-sm"
                >
                  Termin buchen
                </button>
                <Link
                  href="#pricing"
                  onClick={() => trackEvent('click_cta', { cta_type: 'view_prices', location: 'sticky_bar' })}
                  className="button-secondary py-2.5 px-4 text-sm hidden sm:inline-block"
                >
                  Preise
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
