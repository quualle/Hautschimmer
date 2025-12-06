"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, Droplets, Activity, Sparkles, Flame, Info, Clock, Gift, TestTubes, Microscope } from 'lucide-react';

const categories = [
    { id: 'muskelrelaxans', label: 'Muskelrelaxans', icon: Syringe, subtitle: 'Faltenbehandlung' },
    { id: 'hyaluron', label: 'Hyaluron', icon: Droplets, subtitle: 'Volumen & Kontur' },
    { id: 'prp', label: 'PRP Therapie', icon: Activity, subtitle: 'Eigenblutbehandlung' },
    { id: 'polynucleotides', label: 'Polynukleotide', icon: Sparkles, subtitle: 'Zelluläre Regeneration' },
    { id: 'mesotherapy', label: 'Mesotherapie', icon: Droplets, subtitle: 'Wirkstoffdepots' },
    { id: 'vitamininfusion', label: 'Infusionen', icon: TestTubes, subtitle: 'Nährstoff-Booster' },
];

interface PricingItem {
    name: string;
    price: string;
    info: string;
    duration?: string;
    special?: boolean;
}

interface PricingCategory {
    description: string;
    items: PricingItem[];
    packages?: { name: string; price: string; info: string }[];
}

const pricingData: Record<string, PricingCategory> = {
    muskelrelaxans: {
        description: 'Präzise Muskelentspannung für ein natürlich verjüngtes Aussehen',
        items: [
            { name: '1 Zone (flexibel)', price: '189 €', info: 'Stirn, Glabella oder Krähenfüße', duration: '15–20 Min' },
            { name: '2 Zonen (flexibel)', price: '314 €', info: 'Beliebige Kombination', duration: '20–25 Min' },
            { name: '3 Zonen (flexibel)', price: '450 €', info: 'Beliebige Kombination', duration: '25–35 Min' },
            { name: 'Bunny Lines', price: '150 €', info: 'Nasenfältchen', duration: '10–15 Min' },
            { name: 'Lip Flip', price: '150 €', info: 'Oberlippenbetonung', duration: '10–15 Min' },
            { name: 'Masseter / Facial Slimming', price: '300 €', info: 'Zähneknirschen & Kontur', duration: '15–25 Min' },
            { name: 'Hyperhidrose (Achseln)', price: '500 €', info: 'Gegen starkes Schwitzen', duration: '25–35 Min' },
            { name: 'Nefertiti-Lift', price: '300 €', info: 'Kiefer/Hals Definition', duration: '25–35 Min' },
        ]
    },
    hyaluron: {
        description: 'Standard 215 € pro ml • Areale mit ab‑Preis',
        items: [
            { name: 'Standard (1 ml)', price: '215 €', info: 'Für diverse Areale', duration: '20–40 Min' },
            { name: 'Lippenvolumen', price: 'ab 150 €', info: 'Natürlicher Aufbau', duration: '30–40 Min' },
            { name: 'Nasolabialfalten', price: 'ab 250 €', info: 'Faltenglättung', duration: '20–30 Min' },
            { name: 'Jawline Definition', price: 'ab 430 €', info: 'Kieferkonturierung', duration: '30–45 Min' },
            { name: 'Wangenaufbau', price: 'ab 215 €', info: 'Volumen & Lift', duration: '30–45 Min' },
            { name: 'Liquid Facelift', price: 'ab 1169 €', info: 'Full Face Approach', duration: '60 Min', special: true },
        ],
        packages: [
            { name: '2 ml Paket', price: '410 €', info: 'Preisvorteil bei Kombination' },
            { name: '3 ml Paket', price: '615 €', info: 'Für umfassendere Korrekturen' },
        ]
    },
    prp: {
        description: 'Natürliche Hautverjüngung mit körpereigenen Wachstumsfaktoren',
        items: [
            { name: 'PRP Behandlung', price: '500 €', info: '2 Termine inklusive', duration: '45-60 Min' },
            { name: 'Einzelbehandlung', price: '300 €', info: 'Auffrischung', duration: '45 Min' },
            { name: 'Anti-Aging Konzept', price: '1899 €', info: '4x Intensivkur + Analyse', duration: 'Kur', special: true },
        ]
    },
    polynucleotides: {
        description: 'Stimuliert Regeneration, Elastizität und Hautqualität',
        items: [
            { name: 'Polynukleotide', price: '300 €', info: 'Zelluläre Regeneration', duration: '30–45 Min' },
        ]
    },
    mesotherapy: {
        description: 'Gezielte Effekte im Augenbereich',
        items: [
            { name: 'Augenpartie (1x)', price: '180 €', info: 'Revitalisierung', duration: '20–30 Min' },
            { name: 'Augenpartie (2x)', price: '320 €', info: 'Intensivkur', duration: '2 Termine' },
        ]
    },
    vitamininfusion: {
        description: 'Gezielte Versorgung mit Vitaminen & Mineralien',
        items: [
            { name: 'Basis Infusion', price: '99 €', info: 'Vit C, B-Komplex, Mineralien', duration: '30–45 Min' },
            { name: 'Beauty-/Anti-Aging', price: '129 €', info: 'Mit Antioxidantien', duration: '30–45 Min' },
        ]
    }
};

const Pricing = () => {
    const [activeTab, setActiveTab] = useState('muskelrelaxans');

    return (
        <section id="pricing" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Transparenz</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Preise & Leistungen</h2>
                    <div className="w-24 h-px bg-primary mx-auto"></div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3 ${activeTab === cat.id
                                ? 'bg-primary text-white shadow-lg scale-105'
                                : 'bg-[#FCFAF7] text-foreground/70 hover:bg-secondary/20 border border-transparent hover:border-primary/20'
                                }`}
                        >
                            <cat.icon size={18} />
                            <div className="text-left">
                                <span className="block font-semibold">{cat.label}</span>
                                <span className="text-[10px] opacity-80 normal-case tracking-normal block">{cat.subtitle}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-10">
                                <p className="text-lg text-foreground/60 italic">
                                    {pricingData[activeTab as keyof typeof pricingData].description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pricingData[activeTab as keyof typeof pricingData].items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-2xl border transition-all duration-300 flex justify-between items-start group relative overflow-hidden
                                            ${item.special
                                                ? 'bg-gradient-to-br from-[#FCFAF7] to-secondary/10 border-primary/30 shadow-md'
                                                : 'bg-[#FCFAF7] border-secondary/10 hover:border-primary/30 hover:shadow-md'
                                            }`}
                                    >
                                        {item.special && (
                                            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] uppercase px-3 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                                                <Gift size={10} /> Special
                                            </div>
                                        )}

                                        <div className="flex-1 pr-4">
                                            <h4 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h4>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-foreground/60 flex items-center gap-2">
                                                    <Info size={12} className="text-primary/50 shrink-0" />
                                                    {item.info}
                                                </p>
                                                {item.duration && (
                                                    <p className="text-xs text-foreground/40 flex items-center gap-2">
                                                        <Clock size={10} className="shrink-0" />
                                                        {item.duration}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right pt-1">
                                            <span className="block font-medium text-xl text-foreground">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Packages Section if available */}
                            {/* @ts-ignore */}
                            {pricingData[activeTab as keyof typeof pricingData].packages && (
                                <div className="mt-12">
                                    <h3 className="font-serif text-2xl text-center mb-8 text-foreground">Vorteilspakete</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* @ts-ignore */}
                                        {pricingData[activeTab as keyof typeof pricingData].packages.map((pkg, index) => (
                                            <div key={index} className="bg-white p-6 rounded-2xl border border-secondary/20 shadow-sm hover:shadow-md transition-all">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-serif text-lg text-primary">{pkg.name}</h4>
                                                    <span className="font-medium text-xl">{pkg.price}</span>
                                                </div>
                                                <p className="text-sm text-foreground/60">{pkg.info}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="text-center mt-16">
                    <p className="text-sm text-foreground/50 italic mb-8">
                        * Alle Preise verstehen sich inkl. MwSt. und ärztlicher Beratung. Individuelle Abweichungen möglich.
                    </p>
                    <button className="bg-primary text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-xl hover:bg-accent transition-colors">
                        Beratungstermin Buchen
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
