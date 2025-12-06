"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Dark Overlay Background */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Abstract glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px]"></div>

                {/* Texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h2 className="text-primary text-sm md:text-base uppercase tracking-[0.5em] mb-8 font-sans">
                        Excellence in Aesthetics
                    </h2>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl mb-8 leading-none text-white tracking-widest">
                        <span className="block gold-gradient">HAUT</span>
                        <span className="block text-white/90">SCHIMMER</span>
                    </h1>

                    <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto my-8"></div>

                    <p className="max-w-2xl mx-auto text-lg text-white/60 mb-12 font-light tracking-wide">
                        Entdecken Sie die Symbiose aus medizinischer Präzision und luxuriöser Pflege.
                        Ihr Weg zu zeitloser Schönheit beginnt hier.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent border border-primary text-primary px-10 py-4 text-sm uppercase tracking-[0.25em] hover:bg-primary hover:text-black transition-all duration-500"
                    >
                        Experience
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
