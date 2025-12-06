import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impressum | Hautschimmer',
    description: 'Impressum von Hautschimmer - Saskia Heer',
};

const ImpressumPage = () => {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen max-w-4xl">
            <h1 className="font-serif text-4xl mb-12 text-foreground">Impressum</h1>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Angaben gemäß § 5 DDG:</h2>
                <p className="mb-1">Saskia Heer</p>
                <p className="mb-4">Hautschimmer</p>
                <div className="mb-4 p-6 bg-[#FCFAF7] rounded-xl border border-secondary/10">
                    <p className="mb-3 font-medium uppercase tracking-wide text-sm text-foreground/60">Standorte:</p>
                    <p className="mb-1">Bahnhofstraße 8, 15711 Königs Wusterhausen</p>
                    <p className="mb-1">Mussinanstraße 65, 92318 Neumarkt i.d.Opf (ab 13.10.2025)</p>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Kontakt:</h2>
                <p className="mb-2">E-Mail: saskia.hautschimmer@gmail.com</p>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Angaben zur Berufshaftpflichtversicherung:</h2>
                <p className="mb-2">Einzelunternehmen</p>
                <p className="mb-2">Kleinunternehmer gemäß § 19 UStG</p>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Berufsbezeichnung und berufsrechtliche Regelungen:</h2>
                <p className="mb-2"><strong>Berufsbezeichnung:</strong> Ärztin</p>
                <p className="mb-2">Die Berufsbezeichnung wurde in der Bundesrepublik Deutschland verliehen.</p>
                <p className="mb-4"><strong>Approbation:</strong> Approbierte Ärztin</p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-[#FCFAF7] p-6 rounded-xl border border-secondary/10">
                        <p className="mb-2 font-medium">Zuständige Ärztekammern:</p>
                        <p className="mb-1">Landesärztekammer Brandenburg (Erstsitz)</p>
                        <p className="mb-1">Dreifertstraße 12</p>
                        <p className="mb-1">03044 Cottbus</p>
                        <p className="mb-4 text-sm text-primary"><a href="https://www.laekb.de" target="_blank">www.laekb.de</a></p>

                        <p className="mb-1 mt-4">Bayerische Landesärztekammer (Zweitsitz)</p>
                    </div>
                    <div className="bg-[#FCFAF7] p-6 rounded-xl border border-secondary/10">
                        <p className="mb-2 font-medium">Berufsordnung:</p>
                        <p className="mb-2">Berufsordnung der Landesärztekammer Brandenburg</p>
                        <p className="mb-4 text-sm text-primary">Einsehbar unter: <a href="https://www.laekb.de" target="_blank">www.laekb.de</a></p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Zuständige Aufsichtsbehörde:</h2>
                <p className="mb-1">Landesamt für Arbeitsschutz, Verbraucherschutz und Gesundheit (LAVG)</p>
                <p className="mb-1">Abteilung Gesundheit – Dezernat G1 (Akademische Heilberufe)</p>
                <p className="mb-1">Großbeerenstraße 181-183</p>
                <p className="mb-1">14482 Potsdam</p>
                <p className="mb-1">Postfach 90 02 36, 14438 Potsdam</p>
                <p className="mb-1">Telefon: 0331 8683-800</p>
                <p className="mb-1 text-sm text-primary"><a href="https://www.lavg.brandenburg.de" target="_blank">www.lavg.brandenburg.de</a></p>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-primary">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
                <p className="mb-1">Saskia Heer</p>
                <p className="mb-1">Bahnhofstraße 8, 15711 Königs Wusterhausen</p>
                <p className="mb-1">Mussinanstraße 65, 92318 Neumarkt i.d.Opf (ab 13.10.2025)</p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">Streitschlichtung:</h2>
                <p className="mb-4">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        https://ec.europa.eu/consumers/odr/
                    </a>
                </p>
                <p className="mb-4">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                <p className="mb-4">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">Haftung für Inhalte:</h2>
                <p className="mb-4">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mb-4">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                    Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                    Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                    Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">Haftung für Links:</h2>
                <p className="mb-4">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                    verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                    Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mb-4">
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                    einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                    Links umgehend entfernen.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">Urheberrecht:</h2>
                <p className="mb-4">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mb-4">
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                    beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                    Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
                    von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
            </section>
        </div>
    );
};

export default ImpressumPage;
