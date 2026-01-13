import { NextRequest, NextResponse } from 'next/server';
import { listAvailableDates, listAvailableSlots } from '../../../../lib/storage/availableSlots';

/**
 * GET /api/kw/available-dates
 *
 * Gibt alle freigegebenen Daten für KW zurück (nur zukünftige).
 * Wird für die Kalender-Anzeige in der Buchungsseite verwendet.
 */
export async function GET(req: NextRequest) {
  try {
    const dates = listAvailableDates('kw');
    const slots = listAvailableSlots('kw');

    // Nur zukünftige Slots
    const today = new Date().toISOString().split('T')[0];
    const futureSlots = slots.filter((s) => s.date >= today);

    return NextResponse.json({
      dates,
      // Detaillierte Info pro Datum (für UI)
      details: futureSlots.map((s) => ({
        date: s.date,
        openTime: s.openTime,
        closeTime: s.closeTime,
      })),
    });
  } catch (e: any) {
    console.error('KW available-dates API error', e);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
