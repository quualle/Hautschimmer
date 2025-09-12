"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getPlanityBookingUrl } from '../utils/planityBooking';

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
        scrolled ? 'bg-light/95 backdrop-blur-md shadow-elegant py-2' : 'bg-transparent py-4'
      }`}
      style={!scrolled ? { background: 'rgba(8,8,10,0.25)', backdropFilter: 'blur(10px)' } : undefined}
    >
      {/* Top gradient border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
      
      <nav className="section-container !py-0 flex flex-col items-center">
        <Link href="/" className="relative z-50 group">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* Logo container with refined glow effect */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mr-3 md:mr-5 flex-shrink-0 overflow-hidden group-hover:shadow-gold transition-all duration-300" 
                style={{
                  boxShadow: "0 0 25px rgba(210, 180, 140, 0.2), 0 0 10px rgba(210, 180, 140, 0.15), inset 0 0 3px rgba(210, 180, 140, 0.3)"
                }}>
              <Image 
                src="/images/logo.jpg" 
                alt="MedEstetique Logo" 
                width={112} 
                height={112} 
                className="w-full h-full object-cover transform scale-110 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/5 to-transparent opacity-40"></div>
            </div>
            
            {/* Brand name with refined styling */}
            <div className="relative">
              <Image 
                src="/images/Medestetique.png" 
                alt="MedEstetique Schriftzug" 
                width={400} 
                height={80} 
                className="h-auto" 
                style={{ 
                  maxWidth: 'clamp(220px, 32vw, 450px)',
                  filter: 'brightness(1.05) contrast(1.08) drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                  transform: 'translateY(2px)'
                }} 
              />
              
              {/* Underline */}
              <div className="absolute -bottom-1 left-1/2 w-0 h-px bg-white/80 transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-700 ease-out"></div>
            </div>
          </motion.div>
        </Link>
        
        {/* Refined separator */}
        <div className="relative w-full max-w-xl h-px my-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-secondary/60 to-transparent animate-pulse"></div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 justify-center">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`relative font-light text-sm tracking-wide uppercase text-shadow-soft ${
                activeSection === link.id 
                  ? 'text-white font-medium' 
                  : 'text-white/90 hover:text-white'
              } transition-colors duration-300 group py-1 px-3`}
              style={{ textShadow: scrolled ? '0 1px 2px rgba(0,0,0,0.25)' : '0 2px 6px rgba(0,0,0,0.45)' }}
            >
              <span className={`relative z-10`}>{link.name}</span>
              <span className={`absolute inset-x-0 bottom-0 h-px bg-white/70 transform origin-left transition-transform duration-300 ${
                activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
              {!scrolled && (
                <span className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button with refined styling */}
        <button 
          className="md:hidden text-xl w-10 h-10 flex items-center justify-center absolute top-5 right-5 z-50 text-primary hover:text-secondary transition-colors duration-300" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation with enhanced animations */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-light/98 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6 p-6"
          >
            <div className="gold-divider w-16 mb-4"></div>
            
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-base font-medium text-primary hover:text-secondary transition-colors duration-300 py-2 px-4 rounded-sm hover:bg-secondary/10"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="gold-divider w-16 my-4"></div>
            
            <a 
              href={getPlanityBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary mt-2 text-sm"
              onClick={toggleMenu}
            >
              Jetzt Termin Buchen
            </a>
          </motion.div>
        )}
      </nav>
      
      {/* Bottom gradient border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
    </header>
  );
};

export default Navbar;