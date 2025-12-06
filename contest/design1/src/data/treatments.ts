export type Treatment = {
  id: string;
  name: string;
  category: 'muskelrelaxans' | 'hyaluron' | 'prp' | 'polynucleotides' | 'mesotherapy' | 'micronutrients' | 'lipolysis' | 'exosomes' | 'vitamininfusion' | 'skinbooster';
  priceEUR: number;
  durationMinutes: number;
  notes?: string;
};

export const TREATMENTS: Treatment[] = [
  // Muskelrelaxans – Zonenmodell
  { id: 'mr-flex-1', name: 'Muskelrelaxans – 1 Zone', category: 'muskelrelaxans', priceEUR: 189, durationMinutes: 20 },
  { id: 'mr-flex-2', name: 'Muskelrelaxans – 2 Zonen', category: 'muskelrelaxans', priceEUR: 314, durationMinutes: 25 },
  { id: 'mr-flex-3', name: 'Muskelrelaxans – 3 Zonen', category: 'muskelrelaxans', priceEUR: 450, durationMinutes: 35 },

  // Muskelrelaxans – Spezielle Areale (neue Preise)
  { id: 'mr-bunny-lines', name: 'Bunny Lines (Nasenfältchen)', category: 'muskelrelaxans', priceEUR: 150, durationMinutes: 10 },
  { id: 'mr-lip-flip', name: 'Lip Flip', category: 'muskelrelaxans', priceEUR: 150, durationMinutes: 10 },
  { id: 'mr-hyperhidrose-axel', name: 'Hyperhidrose (Achseln)', category: 'muskelrelaxans', priceEUR: 500, durationMinutes: 30 },
  { id: 'mr-masseter', name: 'Masseter (Gesichtsverschmälerung / Bruxismus)', category: 'muskelrelaxans', priceEUR: 300, durationMinutes: 20 },
  { id: 'mr-nasenspitze', name: 'Nasenspitze (Nasen‑Botox)', category: 'muskelrelaxans', priceEUR: 150, durationMinutes: 10 },
  { id: 'mr-erdbeerkinn', name: 'Erdbeerkinn (Pflasterstein‑Kinn)', category: 'muskelrelaxans', priceEUR: 150, durationMinutes: 10 },
  { id: 'mr-eyebrow-lift', name: 'Augenbrauen‑Lift', category: 'muskelrelaxans', priceEUR: 150, durationMinutes: 10 },
  { id: 'mr-nefertiti', name: 'Nefertiti‑Lift (Kiefer/Hals)', category: 'muskelrelaxans', priceEUR: 300, durationMinutes: 30 },

  // Hyaluron – Standard & Areale (ab‑Preise)
  { id: 'hy-standard-1ml', name: 'Hyaluron Standard (1 ml)', category: 'hyaluron', priceEUR: 215, durationMinutes: 30 },
  { id: 'hy-lippen', name: 'Lippen', category: 'hyaluron', priceEUR: 150, durationMinutes: 35 },
  { id: 'hy-nasolabial', name: 'Nasolabial', category: 'hyaluron', priceEUR: 250, durationMinutes: 25 },
  { id: 'hy-jawline', name: 'Jawline', category: 'hyaluron', priceEUR: 430, durationMinutes: 40 },
  { id: 'hy-wangen', name: 'Wangen/Midface', category: 'hyaluron', priceEUR: 215, durationMinutes: 40 },
  { id: 'hy-kinn', name: 'Kinn', category: 'hyaluron', priceEUR: 215, durationMinutes: 30 },

  // Hyaluron – Pakete
  { id: 'hy-2ml', name: 'Hyaluron Paket 2 ml', category: 'hyaluron', priceEUR: 410, durationMinutes: 45 },
  { id: 'hy-3ml', name: 'Hyaluron Paket 3 ml', category: 'hyaluron', priceEUR: 615, durationMinutes: 60 },
  { id: 'hy-4ml', name: 'Hyaluron Paket 4 ml', category: 'hyaluron', priceEUR: 820, durationMinutes: 75 },
  { id: 'hy-liquid-lift', name: 'Liquid Facelift', category: 'hyaluron', priceEUR: 1169, durationMinutes: 120 },

  // PRP (unverändert)
  { id: 'prp-2x', name: 'PRP Behandlung', category: 'prp', priceEUR: 500, durationMinutes: 60 },
  { id: 'prp-einzeln', name: 'Ergänzende Einzelbehandlung', category: 'prp', priceEUR: 300, durationMinutes: 45 },
  { id: 'prp-antiaging-konzept', name: 'Exklusives Anti-Aging Konzept', category: 'prp', priceEUR: 1899, durationMinutes: 180, notes: '4x 3‑Stufen Intensivbehandlung + Analyse' },

  // Polynukleotide
  { id: 'poly-std', name: 'Polynukleotide', category: 'polynucleotides', priceEUR: 300, durationMinutes: 45 },

  // Skin Booster
  { id: 'skinbooster-std', name: 'Skin Booster', category: 'skinbooster', priceEUR: 310, durationMinutes: 45 },

  // Mesotherapie (Augenpartie)
  { id: 'meso-eyes-1x', name: 'Mesotherapie – Augenpartie (1x)', category: 'mesotherapy', priceEUR: 180, durationMinutes: 30 },
  { id: 'meso-eyes-2x', name: 'Mesotherapie – Augenpartie (2x)', category: 'mesotherapy', priceEUR: 320, durationMinutes: 60 },

  // Vitamin‑Infusionen
  { id: 'vit-infusion-base', name: 'Basis‑Infusion (Vit C, B‑Komplex, Mineralien)', category: 'vitamininfusion', priceEUR: 99, durationMinutes: 40 },
  { id: 'vit-infusion-beauty', name: 'Beauty/Anti‑Aging‑Infusion', category: 'vitamininfusion', priceEUR: 129, durationMinutes: 40 },

  // Weitere nach Absprache
  { id: 'micro-analysis', name: 'Mikronährstoffanalyse', category: 'micronutrients', priceEUR: 0, durationMinutes: 30, notes: 'on_request' },
  { id: 'exosomes-std', name: 'Exosomen Therapie', category: 'exosomes', priceEUR: 0, durationMinutes: 60, notes: 'on_request' },
  // Lipolyse Sub‑Zonen (Preis nach Absprache)
  { id: 'lipo-doppelkinn', name: 'Lipolyse – Doppelkinn', category: 'lipolysis', priceEUR: 0, durationMinutes: 45, notes: 'on_request' },
  { id: 'lipo-bauch', name: 'Lipolyse – Bauchfett', category: 'lipolysis', priceEUR: 0, durationMinutes: 45, notes: 'on_request' },
  { id: 'lipo-cellulite', name: 'Lipolyse – Cellulite', category: 'lipolysis', priceEUR: 0, durationMinutes: 50, notes: 'on_request' },
];

export const categories = [
  { id: 'muskelrelaxans', name: 'Muskelrelaxans' },
  { id: 'hyaluron', name: 'Hyaluron-Filler' },
  { id: 'prp', name: 'PRP' },
  { id: 'polynucleotides', name: 'Polynukleotide' },
  { id: 'skinbooster', name: 'Skin Booster' },
  { id: 'mesotherapy', name: 'Mesotherapie' },
  { id: 'micronutrients', name: 'Mikronährstoffanalyse' },
  { id: 'vitamininfusion', name: 'Vitamin‑Infusionen' },
  { id: 'exosomes', name: 'Exosomen' },
  { id: 'lipolysis', name: 'Lipolyse' },
] as const;

export const getTreatmentById = (id: string) => TREATMENTS.find(t => t.id === id);
