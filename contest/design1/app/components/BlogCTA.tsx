"use client";

import { ArrowRight, BookOpen } from 'lucide-react';

const BlogCTA = () => {
    return (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <BookOpen size={48} className="mx-auto mb-8 text-white/80" />

                <h2 className="font-serif text-4xl md:text-5xl mb-6">Expertenwissen für Ihre Schönheit</h2>

                <p className="max-w-2xl mx-auto text-white/80 text-lg font-light mb-12 leading-relaxed">
                    Erfahren Sie alles über moderne Behandlungsmethoden, Hautpflege-Tipps und die neuesten
                    Trends der ästhetischen Medizin. Saskia Heer teilt ihr Fachwissen.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-white text-primary px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                        Zum Blog <ArrowRight size={16} />
                    </button>
                    <button className="border border-white/30 text-white px-8 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Botox-Artikel lesen
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogCTA;
