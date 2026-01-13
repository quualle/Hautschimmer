import { Booking } from '../storage/fileStore';
import { LOCATIONS } from '@/src/data/locations';

export function renderConfirmationSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');
  const loc = LOCATIONS[booking.location];
  return `${loc.smsPrefix}: Buchung bestätigt für ${day} um ${booking.startTime} – ${booking.treatmentName}. Ort: ${loc.locationName}. Bei Fragen einfach per SMS antworten.`;
}

export function renderReminderSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');
  const loc = LOCATIONS[booking.location];
  return `Erinnerung: Ihr Termin bei ${loc.smsPrefix} ist morgen (${day}) um ${booking.startTime} – ${booking.treatmentName}. Wir freuen uns auf Sie!`;
}

