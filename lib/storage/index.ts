import { HAS_SUPABASE } from './env';
import * as file from './fileStore';
import * as sbase from './supabaseStore';
import type { Booking as FileBooking } from './fileStore';

// Re-export available slots functions
export * from './availableSlots';

// Re-export types
export type { Booking } from './fileStore';
export type { AvailableSlot } from './availableSlots';

export async function listBookingsByDate(date: string, location?: 'neumarkt' | 'kw') {
  try {
    if (HAS_SUPABASE) {
      try {
        // TODO: Add location filter to Supabase query when needed
        return await sbase.listBookingsByDate(date);
      } catch {
        // Fallback silently to empty list if DB not reachable in serverless preview
        return [] as any;
      }
    }
    const list = file.listBookingsByDate(date, location) || [];
    return list.map(b => ({ startTime: b.startTime, endTime: b.endTime }));
  } catch {
    return [] as any;
  }
}

export async function listBookingsByLocation(location: 'neumarkt' | 'kw'): Promise<FileBooking[]> {
  try {
    if (HAS_SUPABASE) {
      // TODO: Add Supabase implementation when needed
      return file.listBookingsByLocation(location);
    }
    return file.listBookingsByLocation(location);
  } catch {
    return [];
  }
}

export async function addBooking(input: {
  location?: 'neumarkt' | 'kw';
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
  const location = input.location || 'neumarkt';

  if (HAS_SUPABASE) {
    try {
      return await sbase.addBooking({
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
    } catch {
      // fallthrough to file fallback (may be no-op on read-only FS but avoids 500)
    }
  }

  const booking = file.addBooking({
    location,
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
