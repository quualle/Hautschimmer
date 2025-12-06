import { NextRequest, NextResponse } from 'next/server';
import { HAS_SUPABASE } from '@/lib/storage/env';
import { getAdminClient } from '@/lib/storage/supabaseClient';
import { updateBooking as updateFileBooking, deleteBooking as deleteFileBooking, timeToMinutes, minutesToTime, listBookingsByDate, overlaps } from '@/lib/storage/fileStore';

function unauthorized() { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token || token !== process.env.ADMIN_SESSION_TOKEN) return unauthorized();
    const body = await req.json();

    const { firstName, lastName, email, phone, smsOptIn, treatmentId, date, time, durationMinutes, status } = body || {};

    if (HAS_SUPABASE) {
      const supabase = getAdminClient();

      // Optional: conflict check when changing date/time
      if (date && time) {
        const start = timeToMinutes(time);
        const dur = typeof durationMinutes === 'number' ? durationMinutes : undefined;
        const { data: existing, error: errList } = await supabase
          .from('bookings')
          .select('id,start_time,end_time')
          .eq('date', date)
          .neq('id', id);
        if (!errList && existing) {
          const conflict = existing.some((b: any) => overlaps(start, (dur ? start + dur : timeToMinutes((b.end_time as string).slice(0,5))), timeToMinutes((b.start_time as string).slice(0,5)), timeToMinutes((b.end_time as string).slice(0,5))));
          if (conflict) return NextResponse.json({ error: 'Slot conflict' }, { status: 409 });
      }
      }

      const updates: any = {};
      if (firstName !== undefined) updates.first_name = firstName;
      if (lastName !== undefined) updates.last_name = lastName;
      if (email !== undefined) updates.email = email;
      if (phone !== undefined) updates.phone = phone;
      if (smsOptIn !== undefined) updates.sms_opt_in = !!smsOptIn;
      if (treatmentId !== undefined) updates.treatment_id = treatmentId;
      if (date !== undefined) updates.date = date;
      if (time !== undefined) updates.start_time = time + ':00';
      if (durationMinutes !== undefined) updates.duration_minutes = durationMinutes;
      if (status !== undefined) updates.status = status;
      if (updates.start_time && (durationMinutes || updates.duration_minutes)) {
        const st = timeToMinutes((updates.start_time as string).slice(0,5));
        const dur = updates.duration_minutes as number;
        updates.end_time = minutesToTime(st + dur) + ':00';
      }

      const { data, error } = await supabase.from('bookings').update(updates).eq('id', id).select('*').single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, booking: data });
    } else {
      // file mode
      let endTime: string | undefined;
      if (time && durationMinutes) {
        endTime = minutesToTime(timeToMinutes(time) + durationMinutes);
      }
      const updated = updateFileBooking(id, {
        firstName, lastName, email, phone, smsOptIn, treatmentId,
        date, startTime: time, endTime, durationMinutes, status
      } as any);
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true, booking: updated });
    }
  } catch (e: any) {
    console.error('Admin bookings PATCH error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token || token !== process.env.ADMIN_SESSION_TOKEN) return unauthorized();

    if (HAS_SUPABASE) {
      const supabase = getAdminClient();
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    } else {
      const ok = deleteFileBooking(id);
      if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ ok: true });
    }
  } catch (e: any) {
    console.error('Admin bookings DELETE error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
