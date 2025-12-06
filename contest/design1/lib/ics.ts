import { Booking } from './storage/fileStore';

// Very small ICS generator
export function bookingToICS(booking: Booking) {
  const dtStart = toICSDateTime(booking.date, booking.startTime);
  const dtEnd = toICSDateTime(booking.date, booking.endTime);
  const uid = `medestetique-${booking.id}@neumarkt`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MedEstetique//Booking//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDateTimeStamp(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'SUMMARY:Behandlung – MedEstetique Neumarkt',
    `DESCRIPTION:${escapeICS(`${booking.treatmentName} (Preis €${booking.priceEUR})`)}\\nKontakt: ${escapeICS(booking.email)} / ${escapeICS(booking.phone)}`,
    'LOCATION:MedEstetique Neumarkt i.d.Opf',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return lines.join('\r\n');
}

function toICSDateTime(date: string, time: string): string {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, m] = time.split(':').map(Number);
  const dt = new Date(Date.UTC(Y, (M - 1), D, h, m));
  return `${Y}${String(M).padStart(2, '0')}${String(D).padStart(2, '0')}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00Z`;
}

function toICSDateTimeStamp(d: Date): string {
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, '0');
  const D = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return `${Y}${M}${D}T${h}${m}${s}Z`;
}

function escapeICS(input: string): string {
  return input.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

