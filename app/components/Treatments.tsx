// @ts-nocheck

"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getPlanityBookingUrl, openPlanityBooking } from '../utils/planityBooking';
import { 
  FaSyringe, FaWater, FaTint, FaChevronDown, FaSmile, FaAngry, FaGrinAlt, FaUserAlt, FaTeeth, 
  FaColumns, FaChartPie, FaCircle, FaBrain, FaSnowflake, FaGrimace, FaBabyCarriage, 
  FaAddressCard, FaLaughBeam, FaSun, FaEye, FaHeartbeat, FaSmileWink, FaSadTear, FaArrowUp,
  FaLeaf, FaFlask, FaVial, FaWind, FaDna, FaVials, FaMicroscope, FaDotCircle, FaFire
} from 'react-icons/fa';
import React from 'react';

// --- REFINED COLOR PALETTE ---
const colors = {
  backgroundStart: '#FFFFFF',
  backgroundEnd: '#F9F5F2',
  primaryAccent: '#D2B48C',       // Sophisticated champagne gold
  secondaryAccent: '#E6C9A8',     // Soft warm beige
  gold: '#B89F7A',                // Muted antique gold
  textPrimary: '#3C322D',         // Deep warm brown
  textSecondary: '#5D4E46',       // Softer brown for supporting text
  white: '#FFFFFF',
  cardBgDefault: 'rgba(255, 255, 255, 0.8)',
  cardBgHover: 'rgba(249, 245, 242, 0.95)',
  cardBorder: 'rgba(210, 180, 140, 0.25)',
  selectedGradientStart: 'rgba(210, 180, 140, 0.85)',
  selectedGradientEnd: 'rgba(230, 201, 168, 0.9)',
  selectedText: '#3C322D',
  iconBgDefault: 'rgba(210, 180, 140, 0.15)',
  iconColorDefault: '#B89F7A',
  iconBgSelected: 'rgba(255, 255, 255, 0.25)',
  iconColorSelected: '#3C322D',
  buttonGradientStart: '#D2B48C',
  buttonGradientEnd: '#B89F7A',
  buttonText: '#FFFFFF',
  purpleAccent: '#5D4E66', // Deep purple for specific elements
};

// Sub-treatments (Inhalte bleiben gleich, Icons können angepasst werden)
const muskelrelaxansSubTreatments = [
  { id: 'eyebrowLift', title: 'AUGENBRAUENLIFTING', icon: <FaEye />, description: 'Natürliches Anheben der Augenbrauen für einen offeneren Blick.' },
  { id: 'gummySmile', title: 'GUMMY SMILE', icon: <FaSmileWink />, description: 'Korrektur eines übermäßigen Zahnfleischlächelns.' },
  { id: 'foreheadLines', title: 'STIRNFALTEN', icon: <FaAngry />, description: 'Glättung horizontaler Stirnfalten.' },
  { id: 'frownLines', title: 'ZORNESFALTE', icon: <FaAngry />, description: 'Reduzierung der vertikalen Falten zwischen den Augenbrauen.' },
  { id: 'crowsFeet', title: 'KRÄHENFÜSSE', icon: <FaLaughBeam />, description: 'Glättung der Fältchen um die Augen.' },
  { id: 'bunnyLines', title: 'BUNNY LINES', icon: <FaSmile />, description: 'Reduzierung der Fältchen auf dem Nasenrücken.' },
  { id: 'facialSlimming', title: 'FACIAL SLIMMING', icon: <FaUserAlt />, description: 'Verschmälerung des Gesichts durch Entspannung der Kaumuskeln.' },
  { id: 'neckLift', title: 'NEFERTITI LIFT (HALS)', icon: <FaArrowUp />, description: 'Straffung der Halspartie und Definition der Kinnlinie.' },
  { id: 'chinDimples', title: 'ERDBEERKINN', icon: <FaCircle />, description: 'Glättung von Grübchen und Unebenheiten am Kinn.' },
  { id: 'bruxismBehandlung', title: 'BRUXISMUS (ZÄHNEKNIRSCHEN)', icon: <FaTeeth />, description: 'Linderung von Zähneknirschen und Kieferschmerzen.' },
  { id: 'hyperhidrosisBehandlung', title: 'HYPERHIDROSE (SCHWITZEN)', icon: <FaTint />, description: 'Reduzierung von übermäßigem Schwitzen unter den Achseln, an Händen oder Füßen.' },
];

const hyaluronSubTreatments = [
  { id: 'hyaluronidase', title: 'HYALURONIDASE (HYLASE)', icon: <FaSyringe />, description: 'Enzym zum Abbau von unerwünschten Hyaluronsäure-Fillern.' },
  { id: 'barcode', title: 'BARCODE (LIPPENLINIEN)', icon: <FaColumns />, description: 'Gezielte Behandlung der vertikalen Linien oberhalb der Lippen.' },
  { id: 'jawline', title: 'JAWLINE', icon: <FaTeeth />, description: 'Definieren und konturieren der Kieferlinie.' },
  { id: 'chin', title: 'KINNAUFBAU', icon: <FaUserAlt />, description: 'Verbesserung der Kinnform und -projektion.' },
  { id: 'cheekbones', title: 'WANGENKNOCHEN', icon: <FaGrinAlt />, description: 'Betonung und Aufbau der Wangenknochen.' },
  { id: 'tearTrough', title: 'TRÄNENRINNE', icon: <FaSadTear />, description: 'Auffüllung der Vertiefungen unter den Augen.' },
  { id: 'fullface', title: 'FULL FACE', icon: <FaAddressCard />, description: 'Ganzheitliche Gesichtsverjüngung und Harmonisierung mit Fillern.' },
];

const lipolysisSubTreatments = [
  { id: 'doubleChin', title: 'DOPPELKINN', icon: <FaUserAlt />, description: 'Reduzierung von Fettpolstern unter dem Kinn.' },
  { id: 'bellyFat', title: 'BAUCHFETT', icon: <FaBabyCarriage />, description: 'Gezielte Behandlung kleinerer Fettansammlungen am Bauch.' },
  { id: 'cellulite', title: 'CELLULITE', icon: <FaSnowflake />, description: 'Verbesserung des Erscheinungsbildes von Cellulite an Oberschenkeln und Po.' },
];

// Main treatments data (Inhalte bleiben gleich)
const treatments = [
  {
    id: 'muskelrelaxans',
    title: 'Muskelrelaxans-Behandlung',
    icon: <FaSyringe />,
    shortDescription: 'Faltenreduktion & Prävention für ein frisches Aussehen.',
    hasSubMenu: true,
    subTreatments: muskelrelaxansSubTreatments,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Muskelrelaxanzien sind bewährte Mittel zur Glättung mimischer Falten. Sie entspannen gezielt die Muskulatur, die für Falten wie Zornesfalten, Stirnfalten oder Krähenfüße verantwortlich ist.</p>
        <p className="paragraph mb-4">Unsere erfahrenen Anwenderinnen setzen Muskelrelaxanzien präzise ein, um ein natürliches, verjüngtes Ergebnis zu erzielen, ohne die Mimik einzuschränken. Neben der Faltenglättung können diese auch bei Zähneknirschen (Bruxismus) oder übermäßigem Schwitzen (Hyperhidrose) helfen.</p>
        <p className="paragraph mb-4">Wir verwenden ausschließlich hochwertige, zertifizierte Produkte für maximale Sicherheit und Wirksamkeit.</p>
      </>
    )
  },
  {
    id: 'hyaluronic',
    title: 'Hyaluron Filler',
    icon: <FaWater />,
    shortDescription: 'Volumenaufbau & Konturierung für harmonische Züge.',
    hasSubMenu: true,
    subTreatments: hyaluronSubTreatments,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Hyaluronsäure ist ein natürlicher Bestandteil unserer Haut, der für Feuchtigkeit und Volumen sorgt. Mit Fillern können wir gezielt Volumenverluste ausgleichen, Konturen definieren und tiefe Falten mildern.</p>
        <p className="paragraph mb-4">Ob Wangenaufbau, Kinnkorrektur oder die Behandlung der Tränenrinne – Saskia Heer verwendet hochwertige Filler und fortschrittliche Techniken für natürlich wirkende Ergebnisse, die Ihre individuelle Schönheit unterstreichen.</p>
        <p className="paragraph mb-4">Hyaluronidase (Hylase) ermöglicht zudem die gezielte Auflösung von Fillern bei Bedarf.</p>
      </>
    )
  },
  {
    id: 'polynucleotides',
    title: 'Polynukleotide',
    icon: <FaDna />,
    shortDescription: 'Innovative Hautregeneration auf zellulärer Ebene.',
    hasSubMenu: false,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Polynukleotide sind hochreine DNA-Fragmente, die die Zellerneuerung stimulieren und die Kollagensynthese anregen. Diese innovative Behandlung wirkt direkt auf die Hautstruktur und fördert nachhaltig die natürliche Regeneration.</p>
        <p className="paragraph mb-4">Die Therapie aktiviert die Fibroblasten, verbessert die Hauthydratation und erhöht nachweislich die Elastizität. Im Vergleich zu anderen Verfahren bieten Polynukleotide einen langanhaltenden, natürlichen Verjüngungseffekt ohne Volumenzunahme.</p>
        <p className="paragraph mb-4">Besonders geeignet ist die Behandlung bei feiner, dünner Haut, Elastizitätsverlust und zur allgemeinen Verbesserung der Hautqualität, Textur und Festigkeit.</p>
      </>
    )
  },
  {
    id: 'prp',
    title: 'PRP Eigenbluttherapie',
    icon: <FaTint />,
    shortDescription: 'Natürliche Regeneration & Hautverjüngung (inkl. Microneedling).',
    hasSubMenu: false,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Die PRP (Platelet-Rich Plasma) Therapie, auch Vampir-Lifting genannt, nutzt die Heilungskräfte Ihres eigenen Blutes. Aus einer kleinen Blutprobe wird hochkonzentriertes Blutplasma gewonnen, reich an Wachstumsfaktoren.</p>
        <p className="paragraph mb-4">In Kombination mit Microneedling stimuliert PRP die Kollagenproduktion, verbessert die Hautstruktur, reduziert feine Linien und fördert einen strahlenden Teint. Ideal zur Hautverjüngung und bei Haarausfall.</p>
      </>
    )
  },
   {
    id: 'mesotherapy',
    title: 'Mesotherapie',
    icon: <FaFlask />,
    shortDescription: 'Individuelle Wirkstoffcocktails für Ihre Haut (inkl. Microneedling).',
    hasSubMenu: false,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Bei der Mesotherapie werden individuell zusammengestellte Cocktails aus Vitaminen, Hyaluronsäure und anderen Wirkstoffen mittels feinster Nadeln (oft in Kombination mit Microneedling) oberflächlich in die Haut eingebracht.</p>
        <p className="paragraph mb-4">Diese Behandlung versorgt die Haut intensiv mit Nährstoffen, verbessert die Durchblutung, spendet Feuchtigkeit und kann bei verschiedenen Hautproblemen wie Trockenheit, Elastizitätsverlust oder fahlem Teint helfen.</p>
      </>
    )
  },
  {
    id: 'micronutrients',
    title: 'Mikronährstoffanalyse',
    icon: <FaMicroscope />,
    shortDescription: 'Analyse & individuelle Vitamininfusionen für Ihr Wohlbefinden.',
    hasSubMenu: false,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Schönheit kommt auch von innen. Eine Analyse Ihrer Mikronährstoffversorgung kann Defizite aufdecken, die sich auf Haut, Haare und allgemeines Wohlbefinden auswirken.</p>
        <p className="paragraph mb-4">Basierend auf der Auswertung erstellen wir einen Plan für gezielte Vitamininfusionen, um Mängel auszugleichen, Ihr Immunsystem zu stärken und Ihre Vitalität von innen heraus zu fördern.</p>
      </>
    )
  },
  {
    id: 'lipolysis',
    title: 'Lipolyse (Fettwegspritze)',
    icon: <FaFire />,
    shortDescription: 'Gezielte Fettreduktion an Problemzonen.',
    hasSubMenu: true,
    subTreatments: lipolysisSubTreatments,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Die Injektionslipolyse, bekannt als "Fettwegspritze", ist eine Methode zur gezielten Reduzierung kleinerer, hartnäckiger Fettdepots, die durch Diät oder Sport schwer zu beeinflussen sind.</p>
        <p className="paragraph mb-4">Durch Injektion eines speziellen Wirkstoffs werden Fettzellen aufgelöst und vom Körper natürlich abgebaut. Ideal für Bereiche wie Doppelkinn, kleine Pölsterchen am Bauch oder zur Verbesserung des Erscheinungsbildes von Cellulite.</p>
      </>
    )
  },
   {
    id: 'exosomes',
    title: 'Exosomen Therapie',
    icon: <FaDna />,
    shortDescription: 'Zellfreie Regeneration der Zukunft (inkl. Microneedling).',
    hasSubMenu: false,
    fullDescription: (
      <>
        <p className="paragraph mb-4">Exosomen sind winzige Vesikel, die von Zellen freigesetzt werden und wichtige Signalmoleküle wie Wachstumsfaktoren und Proteine enthalten. Sie spielen eine Schlüsselrolle in der Zellkommunikation und Regeneration.</p>
        <p className="paragraph mb-4">Die Exosomen-Therapie, oft kombiniert mit Microneedling, nutzt diese zellfreien Botenstoffe, um die Hautverjüngung intensiv anzuregen, die Kollagenproduktion zu fördern und die Hautqualität nachhaltig zu verbessern. Eine innovative Methode für natürliche Schönheit.</p>
      </>
    )
  }
];

// Create a specific component for treatment cards to ensure consistent styling
const TreatmentCard = ({ treatment, isSelected, onClick, index, inView }) => {
  const cardGradients = {
    // Define specific gradients for each treatment card for a more luxury feel
    botox: {
      start: 'rgba(224, 212, 194, 0.85)', 
      end: 'rgba(230, 201, 168, 0.9)'
    },
    hyaluronic: {
      start: 'rgba(215, 198, 172, 0.85)',
      end: 'rgba(194, 173, 140, 0.9)'
    },
    polynucleotides: {
      start: 'rgba(212, 196, 174, 0.85)',
      end: 'rgba(191, 175, 145, 0.9)'
    },
    prp: {
      start: 'rgba(208, 191, 168, 0.85)',
      end: 'rgba(189, 169, 143, 0.9)'
    },
    mesotherapy: {
      start: 'rgba(210, 194, 175, 0.85)',
      end: 'rgba(196, 179, 158, 0.9)'
    },
    micronutrients: {
      start: 'rgba(204, 188, 169, 0.85)',
      end: 'rgba(186, 171, 150, 0.9)'
    },
    lipolysis: {
      start: 'rgba(214, 195, 174, 0.85)',
      end: 'rgba(199, 180, 158, 0.9)'
    },
    exosomes: {
      start: 'rgba(201, 185, 164, 0.85)',
      end: 'rgba(184, 169, 147, 0.9)'
    }
  };

  const gradientForCard = cardGradients[treatment.id] || {
    start: colors.selectedGradientStart,
    end: colors.selectedGradientEnd
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ 
        scale: 1.04, 
        boxShadow: `0 15px 35px -10px rgba(60, 50, 45, 0.15)`,
        transition: { duration: 0.2 } 
      }}
      className={`rounded-3xl cursor-pointer transition-all duration-300 ease-out overflow-hidden relative group
        ${isSelected 
          ? 'shadow-2xl' 
          : 'shadow-lg shadow-gray-200/50'
        }
      `}
      style={{
         background: isSelected 
          ? `linear-gradient(135deg, ${gradientForCard.start}, ${gradientForCard.end})` 
          : colors.cardBgDefault,
         border: `1px solid ${isSelected ? 'transparent' : colors.cardBorder}`,
         backdropFilter: isSelected ? 'none' : 'blur(10px)'
      }}
      onClick={onClick}
    >
      {/* Subtle radial gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top left, rgba(210, 180, 140, 0.12) 0%, transparent 70%)`}}
      ></motion.div>
      
      <div className="p-8 relative z-10 flex flex-col items-center text-center h-full">
        {/* Icon Container */}
        <motion.div 
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative overflow-hidden border-2
            ${isSelected ? 'border-white/30' : 'border-secondary/20'}`}
          style={{ 
            background: isSelected ? colors.iconBgSelected : colors.iconBgDefault,
            boxShadow: isSelected ? '0 0 20px rgba(210, 180, 140, 0.2)' : 'none'
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Icon */}
          <div className="text-4xl transition-colors duration-300" 
               style={{ color: isSelected ? colors.iconColorSelected : colors.iconColorDefault }}
          >
              {treatment.icon}
          </div>
          {/* Animated circle in icon background */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: 'linear'}}
            className="absolute w-24 h-24 border-t-2 border-r-2 rounded-full opacity-30"
            style={{ borderColor: isSelected ? colors.iconColorSelected : colors.iconColorDefault }}
           ></motion.div>
        </motion.div>
        
        <h3 className={`heading-3 mb-3 transition-colors duration-300 ${isSelected ? 'font-semibold' : ''}`}
            style={{ color: isSelected ? colors.selectedText : colors.textPrimary }} >
          {treatment.title}
        </h3>
        <p className={`mb-5 flex-grow transition-colors duration-300 ${isSelected ? 'font-light' : ''}`} 
           style={{ color: isSelected ? colors.selectedText : colors.textSecondary }} >
          {treatment.shortDescription}
        </p>
        
        {/* Details button */}
        {treatment.hasSubMenu && (
          <div className={`mt-auto flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${isSelected 
              ? 'bg-white/25 text-primary'
              : 'bg-secondary/10 text-primary'
            }`}
           >
            <span className="mr-2">Details</span>
            <FaChevronDown className={`transition-transform duration-300`} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Treatments Component ---
const Treatments = () => {
  // State bleibt gleich
  const [selectedTreatment, setSelectedTreatment] = useState(treatments[0]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedSubTreatment, setSelectedSubTreatment] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const treatmentDescriptionRef = React.useRef(null);
  const subMenuRef = React.useRef(null);

  // Intersection Observer bleiben gleich
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: contentRef, inView: contentInView } = useInView({ threshold: 0.2, triggerOnce: false });

  // Handler-Funktionen bleiben logisch gleich, Scroll-Ziel wird angepasst
  const handleTreatmentClick = (treatment: any) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const isSameTreatment = selectedTreatment.id === treatment.id;
    setSelectedTreatment(treatment);
    setSelectedSubTreatment(null); // Reset sub-treatment on main click

    if (treatment.hasSubMenu) {
      setShowSubMenu(isSameTreatment ? !showSubMenu : true); // Show submenu if new, toggle if same
    } else {
      setShowSubMenu(false);
    }

    // Scroll zur submenu or Beschreibung nach kurzer Verzögerung
    setTimeout(() => {
      // If treatment has submenu, scroll to submenu, otherwise scroll to description
      if (treatment.hasSubMenu) {
        if (subMenuRef.current) {
          subMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        if (treatmentDescriptionRef.current) {
          treatmentDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setIsAnimating(false);
    }, 350); // Etwas längere Verzögerung für sanfteren Übergang
  };

  const handleSubTreatmentClick = (subTreatment: any) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedSubTreatment(subTreatment);

    setTimeout(() => {
      if (treatmentDescriptionRef.current) {
        treatmentDescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsAnimating(false);
    }, 350);
  };

  // --- JSX mit neuem Styling ---
  return (
    // Section mit neuem Hintergrundverlauf
    <section 
      id="treatments" 
      className="pt-32 pb-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${colors.backgroundStart} 0%, ${colors.backgroundEnd} 100%)` }}
    >
      {/* Überarbeiteter Übergangsbereich */}
      <div className="absolute top-0 left-0 right-0 -mt-40 z-10 overflow-hidden opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradientNew" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.backgroundEnd} />
              <stop offset="50%" stopColor={colors.secondaryAccent} stopOpacity="0.5" />
              <stop offset="100%" stopColor={colors.backgroundEnd} />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradientNew)" 
            d="M0,192L60,170.7C120,149,240,107,360,117.3C480,128,600,192,720,218.7C840,245,960,235,1080,208C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        {/* Sanfter Glow-Effekt im Übergang */}
         <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }} // Subtiler
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div 
              className="w-80 h-80 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${colors.primaryAccent} 0%, transparent 70%)`}}
             ></div>
          </motion.div>
      </div>
      
      {/* Dekorative Hintergrund-Elemente - Überarbeitet */}
       <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full -z-1"
          style={{ background: `radial-gradient(circle, ${colors.primaryAccent} 0%, transparent 70%)` }}
      />
      <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
          className="absolute bottom-10 -left-52 w-80 h-80 rounded-full -z-1"
          style={{ background: `radial-gradient(circle, ${colors.secondaryAccent} 0%, transparent 70%)` }}
      />

      {/* Hauptcontainer */}
      <div className="section-container !pt-0 !pb-0 relative z-20" ref={ref}>
        {/* Titelbereich - Leichte Anpassung */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 mt-32" // Mehr Abstand
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="heading-2 mb-5 relative inline-block" style={{ color: colors.textPrimary }}>
              Moderne Ästhetik <span style={{ color: colors.primaryAccent }}>für Sie</span>
              {/* Akzentlinie überarbeitet */}
              <motion.div 
                initial={{ width: 0 }}
                animate={inView ? { width: '80%' } : { width: 0 }} // Kürzer, zentriert
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} // Smoother Ease
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-[4px] rounded-full"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${colors.primaryAccent} 50%, transparent 100%)` }}
              ></motion.div>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="paragraph max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Erleben Sie medizinisch fundierte Ästhetik auf höchstem Niveau. Wir setzen auf innovative, wissenschaftlich erprobte Verfahren, die Ihre natürliche Schönheit unterstreichen und die körpereigene Regeneration fördern – für authentische Ergebnisse voller Frische.
          </motion.p>
        </motion.div>

        {/* Horizontales Layout: Karten oben, Erklärung unten */}
        <div>
          {/* Behandlungskarten - Now using the TreatmentCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12"> 
            {treatments.map((treatment, index) => {
              const isSelected = selectedTreatment.id === treatment.id;
              return (
                <TreatmentCard 
                  key={treatment.id}
                  treatment={treatment}
                  isSelected={isSelected}
                  onClick={() => handleTreatmentClick(treatment)}
                  index={index}
                  inView={inView}
                />
              );
            })}
          </div>

          {/* Submenu - STARK ÜBERARBEITET */}
          <div ref={subMenuRef} className="scroll-mt-32">
            <AnimatePresence>
              {showSubMenu && selectedTreatment.hasSubMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -30, scaleY: 0.9 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -30, scaleY: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 rounded-3xl overflow-hidden shadow-xl border"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.8)', 
                    borderColor: colors.cardBorder,
                    backdropFilter: 'blur(12px)' 
                  }}
                >
                  {/* Submenu Header */}
                  <div className="p-6" style={{ background: `linear-gradient(90deg, ${colors.secondaryAccent}66, ${colors.primaryAccent}66)` }}>
                    <h4 className="font-serif text-xl text-center font-semibold" style={{ color: colors.textPrimary }}>
                      {selectedTreatment.title} - Optionen
                    </h4>
                  </div>
                  {/* Submenu Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-8"> {/* Mehr Spalten, weniger Gap */}
                    {selectedTreatment.subTreatments.map((subTreatment, index) => {
                      const isSubSelected = selectedSubTreatment?.id === subTreatment.id;
                      return (
                        <motion.div
                          key={subTreatment.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                          whileHover={{ 
                            scale: 1.06, 
                             boxShadow: `0 8px 20px -5px ${colors.primaryAccent}22` 
                           }}
                          className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ease-out flex flex-col items-center text-center relative overflow-hidden group
                            ${isSubSelected 
                              ? 'shadow-lg' 
                              : ''}
                          `}
                          style={{ 
                            background: isSubSelected 
                              ? `linear-gradient(135deg, ${colors.selectedGradientStart}, ${colors.selectedGradientEnd})` 
                              : 'rgba(255, 255, 255, 0.6)',
                            border: `1px solid ${isSubSelected ? 'transparent' : colors.cardBorder}`
                           }}
                          onClick={() => handleSubTreatmentClick(subTreatment)}
                        >
                           {/* Hintergrund-Glow bei Hover (Submenu) */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                               style={{ background: `radial-gradient(circle at center, ${colors.secondaryAccent}22 0%, transparent 60%)`}}>
                          </div>
                          
                          {/* Icon Container (Submenu) */}
                           <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 border
                            ${isSubSelected ? `border-white/30 bg-[${colors.iconBgSelected}]` : `border-[${colors.cardBorder}] bg-[${colors.iconBgDefault}]`}`}
                           >
                            <div className={`text-2xl transition-colors duration-300`}
                                  style={{ color: isSubSelected ? colors.iconColorSelected : colors.iconColorDefault }}
                            >
                              {subTreatment.icon}
                            </div>
                          </div>
                          <h5 className="font-medium text-sm leading-tight"
                              style={{ color: isSubSelected ? colors.selectedText : colors.textPrimary }}>
                            {subTreatment.title}
                          </h5>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Behandlungsbeschreibung - ÜBERARBEITET */}
          <div ref={treatmentDescriptionRef} className="scroll-mt-24"> {/* Scroll-Margin hinzugefügt */}
            <AnimatePresence mode="wait">
              <motion.div
                ref={contentRef}
                key={selectedTreatment.id + (selectedSubTreatment ? selectedSubTreatment.id : '')}
                initial={{ opacity: 0, y: 30, scale: 0.98 }} // Startet leicht von unten und skaliert
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }} // Geht nach oben weg
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Smoother Ease
                className="p-10 md:p-12 rounded-3xl shadow-2xl border relative overflow-hidden" // Größeres Padding, stärkerer Schatten
                 style={{ 
                  background: 'rgba(255, 255, 255, 0.9)', // Leicht transparent
                  borderColor: colors.cardBorder,
                  backdropFilter: 'blur(15px)', // Stärkerer Blur
                  boxShadow: `0 25px 50px -12px ${colors.primaryAccent}26` // Angepasster Schatten
                }}
              >
                {/* Dekorative Elemente im Beschreibungsfeld */}
                <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10" 
                     style={{ background: `radial-gradient(circle, ${colors.primaryAccent} 0%, transparent 60%)` }}></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
                      style={{ background: `radial-gradient(circle, ${colors.secondaryAccent} 0%, transparent 60%)` }}></div>
                
                <div className="relative z-10">
                  {/* Animierte Akzentlinie - Überarbeitet */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="absolute top-0 left-0 h-1.5 w-full rounded-full origin-left" // Etwas dicker
                    style={{ background: `linear-gradient(90deg, ${colors.primaryAccent}, ${colors.secondaryAccent})` }}
                  ></motion.div>
                  
                  {/* Zurück-Button (falls Sub-Treatment ausgewählt) - Style angepasst */}
                  {selectedSubTreatment && (
                     <div className="mb-8"> {/* Mehr Abstand */}
                        <button 
                          onClick={() => setSelectedSubTreatment(null)} 
                          className="flex items-center transition-all duration-300 group px-4 py-2 rounded-full text-sm"
                          style={{ background: `${colors.secondaryAccent}33`, color: colors.textPrimary }}
                          hover={{ background: `${colors.secondaryAccent}55` }} // Leichter Hover
                        >
                          <FaChevronDown className="rotate-90 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                          <span className="font-medium">
                            Zurück zu {selectedTreatment.title}
                          </span>
                        </button>
                      </div>
                  )}

                  {/* Hauptinhalt der Beschreibung */}
                  <div className="flex flex-col md:flex-row md:items-center mb-8 gap-6">
                    {/* Icon im Beschreibungsfeld */}
                     <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                           style={{ background: `linear-gradient(135deg, ${colors.selectedGradientStart}, ${colors.selectedGradientEnd})` }}>
                        <div className="text-4xl" style={{ color: colors.selectedText }}>
                           {selectedSubTreatment ? selectedSubTreatment.icon : selectedTreatment.icon}
                        </div>
                      </div>
                    <h3 className="heading-3 mb-0" style={{ color: colors.textPrimary }}>
                      {selectedSubTreatment ? selectedSubTreatment.title : selectedTreatment.title}
                    </h3>
                  </div>
                  
                  {/* Textinhalt - Styling über Tailwind Prose anpassen */}
                   <div className="prose prose-lg max-w-none prose-p:text-[${colors.textSecondary}] prose-headings:text-[${colors.textPrimary}] prose-strong:text-[${colors.textPrimary}] prose-a:text-[${colors.primaryAccent}] hover:prose-a:text-[${colors.secondaryAccent}]">
                     {selectedSubTreatment ? (
                       <>
                         <p className="paragraph mb-6">{selectedSubTreatment.description}</p>
                         {/* Hervorgehobener Info-Block - Style angepasst */}
                         <div className="p-6 rounded-xl my-8 border-l-4" 
                              style={{ background: `${colors.secondaryAccent}26`, borderColor: colors.primaryAccent }} >
                           <p className="paragraph mb-0 italic text-base" style={{ color: colors.textPrimary }}>
                             {/* Text bleibt spezifisch für Behandlung */}
                             {selectedTreatment.id === 'muskelrelaxans' 
                               ? `Unsere Spezialisten für ${selectedSubTreatment.title} verwenden nur hochwertige Produkte und präzise Techniken für natürlich aussehende Ergebnisse, die Ihre natürliche Ausdrucksfähigkeit bewahren.`
                               : selectedTreatment.id === 'hyaluronic'
                               ? `Unsere Spezialisten für ${selectedSubTreatment.title} verwenden nur hochwertige Hyaluronsäure-Produkte und fortschrittliche Techniken für harmonische Ergebnisse.`
                               : `Vertrauen Sie auf unsere Expertise für ${selectedSubTreatment.title}, um optimale Resultate zu erzielen.`
                             }
                           </p>
                         </div>
                         
                         {/* Spezielle Fälle - Styling angepasst */}
                         {selectedSubTreatment.id === 'hyaluronidase' && (
                           <div className="bg-white/50 p-6 rounded-xl shadow-md border mt-6" style={{ borderColor: colors.cardBorder }}>
                             <h4 className="font-serif text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>Wann wird Hyaluronidase eingesetzt?</h4>
                             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0 list-none p-0">
                               {['Korrektur überfüllter Bereiche', 'Behandlung asymmetrischer Ergebnisse', 
                                 'Auflösung von Knötchen', 'Management von Komplikationen'].map((item, i) => (
                                 <li key={i} className="flex items-center bg-white/70 p-3 rounded-lg text-sm">
                                   <FaDotCircle className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: colors.primaryAccent }}/>
                                   <span style={{ color: colors.textSecondary }}>{item}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         )}
                         {selectedSubTreatment.id === 'bruxismBehandlung' && (
                           <div className="space-y-6 mt-6">
                             <div className="bg-white/50 p-6 rounded-xl shadow-md border" style={{ borderColor: colors.cardBorder }}>
                               <h4 className="font-serif text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>Wirkung bei Zähneknirschen</h4>
                               <p className="paragraph mb-0 text-sm" style={{ color: colors.textSecondary }}>
                                Das Muskelrelaxans entspannt gezielt die Kaumuskulatur, um unbewusstes Zähneknirschen und Kieferpressen zu reduzieren.
                               </p>
                             </div>
                              <div className="bg-white/50 p-6 rounded-xl shadow-md border" style={{ borderColor: colors.cardBorder }}>
                               <h4 className="font-serif text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>Vorteile</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0 list-none p-0">
                                 {['Reduziert Knirschen & Pressen', 'Lindert Kieferschmerzen', 
                                   'Schützt die Zähne', 'Kann Kopfschmerzen reduzieren'].map((item, i) => (
                                  <li key={i} className="flex items-center bg-white/70 p-3 rounded-lg text-sm">
                                     <FaDotCircle className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: colors.primaryAccent }}/>
                                     <span style={{ color: colors.textSecondary }}>{item}</span>
                                  </li>
                                ))}
                               </ul>
                             </div>
                           </div>
                         )}
                         {selectedSubTreatment.id === 'hyperhidrosisBehandlung' && (
                           <div className="space-y-6 mt-6">
                             <div className="bg-white/50 p-6 rounded-xl shadow-md border" style={{ borderColor: colors.cardBorder }}>
                               <h4 className="font-serif text-xl font-semibold mb-3" style={{ color: colors.textPrimary }}>Wirkung bei Schwitzen</h4>
                               <p className="paragraph mb-0 text-sm" style={{ color: colors.textSecondary }}>
                                Das Muskelrelaxans blockiert temporär die Nervensignale an die Schweißdrüsen und reduziert so die Schweißproduktion in den behandelten Arealen effektiv.
                               </p>
                             </div>
                             <div className="bg-white/50 p-6 rounded-xl shadow-md border" style={{ borderColor: colors.cardBorder }}>
                               <h4 className="font-serif text-xl font-semibold mb-4" style={{ color: colors.textPrimary }}>Einsatzgebiete</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0 list-none p-0">
                                 {['Achseln', 'Handinnenflächen', 'Fußsohlen', 'Stirn / Kopfhaut'].map((item, i) => (
                                   <li key={i} className="flex items-center bg-white/70 p-3 rounded-lg text-sm">
                                     <FaDotCircle className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: colors.primaryAccent }}/>
                                     <span style={{ color: colors.textSecondary }}>{item}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>
                         )}
                       </>
                     ) : (
                       selectedTreatment.fullDescription // Hauptbeschreibung
                     )}
                   </div>
                  
                  {/* Button - Style angepasst */}
                   <div className="mt-10 text-center">
                      <motion.a 
                        href={getPlanityBookingUrl()}
                        onClick={openPlanityBooking}
                        className="inline-block px-10 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1" // Größerer Button
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.buttonGradientStart}, ${colors.buttonGradientEnd})`, 
                          color: colors.buttonText,
                          boxShadow: `0 10px 20px -5px ${colors.primaryAccent}59`
                        }}
                        whileHover={{ boxShadow: `0 15px 30px -8px ${colors.primaryAccent}7A` }} // Stärkerer Hover-Schatten
                       >
                        Jetzt Termin Buchen
                      </motion.a>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;