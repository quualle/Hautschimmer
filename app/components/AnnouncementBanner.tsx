"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative w-full overflow-hidden z-50"
        >
          <div
            className="relative w-full bg-gradient-to-r from-secondary via-accent to-secondary text-primary py-3 px-4"
            style={{
              background: 'linear-gradient(135deg, #D2B48C 0%, #E6C9A8 50%, #D2B48C 100%)',
              boxShadow: '0 4px 15px rgba(210, 180, 140, 0.3)'
            }}
          >
      {/* Decorative pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative flex items-center justify-center max-w-7xl mx-auto">
        {/* Icon */}
        <div className="hidden sm:flex items-center mr-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <FaMapMarkerAlt className="text-sm text-primary" />
          </div>
        </div>
        
        {/* Main announcement text */}
        <div className="flex-1 text-center">
          <p className="font-medium text-sm md:text-base">
            <span className="font-bold">🎉 Neueröffnung!</span>
            <span className="mx-2 hidden md:inline">•</span>
            <span className="block md:inline">
              Ab dem <span className="font-bold">13. Oktober 2025</span> auch in 
              <span className="font-bold"> Neumarkt i.d.Opf</span>
            </span>
          </p>
          <p className="text-xs md:text-sm mt-1 opacity-90">
            Unser zweiter Standort: Mussinanstraße 65
          </p>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors duration-300"
          aria-label="Banner schließen"
        >
          <FaTimes className="text-sm text-primary" />
        </button>
      </div>
      
            {/* Sparkle animation */}
            <div className="absolute top-2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;