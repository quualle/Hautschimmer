import fs from 'fs';
import path from 'path';
import { NEUMARKT_CONFIG } from '../../src/data/neumarkt-config';
import { TREATMENTS, getTreatmentById } from '../../src/data/treatments';

export type Booking = {
  id: string;
  location: 'neumarkt';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsOptIn: boolean;
  treatmentId: string;
  treatmentName: string;
  priceEUR: number;
  date: string; // YYYY-MM-DD local
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  durationMinutes: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string; // ISO
  remindAtISO?: string; // appointment - 24h
  smsReminderSent?: boolean;
};

type BookingsFile = {
  bookings: Booking[];
};

const dataDir = path.join(process.cwd(), 'data');
const outboxDir = path.join(dataDir, 'outbox');
const emailsDir = path.join(outboxDir, 'emails');
const smsDir = path.join(outboxDir, 'sms');
const bookingsFile = path.join(dataDir, 'neumarkt-bookings.json');

function ensureDirs() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  if (!fs.existsSync(outboxDir)) fs.mkdirSync(outboxDir);
  if (!fs.existsSync(emailsDir)) fs.mkdirSync(emailsDir);
  if (!fs.existsSync(smsDir)) fs.mkdirSync(smsDir);
  if (!fs.existsSync(bookingsFile)) {
    const initial: BookingsFile = { bookings: [] };
    fs.writeFileSync(bookingsFile, JSON.stringify(initial, null, 2), 'utf8');
  }
}

function readAll(): BookingsFile {
  ensureDirs();
  const raw = fs.readFileSync(bookingsFile, 'utf8');
  try {
    return JSON.parse(raw) as BookingsFile;
  } catch {
    return { bookings: [] };
  }
}

function writeAll(data: BookingsFile) {
  ensureDirs();
  fs.writeFileSync(bookingsFile, JSON.stringify(data, null, 2), 'utf8');
}

export function listBookingsByDate(date: string): Booking[] {
  const { bookings } = readAll();
  return bookings.filter(b => b.date === date && b.status !== 'cancelled');
}

export function listAllBookings(): Booking[] {
  const { bookings } = readAll();
  return bookings;
}

export function generateId(): string {
  // Simple unique id: yyyymmdd-hhmm-<rand>
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 8);
  return `${y}${m}${d}-${hh}${mm}-${rand}`;
}

export function addBooking(input: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
  const data = readAll();
  const id = generateId();
  const createdAt = new Date().toISOString();
  const booking: Booking = { ...input, id, status: 'confirmed', createdAt };
  data.bookings.push(booking);
  writeAll(data);
  return booking;
}

export function cancelBooking(id: string): boolean {
  const data = readAll();
  const idx = data.bookings.findIndex(b => b.id === id);
  if (idx === -1) return false;
  data.bookings[idx].status = 'cancelled';
  writeAll(data);
  return true;
}

export function updateBooking(id: string, fields: Partial<Omit<Booking, 'id' | 'createdAt'>>): Booking | null {
  const data = readAll();
  const idx = data.bookings.findIndex(b => b.id === id);
  if (idx === -1) return null;
  const current = data.bookings[idx];
  const updated = { ...current, ...fields } as Booking;
  data.bookings[idx] = updated;
  writeAll(data);
  return updated;
}

export function deleteBooking(id: string): boolean {
  const data = readAll();
  const next = data.bookings.filter(b => b.id !== id);
  if (next.length === data.bookings.length) return false;
  writeAll({ bookings: next });
  return true;
}

export function listTreatments() {
  return TREATMENTS;
}

export function getWorkingWindowForDate(date: Date) {
  const weekdayISO = ((date.getUTCDay() + 6) % 7) + 1; // Use UTC to avoid TZ drift in serverless
  const configDay = NEUMARKT_CONFIG.workingHours.find(w => w.day === (weekdayISO as any));
  if (!configDay) return null;
  return { open: configDay.open, close: configDay.close };
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(m: number): string {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function computeRemindAtISO(date: string, startTime: string): string {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, m] = startTime.split(':').map(Number);
  const dt = new Date(Y, (M - 1), D, h, m);
  dt.setDate(dt.getDate() - 1);
  return dt.toISOString();
}

export function getTreatmentDurationMinutes(treatmentId: string): number {
  const t = getTreatmentById(treatmentId);
  return t?.durationMinutes ?? NEUMARKT_CONFIG.defaultDurationMinutes;
}

export function writeOutboxEmail(bookingId: string, html: string) {
  ensureDirs();
  fs.writeFileSync(path.join(emailsDir, `${bookingId}.html`), html, 'utf8');
}

export function writeOutboxSms(bookingId: string, kind: 'confirm' | 'reminder', text: string) {
  ensureDirs();
  fs.writeFileSync(path.join(smsDir, `${bookingId}-${kind}.txt`), text, 'utf8');
}
