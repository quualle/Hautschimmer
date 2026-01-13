import { NextRequest, NextResponse } from 'next/server';
import {
  listAllAvailableSlots,
  listAvailableSlots,
  addAvailableSlot,
  deleteAvailableSlot,
} from '../../../../lib/storage/availableSlots';
import type { LocationId } from '../../../../src/data/locations';

export const runtime = 'nodejs';

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  return token === process.env.ADMIN_SESSION_TOKEN;
}

/**
 * GET /api/admin/available-slots
 * Liste alle freigegebenen Slots (optional gefiltert nach location)
 */
export async function GET(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') as LocationId | null;

    const slots = location
      ? listAvailableSlots(location)
      : listAllAvailableSlots();

    return NextResponse.json({ slots });
  } catch (e: any) {
    console.error('Admin available-slots GET error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/available-slots
 * Neuen Slot freigeben
 *
 * Body: { location: 'kw', date: 'YYYY-MM-DD', openTime: 'HH:MM', closeTime: 'HH:MM' }
 */
export async function POST(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { location, date, openTime, closeTime } = body;

    // Validierung
    if (!location || !['neumarkt', 'kw'].includes(location)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid date format (YYYY-MM-DD)' }, { status: 400 });
    }

    if (!openTime || !/^\d{2}:\d{2}$/.test(openTime)) {
      return NextResponse.json({ error: 'Invalid openTime format (HH:MM)' }, { status: 400 });
    }

    if (!closeTime || !/^\d{2}:\d{2}$/.test(closeTime)) {
      return NextResponse.json({ error: 'Invalid closeTime format (HH:MM)' }, { status: 400 });
    }

    // Prüfe dass closeTime > openTime
    if (closeTime <= openTime) {
      return NextResponse.json({ error: 'closeTime must be after openTime' }, { status: 400 });
    }

    // Prüfe dass Datum nicht in der Vergangenheit liegt
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return NextResponse.json({ error: 'Cannot add slots in the past' }, { status: 400 });
    }

    const slot = addAvailableSlot({
      location: location as LocationId,
      date,
      openTime,
      closeTime,
    });

    return NextResponse.json({ slot }, { status: 201 });
  } catch (e: any) {
    console.error('Admin available-slots POST error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/available-slots
 * Slot löschen
 *
 * Query: ?id=slot-xxxxx
 */
export async function DELETE(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing slot id' }, { status: 400 });
    }

    const deleted = deleteAvailableSlot(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Admin available-slots DELETE error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
