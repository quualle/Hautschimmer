"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Philosophy = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <section className="py-24 bg-[#FCFAF7]" ref={ref}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Mein Ansatz</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Meine Philosophie</h2>
                        <div className="w-24 h-px bg-primary mx-auto"></div>
                    </div>

                    <div className="bg-white p-10 md:p-14 rounded-3xl border border-secondary/10 shadow-xl">
                        <p className="italic text-foreground/90 text-lg md:text-xl leading-relaxed text-center">
                            "Wahre Schönheit liegt in der feinen Balance zwischen Perfektion und Natürlichkeit. Mein Ansatz verbindet wissenschaftliche Präzision mit einem künstlerischen Blick für Harmonie und Proportion. Jede Behandlung wird individuell konzipiert, um Ihre natürlichen Vorzüge zu betonen und gleichzeitig subtile, aber wirkungsvolle Verbesserungen zu erzielen. Das schönste Kompliment für meine Arbeit ist, wenn das Ergebnis so harmonisch wirkt, dass es nicht als 'gemacht' erkennbar ist."
                        </p>
                        <p className="text-right font-serif text-xl mt-8 text-primary">— Saskia Heer</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <h5 className="font-serif text-xl font-medium mb-4 text-foreground">Fachliche Expertise</h5>
                            <p className="text-foreground/70 leading-relaxed">
                                Spezialisierung auf minimalinvasive ästhetische Verfahren mit Fokus auf Präzision und wissenschaftlich fundierte Methoden.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <h5 className="font-serif text-xl font-medium mb-4 text-foreground">Kontinuierliche Weiterbildung</h5>
                            <p className="text-foreground/70 leading-relaxed">
                                Regelmäßige Teilnahme an internationalen Fachkongressen und Workshops zu neuesten Techniken und Produkten.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl border border-secondary/10 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <h5 className="font-serif text-xl font-medium mb-4 text-foreground">Ganzheitlicher Ansatz</h5>
                            <p className="text-foreground/70 leading-relaxed">
                                Kombination verschiedener Behandlungsmethoden für optimale, langanhaltende Ergebnisse mit Fokus auf Hautgesundheit.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;
