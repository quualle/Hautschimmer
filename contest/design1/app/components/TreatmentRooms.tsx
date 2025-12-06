"use client";

import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
    {
        name: "GlamGlow Studio",
        city: "Königs Wusterhausen",
        image: "/images/room.jpg",
        desc: "Unsere Premium-Behandlungen werden exklusiv im eleganten GlamGlow Studio durchgeführt. Der Standort vereint modernste medizinische Ausstattung mit luxuriösem Ambiente.",
        address: "Bahnhofstraße 8",
        link: "https://glamglowkw.de"
    },
    {
        name: "Beauty by Princess",
        city: "Neumarkt i.d.Opf",
        image: "/images/Studio Neumarkt.jpeg",
        desc: "'Beauty by Princess' steht für hochwertige, medizinisch fundierte Ästhetik in elegantem Ambiente. Individuelle Beratung und präzise Techniken.",
        address: "Mussinanstraße 65",
        link: null
    }
];

const TreatmentRooms = () => {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Ambiente</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Unsere Standorte</h2>
                    <p className="max-w-2xl mx-auto text-foreground/60 font-light">
                        Erleben Sie unsere exklusiven Behandlungen in eleganter Atmosphäre.
                        Wir begrüßen Sie an zwei exquisiten Standorten.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {locations.map((loc, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-8">
                                <Image
                                    src={loc.image}
                                    alt={loc.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-foreground">
                                    <MapPin size={14} className="text-primary" />
                                    {loc.city}
                                </div>
                            </div>

                            <h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                                {loc.name}
                            </h3>

                            <p className="text-foreground/60 font-light leading-relaxed mb-6">
                                {loc.desc}
                            </p>

                            <div className="flex items-center justify-between border-t border-secondary/10 pt-6">
                                <span className="text-sm text-foreground/50">{loc.address}</span>
                                <button className="flex items-center gap-2 text-primary font-medium uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                                    Termin Buchen <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TreatmentRooms;
