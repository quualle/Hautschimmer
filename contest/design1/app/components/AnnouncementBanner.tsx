"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, MapPin } from 'lucide-react';

const AnnouncementBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-secondary text-secondary-foreground relative z-[60]"
                >
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 mx-auto">
                            <MapPin size={16} className="text-primary" />
                            <p>
                                <span className="font-serif italic mr-2">Neueröffnung!</span>
                                Ab dem 13. Oktober 2025 auch in <span className="font-semibold">Neumarkt i.d.Opf</span> (Mussinanstraße 65)
                            </p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="hover:text-primary transition-colors absolute right-4"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementBanner;
