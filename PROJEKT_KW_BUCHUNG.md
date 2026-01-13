# Projekt: Buchungssystem für Königs Wusterhausen (KW)

**Erstellt:** 13. Januar 2026
**Status:** ✅ IMPLEMENTIERT
**Ziel:** Internes Buchungstool für KW-Standort mit dynamischer Slot-Freigabe

---

## 1. Status Quo - Bestehendes System

### 1.1 Aktuelle Architektur

```
/app
├── booking/
│   └── neumarkt/
│       └── page.tsx          # Buchungsseite Neumarkt
├── admin/
│   ├── login/page.tsx        # Admin-Login
│   └── bookings/page.tsx     # Terminverwaltung
├── api/
│   ├── neumarkt/
│   │   ├── slots/route.ts    # Verfügbare Zeitslots
│   │   ├── bookings/route.ts # Buchung erstellen
│   │   └── reminders/run/route.ts
│   └── admin/
│       └── bookings/         # Admin CRUD
├── components/
│   └── BookingSelector.tsx   # Standortwahl-Modal
└── utils/
    └── supersaasBooking.ts   # Routing zwischen Planity/Intern

/src/data
├── treatments.ts             # Behandlungen mit Dauer & Preis
└── neumarkt-config.ts        # Arbeitszeiten, Startdatum

/lib/storage
├── index.ts                  # Storage-Abstraction
└── fileStore.ts              # JSON-Datei + Supabase
```

### 1.2 Neumarkt-Logik (feste Arbeitszeiten)

```typescript
// neumarkt-config.ts
workingHours: [
  { day: 1, open: '10:00', close: '17:00' }, // Montag
  { day: 6, open: '10:00', close: '17:00' }, // Samstag
]
```

- **Algorithmus:** Prüft Wochentag → findet passendes WorkingHours-Objekt → generiert Slots
- **Behandlungsdauer:** Wird aus `treatments.ts` geladen (10-180 Min je nach Behandlung)
- **Slot-Intervall:** 15 Minuten
- **Puffer zwischen Terminen:** Aktuell NICHT implementiert

### 1.3 KW aktuell

- Externe Buchung über Planity: `https://www.planity.com/de-DE/glam-glow-beauty-15711-konigs-wusterhausen`
- Keine interne Kontrolle über Termine

---

## 2. Anforderungen KW-Buchungssystem

### 2.1 Kernunterschiede zu Neumarkt

| Aspekt | Neumarkt | KW (NEU) |
|--------|----------|----------|
| **Verfügbarkeit** | Feste Wochentage (Mo, Sa) | Dynamische Slot-Freigabe |
| **Frequenz** | Wöchentlich | 1x/Monat für 3-7 Tage |
| **Arbeitszeiten** | Immer 10:00-17:00 | Variabel pro Tag |
| **Admin-Aufwand** | Keiner (automatisch) | Slots manuell freigeben |

### 2.2 Geklärte Anforderungen

| # | Frage | Antwort |
|---|-------|---------|
| 1 | Slot-Freigabe-Methode | **Einzelne Tage** mit Uhrzeit von-bis |
| 2 | Variable Uhrzeiten pro Tag? | **Ja** (z.B. Fr 14-20h, Sa 10-17h) |
| 3 | Behandlungen identisch? | **Ja**, gleiche wie Neumarkt |
| 4 | Slot-Intervall | **15 Minuten** |
| 5 | Mindest-Vorlaufzeit | **4 Stunden** (sonst Telefon-Hinweis) |
| 6 | Puffer zwischen Terminen | **15 Minuten** |
| 7 | Praxisname in Benachrichtigungen | **Hautschimmer** (innerhalb Glam&Glow) |
| 8 | Gemeinsamer Admin-Bereich? | **Ja** |
| 9 | Wer gibt Slots frei? | **Nur Marco** |

### 2.3 Kontaktdaten bei kurzfristiger Buchung

Wenn Vorlaufzeit < 4 Stunden:
- Telefonnummer von Saskia einblenden
- Text: "Für kurzfristige Anfragen kontaktieren Sie uns bitte telefonisch"

---

## 3. Implementierungsplan

### Phase 1: Datenmodell & Konfiguration
**Status:** [ ] Offen

#### 3.1.1 Neue Konfigurationsdatei erstellen
- [ ] `/src/data/kw-config.ts` anlegen
- [ ] Standort-unabhängige Basis-Config extrahieren

```typescript
// kw-config.ts (geplante Struktur)
export type KWConfig = {
  timezone: string;
  slotIntervalMinutes: number;
  defaultDurationMinutes: number;
  bufferMinutes: number;           // NEU: 15 Min Puffer
  minLeadTimeMinutes: number;      // NEU: 240 Min (4h)
  emergencyPhone: string;          // NEU: Saskias Nummer
  location: {
    name: string;                  // "Hautschimmer"
    subName: string;               // "im Kosmetikstudio Glam&Glow"
    address: string;
    mapsUrl: string;
  };
};
```

#### 3.1.2 Slot-Freigabe Datenmodell
- [ ] Neue Tabelle/Collection: `available_slots`

```typescript
type AvailableSlot = {
  id: string;                      // UUID
  location: 'kw' | 'neumarkt';
  date: string;                    // YYYY-MM-DD
  openTime: string;                // HH:MM
  closeTime: string;               // HH:MM
  createdAt: string;               // ISO timestamp
  createdBy: string;               // Admin-ID
};
```

---

### Phase 2: Backend APIs
**Status:** [ ] Offen

#### 3.2.1 Admin-API für Slot-Freigabe
- [ ] `POST /api/admin/available-slots` - Slot freigeben
- [ ] `GET /api/admin/available-slots` - Alle Slots auflisten
- [ ] `DELETE /api/admin/available-slots/[id]` - Slot löschen

#### 3.2.2 Öffentliche Slot-API für KW
- [ ] `GET /api/kw/slots` - Verfügbare Zeiten (analog zu Neumarkt)
  - Prüft `available_slots` statt fester Wochentage
  - Berücksichtigt 15 Min Puffer zwischen Terminen
  - Prüft 4h Vorlaufzeit

#### 3.2.3 Buchungs-API für KW
- [ ] `POST /api/kw/bookings` - Neue Buchung
- [ ] Validierung gegen freigegebene Slots
- [ ] E-Mail/SMS mit KW-spezifischen Texten

---

### Phase 3: Admin-UI für Slot-Freigabe
**Status:** [ ] Offen

#### 3.3.1 Neue Admin-Seite
- [ ] `/app/admin/slots/page.tsx` - Slot-Verwaltung

**UI-Elemente:**
```
┌─────────────────────────────────────────────────────┐
│  Verfügbare Termine freigeben                       │
├─────────────────────────────────────────────────────┤
│  Standort: [KW ▼]                                   │
│                                                     │
│  Datum:    [📅 15.02.2026]                          │
│  Von:      [10:00 ▼]                                │
│  Bis:      [18:00 ▼]                                │
│                                                     │
│  [+ Tag freigeben]                                  │
├─────────────────────────────────────────────────────┤
│  Freigegebene Tage                                  │
│  ───────────────────────────────────────────────    │
│  📅 15.02.2026  10:00-18:00  [🗑️ Löschen]           │
│  📅 16.02.2026  10:00-17:00  [🗑️ Löschen]           │
│  📅 17.02.2026  14:00-20:00  [🗑️ Löschen]           │
└─────────────────────────────────────────────────────┘
```

#### 3.3.2 Admin-Navigation erweitern
- [ ] Link zu `/admin/slots` im Admin-Menü
- [ ] Standort-Filter in bestehender Terminübersicht

---

### Phase 4: Kunden-Buchungsseite KW
**Status:** [ ] Offen

#### 3.4.1 Neue Buchungsseite
- [ ] `/app/booking/kw/page.tsx` - Buchungsformular KW

**Unterschiede zu Neumarkt:**
- Header: "Hautschimmer im Kosmetikstudio Glam&Glow"
- Standort-Badge: "Königs Wusterhausen"
- Datumsauswahl: Nur freigegebene Tage wählbar
- Bei < 4h Vorlaufzeit: Telefon-Hinweis statt Buchung

#### 3.4.2 Vorlaufzeit-Logik
```
┌─────────────────────────────────────────────────────┐
│  ⚠️ Kurzfristige Terminanfrage                      │
│                                                     │
│  Für Termine innerhalb der nächsten 4 Stunden       │
│  kontaktieren Sie uns bitte telefonisch:            │
│                                                     │
│  📞 +49 XXX XXXXXXX (Saskia)                        │
└─────────────────────────────────────────────────────┘
```

---

### Phase 5: Benachrichtigungen anpassen
**Status:** [ ] Offen

#### 3.5.1 E-Mail-Templates
- [ ] KW-spezifisches Template erstellen
- [ ] Location-Daten dynamisch einfügen:
  - Name: "Hautschimmer"
  - Zusatz: "im Kosmetikstudio Glam&Glow"
  - Adresse: [KW-Adresse]
  - Maps-Link: [KW Google Maps URL]

#### 3.5.2 SMS-Templates
- [ ] Bestätigungs-SMS anpassen
- [ ] Erinnerungs-SMS anpassen

---

### Phase 6: Integration & Routing
**Status:** [ ] Offen

#### 3.6.1 BookingSelector anpassen
- [ ] `/app/utils/supersaasBooking.ts` erweitern
- [ ] KW → `/booking/kw` statt Planity

```typescript
case BookingLocation.KOENIGS_WUSTERHAUSEN:
  return '/booking/kw';  // Intern statt Planity
```

#### 3.6.2 15 Min Puffer implementieren
- [ ] In Slot-Berechnung: `endTime + 15min` als Blockierung
- [ ] Gilt für beide Standorte (Neumarkt nachrüsten)

---

### Phase 7: Testing & Deployment
**Status:** [ ] Offen

- [ ] Lokale Tests aller neuen Endpoints
- [ ] Admin-Flow: Slots freigeben → Kunde bucht → SMS/E-Mail
- [ ] Edge Cases: Vorlaufzeit, Puffer, überlappende Buchungen
- [ ] Build erfolgreich (`npm run build`)
- [ ] Deployment auf Netlify
- [ ] Produktiv-Test

---

## 4. Offene Fragen / Noch zu klären

| # | Frage | Status |
|---|-------|--------|
| 1 | Saskias Telefonnummer für Notfall-Kontakt? | ❓ Offen |
| 2 | Genaue Adresse Glam&Glow KW? | ❓ Offen |
| 3 | Google Maps URL für KW? | ❓ Offen |

---

## 5. Dateien die erstellt/geändert werden

### Neue Dateien
```
/src/data/kw-config.ts                    # KW-Konfiguration
/app/booking/kw/page.tsx                  # Buchungsseite KW
/app/admin/slots/page.tsx                 # Slot-Freigabe Admin
/app/api/kw/slots/route.ts                # Slot-API KW
/app/api/kw/bookings/route.ts             # Buchungs-API KW
/app/api/admin/available-slots/route.ts   # Admin Slot-CRUD
/lib/storage/availableSlots.ts            # Storage für Slots
```

### Geänderte Dateien
```
/app/utils/supersaasBooking.ts            # Routing KW → intern
/app/admin/bookings/page.tsx              # Standort-Filter
/app/api/neumarkt/slots/route.ts          # Puffer nachrüsten
/lib/storage/index.ts                     # Export neue Funktionen
```

---

## 6. Fortschritts-Tracking

| Phase | Beschreibung | Status | Abgeschlossen |
|-------|--------------|--------|---------------|
| 1 | Datenmodell & Konfiguration | ✅ Erledigt | 13.01.2026 |
| 2 | Backend APIs | ✅ Erledigt | 13.01.2026 |
| 3 | Admin-UI Slot-Freigabe | ✅ Erledigt | 13.01.2026 |
| 4 | Kunden-Buchungsseite | ✅ Erledigt | 13.01.2026 |
| 5 | Benachrichtigungen | ✅ Erledigt | 13.01.2026 |
| 6 | Integration & Routing | ✅ Erledigt | 13.01.2026 |
| 7 | Testing & Deployment | ✅ Erledigt | 13.01.2026 |

**Legende:** ⬜ Offen | 🔄 In Arbeit | ✅ Erledigt

---

## 7. Nutzung

### Admin: Slots freigeben
1. Einloggen unter `/admin/login`
2. Navigieren zu `/admin/slots`
3. Standort wählen (KW), Datum und Uhrzeiten eingeben
4. "Freigeben" klicken

### Kunden: Termin buchen
1. Auf der Website "Termin in KW buchen" klicken
2. → Öffnet `/booking/kw`
3. Nur freigegebene Tage sind wählbar
4. Bei < 4h Vorlaufzeit: Telefon-Hinweis erscheint

---

*Zuletzt aktualisiert: 13. Januar 2026*
