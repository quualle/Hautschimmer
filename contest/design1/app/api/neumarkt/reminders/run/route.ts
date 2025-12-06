import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { renderReminderSms } from '../../../../../lib/notifications/sms';
import { writeOutboxSms } from '../../../../../lib/storage/fileStore';
import { sendSmsOrOutbox } from '../../../../../lib/notifications/smsSender';
import { HAS_SUPABASE } from '../../../../../lib/storage/env';
import { getAdminClient } from '../../../../../lib/storage/supabaseClient';

const bookingsFile = path.join(process.cwd(), 'data', 'neumarkt-bookings.json');

export async function POST() {
  try {
    if (HAS_SUPABASE) {
      const supabase = getAdminClient();
      const nowISO = new Date().toISOString();
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'confirmed')
        .eq('sms_opt_in', true)
        .eq('sms_reminder_sent', false)
        .lte('remind_at', nowISO);
      if (error) throw error;

      let processed = 0;
      for (const b of data || []) {
          const sms = renderReminderSms({
            id: b.id,
          location: 'neumarkt',
          firstName: b.first_name,
          lastName: b.last_name,
          email: b.email,
          phone: b.phone,
          smsOptIn: b.sms_opt_in,
          treatmentId: b.treatment_id,
          treatmentName: '',
          priceEUR: Number(b.price_eur),
          date: b.date,
          startTime: (b.start_time as string).slice(0,5),
          endTime: (b.end_time as string).slice(0,5),
          durationMinutes: b.duration_minutes,
          status: b.status,
          createdAt: b.created_at,
          remindAtISO: b.remind_at,
          smsReminderSent: b.sms_reminder_sent,
        } as any);
        await sendSmsOrOutbox(b.id, 'reminder', b.phone, sms);
        processed += 1;
      }
      if ((data || []).length > 0) {
        const ids = (data || []).map((b: any) => b.id);
        const { error: updErr } = await supabase.from('bookings').update({ sms_reminder_sent: true }).in('id', ids);
        if (updErr) throw updErr;
      }
      return NextResponse.json({ ok: true, processed });
    } else {
      if (!fs.existsSync(bookingsFile)) {
        return NextResponse.json({ ok: true, processed: 0 });
      }
      const data = JSON.parse(fs.readFileSync(bookingsFile, 'utf8')) as { bookings: any[] };
      const now = new Date();
      let processed = 0;
      const updated = await Promise.all(data.bookings.map(async b => {
        if (b.status === 'confirmed' && b.smsOptIn && !b.smsReminderSent && b.remindAtISO) {
          const due = new Date(b.remindAtISO);
          if (due <= now) {
            const sms = renderReminderSms(b);
            await sendSmsOrOutbox(b.id, 'reminder', b.phone, sms);
            processed += 1;
            return { ...b, smsReminderSent: true };
          }
        }
        return b;
      }));
      fs.writeFileSync(bookingsFile, JSON.stringify({ bookings: updated }, null, 2), 'utf8');
      return NextResponse.json({ ok: true, processed });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
