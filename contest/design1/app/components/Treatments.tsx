"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Syringe, Droplets, Dna, Sparkles, Microscope, Flame, Activity,
    FlaskConical, TestTubes, Smile, Eye, User, Snowflake, Frown,
    Baby, Contact, Sun, HeartPulse, ArrowUp, Leaf, Wind, CircleDot,
    ChevronDown, Info
} from 'lucide-react';

// Sub-treatments data
const muskelrelaxansSubTreatments = [
    { id: 'faltenKorrektur', title: 'FALTEN KORREKTUR ALLGEMEIN', icon: <Smile className="w-6 h-6" />, description: 'Umfassende Faltenbehandlung für ein harmonisches, jugendliches Erscheinungsbild. Individuelle Behandlungskonzepte für alle Gesichtsbereiche mit präziser, natürlicher Faltenglättung.' },
    { id: 'eyebrowLift', title: 'AUGENBRAUENLIFTING', icon: <Eye className="w-6 h-6" />, description: 'Natürliches Anheben der Augenbrauen für einen offeneren Blick.' },
    { id: 'lipFlip', title: 'LIP FLIP', icon: <Smile className="w-6 h-6" />, description: 'Dezente Betonung der Oberlippe mit Muskelrelaxans.' },
    { id: 'foreheadLines', title: 'STIRNFALTEN', icon: <Frown className="w-6 h-6" />, description: 'Glättung horizontaler Stirnfalten.' },
    { id: 'frownLines', title: 'ZORNESFALTE', icon: <Frown className="w-6 h-6" />, description: 'Reduzierung der vertikalen Falten zwischen den Augenbrauen.' },
    { id: 'crowsFeet', title: 'KRÄHENFÜSSE', icon: <Smile className="w-6 h-6" />, description: 'Glättung der Fältchen um die Augen.' },
    { id: 'bunnyLines', title: 'BUNNY LINES (NASENFÄLTCHEN)', icon: <Smile className="w-6 h-6" />, description: 'Reduzierung feiner Fältchen am Nasenrücken.' },
    { id: 'nasalTip', title: 'NASENSPITZE', icon: <Frown className="w-6 h-6" />, description: 'Feinjustierung der Nasenspitzenbewegung.' },
    { id: 'facialSlimming', title: 'FACIAL SLIMMING', icon: <User className="w-6 h-6" />, description: 'Verschmälerung des Gesichts durch Entspannung der Kaumuskeln.' },
    { id: 'neckLift', title: 'NEFERTITI LIFT (KIEFER/HALS)', icon: <ArrowUp className="w-6 h-6" />, description: 'Definition der Kinn-Kiefer-Linie & Halskontur.' },
    { id: 'chinDimples', title: 'ERDBEERKINN (PFLASTERSTEIN-KINN)', icon: <CircleDot className="w-6 h-6" />, description: 'Glättung von Grübchen und Unebenheiten am Kinn.' },
    { id: 'bruxismBehandlung', title: 'BRUXISMUS (ZÄHNEKNIRSCHEN)', icon: <Activity className="w-6 h-6" />, description: 'Linderung von Zähneknirschen und Kieferschmerzen.' },
    { id: 'hyperhidrosisBehandlung', title: 'HYPERHIDROSE (SCHWITZEN)', icon: <Droplets className="w-6 h-6" />, description: 'Reduzierung von übermäßigem Schwitzen unter den Achseln, an Händen oder Füßen.' },
];

const hyaluronSubTreatments = [
    { id: 'lippen', title: 'LIPPEN VOLUMEN', icon: <Smile className="w-6 h-6" />, description: 'Professionelle Lippenvergrößerung für natürlich volle, definierte Lippen. Sanfte Volumengebung mit Premium-Hyaluronsäure für harmonische Proportionen und sinnliche Ausstrahlung.' },
    { id: 'nasolabial', title: 'NASOLABIALFALTEN', icon: <Frown className="w-6 h-6" />, description: 'Effektive Behandlung der Falten, die von der Nase zu den Mundwinkeln verlaufen. Glättung für ein jugendlicheres, frischeres Erscheinungsbild mit natürlichen Ergebnissen.' },
    { id: 'marionetten', title: 'MARIONETTENFALTEN', icon: <Frown className="w-6 h-6" />, description: 'Korrektur der Falten von den Mundwinkeln zum Kinn. Wiederherstellung einer positiven Gesichtsausstrahlung durch gezielte Volumengebung und Lifting-Effekt.' },
    { id: 'hyaluronidase', title: 'HYALURONIDASE (HYLASE)', icon: <Syringe className="w-6 h-6" />, description: 'Enzym zum Abbau von unerwünschten Hyaluronsäure-Fillern.' },
    { id: 'barcode', title: 'BARCODE (LIPPENLINIEN)', icon: <Activity className="w-6 h-6" />, description: 'Gezielte Behandlung der vertikalen Linien oberhalb der Lippen.' },
    { id: 'jawline', title: 'JAWLINE', icon: <Activity className="w-6 h-6" />, description: 'Definieren und konturieren der Kieferlinie.' },
    { id: 'chin', title: 'KINNAUFBAU', icon: <User className="w-6 h-6" />, description: 'Verbesserung der Kinnform und -projektion.' },
    { id: 'cheekbones', title: 'WANGENKNOCHEN', icon: <Smile className="w-6 h-6" />, description: 'Betonung und Aufbau der Wangenknochen.' },
    { id: 'tearTrough', title: 'TRÄNENRINNE', icon: <Frown className="w-6 h-6" />, description: 'Auffüllung der Vertiefungen unter den Augen.' },
    { id: 'fullface', title: 'FULL FACE', icon: <Contact className="w-6 h-6" />, description: 'Ganzheitliche Gesichtsverjüngung und Harmonisierung mit Fillern.' },
];

const lipolysisSubTreatments = [
    { id: 'doubleChin', title: 'DOPPELKINN', icon: <User className="w-6 h-6" />, description: 'Reduzierung von Fettpolstern unter dem Kinn.' },
    { id: 'bellyFat', title: 'BAUCHFETT', icon: <Baby className="w-6 h-6" />, description: 'Gezielte Behandlung kleinerer Fettansammlungen am Bauch.' },
    { id: 'cellulite', title: 'CELLULITE', icon: <Snowflake className="w-6 h-6" />, description: 'Verbesserung des Erscheinungsbildes von Cellulite an Oberschenkeln und Po.' },
];

const treatments = [
    {
        id: 'muskelrelaxans',
        title: 'Muskelrelaxans',
        description: 'Faltenreduktion & Prävention für ein frisches Aussehen.',
        icon: <Syringe className="w-6 h-6" />,
        hasSubMenu: true,
        subTreatments: muskelrelaxansSubTreatments,
        fullDescription: (
            <>
                <p className="mb-4">Muskelrelaxanzien sind bewährte Mittel zur Glättung mimischer Falten. Sie entspannen gezielt die Muskulatur, die für Falten wie Zornesfalten, Stirnfalten oder Krähenfüße verantwortlich ist.</p>
                <p className="mb-4">Unsere erfahrenen Anwenderinnen setzen Muskelrelaxanzien präzise ein, um ein natürliches, verjüngtes Ergebnis zu erzielen, ohne die Mimik einzuschränken. Neben der Faltenglättung können diese auch bei Zähneknirschen (Bruxismus) oder übermäßigem Schwitzen (Hyperhidrose) helfen.</p>
                <p>Wir verwenden ausschließlich hochwertige, zertifizierte Produkte für maximale Sicherheit und Wirksamkeit.</p>
            </>
        )
    },
    {
        id: 'hyaluronic',
        title: 'Hyaluron Filler',
        description: 'Volumenaufbau & Konturierung für harmonische Züge.',
        icon: <Droplets className="w-6 h-6" />,
        hasSubMenu: true,
        subTreatments: hyaluronSubTreatments,
        fullDescription: (
            <>
                <p className="mb-4">Hyaluronsäure ist ein natürlicher Bestandteil unserer Haut, der für Feuchtigkeit und Volumen sorgt. Mit Fillern können wir gezielt Volumenverluste ausgleichen, Konturen definieren und tiefe Falten mildern.</p>
                <p className="mb-4">Ob Wangenaufbau, Kinnkorrektur oder die Behandlung der Tränenrinne – Saskia Heer verwendet hochwertige Filler und fortschrittliche Techniken für natürlich wirkende Ergebnisse, die Ihre individuelle Schönheit unterstreichen.</p>
                <p>Hyaluronidase (Hylase) ermöglicht zudem die gezielte Auflösung von Fillern bei Bedarf.</p>
            </>
        )
    },
    {
        id: 'polynucleotides',
        title: 'Polynukleotide',
        description: 'Innovative Hautregeneration auf zellulärer Ebene.',
        icon: <Dna className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Polynukleotide sind hochreine DNA-Fragmente, die die Zellerneuerung stimulieren und die Kollagensynthese anregen. Diese innovative Behandlung wirkt direkt auf die Hautstruktur und fördert nachhaltig die natürliche Regeneration.</p>
                <p className="mb-4">Die Therapie aktiviert die Fibroblasten, verbessert die Hauthydratation und erhöht nachweislich die Elastizität. Im Vergleich zu anderen Verfahren bieten Polynukleotide einen langanhaltenden, natürlichen Verjüngungseffekt ohne Volumenzunahme.</p>
                <p>Besonders geeignet ist die Behandlung bei feiner, dünner Haut, Elastizitätsverlust und zur allgemeinen Verbesserung der Hautqualität, Textur und Festigkeit.</p>
            </>
        )
    },
    {
        id: 'prp',
        title: 'PRP Therapie',
        description: 'Vampir-Lifting zur natürlichen Regeneration.',
        icon: <Activity className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Die PRP (Platelet-Rich Plasma) Therapie, auch Vampir-Lifting genannt, nutzt die Heilungskräfte Ihres eigenen Blutes. Aus einer kleinen Blutprobe wird hochkonzentriertes Blutplasma gewonnen, reich an Wachstumsfaktoren.</p>
                <p>In Kombination mit Microneedling stimuliert PRP die Kollagenproduktion, verbessert die Hautstruktur, reduziert feine Linien und fördert einen strahlenden Teint. Ideal zur Hautverjüngung und bei Haarausfall.</p>
            </>
        )
    },
    {
        id: 'mesotherapy',
        title: 'Mesotherapie',
        description: 'Individuelle Wirkstoffcocktails für Ihre Haut.',
        icon: <Sparkles className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Bei der Mesotherapie werden individuell zusammengestellte Cocktails aus Vitaminen, Hyaluronsäure und anderen Wirkstoffen mittels feinster Nadeln (oft in Kombination mit Microneedling) oberflächlich in die Haut eingebracht.</p>
                <p>Diese Behandlung versorgt die Haut intensiv mit Nährstoffen, verbessert die Durchblutung, spendet Feuchtigkeit und kann bei verschiedenen Hautproblemen wie Trockenheit, Elastizitätsverlust oder fahlem Teint helfen.</p>
            </>
        )
    },
    {
        id: 'micronutrients',
        title: 'Mikronährstoffanalyse',
        description: 'Analyse & individuelle Vitamininfusionen.',
        icon: <Microscope className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Schönheit kommt auch von innen. Eine Analyse Ihrer Mikronährstoffversorgung kann Defizite aufdecken, die sich auf Haut, Haare und allgemeines Wohlbefinden auswirken.</p>
                <p>Basierend auf der Auswertung erstellen wir einen Plan für gezielte Vitamininfusionen, um Mängel auszugleichen, Ihr Immunsystem zu stärken und Ihre Vitalität von innen heraus zu fördern.</p>
            </>
        )
    },
    {
        id: 'lipolysis',
        title: 'Lipolyse',
        description: 'Gezielte Fettreduktion an Problemzonen.',
        icon: <Flame className="w-6 h-6" />,
        hasSubMenu: true,
        subTreatments: lipolysisSubTreatments,
        fullDescription: (
            <>
                <p className="mb-4">Die Injektionslipolyse, bekannt als "Fettwegspritze", ist eine Methode zur gezielten Reduzierung kleinerer, hartnäckiger Fettdepots, die durch Diät oder Sport schwer zu beeinflussen sind.</p>
                <p>Durch Injektion eines speziellen Wirkstoffs werden Fettzellen aufgelöst und vom Körper natürlich abgebaut. Ideal für Bereiche wie Doppelkinn, kleine Pölsterchen am Bauch oder zur Verbesserung des Erscheinungsbildes von Cellulite.</p>
            </>
        )
    },
    {
        id: 'exosomes',
        title: 'Exosomen Therapie',
        description: 'Zellfreie Regeneration der Zukunft.',
        icon: <Dna className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Exosomen sind winzige Vesikel, die von Zellen freigesetzt werden und wichtige Signalmoleküle wie Wachstumsfaktoren und Proteine enthalten. Sie spielen eine Schlüsselrolle in der Zellkommunikation und Regeneration.</p>
                <p>Die Exosomen-Therapie, oft kombiniert mit Microneedling, nutzt diese zellfreien Botenstoffe, um die Hautverjüngung intensiv anzuregen, die Kollagenproduktion zu fördern und die Hautqualität nachhaltig zu verbessern. Eine innovative Methode für natürliche Schönheit.</p>
            </>
        )
    },
    {
        id: 'vitamininfusion',
        title: 'Vitamin-Infusionen',
        description: 'Revitalisierung von innen - hochdosierte Nährstofftherapie.',
        icon: <TestTubes className="w-6 h-6" />,
        hasSubMenu: false,
        fullDescription: (
            <>
                <p className="mb-4">Vitamin-Infusionen bieten eine effektive Möglichkeit, den Körper gezielt mit hochwertigen Nährstoffen zu versorgen. Durch die intravenöse Verabreichung werden die Vitamine und Mineralien direkt in den Blutkreislauf eingebracht und umgehen das Verdauungssystem.</p>
                <p className="mb-4">Diese Behandlung ist besonders vorteilhaft bei Nährstoffmängeln, zur Stärkung des Immunsystems, bei chronischer Müdigkeit oder zur allgemeinen Revitalisierung. Die Infusionen werden individuell nach Ihren Bedürfnissen zusammengestellt und können Vitamin C, B-Komplex, Zink, Magnesium und weitere wichtige Nährstoffe enthalten.</p>
                <p>Erleben Sie neue Energie, verbesserte Hautqualität und gestärktes Wohlbefinden durch unsere maßgeschneiderten Vitamin-Infusionstherapien.</p>
            </>
        )
    }
];

const Treatments = () => {
    const [selectedTreatment, setSelectedTreatment] = useState(treatments[0]);
    const [selectedSubTreatment, setSelectedSubTreatment] = useState<any>(null);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const descriptionRef = useRef<HTMLDivElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);

    const handleTreatmentClick = (treatment: any) => {
        const isSame = selectedTreatment.id === treatment.id;
        setSelectedTreatment(treatment);
        setSelectedSubTreatment(null);

        if (treatment.hasSubMenu) {
            setShowSubMenu(isSame ? !showSubMenu : true);
            setTimeout(() => subMenuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        } else {
            setShowSubMenu(false);
            setTimeout(() => descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    };

    const handleSubTreatmentClick = (sub: any) => {
        setSelectedSubTreatment(sub);
        setTimeout(() => descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    return (
        <section id="treatments" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Unser Angebot</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Exklusive Behandlungen</h2>
                    <div className="w-24 h-px bg-primary mx-auto"></div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {treatments.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleTreatmentClick(item)}
                            className={`group p-8 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden
                                ${selectedTreatment.id === item.id
                                    ? 'bg-primary text-white border-primary shadow-xl scale-105'
                                    : 'bg-[#FCFAF7] border-secondary/20 hover:border-primary/50 hover:shadow-lg'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm
                                ${selectedTreatment.id === item.id
                                    ? 'bg-white text-primary'
                                    : 'bg-white text-primary group-hover:bg-primary group-hover:text-white'
                                }`}>
                                {item.icon}
                            </div>
                            <h3 className={`font-serif text-2xl mb-3 transition-colors
                                ${selectedTreatment.id === item.id ? 'text-white' : 'text-foreground group-hover:text-primary'}`}>
                                {item.title}
                            </h3>
                            <p className={`leading-relaxed mb-6
                                ${selectedTreatment.id === item.id ? 'text-white/90' : 'text-foreground/70'}`}>
                                {item.description}
                            </p>
                            <div className={`flex items-center text-sm font-medium uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-2
                                ${selectedTreatment.id === item.id ? 'text-white' : 'text-primary'}`}>
                                {item.hasSubMenu ? 'Optionen wählen' : 'Mehr erfahren'}
                                <span className="ml-2">→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sub Menu */}
                <AnimatePresence>
                    {showSubMenu && selectedTreatment.hasSubMenu && (
                        <motion.div
                            ref={subMenuRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-16 overflow-hidden"
                        >
                            <div className="bg-[#FCFAF7] rounded-3xl p-8 border border-secondary/20">
                                <h4 className="font-serif text-2xl text-center mb-8 text-foreground">
                                    {selectedTreatment.title} - Optionen
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {selectedTreatment.subTreatments?.map((sub) => (
                                        <div
                                            key={sub.id}
                                            onClick={() => handleSubTreatmentClick(sub)}
                                            className={`p-6 rounded-xl cursor-pointer transition-all text-center border
                                                ${selectedSubTreatment?.id === sub.id
                                                    ? 'bg-primary text-white border-primary shadow-lg'
                                                    : 'bg-white border-transparent hover:border-primary/30 hover:shadow-md'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4
                                                ${selectedSubTreatment?.id === sub.id
                                                    ? 'bg-white text-primary'
                                                    : 'bg-[#FCFAF7] text-primary'
                                                }`}>
                                                {sub.icon}
                                            </div>
                                            <span className="font-medium text-sm uppercase tracking-wide block">
                                                {sub.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Description Area */}
                <div ref={descriptionRef} className="scroll-mt-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedSubTreatment ? selectedSubTreatment.id : selectedTreatment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-secondary/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-[#FCFAF7] flex items-center justify-center text-primary">
                                        {selectedSubTreatment ? selectedSubTreatment.icon : selectedTreatment.icon}
                                    </div>
                                    <div>
                                        <span className="text-primary text-sm uppercase tracking-widest block mb-1">
                                            {selectedSubTreatment ? 'Detailansicht' : 'Behandlungsübersicht'}
                                        </span>
                                        <h3 className="font-serif text-3xl md:text-4xl text-foreground">
                                            {selectedSubTreatment ? selectedSubTreatment.title : selectedTreatment.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="prose prose-lg text-foreground/80 max-w-none">
                                    {selectedSubTreatment ? (
                                        <>
                                            <p className="text-xl leading-relaxed mb-6">{selectedSubTreatment.description}</p>
                                            <div className="bg-[#FCFAF7] p-6 rounded-xl border-l-4 border-primary">
                                                <p className="text-sm italic m-0">
                                                    Für detaillierte Informationen zu Ablauf, Risiken und Nachsorge vereinbaren Sie bitte ein persönliches Beratungsgespräch.
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        selectedTreatment.fullDescription
                                    )}
                                </div>

                                {selectedSubTreatment && (
                                    <button
                                        onClick={() => setSelectedSubTreatment(null)}
                                        className="mt-8 text-primary hover:text-foreground transition-colors flex items-center gap-2 font-medium"
                                    >
                                        <ChevronDown className="rotate-90" /> Zurück zur Übersicht
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Treatments;
