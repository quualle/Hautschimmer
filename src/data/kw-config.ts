/**
 * Konfiguration für den Standort Königs Wusterhausen (KW)
 *
 * Unterschied zu Neumarkt:
 * - Keine festen Wochentage, sondern dynamische Slot-Freigabe via Admin
 * - Nur 1x/Monat für 3-7 Tage geöffnet
 * - 4 Stunden Mindest-Vorlaufzeit (sonst Telefon-Hinweis)
 */

export type KWConfig = {
  timezone: string;
  slotIntervalMinutes: number;
  defaultDurationMinutes: number;
  bufferMinutes: number;
  minLeadTimeMinutes: number;
  emergencyPhone: string;
  location: {
    name: string;
    subName: string;
    city: string;
    address: string;
    mapsUrl: string;
    mapsEmbed: string;
  };
};

export const KW_CONFIG: KWConfig = {
  timezone: 'Europe/Berlin',
  slotIntervalMinutes: 15,
  defaultDurationMinutes: 30,
  bufferMinutes: 15,              // 15 Min Puffer zwischen Terminen
  minLeadTimeMinutes: 240,        // 4 Stunden Mindest-Vorlaufzeit
  emergencyPhone: '+49 173 8615766', // Saskia für kurzfristige Anfragen
  location: {
    name: 'Hautschimmer',
    subName: 'im Kosmetikstudio Glam & Glow Beauty',
    city: 'Königs Wusterhausen',
    address: 'Glam & Glow Beauty, Königs Wusterhausen',
    mapsUrl: 'https://www.google.com/maps/search/Glam+%26+Glow+Beauty,+K%C3%B6nigs+Wusterhausen',
    mapsEmbed: 'https://maps.google.com/maps?q=Glam+%26+Glow+Beauty,+K%C3%B6nigs+Wusterhausen&output=embed',
  },
};
