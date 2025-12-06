"use client";

import { motion } from 'framer-motion';
import { Syringe, Droplets, Dna, Sparkles, Flame, Activity } from 'lucide-react';

const treatments = [
    {
        id: '01',
        title: 'MUSKELRELAXANS',
        desc: 'Precision wrinkle reduction.',
        icon: <Syringe size={32} />,
    },
    {
        id: '02',
        title: 'HYALURON',
        desc: 'Volume enhancement protocol.',
        icon: <Droplets size={32} />,
    },
    {
        id: '03',
        title: 'POLYNUCLEOTIDES',
        desc: 'Cellular regeneration.',
        icon: <Dna size={32} />,
    },
    {
        id: '04',
        title: 'PRP THERAPY',
        desc: 'Autologous blood treatment.',
        icon: <Activity size={32} />,
    },
    {
        id: '05',
        title: 'MESOTHERAPY',
        desc: 'Nutrient infusion.',
        icon: <Sparkles size={32} />,
    },
    {
        id: '06',
        title: 'LIPOLYSIS',
        desc: 'Fat reduction matrix.',
        icon: <Flame size={32} />,
    },
];

const Treatments = () => {
    return (
        <section id="treatments" className="py-32 bg-[#111] relative border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                        Core<br /><span className="text-primary">Protocols</span>
                    </h2>
                    <div className="hidden md:block text-right font-mono text-sm text-white/50">
                        <p>AVAILABLE_SERVICES</p>
                        <p>STATUS: ACTIVE</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {treatments.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ backgroundColor: '#CCFF00', color: '#000' }}
                            className="group bg-[#1a1a1a] p-10 border border-white/5 hover:border-primary transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 font-mono text-sm opacity-30 group-hover:opacity-100">
                                {item.id}
                            </div>

                            <div className="mb-8 text-primary group-hover:text-black transition-colors">
                                {item.icon}
                            </div>

                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:translate-x-2 transition-transform">
                                {item.title}
                            </h3>

                            <p className="font-mono text-sm opacity-60 group-hover:opacity-100">
                                {item.desc}
                            </p>

                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-2xl font-black">+</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Treatments;
