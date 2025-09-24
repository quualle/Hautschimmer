"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { BookingLocation, openBookingForLocation } from '../utils/supersaasBooking';

const TreatmentRooms = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const locations = [
    {
      id: BookingLocation.KOENIGS_WUSTERHAUSEN,
      name: "GlamGlow Studio",
      city: "Königs Wusterhausen",
      subtitle: "In der Nähe von Berlin",
      image: "/images/room.jpg",
      description: "Unsere Premium-Behandlungen werden exklusiv im eleganten GlamGlow Studio durchgeführt. Der Standort vereint modernste medizinische Ausstattung mit luxuriösem Ambiente für ein einzigartiges Behandlungserlebnis.",
      address: "Bahnhofstraße 8",
      link: "https://glamglowkw.de",
      linkText: "Mehr erfahren über GlamGlow Studio"
    },
    {
      id: BookingLocation.NEUMARKT,
      name: "Beauty by Princess",
      city: "Neumarkt i.d.Opf",
      subtitle: "Exklusives Studio für Ästhetik",
      image: "/images/Studio Neumarkt.jpeg",
      description: "'Beauty by Princess' steht für hochwertige, medizinisch fundierte Ästhetik in elegantem Ambiente. Individuelle Beratung, präzise Techniken und ein warmes Wohlfühlflair verbinden sich hier zu einem besonderen Behandlungserlebnis.",
      address: "Mussinanstraße 65",
      link: null,
      linkText: null
    }
  ];

  return (
    <section className="py-24 bg-light relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" 
          style={{ background: "radial-gradient(circle, #718096 0%, transparent 70%)" }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #A0AEC0 0%, transparent 70%)" }}></div>
          
      <div className="section-container !pt-0 !pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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
            Wir begrüßen Sie an zwei exquisiten Standorten, die höchsten Ansprüchen an Komfort und Diskretion genügen.
          </p>
        </motion.div>

        {/* Static grid with both locations visible */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="relative bg-white shadow-xl border border-secondary/10 rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image side */}
                <div className="h-72 lg:h-full relative overflow-hidden flex items-center justify-center bg-light">
                  <Image
                    src={loc.image}
                    alt={`Behandlungsraum ${loc.name}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="transition-transform duration-700 hover:scale-105"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-30"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-secondary text-sm" />
                    <span className="text-sm font-medium text-primary">{loc.city}</span>
                  </div>
                </div>
                {/* Content side */}
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="heading-3 mb-4 text-primary">{loc.name}</h3>
                  <p className="paragraph mb-6 text-primary/80">{loc.description}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaMapMarkerAlt className="h-3 w-3 text-secondary" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-primary">{loc.city}</p>
                        <p className="text-sm text-primary/70">{loc.subtitle}</p>
                        {loc.address && <p className="text-sm text-primary/70">{loc.address}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <button
                      onClick={(e) => openBookingForLocation(loc.id, e)}
                      className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                    >
                      Termin buchen
                    </button>
                    {loc.link && (
                      <Link href={loc.link} className="inline-flex items-center text-secondary font-medium transition-colors duration-300 hover:text-secondary/80 group">
                        {loc.linkText}
                        <FaExternalLinkAlt className="ml-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentRooms; 
