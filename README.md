# MedEstetique - Saskia Heer's Schönheitsklinik Website

Dies ist eine moderne, responsive Website für Saskia Heers ästhetische Medizinklinik mit Informationen über Behandlungen, Preise und Kontaktdaten.

## Features

- Modernes, responsives Design mit eleganten Animationen
- Detaillierte Informationen über Muskelrelaxanzien, Hyaluronsäure-Filler und PRP-Behandlungen
- Interaktive Behandlungsauswahl und Preiskarten
- Kontaktformular mit Validierung
- Kundenbewertungen-Karussell
- Über-Uns-Bereich mit Saskia Heers Hintergrund

## Verwendete Technologien

- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS für das Styling
- Framer Motion für Animationen
- React Icons für Icons
- React Intersection Observer für Scroll-Animationen

## Farbschema

Das Farbschema basiert auf dem Unternehmenslogo:
- Primärfarbe (Dunkelgrau/Anthrazit): #333333
- Sekundärfarbe (Gold/Bronze): #C0A080
- Akzentfarbe (Silber/Platin): #D0D0D0
- Highlight (Goldakzent): #E8D0B0

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Logo und Bilder hinzufügen:
   Vor dem Starten der Website, fügen Sie folgende Bilder zum `/public/images/` Verzeichnis hinzu:
   - logo.png - Das runde Logo der Firma (wird in der Navigationsleiste angezeigt)
   - hero-bg.jpg - Ein Hintergrundbild für den Hero-Bereich (kann ein abstrakter, heller Hintergrund sein)
   - hero-image.jpg - Ein Bild für den kreisförmigen Bereich in der Hero-Sektion (kann ein Behandlungsbild sein)
   - saskia.jpg - Ein professionelles Foto von Saskia Heer für den Über-Uns-Bereich

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Deployment

To build the website for production:

```bash
npm run build
```

Then, to start the production server:

```bash
npm start
```

## License

This project is licensed under the MIT License.