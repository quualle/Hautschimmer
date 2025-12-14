import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Datenschutz | Hautschimmer',
    description: 'Datenschutzerklärung von Hautschimmer - Saskia Heer',
};

const DatenschutzPage = () => {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen max-w-4xl">
            <h1 className="font-serif text-4xl mb-12 text-foreground">Datenschutzerklärung</h1>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">1. Datenschutz auf einen Blick</h2>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Allgemeine Hinweise</h3>
                <p className="mb-4">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                    passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                    persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
                    Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Datenerfassung auf dieser Website</h3>
                <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                <p className="mb-4">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                    können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                </p>

                <p className="mb-2"><strong>Wie erfassen wir Ihre Daten?</strong></p>
                <p className="mb-4">
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                    um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer Terminbuchung angeben.
                </p>
                <p className="mb-4">
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                    Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <p className="mb-2"><strong>Wofür nutzen wir Ihre Daten?</strong></p>
                <p className="mb-4">
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                    Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>

                <p className="mb-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
                <p className="mb-4">
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                    gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                    oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                    haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                    Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                    zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">2. Hosting</h2>
                <p className="mb-4">
                    Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                </p>

                <h3 className="text-lg font-medium mb-2 text-foreground">Netlify</h3>
                <p className="mb-2">
                    Anbieter ist Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA (nachfolgend „Netlify").
                </p>
                <p className="mb-4">
                    Netlify ist ein Dienst zum Hosting von Webseiten. Wenn Sie unsere Website besuchen, erfasst Netlify
                    verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung
                    von Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.netlify.com/privacy/</a>
                </p>
                <p className="mb-4">
                    Die Verwendung von Netlify erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
                    berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">3. Allgemeine Hinweise und Pflichtinformationen</h2>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Datenschutz</h3>
                <p className="mb-4">
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                    Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
                    sowie dieser Datenschutzerklärung.
                </p>
                <p className="mb-4">
                    Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene
                    Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung
                    erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem
                    Zweck das geschieht.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Hinweis zur verantwortlichen Stelle</h3>
                <p className="mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-[#FCFAF7] p-6 rounded-xl border border-secondary/10 mb-4">
                    <p className="mb-1 font-medium text-foreground">Saskia Heer</p>
                    <p className="mb-1">Hautschimmer</p>
                    <p className="mb-1">Mussinanstraße 65, 92318 Neumarkt i.d.Opf</p>
                    <p className="mb-1">Bahnhofstraße 8, 15711 Königs Wusterhausen</p>
                    <p className="mb-1 mt-2">Telefon: 0173 8615766</p>
                    <p className="mb-1">E-Mail: saskia.hautschimmer@gmail.com</p>
                </div>
                <p className="mb-4">
                    Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
                    anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen,
                    E-Mail-Adressen o. Ä.) entscheidet.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Speicherdauer</h3>
                <p className="mb-4">
                    Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                    Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                    berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                    werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung
                    Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                    letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</h3>
                <p className="mb-4">
                    Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen datenschutzrechtlich
                    nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese
                    Drittstaaten übertragen und dort verarbeitet werden. Wir weisen darauf hin, dass in diesen Ländern
                    kein mit der EU vergleichbares Datenschutzniveau garantiert werden kann.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p className="mb-4">
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                    eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
                    erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
                <p className="mb-4 uppercase text-xs tracking-wide leading-relaxed">
                    WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE
                    JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
                    VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE
                    BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
                    ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
                    PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE
                    FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
                    VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH
                    NACH ART. 21 ABS. 1 DSGVO).
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p className="mb-4">
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                    Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                    Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet
                    anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Recht auf Datenübertragbarkeit</h3>
                <p className="mb-4">
                    Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                    automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
                    aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
                    verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Auskunft, Berichtigung und Löschung</h3>
                <p className="mb-4">
                    Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                    Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
                    der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
                    zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Recht auf Einschränkung der Verarbeitung</h3>
                <p className="mb-4">
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht
                    in folgenden Fällen:
                </p>
                <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                    <li>
                        Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen
                        wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
                        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    </li>
                    <li>
                        Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
                        statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                    </li>
                    <li>
                        Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung
                        oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die
                        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                    </li>
                    <li>
                        Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen
                        Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
                        überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                        zu verlangen.
                    </li>
                </ul>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">4. Datenerfassung auf dieser Website</h2>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Server-Log-Dateien</h3>
                <p className="mb-4">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                    die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                </ul>
                <p className="mb-4">
                    Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser
                    Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes
                    Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen
                    die Server-Log-Files erfasst werden.
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Anfrage per E-Mail oder Telefon</h3>
                <p className="mb-4">
                    Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden
                    personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert
                    und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="mb-4">
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                    mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich
                    ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
                    Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung
                    (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                </p>
                <p className="mb-4">
                    Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung
                    auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
                    (z.B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere
                    gesetzliche Aufbewahrungsfristen – bleiben unberührt.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">5. Analyse-Tools und Werbung</h2>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Google Analytics</h3>
                <p className="mb-4">
                    Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland
                    Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mb-4">
                    Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren.
                    Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer,
                    verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden von Google ggf. in einem Profil
                    zusammengefasst, das dem jeweiligen Nutzer bzw. dessen Endgerät zugeordnet ist.
                </p>
                <p className="mb-4">
                    Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des
                    Nutzerverhaltens ermöglichen (z.B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen
                    über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und
                    dort gespeichert.
                </p>
                <p className="mb-4">
                    Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                    hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine
                    Werbung zu optimieren.
                </p>
                <p className="mb-4">
                    Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie unter{' '}
                    <a href="https://www.google.com/analytics/terms/de.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        https://www.google.com/analytics/terms/de.html
                    </a>{' '}
                    und unter{' '}
                    <a href="https://policies.google.com/?hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        https://policies.google.com/?hl=de
                    </a>.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">6. Plugins und Tools</h2>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Externe Buchungsplattform (Planity)</h3>
                <p className="mb-4">
                    Wir nutzen für die Online-Terminbuchung die Dienste von Planity. Anbieter ist die Planity SAS,
                    Paris, Frankreich.
                </p>
                <p className="mb-4">
                    Wenn Sie über unsere Website einen Termin buchen, werden Ihre eingegebenen Daten (Name, E-Mail-Adresse,
                    Telefonnummer, gewünschter Termin) an Planity übermittelt. Die Datenverarbeitung erfolgt auf Grundlage
                    von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                    an einer effizienten Terminverwaltung).
                </p>
                <p className="mb-4">
                    Details entnehmen Sie der Datenschutzerklärung von Planity:{' '}
                    <a href="https://www.planity.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        https://www.planity.com/privacy
                    </a>
                </p>

                <h3 className="text-lg font-medium mb-2 mt-6 text-foreground">Google Maps</h3>
                <p className="mb-4">
                    Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google"),
                    Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mb-4">
                    Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese
                    Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                    Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
                </p>
                <p className="mb-4">
                    Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote
                    und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein
                    berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                </p>
                <p className="mb-4">
                    Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:{' '}
                    <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        https://policies.google.com/privacy?hl=de
                    </a>.
                </p>
            </section>

            <section className="mb-10 text-sm text-foreground/70">
                <h2 className="text-xl font-semibold mb-4 text-primary">7. Medizinische Daten</h2>
                <p className="mb-4">
                    Im Rahmen der Terminvereinbarung und Behandlung können besondere Kategorien personenbezogener Daten
                    im Sinne von Art. 9 DSGVO (Gesundheitsdaten) verarbeitet werden. Diese Verarbeitung erfolgt auf Grundlage
                    von Art. 9 Abs. 2 lit. h DSGVO in Verbindung mit § 22 Abs. 1 Nr. 1 lit. b BDSG (Verarbeitung für Zwecke
                    der Gesundheitsvorsorge, medizinischen Diagnostik, Versorgung oder Behandlung).
                </p>
                <p className="mb-4">
                    Ihre Gesundheitsdaten werden selbstverständlich vertraulich behandelt und unterliegen der ärztlichen
                    Schweigepflicht. Die Daten werden nur für die Durchführung der Behandlung und die damit verbundenen
                    organisatorischen und administrativen Zwecke verwendet.
                </p>
            </section>

            <section className="mb-10 pt-8 border-t border-secondary/10">
                <p className="text-xs text-foreground/50">
                    Stand dieser Datenschutzerklärung: November 2025
                </p>
            </section>
        </div>
    );
};

export default DatenschutzPage;
