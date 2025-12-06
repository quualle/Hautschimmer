"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 tracking-widest">
                                THE <span className="text-primary italic">ARTIST</span>
                            </h2>

                            <div className="space-y-8 text-lg text-white/70 font-light leading-relaxed tracking-wide">
                                <p>
                                    <span className="text-primary font-serif text-2xl mr-2">S</span>
                                    askia Heer verkörpert die neue Generation der ästhetischen Medizin.
                                    Mit einem Auge für Detail und einer Hand für Perfektion erschafft sie Ergebnisse,
                                    die nicht nur verändern, sondern veredeln.
                                </p>
                                <p>
                                    Ausgebildet an der Elite-Universität Charité Berlin, verbindet sie medizinische
                                    Exzellenz mit künstlerischer Vision. Jede Behandlung ist ein Meisterwerk der
                                    Individualität.
                                </p>
                            </div>

                            <div className="mt-16 grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                                <div>
                                    <div className="text-4xl font-serif text-primary mb-2">100%</div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">Dedication</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-serif text-primary mb-2">∞</div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">Perfection</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image */}
                    <div className="lg:col-span-5 order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="relative aspect-[3/4] border border-primary/20 p-4">
                                <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                                    <Image
                                        src="/images/saskia.png"
                                        alt="Saskia Heer"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                </div>

                                {/* Decorative corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
