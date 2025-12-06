"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg" // Assuming there is a hero background, otherwise I'll use a placeholder or color
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="block text-primary text-sm md:text-base uppercase tracking-[0.3em] mb-6">
                        Ästhetische Medizin Berlin
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight text-foreground">
                        Natürliche <br />
                        <span className="italic text-primary">Schönheit</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-foreground/80 mb-12 leading-relaxed">
                        Professionelle Anti-Aging und Schönheitsbehandlungen.
                        Ärztlich durchgeführt für harmonische Ergebnisse, die Ihre Persönlichkeit unterstreichen.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-xl hover:bg-accent transition-colors min-w-[200px]"
                        >
                            Termin Vereinbaren
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white text-foreground border border-secondary px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-secondary/20 transition-colors min-w-[200px]"
                        >
                            Behandlungen
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-12 bg-primary/30"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
