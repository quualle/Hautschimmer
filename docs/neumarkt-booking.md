Neumarkt Terminbuchung – Implementierung & Nutzung
=================================================

Endpunkte und Seiten
--------------------

- Öffentliche Buchungsseite: `/booking/neumarkt`
- Bequemer Einstieg: `/neumarkt` leitet zu `/booking/neumarkt` weiter
- Slots API: `GET /api/neumarkt/slots?date=YYYY-MM-DD&treatmentId=<id>`
- Buchungen API: `POST /api/neumarkt/bookings`
- Reminder-Runner: `POST /api/neumarkt/reminders/run` (für tägliche Scheduler-Ausführung)

Konfiguration
-------------

- Arbeitszeiten, Startdatum, Intervall: `src/data/neumarkt-config.ts`
- Behandlungen & Preise: `src/data/treatments.ts`

Datenspeicherung (lokal)
------------------------

- Buchungen werden in `data/neumarkt-bookings.json` gespeichert.
- Ausgehende Bestätigungen werden als Dateien abgelegt:
  - Emails (HTML): `data/outbox/emails/<bookingId>.html`
  - SMS (Text): `data/outbox/sms/<bookingId>-confirm.txt` und `...-reminder.txt`

Hinweis Netlify / Produktion
----------------------------

Die lokale Dateispeicherung ist für Entwicklung gedacht. Auf Netlify sind Schreibvorgänge in Functions ephemeral. Für Produktion bitte auf einen persistenten Store wechseln, z. B.:

- Netlify Blobs/KV (empfohlen für Einfachheit)
- Supabase (bereits als Dependency vorhanden)

Die Storage-Schicht ist gekapselt (`lib/storage/fileStore.ts`) und kann gegen einen persistenten Adapter getauscht werden.

Reminder / SMS
--------------

- Beim Buchen wird `remindAtISO` (Terminstart − 24h) gesetzt.
- Der Endpoint `POST /api/neumarkt/reminders/run` markiert fällige Reminder als versendet und legt eine Outbox-SMS-Datei ab.
- In Produktion einen täglichen Scheduler (z. B. Netlify Scheduled Functions / Cron) auf diesen Endpoint zeigen lassen.

Email-Template
--------------

- HTML-Template: `lib/notifications/email.tsx` (gestaltetes, responsives Layout)
- SMS-Templates: `lib/notifications/sms.ts`

Anpassungen im UI
-----------------

- Die Seite `/booking/neumarkt` bietet:
  - Auswahl der Kategorie & Behandlung inkl. Preis und Dauer
  - Datumswahl mit visueller Anzeige freier/gebuchter Zeiten
  - Formular mit Vorname, Nachname, E‑Mail, Telefon, SMS-Opt-In
  - DSGVO-Einwilligung
  - Erfolgsansicht mit .ics-Download

Bekannte Einschränkungen (Stand jetzt)
-------------------------------------

- TypeScript-Build schlägt derzeit an nicht verwandten Stellen fehl (z. B. `BookingOrb.tsx` Prop-Typ & `Contact.tsx` falscher Import). Das ist unabhängig von der Neumarkt-Buchung und kann separat behoben werden.
- Persistente Speicherung & echte E-Mail/SMS-Auslieferung sind placeholders (Outbox-Dateien). Für Livebetrieb Anbieter (z. B. Twilio, Resend/SendGrid) einbinden oder Netlify-Integrationen nutzen.

Schnelltest lokal
-----------------

1. `npm run dev` starten und `http://localhost:3000/booking/neumarkt` öffnen.
2. Behandlung wählen, Datum >= `startDate` wählen, freie Uhrzeit anklicken.
3. Formular ausfüllen, Buchung absenden.
4. Prüfen: `data/neumarkt-bookings.json` und `data/outbox/`.
5. Optional: Reminder testen – Endpoint `POST /api/neumarkt/reminders/run` aufrufen.

Supabase-Setup
--------------

- Migration angewendet: Tabellen `treatments`, `bookings`, `working_hours`, `closed_dates` sind erstellt; `treatments` & `working_hours` sind vorbelegt.
- RLS ist aktiviert. Es existiert nur eine Policy für anonymes Lesen aktiver `treatments`. Alle Schreibvorgänge laufen serverseitig mit dem Service Role Key.

Env Variablen setzen (lokal/Netlify):

- `NEXT_PUBLIC_SUPABASE_URL` = `https://<project-ref>.supabase.co` (für dein Projekt: `ujsljedliuvuwgudggoe`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon Key aus dem Supabase Dashboard
- `SUPABASE_SERVICE_ROLE_KEY` = Service Role Key (nur serverseitig verwenden, niemals im Client ausliefern)

Wenn diese Variablen vorhanden sind, verwenden die API-Routen automatisch Supabase anstelle der lokalen JSON-Datei. Ohne Variablen bleibt das lokale Fallback aktiv.

