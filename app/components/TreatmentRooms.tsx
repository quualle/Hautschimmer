"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { getPlanityBookingUrl, openPlanityBooking } from '../utils/planityBooking';

const TreatmentRooms = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-24 bg-light relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" 
          style={{ background: "radial-gradient(circle, #D2B48C 0%, transparent 70%)" }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E6C9A8 0%, transparent 70%)" }}></div>
          
      <div className="section-container !pt-0 !pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="gold-circle mb-6"></div>
          <h2 className="heading-2 mb-6 relative inline-block">
            <span className="text-primary">Unsere </span>
            <span className="text-secondary font-medium">Behandlungsräume</span>
          </h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={inView ? { width: '80px' } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-px bg-secondary/50 mx-auto mt-4 mb-8"
          />
          
          <p className="paragraph max-w-3xl mx-auto text-primary/80">
            Erleben Sie unsere exklusiven Behandlungen in eleganter Atmosphäre. 
            Wir begrüßen Sie in ausgewählten Räumlichkeiten, die höchsten Ansprüchen an Komfort und Diskretion genügen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white shadow-elegant border border-secondary/10 rounded-none overflow-hidden relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="h-72 lg:h-auto relative overflow-hidden flex items-center justify-center bg-light">
              <Image
                src="/images/room.jpg"
                alt="Behandlungsraum GlamGlow Studio"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                className="transition-transform duration-700 hover:scale-105 rounded-none"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-30"></div>
            </div>
            
            {/* Content side */}
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="heading-3 mb-4 text-primary">GlamGlow Studio</h3>
              <p className="paragraph mb-6 text-primary/80">
                Unsere Premium-Behandlungen werden exklusiv im eleganten GlamGlow Studio durchgeführt. Der Standort vereint modernste medizinische Ausstattung mit luxuriösem Ambiente für ein einzigartiges Behandlungserlebnis.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-primary">GlamGlow Königs Wusterhausen</p>
                    <p className="text-sm text-primary/70">In der Nähe von Berlin</p>
                  </div>
                </div>
              </div>
              
              <Link 
                href="https://glamglowkw.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-secondary font-medium transition-colors duration-300 hover:text-secondary/80 group"
              >
                Mehr erfahren über GlamGlow Studio
                <FaExternalLinkAlt className="ml-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center mt-12">
          <a 
            href={getPlanityBookingUrl()}
            onClick={openPlanityBooking}
            className="button-primary inline-block"
          >
            Jetzt Termin Buchen
          </a>
        </div>
      </div>
    </section>
  );
};

export default TreatmentRooms; 