"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="py-32 bg-[#FCFAF7] relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/saskia.png"
                                alt="Ärztin Saskia Heer - Spezialistin für ästhetische Medizin bei Hautschimmer"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative Frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl -z-10"></div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Die Ärztin</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">Saskia Heer</h2>

                        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                            <p>
                                Als Ärztin mit einer außergewöhnlichen Leidenschaft für ästhetische Medizin widmet sich Saskia Heer der Kunst, natürliche Schönheit durch präzise, individuelle Behandlungskonzepte zu betonen.
                            </p>
                            <p>
                                Nach ihrem erfolgreichen Abschluss an der renommierten Charité Universitätsmedizin Berlin hat sie ihre Expertise in innovativen, nichtinvasiven Techniken kontinuierlich verfeinert.
                            </p>

                            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-white/50 italic text-foreground font-serif text-xl">
                                "Wahre Schönheit liegt in der feinen Balance zwischen Perfektion und Natürlichkeit."
                            </blockquote>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-serif text-xl mb-2 text-foreground">Expertise</h4>
                                <p className="text-sm text-foreground/70">Spezialisierung auf minimalinvasive Verfahren & wissenschaftliche Methoden.</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl mb-2 text-foreground">Präzision</h4>
                                <p className="text-sm text-foreground/70">Individuelle Konzepte für harmonische und natürliche Ergebnisse.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
