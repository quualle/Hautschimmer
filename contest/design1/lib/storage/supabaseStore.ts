import { getAdminClient } from './supabaseClient';
import { TREATMENTS, getTreatmentById } from '@/src/data/treatments';
import type { Booking as FileBooking } from './fileStore';

export type BookingRow = {
  id: string;
  location: 'neumarkt';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  sms_opt_in: boolean;
  treatment_id: string;
  price_eur: number;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
  duration_minutes: number;
  status: 'confirmed' | 'cancelled';
  created_at: string;
  remind_at: string | null;
  sms_reminder_sent: boolean;
};

export async function listBookingsByDate(date: string) {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('start_time,end_time,status')
    .eq('date', date)
    .neq('status', 'cancelled');
  if (error) throw error;
  return (data || []).map((r: any) => ({
    startTime: (r.start_time as string).slice(0,5),
    endTime: (r.end_time as string).slice(0,5),
  }));
}

export async function addBooking(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsOptIn: boolean;
  treatmentId: string;
  date: string;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  durationMinutes: number;
  remindAtISO?: string;
}): Promise<FileBooking> {
  const supabase = getAdminClient();
  const t = getTreatmentById(input.treatmentId);
  const price = t?.priceEUR ?? 0;
  const payload = {
    location: 'neumarkt' as const,
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone,
    sms_opt_in: input.smsOptIn,
    treatment_id: input.treatmentId,
    price_eur: price,
    date: input.date,
    start_time: input.startTime + ':00',
    end_time: input.endTime + ':00',
    duration_minutes: input.durationMinutes,
    status: 'confirmed' as const,
    remind_at: input.remindAtISO || null,
  };
  const { data, error } = await supabase.from('bookings').insert(payload).select('*').single();
  if (error) throw error;
  return {
    id: data.id,
    location: 'neumarkt',
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone,
    smsOptIn: data.sms_opt_in,
    treatmentId: data.treatment_id,
    treatmentName: t?.name ?? 'Behandlung',
    priceEUR: Number(data.price_eur),
    date: data.date,
    startTime: (data.start_time as string).slice(0,5),
    endTime: (data.end_time as string).slice(0,5),
    durationMinutes: data.duration_minutes,
    status: data.status,
    createdAt: data.created_at,
    remindAtISO: data.remind_at,
    smsReminderSent: data.sms_reminder_sent,
  };
}
