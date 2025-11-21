"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getPlanityBookingUrl } from '../utils/planityBooking';
import BookingSelector from './BookingSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ['treatments', 'pricing', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          } else if (window.scrollY < 100) {
            setActiveSection('home');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Startseite', href: '/', id: 'home' },
    { name: 'Behandlungen', href: '#treatments', id: 'treatments' },
    { name: 'Preise', href: '#pricing', id: 'pricing' },
    { name: 'Über Uns', href: '#about', id: 'about' },
    { name: 'Blog', href: '/blog', id: 'blog' },
    { name: 'Kontakt', href: '#contact', id: 'contact' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-light/95 backdrop-blur-md shadow-elegant py-1' : 'bg-transparent py-2'
      }`}
      style={!scrolled ? { background: 'rgba(8,8,10,0.25)', backdropFilter: 'blur(10px)' } : undefined}
    >
      
      <nav className="section-container !py-0 flex items-center justify-between">
        {/* Logo and brand - moved to left */}
        <Link href="/" className="relative z-50 group flex items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* Smaller logo container */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3 flex-shrink-0 overflow-hidden group-hover:shadow-glow transition-all duration-300"
                style={{
                  boxShadow: "0 0 15px rgba(113, 128, 150, 0.2), 0 0 5px rgba(113, 128, 150, 0.15)"
                }}>
              <Image
                src="/images/logo.jpg"
                alt="Hautschimmer Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover transform scale-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/5 to-transparent opacity-40"></div>
            </div>

            {/* Smaller brand name */}
            <div className="relative">
              <Image
                src="/images/Hautschimmer.png"
                alt="Hautschimmer Schriftzug"
                width={200}
                height={40}
                className="h-auto"
                style={{
                  maxWidth: 'clamp(120px, 20vw, 200px)',
                  filter: 'brightness(1.05) contrast(1.08) drop-shadow(0 2px 8px rgba(0,0,0,0.35))'
                }}
              />
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation - moved to right */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative font-light text-xs md:text-sm tracking-wide uppercase text-shadow-soft ${
                scrolled
                  ? (activeSection === link.id
                      ? 'text-primary font-medium'
                      : 'text-primary/80 hover:text-primary')
                  : (activeSection === link.id
                      ? 'text-white font-medium'
                      : 'text-white/90 hover:text-white')
              } transition-colors duration-300 group py-1 px-2`}
              style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.45)' }}
            >
              <span className={`relative z-10`}>{link.name}</span>
              <span className={`absolute inset-x-0 bottom-0 h-px transform origin-left transition-transform duration-300 ${
                activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              } ${scrolled ? 'bg-secondary/70' : 'bg-white/70'}`}></span>
              {!scrolled && (
                <span className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden text-lg w-8 h-8 flex items-center justify-center z-[60] transition-colors duration-300 ${
            scrolled 
              ? 'text-primary hover:text-secondary' 
              : 'text-white hover:text-secondary'
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-[55]">
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={toggleMenu}
            />
            
            {/* Slide-in menu from right */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-2xl"
              style={{ 
                backgroundColor: '#ffffff',
                backgroundImage: 'none',
                opacity: 1,
                zIndex: 9999
              }}
            >
              {/* Solid white background overlay - failsafe */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ 
                  backgroundColor: '#ffffff',
                  backgroundImage: 'none',
                  opacity: 1,
                  zIndex: 1
                }}
              />
              
              {/* Menu content */}
              <div 
                className="relative flex flex-col h-full p-8 pt-20"
                style={{ 
                  backgroundColor: '#ffffff',
                  backgroundImage: 'none',
                  zIndex: 2
                }}
              >
                {/* Logo section */}
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-2xl text-primary mb-2">Hautschimmer</h2>
                  <div className="w-12 h-px bg-secondary mx-auto"></div>
                </div>
                
                {/* Navigation links */}
                <nav className="flex flex-col space-y-4 flex-1">
                  {navLinks.map(link => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="text-lg font-medium text-primary hover:text-secondary transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-secondary/5 border-b border-gray-100 last:border-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                      onClick={toggleMenu}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                
                {/* CTA Button */}
                <div className="mt-8">
                  <BookingSelector 
                    variant="modal"
                    className="button-primary w-full text-center block"
                  >
                    Jetzt Termin Buchen
                  </BookingSelector>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
