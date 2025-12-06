"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Treatments', href: '#treatments', index: '01' },
        { name: 'About', href: '#about', index: '02' },
        { name: 'Pricing', href: '#pricing', index: '03' },
        { name: 'Contact', href: '#contact', index: '04' },
    ];

    return (
        <header className="fixed w-full z-50 top-0 left-0 p-6 mix-blend-difference text-white">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
                    HAUT<span className="text-primary">SCHIMMER</span>_
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            <span className="text-primary text-[10px] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                {link.index}
                            </span>
                            {link.name}
                        </Link>
                    ))}
                    <button className="bg-primary text-black px-6 py-2 font-bold uppercase tracking-widest hover:bg-white transition-colors skew-x-[-10deg]">
                        <span className="block skew-x-[10deg]">Book Now</span>
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
                            className="fixed inset-0 bg-black z-40 flex flex-col justify-center px-12"
                        >
                            <div className="flex flex-col space-y-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-6xl font-black uppercase tracking-tighter hover:text-primary hover:pl-4 transition-all duration-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-sm text-primary block mb-2 font-mono">{link.index}</span>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
