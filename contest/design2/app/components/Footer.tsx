const Footer = () => {
    return (
        <footer className="bg-black border-t border-primary/20 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 tracking-[0.2em]">
                        HAUT<span className="text-primary">SCHIMMER</span>
                    </h2>

                    <div className="flex space-x-8 mb-12">
                        {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                            <a key={social} href="#" className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-primary transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>

                    <div className="max-w-md text-white/40 font-light mb-16 leading-relaxed">
                        <p>Musterstraße 123, 10115 Berlin</p>
                        <p>+49 123 456 789 • info@hautschimmer.de</p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

                    <div className="flex flex-col md:flex-row gap-6 text-xs uppercase tracking-[0.1em] text-white/30">
                        <a href="#" className="hover:text-white transition-colors">Impressum</a>
                        <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
