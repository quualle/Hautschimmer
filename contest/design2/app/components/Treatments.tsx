"use client";

import { motion } from 'framer-motion';
import { Syringe, Droplets, Dna, Sparkles, Microscope, Flame, Activity } from 'lucide-react';

const treatments = [
    {
        id: 'muskelrelaxans',
        title: 'Muskelrelaxans',
        description: 'Präzise Glättung mimischer Falten.',
        icon: <Syringe className="w-8 h-8" />,
    },
    {
        id: 'hyaluronic',
        title: 'Hyaluron Filler',
        description: 'Volumen und Kontur in Perfektion.',
        icon: <Droplets className="w-8 h-8" />,
    },
    {
        id: 'polynucleotides',
        title: 'Polynukleotide',
        description: 'Regeneration auf höchstem Niveau.',
        icon: <Dna className="w-8 h-8" />,
    },
    {
        id: 'prp',
        title: 'PRP Therapie',
        description: 'Die Kraft Ihres eigenen Körpers.',
        icon: <Activity className="w-8 h-8" />,
    },
    {
        id: 'mesotherapy',
        title: 'Mesotherapie',
        description: 'Exklusive Nährstoffkomplexe.',
        icon: <Sparkles className="w-8 h-8" />,
    },
    {
        id: 'lipolysis',
        title: 'Lipolyse',
        description: 'Formvollendung der Silhouette.',
        icon: <Flame className="w-8 h-8" />,
    },
];

const Treatments = () => {
    return (
        <section id="treatments" className="py-32 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-24">
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-widest text-center">
                        <span className="text-primary">ROYAL</span> TREATMENTS
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treatments.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-10 glass-dark overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-8 p-4 rounded-full border border-primary/30 text-primary group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500">
                                    {item.icon}
                                </div>

                                <h3 className="font-serif text-2xl mb-4 text-white group-hover:text-primary transition-colors tracking-wide">
                                    {item.title}
                                </h3>

                                <p className="text-white/50 font-light tracking-wide mb-8 group-hover:text-white/80 transition-colors">
                                    {item.description}
                                </p>

                                <span className="text-xs uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    Discover
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Treatments;
