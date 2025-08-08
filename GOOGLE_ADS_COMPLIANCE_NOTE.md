# Google Ads Compliance - Temporäre Änderungen

## Datum der Änderung
**30. Juni 2025**

## Grund der Änderung
Google Ads verbietet die Verwendung von verschreibungspflichtigen Medikamentennamen wie "Botox", "Botulinumtoxin" etc. in Werbeanzeigen und auf verlinkten Landing Pages. Die Kampagne wurde mehrfach abgelehnt, bis alle Erwähnungen entfernt wurden.

## Kampagnenzeitraum
**14. Juli 2025 - 28. Juli 2025** (Summer Special)

## Durchgeführte Änderungen
Alle Erwähnungen von "Botox", "Botulinum" und "Botulinumtoxin" wurden ersetzt durch:
- **"Muskelrelaxans"** / **"Muskelrelaxanzien"**
- **"Faltenbehandlung"** (allgemeine Beschreibung)
- **"Muskelentspannung"** (Wirkungsweise)

### Betroffene Dateien:
1. `/app/components/Pricing.tsx` - Preisliste
2. `/app/components/Treatments.tsx` - Behandlungsbeschreibungen
3. `/app/components/Testimonials.tsx` - Kundenbewertungen
4. `/app/layout.tsx` - SEO Metadata
5. `/README.md` - Dokumentation
6. Gelöscht: `Pricing.backup.tsx`, `notiz`

## Rückgängigmachen der Änderungen
Nach Ende der Google Ads Kampagne (nach dem 28. Juli 2025) können die originalen Begriffe wiederhergestellt werden. Der Git-Commit vor den Änderungen war: `71a0b3b`

Um die Änderungen rückgängig zu machen:
```bash
git revert ea178da
```

Oder spezifische Dateien auf den vorherigen Stand zurücksetzen:
```bash
git checkout 71a0b3b -- app/components/Pricing.tsx app/components/Treatments.tsx app/components/Testimonials.tsx app/layout.tsx README.md
```

## Wichtige Hinweise
- Die Landing Page `/summer-special-kw` war bereits von Anfang an compliant
- Die Hauptseite musste angepasst werden, da Google auch verlinkte Seiten prüft
- Der "Mehr erfahren über Medestetique" Button wurde von der Landing Page entfernt

## Kontakt
Bei Fragen zu diesen Änderungen: Diese wurden am 30.06.2025 mit Claude Code durchgeführt.