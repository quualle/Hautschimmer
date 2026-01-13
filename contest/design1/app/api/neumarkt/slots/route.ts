import { NextRequest, NextResponse } from 'next/server';
import { listBookingsByDate } from '../../../../lib/storage';
import { overlaps, timeToMinutes, minutesToTime } from '../../../../lib/storage/fileStore';
import { NEUMARKT_CONFIG } from '../../../../src/data/neumarkt-config';
import { getWorkingWindowForDate } from '../../../../lib/storage/fileStore';
import { getTreatmentById } from '../../../../src/data/treatments';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const treatmentId = searchParams.get('treatmentId');
    const durationParam = searchParams.get('duration');

    if (!date) {
      return NextResponse.json({ error: 'Missing date' }, { status: 400 });
    }

    // Use midday to avoid timezone edge cases during day-of-week calculation on server
    const requested = new Date(date + 'T12:00:00');

    // Enforce start date & closed dates
    if (date < NEUMARKT_CONFIG.startDate || NEUMARKT_CONFIG.closedDates.includes(date)) {
      return NextResponse.json({ date, slots: [], reason: 'closed_by_policy' });
    }

    const window = getWorkingWindowForDate(requested);
    if (!window) {
      return NextResponse.json({ date, slots: [], reason: 'no_working_window' });
    }

    const openMin = timeToMinutes(window.open);
    const closeMin = timeToMinutes(window.close);

    let duration = NEUMARKT_CONFIG.defaultDurationMinutes;
    if (treatmentId) {
      const t = getTreatmentById(treatmentId);
      if (t && Number.isFinite(t.durationMinutes)) duration = t.durationMinutes;
    } else if (durationParam) {
      const d = parseInt(durationParam, 10);
      if (!Number.isNaN(d) && d > 0) duration = d;
    }

    const bookings = await listBookingsByDate(date, 'neumarkt');
    const busyIntervals: { start: number; end: number }[] = (bookings || [])
      .filter((b: any) => typeof b?.startTime === 'string' && typeof b?.endTime === 'string')
      .map((b: any) => ({
        start: timeToMinutes(b.startTime),
        end: timeToMinutes(b.endTime) + NEUMARKT_CONFIG.bufferMinutes,
      }));

    const slots: { time: string; available: boolean }[] = [];
    for (let start = openMin; start + duration <= closeMin; start += NEUMARKT_CONFIG.slotIntervalMinutes) {
      const end = start + duration;
      const isBusy = busyIntervals.some((iv: { start: number; end: number }) =>
        overlaps(start, end + NEUMARKT_CONFIG.bufferMinutes, iv.start, iv.end)
      );
      slots.push({ time: minutesToTime(start), available: !isBusy });
    }

    return NextResponse.json({ date, duration, slots });
  } catch (e: any) {
    console.error('Slots API error', e);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
export const runtime = 'nodejs';
