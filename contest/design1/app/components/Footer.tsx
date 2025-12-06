import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#2F2A26] text-white py-20">
            <div className="container mx-auto px-6">
                {/* Google Maps Section */}
                <div className="mb-20">
                    <h3 className="font-serif text-3xl text-center mb-12">Unsere Standorte</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Neumarkt Map */}
                        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                            <div className="p-6 bg-[#3E3832]">
                                <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                    <MapPin size={20} className="text-primary" />
                                    Neumarkt i.d.Opf
                                </h4>
                                <p className="text-white/70 ml-7">Mussinanstraße 65, 92318 Neumarkt</p>
                                <p className="text-white/50 text-sm ml-7 mt-1">ab 13. Oktober 2025</p>
                            </div>
                            <div className="aspect-video w-full h-[300px]">
                                <iframe
                                    src="https://maps.google.com/maps?q=Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps - Neumarkt Standort"
                                    className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Königs Wusterhausen Map */}
                        <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                            <div className="p-6 bg-[#3E3832]">
                                <h4 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                    <MapPin size={20} className="text-primary" />
                                    Königs Wusterhausen
                                </h4>
                                <p className="text-white/70 ml-7">Bahnhofstraße 8, 15711 Königs Wusterhausen</p>
                                <p className="text-white/50 text-sm ml-7 mt-1">im Kosmetikstudio Glam & Glow Beauty</p>
                            </div>
                            <div className="aspect-video w-full h-[300px]">
                                <iframe
                                    src="https://maps.google.com/maps?q=Bahnhofstra%C3%9Fe+8,+15711+K%C3%B6nigs+Wusterhausen&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps - Königs Wusterhausen Standort"
                                    className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    <div>
                        <h3 className="font-serif text-3xl mb-6">Hautschimmer</h3>
                        <p className="text-white/60 mb-8 leading-relaxed">
                            Ästhetische Medizin auf höchstem Niveau.
                            Natürliche Ergebnisse durch ärztliche Expertise und modernste Verfahren.
                        </p>
                        <div className="flex space-x-6">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110 duration-300">
                                <Instagram size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110 duration-300">
                                <Facebook size={24} />
                            </a>
                            <a href="mailto:saskia.hautschimmer@gmail.com" aria-label="Email" className="text-white/60 hover:text-primary transition-colors transform hover:scale-110 duration-300">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-xl mb-6 text-primary">Schnellzugriff</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Startseite</Link></li>
                            <li><Link href="/behandlungen" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Behandlungen</Link></li>
                            <li><Link href="/preise" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Preise</Link></li>
                            <li><Link href="/ueber-uns" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Über Uns</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Blog</Link></li>
                            <li><Link href="/kontakt" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>Kontakt</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-xl mb-6 text-primary">Kontakt</h4>
                        <ul className="space-y-6 text-white/60">
                            <li className="flex items-start gap-4">
                                <Phone size={20} className="text-primary mt-1 shrink-0" />
                                <span>0173 8615766</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <Mail size={20} className="text-primary mt-1 shrink-0" />
                                <span>saskia.hautschimmer@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-white mb-1">Standorte:</p>
                                    <p>Königs Wusterhausen</p>
                                    <p>Neumarkt i.d.Opf (ab 13.10.2025)</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Hautschimmer. Alle Rechte vorbehalten.</p>
                    <div className="flex space-x-8">
                        <Link href="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
                        <Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
