"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaChevronDown, FaTimes } from 'react-icons/fa';
import { BookingLocation, openBookingForLocation } from '../utils/supersaasBooking';

interface BookingSelectorProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'button' | 'dropdown' | 'modal';
}

const BookingSelector = ({ children, className = '', variant = 'dropdown' }: BookingSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const locations = [
    {
      id: BookingLocation.KOENIGS_WUSTERHAUSEN,
      name: 'Königs Wusterhausen',
      subtitle: 'GlamGlow Studio',
      description: 'Externe Buchung über Planity'
    },
    {
      id: BookingLocation.NEUMARKT,
      name: 'Neumarkt i.d.Opf',
      subtitle: 'MedEstetique Studio',
      description: 'Ab 13. Oktober 2025'
    }
  ];

  const handleLocationSelect = (location: BookingLocation) => {
    openBookingForLocation(location);
    setIsOpen(false);
  };

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={className}
        >
          {children}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif text-primary">Standort wählen</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <FaTimes className="text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-primary/70 mt-2">
                    Wählen Sie Ihren bevorzugten Standort für die Terminbuchung
                  </p>
                </div>

                {/* Location Options */}
                <div className="p-6 space-y-4">
                  {locations.map((location) => (
                    <motion.button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors">
                          <FaMapMarkerAlt className="text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary">{location.name}</h4>
                          <p className="text-sm text-secondary font-medium">{location.subtitle}</p>
                          <p className="text-xs text-primary/60 mt-1">{location.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} flex items-center gap-2`}
        >
          {children}
          <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
            >
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-semibold text-primary">Standort wählen</h4>
                <p className="text-xs text-primary/60">Wählen Sie Ihren bevorzugten Standort</p>
              </div>
              
              <div className="p-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location.id)}
                    className="w-full p-3 text-left hover:bg-secondary/5 rounded-lg transition-colors duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors">
                        <FaMapMarkerAlt className="text-secondary text-sm" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-primary text-sm">{location.name}</h5>
                        <p className="text-xs text-secondary">{location.subtitle}</p>
                        <p className="text-xs text-primary/50">{location.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  // Simple button variant - just opens modal
  return (
    <button
      onClick={() => setIsOpen(true)}
      className={className}
    >
      {children}
    </button>
  );
};

export default BookingSelector;