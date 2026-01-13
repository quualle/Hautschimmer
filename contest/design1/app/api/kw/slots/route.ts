import { NextRequest, NextResponse } from 'next/server';
import { listBookingsByDate } from '@/lib/storage';
import { getAvailableSlotForDate } from '@/lib/storage/availableSlots';
import { overlaps, timeToMinutes, minutesToTime } from '@/lib/storage/fileStore';
import { LOCATIONS } from '@/src/data/locations';
import { getTreatmentById } from '@/src/data/treatments';

const config = LOCATIONS.kw;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const treatmentId = searchParams.get('treatmentId');
    const durationParam = searchParams.get('duration');

    if (!date) {
      return NextResponse.json({ error: 'Missing date' }, { status: 400 });
    }

    const availableSlot = getAvailableSlotForDate('kw', date);
    if (!availableSlot) {
      return NextResponse.json({
        date,
        slots: [],
        reason: 'date_not_available',
        message: 'Dieser Tag ist nicht für Buchungen freigegeben.',
      });
    }

    const openMin = timeToMinutes(availableSlot.openTime);
    const closeMin = timeToMinutes(availableSlot.closeTime);

    let duration = config.defaultDurationMinutes;
    if (treatmentId) {
      const t = getTreatmentById(treatmentId);
      if (t && Number.isFinite(t.durationMinutes)) duration = t.durationMinutes;
    } else if (durationParam) {
      const d = parseInt(durationParam, 10);
      if (!Number.isNaN(d) && d > 0) duration = d;
    }

    const bookings = await listBookingsByDate(date, 'kw');
    const busyIntervals: { start: number; end: number }[] = (bookings || [])
      .filter((b: any) => typeof b?.startTime === 'string' && typeof b?.endTime === 'string')
      .map((b: any) => ({
        start: timeToMinutes(b.startTime),
        end: timeToMinutes(b.endTime) + config.bufferMinutes,
      }));

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const slots: { time: string; available: boolean; tooShortNotice?: boolean }[] = [];

    for (let start = openMin; start + duration <= closeMin; start += config.slotIntervalMinutes) {
      const end = start + duration;
      const isBusy = busyIntervals.some((iv) => overlaps(start, end + config.bufferMinutes, iv.start, iv.end));

      let tooShortNotice = false;
      if (date === todayStr) {
        const minBookingTime = nowMinutes + config.minLeadTimeMinutes;
        if (start < minBookingTime) {
          tooShortNotice = true;
        }
      }

      slots.push({
        time: minutesToTime(start),
        available: !isBusy && !tooShortNotice,
        ...(tooShortNotice && { tooShortNotice: true }),
      });
    }

    const allTooShort = slots.length > 0 && slots.every((s) => s.tooShortNotice);

    return NextResponse.json({
      date,
      duration,
      slots,
      openTime: availableSlot.openTime,
      closeTime: availableSlot.closeTime,
      ...(allTooShort && {
        shortNoticeInfo: {
          message: 'Für kurzfristige Terminanfragen kontaktieren Sie uns bitte telefonisch.',
          phone: config.emergencyPhone,
        },
      }),
    });
  } catch (e: any) {
    console.error('KW Slots API error', e);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
