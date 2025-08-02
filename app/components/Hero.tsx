"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanityBookingUrl, openPlanityBooking } from '../utils/planityBooking';

const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    // Intro animation sequence
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    // Show background after intro fades
    const backgroundTimer = setTimeout(() => {
      setShowBackground(true);
    }, 3000);

    // Show content after background appears
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 4000);
    
    // Show decorative elements last
    const decorationsTimer = setTimeout(() => {
      setShowDecorations(true);
    }, 5000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(backgroundTimer);
      clearTimeout(contentTimer);
      clearTimeout(decorationsTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Elegant background with overlay */}
      {showBackground && (
        <div className="fixed inset-0 w-full h-full z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat w-full h-full"
            style={{ 
              minHeight: '100vh',
              filter: 'contrast(1.05) brightness(0.95) blur(3px)',
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/15 via-transparent to-light/40"></div>
          
          {/* Subtle grid pattern overlay */}
          {showDecorations && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(to right, #D2B48C 1px, transparent 1px), 
                                  linear-gradient(to bottom, #D2B48C 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          )}
        </div>
      )}
      
      {/* Initial logo intro animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-light z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.8 }}
              className="relative"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute top-[-25px] h-px bg-secondary/40 -left-12 -right-12 transform"
              />
              <h1 className="font-serif text-6xl md:text-8xl text-secondary tracking-widest relative">
                <span className="relative z-10">
                  Med<span className="font-light italic">Estetique</span>
                </span>
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-px bg-secondary/40 mx-auto mt-8"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main hero content */}
      {showContent && (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl px-4"
          >
            {/* Gold decorative element */}
            {showDecorations && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="mb-4"
              >
                <div className="gold-circle mb-1"></div>
                <div className="gold-divider w-24 mx-auto mb-3"></div>
              </motion.div>
            )}
            
            <h1 className="heading-1 mb-8 relative">
              <span 
                className="block font-medium tracking-wide text-primary mb-2" 
              >
                Entdecken Sie Ihre
              </span>
              <span 
                className="text-secondary font-bold tracking-wider relative inline-block"
                style={{
                  textShadow: "0px 0px 1px rgba(0,0,0,0.15), 0px 1px 2px rgba(0,0,0,0.07)",
                }}
              >
                Natürliche Schönheit
                {showDecorations && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="absolute bottom-0 left-0 h-px bg-secondary/40"
                  />
                )}
              </span>
            </h1>
            
            <p 
              className="text-base leading-relaxed mb-10 max-w-xl mx-auto text-primary/90 font-medium"
            >
              Exklusive Schönheitsbehandlungen von Ärztin Saskia Heer. <br className="hidden md:block" /> 
              Erleben Sie die perfekte Verbindung von Wissenschaft und Schönheit.  
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#treatments" 
                className="button-primary font-semibold text-light" 
              >
                Unsere Behandlungen
              </a>
              <a 
                href={getPlanityBookingUrl()}
                onClick={openPlanityBooking}
                className="button-secondary font-semibold" 
              >
                Jetzt Termin Buchen
              </a>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Scroll indicator */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <a 
            href="#treatments" 
            className="flex flex-col items-center text-secondary/70 hover:text-secondary transition-colors duration-300" 
            aria-label="Scroll down"
          >
            <div className="w-px h-10 bg-current opacity-50"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full mt-1 animate-bounce"></div>
          </a>
        </motion.div>
      )}
      
      {/* Decorative corner elements */}
      {showDecorations && (
        <>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-20 left-10 md:left-20 w-24 h-24 pointer-events-none opacity-40 md:opacity-70"
          >
            <div className="w-px h-full bg-secondary/20 absolute left-0"></div>
            <div className="w-full h-px bg-secondary/20 absolute top-0"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="absolute bottom-20 right-10 md:right-20 w-24 h-24 pointer-events-none opacity-40 md:opacity-70"
          >
            <div className="w-px h-full bg-secondary/20 absolute right-0"></div>
            <div className="w-full h-px bg-secondary/20 absolute bottom-0"></div>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default Hero;