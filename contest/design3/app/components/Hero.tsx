"use client";

import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111]">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] border border-white/10 rounded-full z-0 border-dashed"
            ></motion.div>

            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-5%] top-[25%] w-[400px] h-[400px] border border-primary/20 rounded-full z-0"
            ></motion.div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-1 bg-primary"></div>
                            <span className="font-mono text-primary text-sm uppercase tracking-widest">
                                System Online // V.3.0
                            </span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8 glitch-effect" data-text="FUTURE BEAUTY">
                            FUTURE<br />
                            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>BEAUTY</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-mono mb-12 border-l-2 border-primary pl-6">
                            &gt; Initializing aesthetic protocols...<br />
                            &gt; Optimizing natural features...<br />
                            &gt; Result: <span className="text-primary">Perfection.</span>
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors skew-x-[-10deg]"
                            >
                                <span className="block skew-x-[10deg]">Initialize Protocol</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors skew-x-[-10deg]"
                            >
                                <span className="block skew-x-[10deg]">View Data</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 font-mono text-xs text-primary">
                <span>SCROLL_DOWN</span>
                <motion.div
                    animate={{ height: [0, 100, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px bg-primary h-24"
                ></motion.div>
            </div>
        </section>
    );
};

export default Hero;
