"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Stethoscope,
  Sparkles,
  Clock,
  Check,
  ChevronDown,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Syringe,
  Droplets,
  FlaskConical,
  ArrowRight,
  Star,
  Shield,
  Heart,
  Zap
} from 'lucide-react';

// Pricing data
const pricingData = {
  muskelrelaxans: [
    { name: '1 Zone', price: 199, duration: '15-20 Min' },
    { name: '2 Zonen', price: 299, duration: '20-25 Min' },
    { name: '3 Zonen', price: 399, duration: '25-35 Min' },
  ],
  hyaluron: [
    { name: 'Lippen', price: 189, duration: '30-40 Min' },
    { name: 'Standard (1 ml)', price: 299, duration: '20-40 Min', unit: '/ ml' },
  ],
};

// Tracking helper
const trackEvent = (eventName: string, params?: Record<string, string>) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (action: string, event: string, params?: Record<string, string>) => void }).gtag) {
    (window as unknown as { gtag: (action: string, event: string, params?: Record<string, string>) => void }).gtag('event', eventName, params);
  }
};

// FAQ data
const faqData = [
  {
    question: "Tut die Behandlung weh?",
    answer: "Die meisten Patientinnen empfinden nur ein kurzes, leichtes Piksen. Wir verwenden feinste Nadeln und auf Wunsch betäubende Cremes für maximalen Komfort."
  },
  {
    question: "Wann sehe ich erste Ergebnisse?",
    answer: "Bei Hyaluron sofort, bei Muskelrelaxans nach 3-14 Tagen. Im Beratungsgespräch erklären wir Ihnen den genauen Zeitverlauf."
  },
  {
    question: "Wie lange hält das Ergebnis?",
    answer: "Hyaluron: 6-18 Monate. Muskelrelaxans: 3-6 Monate. Faktoren wie Stoffwechsel und Lebensstil beeinflussen die Haltbarkeit."
  },
  {
    question: "Sieht das Ergebnis natürlich aus?",
    answer: "Absolut! Unser Ziel ist ein frisches, erholtes Aussehen – niemals 'gemacht'. Weniger ist oft mehr."
  },
  {
    question: "Was muss ich danach beachten?",
    answer: "Sie erhalten individuelle Nachsorge-Hinweise. Generell: 24h kein Sport, keine Sauna, Behandlungszone nicht massieren."
  }
];

// Treatment cards data
const treatmentCards = [
  {
    id: 'botox',
    title: 'Anti-Aging Klassiker',
    subtitle: 'Stirn · Zornesfalte · Krähenfüße',
    description: 'Sanfte Glättung mimischer Falten für ein frisches, entspanntes Aussehen.',
    icon: Syringe,
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400'
  },
  {
    id: 'lippen',
    title: 'Lippen & Kontur',
    subtitle: 'Hyaluron-Behandlung',
    description: 'Natürlicher Volumenaufbau und harmonische Lippenkontur.',
    icon: Heart,
    gradient: 'from-pink-500/20 to-fuchsia-500/20',
    iconColor: 'text-pink-400'
  },
  {
    id: 'lipflip',
    title: 'Lip Flip',
    subtitle: 'Dezente Oberlippenbetonung',
    description: 'Für ein weicheres Lippenbild ohne Volumenaufbau.',
    icon: Sparkles,
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400'
  },
  {
    id: 'masseter',
    title: 'Masseter / Kiefer',
    subtitle: 'Kontur & Zähneknirschen',
    description: 'Entlastung bei Bruxismus und schlankere Gesichtskontur.',
    icon: Zap,
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400'
  },
  {
    id: 'hyperhidrose',
    title: 'Hyperhidrose',
    subtitle: 'Achsel-Behandlung',
    description: 'Effektive Lösung gegen übermäßiges Schwitzen.',
    icon: Droplets,
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    id: 'prp',
    title: 'PRP Vampir-Lifting',
    subtitle: 'Eigenblut-Therapie',
    description: 'Natürliche Hautverjüngung mit körpereigenen Wachstumsfaktoren.',
    icon: FlaskConical,
    gradient: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-400'
  }
];

// Process steps
const processSteps = [
  { step: 1, title: 'Beratung', description: 'Ziele & Wünsche', icon: MessageCircle },
  { step: 2, title: 'Analyse', description: 'Ärztliche Einschätzung', icon: Stethoscope },
  { step: 3, title: 'Behandlung', description: 'Präzise Ausführung', icon: Syringe },
  { step: 4, title: 'Nachsorge', description: 'Individuelle Tipps', icon: Shield },
  { step: 5, title: 'Follow-up', description: 'Kontrolle & Optimierung', icon: Star }
];

export default function NeumarktLandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    trackEvent('view_content', {
      content_type: 'landing_page',
      content_id: 'neumarkt_ads_v2'
    });

    const handleScroll = () => {
      setIsSticky(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Floating Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full z-50 top-0"
      >
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-white/20 group-hover:ring-secondary transition-all">
                  <Image
                    src="/images/logo.jpg"
                    alt="Hautschimmer Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif text-xl tracking-wide text-white group-hover:text-secondary transition-colors">
                  Hautschimmer
                </span>
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/preise"
                  className="hidden sm:flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  Preise
                </Link>
                <button
                  onClick={() => handleBookingClick('header')}
                  className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-accent text-primary font-medium text-sm overflow-hidden transition-all hover:shadow-lg hover:shadow-secondary/25"
                >
                  <span className="relative z-10">Termin buchen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Immersive Video Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero-bg.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* Animated grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Neumarkt i.d.Opf.</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-light tracking-wide leading-[1.1] mb-6"
          >
            <span className="block">Ästhetische Medizin</span>
            <span className="block mt-2 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Natürlich. Ärztlich. Diskret.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Behandlungen mit Botulinumtoxin & Hyaluronsäure – mit Zeit für Beratung
            und einem Ergebnis, das nach Ihnen aussieht.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {[
              { icon: Stethoscope, text: 'Ärztliche Behandlung' },
              { icon: Shield, text: 'Sterile Einmalinstrumente' },
              { icon: Clock, text: 'Ausführliche Beratung' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                <item.icon className="w-4 h-4 text-secondary" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => handleBookingClick('hero')}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-accent text-primary font-semibold text-base overflow-hidden transition-all hover:shadow-2xl hover:shadow-secondary/30 hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Termin buchen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <Link
              href="#treatments"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-2"
            >
              Behandlungen entdecken
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#why" className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors">
            <span className="text-xs uppercase tracking-widest mb-2">Entdecken</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Why Hautschimmer Section */}
      <section id="why" className="relative py-32 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Warum Hautschimmer?
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">
              Ästhetik mit <span className="text-secondary">Verantwortung</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              In Neumarkt gibt es unterschiedliche Wege zur ästhetischen Behandlung.
              Hautschimmer steht für eine klare Mitte: ärztlich, spezialisiert, natürlich.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: 'Ärztliche Behandlung',
                description: 'Ausschließlich ärztliche Durchführung mit medizinischer Aufklärung und höchsten Sicherheitsstandards.',
                gradient: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                icon: Sparkles,
                title: "Natürlich statt 'gemacht'",
                description: 'Unser Ziel sind frische, harmonische Ergebnisse. Subtile Veränderungen statt auffälliger Eingriffe.',
                gradient: 'from-purple-500/20 to-pink-500/20'
              },
              {
                icon: Clock,
                title: 'Zeit & Diskretion',
                description: 'Ruhige Atmosphäre, ehrliche Empfehlungen, kein Fließband. Wir nehmen uns Zeit für Sie.',
                gradient: 'from-amber-500/20 to-orange-500/20'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-serif mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 bg-gradient-to-r from-secondary/10 via-accent/5 to-secondary/10 rounded-3xl p-8 md:p-12 border border-secondary/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                'Spezialisierung auf minimal-invasive Ästhetik',
                'Ehrliche Beratung – auch wenn etwas nicht passt',
                'Individuelle Planung statt Standardpakete',
                'Höchste Hygiene- und Sicherheitsstandards',
                'Geeignet für Frauen, Männer & Einsteiger'
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <p className="text-white/80 text-sm">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="treatments" className="relative py-32 bg-[#111]">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Unsere Behandlungen
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">
              Beliebte Behandlungen in <span className="text-secondary">Neumarkt</span>
            </h2>
          </motion.div>

          {/* Treatment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentCards.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleBookingClick(`treatment_${treatment.id}`)}
                className="group cursor-pointer"
              >
                <div className={`relative bg-gradient-to-br ${treatment.gradient} p-[1px] rounded-3xl overflow-hidden`}>
                  <div className="bg-[#111] rounded-3xl p-6 h-full hover:bg-[#161616] transition-colors">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${treatment.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <treatment.icon className={`w-6 h-6 ${treatment.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-1">{treatment.title}</h3>
                    <p className="text-secondary text-sm mb-3">{treatment.subtitle}</p>
                    <p className="text-white/60 text-sm mb-5">{treatment.description}</p>
                    <span className="inline-flex items-center gap-2 text-secondary text-sm font-medium group-hover:gap-3 transition-all">
                      Termin buchen <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Ihr Termin
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              So läuft Ihr <span className="text-secondary">Besuch</span> ab
            </h2>
          </motion.div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center lg:text-center"
                >
                  {/* Step Number */}
                  <div className="relative z-10 w-[120px] h-[120px] mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary/20 to-accent/10 border border-secondary/30 flex flex-col items-center justify-center group hover:border-secondary/60 transition-all">
                    <step.icon className="w-8 h-8 text-secondary mb-1" />
                    <span className="text-xs text-white/40 uppercase tracking-wider">Schritt {step.step}</span>
                  </div>
                  <h3 className="text-lg font-serif text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Preise
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-4">
              Transparente <span className="text-secondary">Preise</span>
            </h2>
            <p className="text-white/60">Alle Preise inkl. MwSt. und ärztlicher Beratung</p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Muskelrelaxans */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Syringe className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white">Muskelrelaxans</h3>
                    <p className="text-white/50 text-sm">Botulinumtoxin</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {pricingData.muskelrelaxans.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/40 text-sm">{item.duration}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-light text-secondary">ab {item.price}€</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hyaluron */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center">
                    <Droplets className="w-7 h-7 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white">Hyaluron-Filler</h3>
                    <p className="text-white/50 text-sm">Hyaluronsäure</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {pricingData.hyaluron.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/40 text-sm">{item.duration}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-light text-secondary">
                          ab {item.price}€{item.unit ? ` ${item.unit}` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* All Prices Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/preise"
              className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors"
            >
              Alle Preise ansehen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-secondary/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-secondary/20"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                  Sicherheit & <span className="text-secondary">Erwartungen</span>
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Ästhetische Medizin ist Medizin. Deshalb setzen wir auf ärztliche Aufklärung,
                  sterile Standards und realistische Ziele. Ergebnisse sind individuell.
                </p>
                <div className="space-y-3">
                  {[
                    'Behandlung nur nach ärztlicher Einschätzung',
                    'Individuelle Dosierung – kein Standard',
                    'Transparente Risiken & Nebenwirkungen'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-secondary" />
                      </div>
                      <span className="text-white/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Häufige <span className="text-secondary">Fragen</span>
            </h2>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className={`w-full text-left bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
                    expandedFaq === index ? 'border-secondary/50' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${expandedFaq === index ? 'text-secondary' : 'text-white/50'}`} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-white/60 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Booking Section */}
      <section ref={bookingRef} id="termin" className="relative py-32 bg-gradient-to-b from-[#111] via-[#0a0a0a] to-[#0a0a0a] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Jetzt starten
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">
              Termin in <span className="text-secondary">Neumarkt</span> buchen
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Wählen Sie Ihre gewünschte Behandlung und einen passenden Termin.
              Bei Fragen sind wir auch per WhatsApp erreichbar.
            </p>
          </motion.div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-secondary/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-secondary/20 text-center mb-8"
          >
            <button
              onClick={() => handleBookingClick('booking_section')}
              className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-secondary to-accent text-primary font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-secondary/30 hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Zur Terminbuchung
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="text-white/50 text-sm mt-4">
              Standort Neumarkt i.d.Opf. ist automatisch vorausgewählt
            </p>
          </motion.div>

          {/* Alternative Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={handleWhatsAppClick}
              className="group flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-green-500/50 hover:bg-green-500/5 transition-all"
            >
              <MessageCircle className="w-6 h-6 text-green-500" />
              <span className="text-white group-hover:text-green-400 transition-colors">WhatsApp schreiben</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={handlePhoneClick}
              className="group flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-secondary/50 hover:bg-secondary/5 transition-all"
            >
              <Phone className="w-6 h-6 text-secondary" />
              <span className="text-white group-hover:text-secondary transition-colors">0173 8615766</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-32 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-secondary text-sm font-medium tracking-widest uppercase mb-4">
              Standort
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Finden Sie uns in <span className="text-secondary">Neumarkt</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">Hautschimmer Neumarkt</h3>
                  <p className="text-white/60">Mussinanstraße 65</p>
                  <p className="text-white/60">92318 Neumarkt i.d.Opf.</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <a href="tel:+491738615766" className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>0173 8615766</span>
                </a>
                <a href="mailto:saskia.hautschimmer@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>saskia.hautschimmer@gmail.com</span>
                </a>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  Details zur Anfahrt und Parkmöglichkeiten erhalten Sie in der Terminbestätigung.
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-[350px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Neumarkt Standort"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link href="/impressum" className="text-sm text-white/50 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-white/50 hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
            <p className="text-xs text-white/40 text-center">
              Informationen ersetzen keine ärztliche Beratung. Behandlungen erfolgen nach individueller Aufklärung.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <p className="hidden sm:block text-white font-medium">
                Bereit für Ihr neues Strahlen?
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleBookingClick('sticky_bar')}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-accent text-primary font-semibold text-sm hover:shadow-lg hover:shadow-secondary/25 transition-all flex items-center justify-center gap-2"
                >
                  Termin buchen
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="#pricing"
                  className="hidden sm:flex px-4 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-all"
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
