import { NextRequest, NextResponse } from 'next/server';
import { listBookingsByDate } from '../../../../lib/storage';
import { getAvailableSlotForDate } from '../../../../lib/storage/availableSlots';
import { overlaps, timeToMinutes, minutesToTime } from '../../../../lib/storage/fileStore';
import { LOCATIONS } from '../../../../src/data/locations';
import { getTreatmentById } from '../../../../src/data/treatments';

const config = LOCATIONS.kw;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const treatmentId = searchParams.get('treatmentId');
    const durationParam = searchParams.get('duration');

    if (!date) {
      return NextResponse.json({ error: 'Missing date' }, { status: 400 });
    }

    // Prüfe ob das Datum freigegeben ist
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

    // Behandlungsdauer ermitteln
    let duration = config.defaultDurationMinutes;
    if (treatmentId) {
      const t = getTreatmentById(treatmentId);
      if (t && Number.isFinite(t.durationMinutes)) duration = t.durationMinutes;
    } else if (durationParam) {
      const d = parseInt(durationParam, 10);
      if (!Number.isNaN(d) && d > 0) duration = d;
    }

    // Bestehende Buchungen für diesen Tag laden (nur KW)
    const bookings = await listBookingsByDate(date, 'kw');
    const busyIntervals: { start: number; end: number }[] = (bookings || [])
      .filter((b: any) => typeof b?.startTime === 'string' && typeof b?.endTime === 'string')
      .map((b: any) => ({
        // Mit Puffer: Termin blockiert bis endTime + bufferMinutes
        start: timeToMinutes(b.startTime),
        end: timeToMinutes(b.endTime) + config.bufferMinutes,
      }));

    // Aktuelle Zeit für Vorlaufzeit-Prüfung
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    // Slots generieren
    const slots: { time: string; available: boolean; tooShortNotice?: boolean }[] = [];

    for (let start = openMin; start + duration <= closeMin; start += config.slotIntervalMinutes) {
      const end = start + duration;

      // Prüfe Überschneidung mit bestehenden Buchungen (inkl. Puffer)
      const isBusy = busyIntervals.some((iv) => overlaps(start, end + config.bufferMinutes, iv.start, iv.end));

      // Prüfe Vorlaufzeit (nur für heute)
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

    // Wenn alle Slots wegen Vorlaufzeit nicht verfügbar sind, Telefon-Hinweis
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
