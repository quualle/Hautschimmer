"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sophie K.',
        age: 42,
        role: 'Patientin',
        content: 'Bin sehr zufrieden mit den Ergebnissen. Meine Freunde haben bemerkt, dass ich frischer aussehe, konnten aber nicht sagen warum. Genau was ich wollte – natürlich aussehen, nicht "gemacht".',
        rating: 5
    },
    {
        id: 2,
        name: 'Thomas M.',
        age: 38,
        role: 'Patient',
        content: 'War anfangs skeptisch, aber die Ergebnisse sprechen für sich. Meine Haut sieht deutlich besser aus, und der ganze Prozess war unkomplizierter als erwartet.',
        rating: 5
    },
    {
        id: 3,
        name: 'Elisa B.',
        age: 45,
        role: 'Patientin',
        content: 'Die Filler haben einen echten Unterschied gemacht. Das verlorene Volumen in meinen Wangen ist wieder da, und ich sehe jünger aus, ohne dass es unnatürlich wirkt.',
        rating: 5
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 bg-[#FCFAF7] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Kundenstimmen</h2>
                    <div className="w-24 h-px bg-primary mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative min-h-[300px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <Quote size={48} className="text-primary/20 mx-auto mb-8" />

                                <p className="text-xl md:text-2xl font-light italic text-foreground/80 mb-8 leading-relaxed">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                <div className="flex justify-center gap-1 mb-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-primary text-primary" />
                                    ))}
                                </div>

                                <div>
                                    <h4 className="font-serif text-lg font-medium">{testimonials[currentIndex].name}, {testimonials[currentIndex].age}</h4>
                                    <span className="text-sm text-foreground/50 uppercase tracking-widest">{testimonials[currentIndex].role}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Kundenstimmen Navigation">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-8' : 'bg-secondary/30 hover:bg-secondary/50'
                                    }`}
                                aria-label={`Bewertung ${index + 1} von ${testimonials.length} anzeigen`}
                                aria-selected={index === currentIndex}
                                role="tab"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
