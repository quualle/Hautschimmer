export type WorkingHours = {
  // ISO weekday numbers: 1 = Monday ... 7 = Sunday
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  // in HH:MM 24h local time (Europe/Berlin)
  open: string;
  close: string;
};

export type NeumarktConfig = {
  timezone: string;
  startDate: string; // YYYY-MM-DD
  slotIntervalMinutes: number; // granularity of time slots
  defaultDurationMinutes: number; // fallback when treatment not found
  workingHours: WorkingHours[]; // weekly schedule
  closedDates: string[]; // YYYY-MM-DD
};

export const NEUMARKT_CONFIG: NeumarktConfig = {
  timezone: 'Europe/Berlin',
  // Booking start as hinted in UI copy (adjust as needed)
  startDate: '2025-10-13',
  slotIntervalMinutes: 15,
  defaultDurationMinutes: 30,
  workingHours: [
    { day: 1, open: '10:00', close: '17:00' }, // Monday
    { day: 6, open: '10:00', close: '17:00' }, // Saturday
    // Other days: closed
  ],
  closedDates: [],
};
