"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { getPlanityBookingUrl } from '../utils/planityBooking';
import { BookingLocation, openBookingForLocation } from '../utils/supersaasBooking';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a backend service
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you shortly.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="section-container !pt-0 !pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Kontakt<span className="text-secondary">aufnahme</span></h2>
          <p className="paragraph max-w-3xl mx-auto">
            Bereit, Ihre Schönheitsreise zu beginnen? Kontaktieren Sie uns, um einen Beratungstermin zu vereinbaren oder mehr über unsere Behandlungen zu erfahren.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Standort-spezifische Buchungsplattform-CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-center p-10 md:p-12 relative bg-white/80 border border-secondary/20 rounded-2xl shadow-xl"
          >
            <div className="relative z-10 text-primary">
              <h3 className="font-serif text-3xl mb-6 font-semibold">Jetzt Termin buchen</h3>
              <p className="mb-8 text-lg font-light max-w-2xl mx-auto text-primary/80">
                Ärztliche Leistungen von Saskia Heer werden
                an zwei Standorten angeboten. Wählen Sie Ihren bevorzugten Standort für die Terminbuchung.
              </p>
              
              {/* Standort-Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full">
                {/* Königs Wusterhausen */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 border border-secondary/20"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-2xl text-secondary mr-3" />
                    <h4 className="text-xl font-semibold text-primary">Königs Wusterhausen</h4>
                  </div>
                  <p className="text-primary/70 mb-4 text-sm">
                    Kosmetikstudio Glam & Glow Beauty
                  </p>
                  <button
                    onClick={(e) => openBookingForLocation(BookingLocation.KOENIGS_WUSTERHAUSEN, e)}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    Termin in KW buchen
                  </button>
                </motion.div>

                {/* Neumarkt */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 border border-secondary/20"
                >
                  <div className="flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="text-2xl text-secondary mr-3" />
                    <h4 className="text-xl font-semibold text-primary">Neumarkt i.d.Opf</h4>
                  </div>
                  <p className="text-primary/70 mb-4 text-sm">
                    Mussinanstraße 65<br />
                    <span className="text-xs">ab 13. Oktober 2025</span>
                  </p>
                  <button
                    onClick={(e) => openBookingForLocation(BookingLocation.NEUMARKT, e)}
                    className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    Termin in Neumarkt buchen
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
