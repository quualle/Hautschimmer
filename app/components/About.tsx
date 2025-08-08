"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { getPlanityBookingUrl } from '../utils/planityBooking';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container !pt-0 !pb-0" ref={ref}>
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="heading-2 mb-6 text-center">Über <span className="text-secondary">Saskia Heer</span></h2>
            
            <div className="w-20 h-px bg-secondary/30 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-8">
              <div className="order-2 md:order-1">
                <p className="paragraph mb-6">
                  Als Ärztin mit einer außergewöhnlichen Leidenschaft für ästhetische Medizin widmet sich Saskia Heer der Kunst, natürliche Schönheit durch präzise, individuelle Behandlungskonzepte zu betonen – stets mit dem Ziel, harmonische Ergebnisse zu erzielen, die das Selbstbewusstsein und Wohlbefinden ihrer Patientinnen und Patienten nachhaltig steigern.
                </p>
                
                <p className="paragraph">
                  Nach ihrem erfolgreichen Abschluss an der renommierten Charité Universitätsmedizin Berlin im Jahr 2023 hat Saskia Heer sich einem intensiven einjährigen Weiterbildungsprogramm gewidmet. Durch individuell zugeschnittene Fachkurse und praktische Spezialisierung hat sie ihre Expertise in innovativen, nichtinvasiven Techniken der ästhetischen Medizin kontinuierlich verfeinert und erweitert. Dieser Weg ermöglicht es ihr heute, exzellente ästhetisch-medizinische Ergebnisse auf dem neuesten wissenschaftlichen Forschungsstandard zu erzielen.
                </p>
              </div>
              
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative overflow-hidden rounded-none shadow-elegant"
                >
                  <Image
                    src="/images/saskia.png"
                    alt="Dr. Saskia Heer"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
            
            <div className="bg-light p-8 rounded-none border border-secondary/10 shadow-elegant mb-8">
              <h4 className="font-serif text-xl font-semibold mb-4 text-primary text-center">Meine Philosophie</h4>
              <p className="italic text-primary/90 text-center">
                "Wahre Schönheit liegt in der feinen Balance zwischen Perfektion und Natürlichkeit. Mein Ansatz verbindet wissenschaftliche Präzision mit einem künstlerischen Blick für Harmonie und Proportion. Jede Behandlung wird individuell konzipiert, um Ihre natürlichen Vorzüge zu betonen und gleichzeitig subtile, aber wirkungsvolle Verbesserungen zu erzielen. Das schönste Kompliment für meine Arbeit ist, wenn das Ergebnis so harmonisch wirkt, dass es nicht als 'gemacht' erkennbar ist."
              </p>
              <p className="text-right font-medium mt-4 text-secondary">— Saskia Heer</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 border border-secondary/10 shadow-elegant">
                <h5 className="font-serif text-lg font-medium mb-3 text-primary">Fachliche Expertise</h5>
                <p className="text-sm text-primary/80">
                  Spezialisierung auf minimalinvasive ästhetische Verfahren mit Fokus auf Präzision und wissenschaftlich fundierte Methoden.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-secondary/10 shadow-elegant">
                <h5 className="font-serif text-lg font-medium mb-3 text-primary">Kontinuierliche Weiterbildung</h5>
                <p className="text-sm text-primary/80">
                  Regelmäßige Teilnahme an internationalen Fachkongressen und Workshops zu neuesten Techniken und Produkten.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-secondary/10 shadow-elegant">
                <h5 className="font-serif text-lg font-medium mb-3 text-primary">Ganzheitlicher Ansatz</h5>
                <p className="text-sm text-primary/80">
                  Kombination verschiedener Behandlungsmethoden für optimale, langanhaltende Ergebnisse mit Fokus auf Hautgesundheit.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <a href={getPlanityBookingUrl()} target="_blank" rel="noopener noreferrer" className="button-primary inline-block">
                Jetzt Termin Buchen
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;