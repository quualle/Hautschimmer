import { NextRequest, NextResponse } from 'next/server';
import { addBooking as addBookingUnified } from '../../../../lib/storage';
import { listBookingsByDate as listBookingsByDateUnified } from '../../../../lib/storage';
import { overlaps, timeToMinutes, minutesToTime, computeRemindAtISO, writeOutboxEmail, writeOutboxSms } from '../../../../lib/storage/fileStore';
import { getTreatmentById } from '../../../../src/data/treatments';
import { renderBookingEmailHTML } from '../../../../lib/notifications/email';
import { renderConfirmationSms } from '../../../../lib/notifications/sms';
import { sendSmsOrOutbox } from '../../../../lib/notifications/smsSender';
import { NEUMARKT_CONFIG } from '../../../../src/data/neumarkt-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, smsOptIn, treatmentId, date, time } = body || {};

    if (!firstName || !lastName || !email || !phone || !treatmentId || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate date/time
    if (date < NEUMARKT_CONFIG.startDate || NEUMARKT_CONFIG.closedDates.includes(date)) {
      return NextResponse.json({ error: 'Date not bookable' }, { status: 400 });
    }

    const treatment = getTreatmentById(treatmentId);
    const duration = treatment?.durationMinutes ?? NEUMARKT_CONFIG.defaultDurationMinutes;
    const start = timeToMinutes(time);
    const end = start + duration;

    // Check working window
    const dObj = new Date(date + 'T00:00:00');
    const weekdayISO = ((dObj.getDay() + 6) % 7) + 1;
    const dayConfig = NEUMARKT_CONFIG.workingHours.find(w => w.day === (weekdayISO as any));
    if (!dayConfig) {
      return NextResponse.json({ error: 'Closed on selected day' }, { status: 400 });
    }
    const windowStart = timeToMinutes(dayConfig.open);
    const windowEnd = timeToMinutes(dayConfig.close);
    if (start < windowStart || end > windowEnd) {
      return NextResponse.json({ error: 'Outside working hours' }, { status: 400 });
    }

    // Check overlap with existing bookings
    const existing = await listBookingsByDateUnified(date);
    const conflict = existing.some((b: any) => overlaps(start, end, timeToMinutes(b.startTime), timeToMinutes(b.endTime)));
    if (conflict) {
      return NextResponse.json({ error: 'Slot already booked' }, { status: 409 });
    }

    const endTime = minutesToTime(end);
    const booking = await addBookingUnified({
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

    // Compose notifications into outbox
    const emailHtml = renderBookingEmailHTML(booking);
    writeOutboxEmail(booking.id, emailHtml);
    if (booking.smsOptIn) {
      const sms = renderConfirmationSms(booking);
      await sendSmsOrOutbox(booking.id, 'confirm', booking.phone, sms);
    }

    return NextResponse.json({ ok: true, booking });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
