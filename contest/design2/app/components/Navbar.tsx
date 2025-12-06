"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Behandlungen', href: '#treatments' },
        { name: 'Über Mich', href: '#about' },
        { name: 'Preise', href: '#pricing' },
        { name: 'Kontakt', href: '#contact' },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-primary/20 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="relative z-50 flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-primary/30 group-hover:border-primary transition-colors duration-500">
                        <Image
                            src="/images/logo.jpg"
                            alt="Logo"
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                    <span className="font-serif text-xl tracking-widest text-primary group-hover:text-glow transition-all duration-300">
                        HAUTSCHIMMER
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-primary transition-colors duration-300 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <button className="border border-primary text-primary px-8 py-2 text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all duration-500">
                        Termin
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-10"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-serif text-2xl text-white/80 hover:text-primary transition-colors tracking-widest"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
