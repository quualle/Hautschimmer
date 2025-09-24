import { HAS_SUPABASE } from './env';
import * as file from './fileStore';
import * as sbase from './supabaseStore';

export async function listBookingsByDate(date: string) {
  if (HAS_SUPABASE) return sbase.listBookingsByDate(date);
  return file.listBookingsByDate(date).map(b => ({ startTime: b.startTime, endTime: b.endTime }));
}

export async function addBooking(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsOptIn: boolean;
  treatmentId: string;
  date: string;
  time: string;
  endTime: string;
  durationMinutes: number;
  remindAtISO?: string;
}) {
  if (HAS_SUPABASE) {
    return sbase.addBooking({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      smsOptIn: input.smsOptIn,
      treatmentId: input.treatmentId,
      date: input.date,
      startTime: input.time,
      endTime: input.endTime,
      durationMinutes: input.durationMinutes,
      remindAtISO: input.remindAtISO,
    });
  }
  const booking = file.addBooking({
    location: 'neumarkt',
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    smsOptIn: input.smsOptIn,
    treatmentId: input.treatmentId,
    treatmentName: '',
    priceEUR: 0,
    date: input.date,
    startTime: input.time,
    endTime: input.endTime,
    durationMinutes: input.durationMinutes,
    remindAtISO: input.remindAtISO,
  });
  return booking;
}

