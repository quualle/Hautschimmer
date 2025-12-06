"use client";

import { motion } from 'framer-motion';
import HeroVideo from './HeroVideo';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Video with Overlay */}
            <HeroVideo />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="block text-white/90 text-sm md:text-base uppercase tracking-[0.3em] mb-6 drop-shadow-lg">
                        Ästhetische Medizin Berlin
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight text-white drop-shadow-xl">
                        Natürliche <br />
                        <span className="italic text-white/95">Schönheit</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-white/85 mb-12 leading-relaxed drop-shadow-lg">
                        Professionelle Anti-Aging und Schönheitsbehandlungen.
                        Ärztlich durchgeführt für harmonische Ergebnisse, die Ihre Persönlichkeit unterstreichen.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href="/kontakt"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-xl hover:bg-accent transition-colors min-w-[200px]"
                        >
                            Termin Vereinbaren
                        </motion.a>
                        <motion.a
                            href="/behandlungen"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white/90 backdrop-blur text-foreground border border-white/50 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors min-w-[200px]"
                        >
                            Behandlungen
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-white/50"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
