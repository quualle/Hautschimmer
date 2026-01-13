// Utility für Neumarkt-Buchungslinks - führt zur internen Buchungsseite

export const NEUMARKT_BOOKING_URL = '/booking/neumarkt';

// Öffnet interne Buchungsseite für Neumarkt
export const openNeumarktBooking = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  // Navigiere zur internen Buchungsseite
  window.location.href = NEUMARKT_BOOKING_URL;
};

// Helper-Funktion für den Neumarkt-Buchungslink
export const getNeumarktBookingUrl = () => {
  return NEUMARKT_BOOKING_URL;
};

// Location-spezifische Buchungsfunktionen
export enum BookingLocation {
  KOENIGS_WUSTERHAUSEN = 'koenigs_wusterhausen',
  NEUMARKT = 'neumarkt'
}

// KW Booking URL - jetzt auch intern
export const KW_BOOKING_URL = '/booking/kw';

export const getBookingUrlForLocation = (location: BookingLocation) => {
  switch (location) {
    case BookingLocation.KOENIGS_WUSTERHAUSEN:
      return KW_BOOKING_URL; // Jetzt interne Buchungsseite statt Planity
    case BookingLocation.NEUMARKT:
      return NEUMARKT_BOOKING_URL;
    default:
      return NEUMARKT_BOOKING_URL;
  }
};

export const openBookingForLocation = (location: BookingLocation, e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }

  // Beide Standorte nutzen jetzt interne Buchungsseiten
  const url = getBookingUrlForLocation(location);
  window.location.href = url;
};