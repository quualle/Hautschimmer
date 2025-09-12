"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanityBookingUrl, openPlanityBooking } from '../utils/planityBooking';
import dynamic from 'next/dynamic';
import HeroVideo from './HeroVideo';

// HoloOrb deaktiviert für Kompatibilität
const enableHolo = false;
const DynamicHolo: React.ComponentType = () => null;

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
      {/* State-of-the-art Video Background */}
      {showBackground && (
        <div className="fixed inset-0 w-full h-full z-0">
          <HeroVideo />
          {showDecorations && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(210, 180, 140, 0.5) 1px, transparent 1px), 
                                  linear-gradient(to bottom, rgba(210, 180, 140, 0.5) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                mixBlendMode: 'soft-light'
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
              <h1 className="font-serif text-5xl md:text-8xl text-secondary tracking-wider md:tracking-widest relative">
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
      
      {/* 3D Holographic Orb */}
      {showContent && enableHolo ? <DynamicHolo /> : null}

      {/* Main hero content */}
      {showContent && (
        <div className="flex justify-center items-center absolute top-[65%] md:top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center w-full"
          >
            {/* Readability panel */}
            <div className="hero-elegant rounded-3xl px-4 py-3 md:px-8 md:py-8 mx-auto">
            {/* Gold decorative element */}
            {/* Decorative header removed for a more compact panel */}
            
            <h1 className="heading-1 mb-3 md:mb-6 relative">
              <span 
                className="text-light font-bold tracking-wider relative inline-block text-shadow-strong"
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                }}
              >
                Ihr neues Strahlen
                {showDecorations && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="absolute bottom-0 left-0 h-px bg-light/60"
                  />
                )}
              </span>
            </h1>
            
            <p 
              className="text-sm md:text-base leading-relaxed mb-4 md:mb-8 max-w-xl mx-auto text-light/90 font-medium text-shadow-soft"
            >
              Ihre Schönheit in besten Händen
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <a 
                href={getPlanityBookingUrl()}
                onClick={openPlanityBooking}
                className="button-holo" 
              >
                Jetzt Termin buchen
              </a>
              <a 
                href="#treatments" 
                className="button-ghost"
              >
                Unsere Behandlungen
              </a>
            </div>
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