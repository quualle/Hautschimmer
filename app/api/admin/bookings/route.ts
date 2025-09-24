import { NextRequest, NextResponse } from 'next/server';
import { HAS_SUPABASE } from '../../../../lib/storage/env';
import { getAdminClient } from '../../../../lib/storage/supabaseClient';
import { listAllBookings as listAllFromFile } from '../../../../lib/storage/fileStore';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token || token !== process.env.ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (HAS_SUPABASE) {
      try {
        const supabase = getAdminClient();
        const { data, error } = await supabase
          .from('bookings')
          .select('id, location, first_name, last_name, email, phone, sms_opt_in, treatment_id, price_eur, date, start_time, end_time, duration_minutes, status, created_at')
          .order('date', { ascending: true })
          .order('start_time', { ascending: true });
        if (!error) {
          return NextResponse.json({ bookings: data || [] });
        }
        console.warn('Supabase bookings fetch failed, falling back to file store:', error?.message);
      } catch (e: any) {
        console.warn('Supabase admin GET error, fallback to file:', e?.message);
      }
    }

    const bookings = (listAllFromFile() || []).map((b: any) => ({
        id: b.id,
        location: b.location,
        first_name: b.firstName,
        last_name: b.lastName,
        email: b.email,
        phone: b.phone,
        sms_opt_in: b.smsOptIn,
        treatment_id: b.treatmentId,
        price_eur: b.priceEUR,
        date: b.date,
        start_time: (b.startTime || '').length === 5 ? b.startTime + ':00' : b.startTime,
        end_time: (b.endTime || '').length === 5 ? b.endTime + ':00' : b.endTime,
        duration_minutes: b.durationMinutes,
        status: b.status,
        created_at: b.createdAt,
    }));
    return NextResponse.json({ bookings });
  } catch (e: any) {
    console.error('Admin bookings GET error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
