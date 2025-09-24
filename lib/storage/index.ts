import { HAS_SUPABASE } from './env';
import * as file from './fileStore';
import * as sbase from './supabaseStore';
import type { Booking as FileBooking } from './fileStore';

export async function listBookingsByDate(date: string) {
  try {
    if (HAS_SUPABASE) {
      try {
        return await sbase.listBookingsByDate(date);
      } catch {
        // Fallback silently to empty list if DB not reachable in serverless preview
        return [] as any;
      }
    }
    const list = file.listBookingsByDate(date) || [];
    return list.map(b => ({ startTime: b.startTime, endTime: b.endTime }));
  } catch {
    return [] as any;
  }
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
}): Promise<FileBooking> {
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
    treatmentName: ((): string => {
      try {
        const { getTreatmentById } = require('../../src/data/treatments');
        return getTreatmentById(input.treatmentId)?.name || 'Behandlung';
      } catch { return 'Behandlung'; }
    })(),
    priceEUR: ((): number => {
      try {
        const { getTreatmentById } = require('../../src/data/treatments');
        const t = getTreatmentById(input.treatmentId);
        return t?.priceEUR || 0;
      } catch { return 0; }
    })(),
    date: input.date,
    startTime: input.time,
    endTime: input.endTime,
    durationMinutes: input.durationMinutes,
    remindAtISO: input.remindAtISO,
  });
  return booking;
}
