import { NextRequest, NextResponse } from 'next/server';
import { listBookingsByDate } from '../../../../lib/storage';
import { overlaps, timeToMinutes, minutesToTime } from '../../../../lib/storage/fileStore';
import { NEUMARKT_CONFIG } from '../../../../src/data/neumarkt-config';
import { getWorkingWindowForDate } from '../../../../lib/storage/fileStore';
import { getTreatmentById } from '../../../../src/data/treatments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date'); // YYYY-MM-DD
  const treatmentId = searchParams.get('treatmentId');
  const durationParam = searchParams.get('duration');

  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  const requested = new Date(date + 'T00:00:00');

  // Closed date or before start
  if (date < NEUMARKT_CONFIG.startDate || NEUMARKT_CONFIG.closedDates.includes(date)) {
    return NextResponse.json({ date, slots: [], reason: 'closed' });
  }

  const window = getWorkingWindowForDate(requested);
  if (!window) {
    return NextResponse.json({ date, slots: [], reason: 'closed' });
  }

  const openMin = timeToMinutes(window.open);
  const closeMin = timeToMinutes(window.close);

  let duration = NEUMARKT_CONFIG.defaultDurationMinutes;
  if (treatmentId) {
    const t = getTreatmentById(treatmentId);
    if (t) duration = t.durationMinutes;
  } else if (durationParam) {
    const d = parseInt(durationParam, 10);
    if (!Number.isNaN(d) && d > 0) duration = d;
  }

  const bookings = await listBookingsByDate(date);
  const busyIntervals = bookings.map((b: any) => ({ start: timeToMinutes(b.startTime), end: timeToMinutes(b.endTime) }));

  const slots: { time: string; available: boolean }[] = [];
  for (let start = openMin; start + duration <= closeMin; start += NEUMARKT_CONFIG.slotIntervalMinutes) {
    const end = start + duration;
    const isBusy = busyIntervals.some(iv => overlaps(start, end, iv.start, iv.end));
    slots.push({ time: minutesToTime(start), available: !isBusy });
  }

  return NextResponse.json({ date, duration, slots });
}
