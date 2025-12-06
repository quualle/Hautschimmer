"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="py-32 bg-black relative overflow-hidden">
            {/* Marquee Background */}
            <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-5 pointer-events-none">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-[200px] font-black uppercase text-white leading-none"
                >
                    Saskia Heer Saskia Heer Saskia Heer
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                        <div className="relative aspect-[3/4] bg-[#222] border-2 border-white overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                            <Image
                                src="/images/saskia.png"
                                alt="Saskia Heer"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Tech Specs Overlay */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur p-4 border-t border-primary font-mono text-xs text-primary">
                            <div className="flex justify-between">
                                <span>SUBJ: SASKIA_HEER</span>
                                <span>ROLE: MD_SPECIALIST</span>
                            </div>
                            <div className="w-full h-px bg-primary/30 my-2"></div>
                            <div className="flex justify-between">
                                <span>LOC: BERLIN</span>
                                <span>EXP: HIGH_LEVEL</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-block bg-primary text-black px-2 py-1 font-mono text-xs font-bold mb-6">
              // PROFILE_DATA
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                            Medical<br />
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Precision</span>
                        </h2>

                        <div className="space-y-6 text-lg font-mono text-white/70">
                            <p>
                                &gt; Saskia Heer combines medical expertise with aesthetic vision.
                                <br />&gt; Charité Berlin graduate.
                                <br />&gt; Focus: Natural enhancement algorithms.
                            </p>

                            <p className="border-l-2 border-primary pl-4 text-white">
                                "We do not just treat. We upgrade."
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-4">
                            {['Precision', 'Safety', 'Innovation', 'Results'].map((tag) => (
                                <div key={tag} className="border border-white/20 p-4 hover:bg-white hover:text-black transition-colors cursor-default">
                                    <span className="font-mono text-xs uppercase text-primary block mb-1">// TAG</span>
                                    <span className="font-bold uppercase tracking-wider">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
