import { NextRequest, NextResponse } from 'next/server';
import { listAvailableDates, listAvailableSlots } from '@/lib/storage/availableSlots';

export async function GET(req: NextRequest) {
  try {
    const dates = listAvailableDates('kw');
    const slots = listAvailableSlots('kw');

    const today = new Date().toISOString().split('T')[0];
    const futureSlots = slots.filter((s) => s.date >= today);

    return NextResponse.json({
      dates,
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
