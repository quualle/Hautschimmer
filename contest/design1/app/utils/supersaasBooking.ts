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

export const getBookingUrlForLocation = (location: BookingLocation) => {
  switch (location) {
    case BookingLocation.KOENIGS_WUSTERHAUSEN:
      return 'https://www.planity.com/de-DE/glam-glow-beauty-15711-konigs-wusterhausen#service-name-10-0';
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
  
  if (location === BookingLocation.KOENIGS_WUSTERHAUSEN) {
    // Externe Planity-Buchung öffnen
    const url = getBookingUrlForLocation(location);
    window.open(url, '_blank');
  } else {
    // Interne Neumarkt-Buchungsseite
    openNeumarktBooking(e);
  }
};