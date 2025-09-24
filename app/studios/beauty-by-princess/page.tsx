export const dynamic = 'force-dynamic';

import Image from 'next/image';
import BookingSelector from '../../components/BookingSelector';

export default function BeautyByPrincessPage() {
  return (
    <main className="min-h-[70vh] bg-light">
      <section className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-72 lg:h-96 bg-highlight border border-secondary/20">
            <Image
              src="/images/beauty-by-princess.jpg"
              alt="Beauty by Princess Studio"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 className="heading-2 mb-4"><span className="text-primary">Beauty by </span><span className="text-secondary">Princess</span></h1>
            <p className="paragraph mb-4 text-primary/80">Exklusives Studio in Neumarkt i.d.Opf. für medizinisch fundierte Ästhetik. Warme Atmosphäre, präzise Techniken und individuelle Beratung für Ergebnisse, die Ihre natürliche Ausstrahlung betonen.</p>
            <p className="paragraph mb-6 text-primary/80">Weitere Studio-Details, Behandlungsoptionen und Einblicke folgen. Das Titelfoto kann jederzeit ausgetauscht werden – bitte die gewünschte Datei unter <code>/public/images/beauty-by-princess.jpg</code> bereitstellen.</p>
            <BookingSelector variant="modal" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-secondary to-secondary/90 text-white shadow">
              Termin buchen
            </BookingSelector>
          </div>
        </div>
      </section>
    </main>
  );
}

