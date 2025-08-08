"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { getPlanityBookingUrl } from '../utils/planityBooking';

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
    <section id="contact" className="py-24 bg-primary/20">
      <div className="section-container !pt-0 !pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Kontakt<span className="text-[#C0A080]">aufnahme</span></h2>
          <p className="paragraph max-w-3xl mx-auto">
            Bereit, Ihre Schönheitsreise zu beginnen? Kontaktieren Sie uns, um einen Beratungstermin zu vereinbaren oder mehr über unsere Behandlungen zu erfahren.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kontaktinformationen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="heading-3 mb-6">Kontaktinformationen</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-[#333333]/50 p-3 rounded-full mr-4">
                  <FaPhone className="text-[#C0A080]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p>0173 8615766</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#333333]/50 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-[#C0A080]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p>saskia.medestetique@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deutlich hervorgehobene Buchungsplattform-CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 max-w-3xl mx-auto text-center p-10 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-[#d2b48c] rounded-2xl shadow-gold"></div>
            <div className="relative z-10 text-light">
              <h3 className="font-serif text-3xl mb-6 font-semibold drop-shadow-lg">Jetzt Termin Buchen</h3>
              <p className="mb-8 text-lg font-light max-w-xl mx-auto">
                Ärztliche Leistungen von Saskia Heer werden an ausgewählten Tagen im Jahr
                im Kosmetikstudio Glam & Glow Beauty in
                Königs Wusterhausen angeboten. Terminreservierungen sind bequem über unsere
                Buchungsplattform möglich.
              </p>
              <a
                href={getPlanityBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-full bg-light text-secondary font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Zur Buchungsplattform
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;