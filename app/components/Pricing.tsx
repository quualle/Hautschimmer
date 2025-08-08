"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaSyringe, FaDroplet, FaStar, FaClock, FaGift, FaCircleInfo, FaVial } from 'react-icons/fa6';
import { getPlanityBookingUrl } from '../utils/planityBooking';

// Neue Datenstruktur für die überarbeitete Preisliste
const treatments = {
  muskelrelaxans: {
    title: 'Muskelrelaxans',
    subtitle: 'Faltenbehandlung',
    icon: FaSyringe,
    color: 'secondary',
    description: 'Präzise Muskelentspannung für ein natürlich verjüngtes Aussehen',
    treatments: [
      { name: 'Zornesfalte (Glabella)', price: 179, duration: '15 Min', info: 'Glättet die vertikalen Falten zwischen den Augenbrauen', unit: undefined },
      { name: 'Stirn quer', price: 134, duration: '10 Min', info: 'Reduziert horizontale Stirnfalten', unit: undefined },
      { name: 'Krähenfüße (beidseitig)', price: 215, duration: '15 Min', info: 'Mildert Lachfältchen um die Augen', unit: undefined },
      { name: 'Bunny Lines Nase', price: 80, duration: '5 Min', info: 'Glättet Nasenfalten beim Lachen', unit: undefined },
      { name: 'Lippen-Flip / Gummy Smile', price: 107, duration: '10 Min', info: 'Korrigiert das Zahnfleischlächeln', unit: undefined },
      { name: 'Masseter (Knirschen)', price: 404, duration: '20 Min', info: 'Entspannt die Kaumuskulatur', unit: undefined },
      { name: 'Hyperhidrose Achsel', price: 809, duration: '30 Min', info: 'Stoppt übermäßiges Schwitzen', unit: undefined }
    ],
    packages: [
      { name: 'Stirn + Glabella Paket', price: 269, savings: 44, info: 'Kombinationsbehandlung für die obere Gesichtshälfte', special: undefined },
      { name: 'Summer-Special: Hyperhidrose Achseln', price: 719, special: true, info: 'Behandlung gegen starkes Schwitzen - Sonderpreis nur für kurze Zeit! (Normalpreis: 809€)', savings: 90 },
      { name: '2 Zonen (Stirn + Glabella)', price: 314, info: 'Zwei Behandlungszonen zum Vorteilspreis', special: undefined, savings: undefined },
      { name: '3 Zonen (Stirn + Glabella + Krähenfüße)', price: 449, savings: 79, info: 'Komplettbehandlung für ein frisches Aussehen', special: undefined }
    ]
  },
  hyaluron: {
    title: 'Hyaluron-Filler',
    subtitle: 'Volumenaufbau & Konturierung',
    icon: FaDroplet,
    color: 'accent',
    description: 'Natürliche Volumengabe und Faltenunterspritzung mit Premium-Fillern',
    treatments: [
      { name: 'Lippen Volumen 1 ml', price: 224, duration: '30 Min', info: 'Für vollere, definierte Lippen', unit: undefined },
      { name: 'Nasolabialfalte 1 ml', price: 224, duration: '20 Min', info: 'Glättet tiefe Falten von Nase zu Mund', unit: undefined },
      { name: 'Marionettenfalten 1 ml', price: 224, duration: '20 Min', info: 'Mildert Falten von Mundwinkel zum Kinn', unit: undefined },
      { name: 'Wangen / Midface', price: 251, unit: '/ml', duration: '30 Min', info: 'Stellt jugendliches Volumen wieder her' },
      { name: 'Jawline Kontur', price: 251, unit: '/ml', duration: '40 Min', info: 'Definiert die Kieferlinie' }
    ],
    packages: [
      { name: '2 ml-Paket', price: 476, savings: 22, info: 'Ideal für kombinierte Behandlungen', special: undefined },
      { name: '4 ml-Paket', price: 944, savings: 60, info: 'Für umfassende Volumenbehandlungen', special: undefined },
      { name: 'Russian Lips 2 ml', price: 404, special: true, info: 'Spezielle Technik für natürlich volle Lippen', savings: undefined },
      { name: 'Liquid Lift (Full Face) 6 ml', price: 1169, savings: 337, info: 'Komplette Gesichtsverjüngung ohne OP', special: undefined }
    ]
  },
  prp: {
    title: 'PRP',
    subtitle: 'Eigenblutbehandlung',
    icon: FaVial,
    color: 'primary',
    description: 'Natürliche Hautverjüngung mit körpereigenen Wachstumsfaktoren',
    treatments: [
      { name: 'PRP Behandlung', price: 550, duration: '45-60 Min', info: 'Intensive Hautregeneration mit 2 Sitzungen', unit: undefined },
      { name: 'Ergänzende Einzelbehandlung', price: 300, duration: '45 Min', info: 'Zusätzliche PRP-Sitzung für optimale Ergebnisse', unit: undefined }
    ],
    packages: [
      { 
        name: 'Exklusives Anti-Aging Konzept', 
        price: 1899, 
        special: true, 
        info: '4x 3-Stufen Intensivbehandlung + Nährstoffanalyse. Inkl. PRP + Infusion + individuelle PRP-Creme',
        savings: undefined
      }
    ]
  }
};

const Pricing = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeCategory, setActiveCategory] = useState<'muskelrelaxans' | 'hyaluron' | 'prp'>('muskelrelaxans');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light via-white to-light opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="section-container relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-px bg-secondary/50 mx-auto mb-8"
          />
          
          <h2 className="heading-2 mb-6">
            <span className="inline text-primary">Unsere</span>{' '}
            <span className="text-secondary font-medium">Behandlungspreise</span>
          </h2>
          
          <p className="paragraph max-w-3xl mx-auto text-primary/80">
            Transparente Preise für erstklassige ästhetische Behandlungen. 
            Alle Eingriffe werden von Saskia Heer mit höchster Präzision durchgeführt.
          </p>
        </motion.div>

        {/* Category Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12 flex-wrap max-w-4xl mx-auto"
        >
          {Object.entries(treatments).map(([key, category]) => {
            const Icon = category.icon;
            const isActive = activeCategory === key;
            
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key as 'muskelrelaxans' | 'hyaluron' | 'prp')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-6 lg:px-8 py-4 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? key === 'prp' 
                      ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-xl'
                      : 'bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-xl' 
                    : 'bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-secondary/30 text-primary'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`text-xl ${isActive ? 'text-white' : key === 'prp' ? 'text-primary' : 'text-secondary'}`} />
                  <div className="text-left">
                    <div className="font-serif text-lg">{category.title}</div>
                    <div className="text-xs opacity-80">{category.subtitle}</div>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute inset-0 rounded-2xl -z-10 ${
                      key === 'prp' 
                        ? 'bg-gradient-to-r from-primary to-primary/90'
                        : 'bg-gradient-to-r from-secondary to-secondary/90'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Treatment Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-12"
          >
            {/* Category Description */}
            <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
              <p className="text-primary/70">{treatments[activeCategory].description}</p>
            </motion.div>

            {/* Individual Treatments */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-serif text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-secondary/30"></span>
                Einzelbehandlungen
                <span className="flex-1 h-px bg-secondary/30"></span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {treatments[activeCategory].treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment.name}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onHoverStart={() => setHoveredItem(treatment.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative group"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:border-secondary/30 transition-all duration-300 h-full">
                      {/* Main Content */}
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-primary flex-1 pr-4">{treatment.name}</h4>
                        <div className="text-right">
                          <span className="text-2xl font-light text-secondary">€{treatment.price}</span>
                          {treatment.unit && <span className="text-sm text-primary/60">{treatment.unit}</span>}
                        </div>
                      </div>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-2 text-sm text-primary/60 mb-3">
                        <FaClock className="text-xs" />
                        <span>{treatment.duration}</span>
                      </div>
                      
                      {/* Hover Info */}
                      <AnimatePresence>
                        {hoveredItem === treatment.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-sm text-primary/70 flex items-start gap-2">
                                <FaCircleInfo className="text-secondary mt-0.5 flex-shrink-0" />
                                {treatment.info}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Packages */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-serif text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-secondary/30"></span>
                Vorteilspakete & Specials
                <span className="flex-1 h-px bg-secondary/30"></span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {treatments[activeCategory].packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="relative group"
                  >
                    <div className={`
                      rounded-2xl p-8 h-full transition-all duration-300
                      ${pkg.special 
                        ? 'bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent border-2 border-secondary/40 shadow-xl' 
                        : 'bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-secondary/30'
                      }
                    `}>
                      {/* Special Badge */}
                      {pkg.special && (
                        <div className="absolute -top-3 right-6">
                          <div className={`${pkg.name.includes('Summer') ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-secondary'} text-white px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg`}>
                            <FaGift />
                            {pkg.name.includes('Summer') ? '☀️ SOMMER-AKTION' : 'Special'}
                          </div>
                        </div>
                      )}
                      
                      {/* Package Content */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="font-serif text-lg text-primary mb-2">{pkg.name}</h4>
                          <p className="text-sm text-primary/70">{pkg.info}</p>
                        </div>
                      </div>
                      
                      {/* Price and Savings */}
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-3xl font-light text-secondary">€{pkg.price}</span>
                        </div>
                        {pkg.savings && (
                          <div className="text-right">
                            <span className="text-sm text-green-600 font-medium">
                              Sie sparen €{pkg.savings}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-light via-white to-light p-12 rounded-3xl shadow-xl border border-secondary/20">
            <h3 className="font-serif text-2xl text-primary mb-4">
              Individuelle Beratung gewünscht?
            </h3>
            <p className="text-primary/70 mb-8 max-w-xl mx-auto">
              Jede Behandlung beginnt mit einem persönlichen Beratungsgespräch. 
              Gemeinsam finden wir die optimale Lösung für Ihre individuellen Bedürfnisse.
            </p>
            <a 
              href={getPlanityBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-full font-light tracking-wider uppercase text-sm transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Beratungstermin vereinbaren
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;