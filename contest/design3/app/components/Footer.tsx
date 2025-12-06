const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 font-mono text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">
                            HAUT<span className="text-primary">SCHIMMER</span>_
                        </h3>
                        <p className="text-white/50">
                            Next generation aesthetic medicine.<br />
                            Berlin, Germany.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-primary font-bold uppercase mb-6">// CONTACT</h4>
                        <ul className="space-y-2 text-white/70">
                            <li className="hover:text-primary cursor-pointer">info@hautschimmer.de</li>
                            <li className="hover:text-primary cursor-pointer">+49 123 456 789</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary font-bold uppercase mb-6">// SOCIAL</h4>
                        <ul className="space-y-2 text-white/70">
                            <li className="hover:text-primary cursor-pointer">INSTAGRAM</li>
                            <li className="hover:text-primary cursor-pointer">LINKEDIN</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary font-bold uppercase mb-6">// LEGAL</h4>
                        <ul className="space-y-2 text-white/70">
                            <li className="hover:text-primary cursor-pointer">IMPRESSUM</li>
                            <li className="hover:text-primary cursor-pointer">DATENSCHUTZ</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
                    <div>
                        © {new Date().getFullYear()} SYSTEM_ACTIVE
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>STATUS: ONLINE</span>
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
