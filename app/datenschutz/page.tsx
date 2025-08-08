import React from 'react';

const DatenschutzPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
      <p className="mb-4">
        <strong>WICHTIGER HINWEIS:</strong> Dies ist nur ein Platzhalter. Bitte ersetzen Sie diesen Text durch Ihre vollständige und rechtsgültige Datenschutzerklärung gemäß DSGVO und BDSG. Konsultieren Sie bei Bedarf einen Rechtsexperten oder nutzen Sie einen Datenschutz-Generator.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Verantwortlicher</h2>
      <p>[Hier Name und Kontaktdaten des Verantwortlichen einfügen]</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Arten der verarbeiteten Daten</h2>
      <p>[Hier auflisten, welche Daten Sie verarbeiten, z.B. Kontaktdaten, Nutzungsdaten, Inhaltsdaten etc.]</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Zwecke der Verarbeitung</h2>
      <p>[Hier beschreiben, warum Sie die Daten verarbeiten, z.B. zur Bereitstellung des Onlineangebotes, Kontaktaufnahme, Marketing etc.]</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Rechtsgrundlagen</h2>
      <p>[Hier die Rechtsgrundlagen für die Verarbeitung nennen, z.B. Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO), berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)]</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Ihre Rechte als betroffene Person</h2>
      <p>[Hier die Rechte der Nutzer auflisten: Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch, Datenübertragbarkeit, Beschwerderecht bei einer Aufsichtsbehörde]</p>

      {/* Fügen Sie hier alle weiteren erforderlichen Abschnitte hinzu, z.B. zu Cookies, Hosting, Kontaktformular, Analysetools, Social Media Plugins etc. */}

    </div>
  );
};

export default DatenschutzPage;
