import { Booking } from '../storage/fileStore';

export function renderConfirmationSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');

  const isKW = booking.location === 'kw';
  const brand = isKW ? 'Hautschimmer' : 'MedEstetique';
  const location = isKW ? 'KW (Glam&Glow)' : 'Neumarkt i.d.Opf';

  return `${brand}: Buchung bestätigt für ${day} um ${booking.startTime} – ${booking.treatmentName}. Ort: ${location}. Bei Fragen einfach per SMS antworten.`;
}

export function renderReminderSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');

  const isKW = booking.location === 'kw';
  const brand = isKW ? 'Hautschimmer' : 'MedEstetique';

  return `Erinnerung: Ihr Termin bei ${brand} ist morgen (${day}) um ${booking.startTime} – ${booking.treatmentName}. Wir freuen uns auf Sie!`;
}
