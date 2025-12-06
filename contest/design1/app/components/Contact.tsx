"use client";

import { MapPin, ArrowRight, Mail, Phone } from 'lucide-react';
import { BookingLocation, openBookingForLocation } from '../utils/supersaasBooking';

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-[#FCFAF7]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Booking Info & Maps */}
                    <div>
                        <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Kontakt</span>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">Terminvereinbarung</h2>
                        <p className="text-foreground/60 font-light text-lg mb-12 leading-relaxed">
                            Bereit, Ihre Schönheitsreise zu beginnen? Wählen Sie Ihren bevorzugten Standort
                            für die Terminbuchung. Ärztliche Leistungen von Saskia Heer werden an beiden Standorten angeboten.
                        </p>

                        <div className="space-y-12">
                            {/* Location 1: KW */}
                            <div className="bg-white rounded-2xl shadow-sm border border-secondary/10 overflow-hidden group">
                                <div className="p-8 pb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-serif text-xl mb-1">Königs Wusterhausen</h4>
                                            <p className="text-sm text-foreground/50">Glam & Glow Beauty • Bahnhofstraße 8</p>
                                        </div>
                                        <div className="bg-[#FCFAF7] p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                            <MapPin size={20} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => openBookingForLocation(BookingLocation.KOENIGS_WUSTERHAUSEN, e)}
                                        className="w-full bg-secondary/10 text-foreground py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 mb-6"
                                    >
                                        Termin in KW buchen <ArrowRight size={16} />
                                    </button>
                                </div>
                                {/* Map Embed */}
                                <div className="h-48 w-full bg-gray-100">
                                    <iframe
                                        src="https://maps.google.com/maps?q=Glam+%26+Glow+Beauty,+K%C3%B6nigs+Wusterhausen&output=embed"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps - Königs Wusterhausen"
                                    />
                                </div>
                            </div>

                            {/* Location 2: Neumarkt */}
                            <div className="bg-white rounded-2xl shadow-sm border border-secondary/10 overflow-hidden group">
                                <div className="p-8 pb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-serif text-xl mb-1">Neumarkt i.d.Opf</h4>
                                            <p className="text-sm text-foreground/50">Mussinanstraße 65 • (ab 13.10.2025)</p>
                                        </div>
                                        <div className="bg-[#FCFAF7] p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                            <MapPin size={20} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => openBookingForLocation(BookingLocation.NEUMARKT, e)}
                                        className="w-full bg-secondary/10 text-foreground py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 mb-6"
                                    >
                                        Termin in Neumarkt buchen <ArrowRight size={16} />
                                    </button>
                                </div>
                                {/* Map Embed */}
                                <div className="h-48 w-full bg-gray-100">
                                    <iframe
                                        src="https://maps.google.com/maps?q=Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz&output=embed"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps - Neumarkt"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form & Details */}
                    <div className="flex flex-col h-full">
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-secondary/5 mb-8 flex-grow">
                            <h3 className="font-serif text-2xl mb-8">Nachricht senden</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-foreground/50">Name</label>
                                        <input type="text" className="w-full bg-[#FCFAF7] border-none rounded-lg p-4 focus:ring-1 focus:ring-primary" placeholder="Ihr Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-foreground/50">Email</label>
                                        <input type="email" className="w-full bg-[#FCFAF7] border-none rounded-lg p-4 focus:ring-1 focus:ring-primary" placeholder="ihre@email.de" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Betreff</label>
                                    <select className="w-full bg-[#FCFAF7] border-none rounded-lg p-4 focus:ring-1 focus:ring-primary">
                                        <option>Allgemeine Anfrage</option>
                                        <option>Beratungstermin</option>
                                        <option>Rückrufbitte</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Nachricht</label>
                                    <textarea className="w-full bg-[#FCFAF7] border-none rounded-lg p-4 h-32 focus:ring-1 focus:ring-primary resize-none" placeholder="Ihre Nachricht an uns..."></textarea>
                                </div>

                                <button className="w-full bg-foreground text-white py-4 rounded-lg font-medium uppercase tracking-widest hover:bg-primary transition-colors">
                                    Absenden
                                </button>
                            </form>
                        </div>

                        {/* Direct Contact Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-secondary/10 flex items-center gap-4">
                                <div className="bg-[#FCFAF7] p-3 rounded-full text-primary">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-foreground/50">Telefon</p>
                                    <p className="font-medium">0173 8615766</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-secondary/10 flex items-center gap-4">
                                <div className="bg-[#FCFAF7] p-3 rounded-full text-primary">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-foreground/50">Email</p>
                                    <p className="font-medium text-sm">saskia.hautschimmer@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
