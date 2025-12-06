"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Behandlungen', href: '/behandlungen' },
        { name: 'Über Mich', href: '/ueber-uns' },
        { name: 'Preise', href: '/preise' },
        { name: 'Blog', href: '/blog' },
        { name: 'Kontakt', href: '/kontakt' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="relative z-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <Image
                            src="/images/logo.jpg"
                            alt="Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className={`font-serif text-xl tracking-wide ${scrolled ? 'text-foreground' : 'text-foreground'}`}>
                        Hautschimmer
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isActive(link.href) ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/kontakt" className="bg-primary text-white px-6 py-2 rounded-full text-sm uppercase tracking-wider hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Termin Buchen
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-serif text-3xl transition-colors ${isActive(link.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/kontakt"
                                onClick={() => setIsOpen(false)}
                                className="bg-primary text-white px-8 py-3 rounded-full text-lg uppercase tracking-wider mt-8"
                            >
                                Termin Buchen
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
