/**
 * Zentrale Standort-Konfiguration für alle Locations
 */

export type LocationId = 'neumarkt' | 'kw';

export type LocationConfig = {
  id: LocationId;
  name: string;
  subName?: string;
  city: string;
  address: string;
  mapsUrl: string;
  mapsEmbed: string;
  mapsQuery: string; // für Google Maps Links
  timezone: string;
  slotIntervalMinutes: number;
  defaultDurationMinutes: number;
  bufferMinutes: number;
  minLeadTimeMinutes: number;
  emergencyPhone?: string;
  // Für E-Mail und SMS
  brandName: string;
  locationName: string;
  smsPrefix: string;
  // Neumarkt: feste Arbeitszeiten, KW: dynamische Slot-Freigabe
  bookingMode: 'fixed_schedule' | 'dynamic_slots';
};

export const LOCATIONS: Record<LocationId, LocationConfig> = {
  neumarkt: {
    id: 'neumarkt',
    name: 'Hautschimmer',
    subName: 'MedEstetique',
    city: 'Neumarkt i.d.Opf',
    address: 'Mussinanstraße 65, 92318 Neumarkt in der Oberpfalz',
    mapsUrl: 'https://www.google.com/maps/search/Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz',
    mapsEmbed: 'https://maps.google.com/maps?q=Mussinanstra%C3%9Fe+65,+92318+Neumarkt+in+der+Oberpfalz&output=embed',
    mapsQuery: 'MedEstetique Neumarkt i.d.Opf',
    timezone: 'Europe/Berlin',
    slotIntervalMinutes: 15,
    defaultDurationMinutes: 30,
    bufferMinutes: 15,
    minLeadTimeMinutes: 0, // Keine Mindest-Vorlaufzeit
    brandName: 'MedEstetique by Saskia Heer',
    locationName: 'Neumarkt i.d.Opf',
    smsPrefix: 'MedEstetique',
    bookingMode: 'fixed_schedule',
  },
  kw: {
    id: 'kw',
    name: 'Hautschimmer',
    subName: 'im Kosmetikstudio Glam & Glow Beauty',
    city: 'Königs Wusterhausen',
    address: 'Glam & Glow Beauty, Königs Wusterhausen',
    mapsUrl: 'https://www.google.com/maps/search/Glam+%26+Glow+Beauty,+K%C3%B6nigs+Wusterhausen',
    mapsEmbed: 'https://maps.google.com/maps?q=Glam+%26+Glow+Beauty,+K%C3%B6nigs+Wusterhausen&output=embed',
    mapsQuery: 'Glam & Glow Beauty Königs Wusterhausen',
    timezone: 'Europe/Berlin',
    slotIntervalMinutes: 15,
    defaultDurationMinutes: 30,
    bufferMinutes: 15,
    minLeadTimeMinutes: 240, // 4 Stunden
    emergencyPhone: '+49 173 8615766',
    brandName: 'Hautschimmer im Kosmetikstudio Glam & Glow',
    locationName: 'Königs Wusterhausen',
    smsPrefix: 'Hautschimmer',
    bookingMode: 'dynamic_slots',
  },
};

export const getLocation = (id: LocationId): LocationConfig => LOCATIONS[id];

export const getLocationByCity = (city: string): LocationConfig | undefined => {
  return Object.values(LOCATIONS).find(
    (loc) => loc.city.toLowerCase() === city.toLowerCase()
  );
};
