import { Booking } from '../storage/fileStore';

export function renderConfirmationSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');
  return `MedEstetique: Buchung bestätigt für ${day} um ${booking.startTime} – ${booking.treatmentName}. Ort: Neumarkt i.d.Opf. Bei Fragen einfach per SMS antworten.`;
}

export function renderReminderSms(booking: Booking) {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const day = date.toLocaleDateString('de-DE');
  return `Erinnerung: Ihr Termin bei MedEstetique ist morgen (${day}) um ${booking.startTime} – ${booking.treatmentName}. Wir freuen uns auf Sie!`;
}

