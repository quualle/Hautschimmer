import Link from 'next/link';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8">
      <div className="section-container !py-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4 drop-shadow-sm" style={{textShadow: "0px 1px 2px rgba(0,0,0,0.15)"}}>MedEstetique</h3>
          <p className="mb-4">Premium Schönheitsbehandlungen von Saskia Heer.</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-xl hover:text-[#C0A080] transition-colors">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-xl hover:text-[#C0A080] transition-colors">
              <FaFacebook />
            </a>
            <a href="mailto:saskia.medestetique@gmail.com" aria-label="Email" className="text-xl hover:text-[#C0A080] transition-colors">
              <FaEnvelope />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Schnellzugriff</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-[#C0A080] transition-colors">Startseite</Link></li>
            <li><Link href="#treatments" className="hover:text-[#C0A080] transition-colors">Behandlungen</Link></li>
            <li><Link href="#pricing" className="hover:text-[#C0A080] transition-colors">Preise</Link></li>
            <li><Link href="#about" className="hover:text-[#C0A080] transition-colors">Über Uns</Link></li>
            <li><Link href="/blog" className="hover:text-[#C0A080] transition-colors">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-[#C0A080] transition-colors">Kontakt</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Kontaktinformationen</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              <p>0173 8615766</p>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <p>saskia.medestetique@gmail.com</p>
            </li>
            <li className="flex items-start mt-4">
              <FaMapMarkerAlt className="mr-2 mt-1 text-secondary" />
              <div>
                <p className="font-semibold mb-1">Standorte:</p>
                <p className="text-sm">Königs Wusterhausen</p>
                <p className="text-sm">Neumarkt i.d.Opf (ab 13.10.2025)</p>
                <p className="text-sm text-gray-300">Mussinanstraße 65</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="section-container !py-0 mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} MedEstetique. Alle Rechte vorbehalten.</p>
        <div className="mt-2 space-x-4">
          <Link href="/impressum" className="hover:text-[#C0A080] transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-[#C0A080] transition-colors">Datenschutz</Link>
        </div>
        <p className="mt-1">Mit Leidenschaft erstellt von Saskia Heer</p>
      </div>
    </footer>
  );
};

export default Footer;