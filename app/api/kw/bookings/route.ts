import { NextRequest, NextResponse } from 'next/server';
import { addBooking as addBookingUnified, listBookingsByDate } from '../../../../lib/storage';
import { getAvailableSlotForDate } from '../../../../lib/storage/availableSlots';
import {
  overlaps,
  timeToMinutes,
  minutesToTime,
  computeRemindAtISO,
  writeOutboxEmail,
} from '../../../../lib/storage/fileStore';
import { getTreatmentById } from '../../../../src/data/treatments';
import { renderBookingEmailHTML } from '../../../../lib/notifications/email';
import { renderConfirmationSms } from '../../../../lib/notifications/sms';
import { sendSmsOrOutbox } from '../../../../lib/notifications/smsSender';
import { LOCATIONS } from '../../../../src/data/locations';

export const runtime = 'nodejs';

const config = LOCATIONS.kw;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, smsOptIn, treatmentId, date, time } = body || {};

    // Pflichtfelder prüfen
    if (!firstName || !lastName || !email || !phone || !treatmentId || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Prüfe ob das Datum freigegeben ist
    const availableSlot = getAvailableSlotForDate('kw', date);
    if (!availableSlot) {
      return NextResponse.json(
        { error: 'Dieser Tag ist nicht für Buchungen freigegeben.' },
        { status: 400 }
      );
    }

    // Behandlung und Dauer
    const treatment = getTreatmentById(treatmentId);
    const duration = treatment?.durationMinutes ?? config.defaultDurationMinutes;
    const start = timeToMinutes(time);
    const end = start + duration;

    // Prüfe ob innerhalb der freigegebenen Zeiten
    const windowStart = timeToMinutes(availableSlot.openTime);
    const windowEnd = timeToMinutes(availableSlot.closeTime);
    if (start < windowStart || end > windowEnd) {
      return NextResponse.json({ error: 'Außerhalb der Öffnungszeiten' }, { status: 400 });
    }

    // Prüfe Vorlaufzeit (4 Stunden)
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (date === todayStr) {
      const minBookingTime = nowMinutes + config.minLeadTimeMinutes;
      if (start < minBookingTime) {
        return NextResponse.json(
          {
            error: 'Für kurzfristige Terminanfragen kontaktieren Sie uns bitte telefonisch.',
            phone: config.emergencyPhone,
          },
          { status: 400 }
        );
      }
    }

    // Prüfe Überschneidung mit bestehenden Buchungen (inkl. Puffer)
    const existing = await listBookingsByDate(date, 'kw');
    const conflict = existing.some((b: any) => {
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime) + config.bufferMinutes;
      // Neuer Termin braucht auch Puffer am Ende
      return overlaps(start, end + config.bufferMinutes, bStart, bEnd);
    });

    if (conflict) {
      return NextResponse.json({ error: 'Dieser Zeitslot ist bereits belegt.' }, { status: 409 });
    }

    const endTime = minutesToTime(end);
    const booking = await addBookingUnified({
      location: 'kw',
      firstName,
      lastName,
      email,
      phone,
      smsOptIn: Boolean(smsOptIn),
      treatmentId,
      date,
      time,
      endTime,
      durationMinutes: duration,
      remindAtISO: computeRemindAtISO(date, time),
    });

    // Benachrichtigungen erstellen
    const emailHtml = renderBookingEmailHTML(booking);
    writeOutboxEmail(booking.id, emailHtml);

    if (booking.smsOptIn) {
      const sms = renderConfirmationSms(booking);
      await sendSmsOrOutbox(booking.id, 'confirm', booking.phone, sms);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (e: any) {
    console.error('KW Bookings API error:', e);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
