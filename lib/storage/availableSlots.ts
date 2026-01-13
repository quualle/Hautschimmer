/**
 * Storage-Modul für dynamische Slot-Freigabe (KW-Standort)
 *
 * Speichert freigegebene Tage/Zeitfenster, in denen Buchungen möglich sind.
 * Im Gegensatz zu Neumarkt (feste Wochentage) werden hier Slots manuell
 * durch den Admin freigegeben.
 */

import fs from 'fs';
import path from 'path';
import type { LocationId } from '../../src/data/locations';

export type AvailableSlot = {
  id: string;
  location: LocationId;
  date: string;          // YYYY-MM-DD
  openTime: string;      // HH:MM
  closeTime: string;     // HH:MM
  createdAt: string;     // ISO timestamp
};

type AvailableSlotsFile = {
  slots: AvailableSlot[];
};

const dataDir = path.join(process.cwd(), 'data');
const slotsFile = path.join(dataDir, 'available-slots.json');

function ensureDir() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(slotsFile)) {
      const initial: AvailableSlotsFile = { slots: [] };
      fs.writeFileSync(slotsFile, JSON.stringify(initial, null, 2), 'utf8');
    }
  } catch {
    // Ignore on read-only FS (Netlify)
  }
}

function readAll(): AvailableSlotsFile {
  try {
    const raw = fs.readFileSync(slotsFile, 'utf8');
    return JSON.parse(raw) as AvailableSlotsFile;
  } catch {
    return { slots: [] };
  }
}

function writeAll(data: AvailableSlotsFile) {
  try {
    ensureDir();
    fs.writeFileSync(slotsFile, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // Ignore on read-only FS (Netlify)
  }
}

function generateId(): string {
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 8);
  return `slot-${y}${m}${d}-${rand}`;
}

/**
 * Liste alle freigegebenen Slots für einen Standort
 */
export function listAvailableSlots(location: LocationId): AvailableSlot[] {
  const { slots } = readAll();
  return slots
    .filter(s => s.location === location)
    .sort((a, b) => a.date.localeCompare(b.date) || a.openTime.localeCompare(b.openTime));
}

/**
 * Liste alle freigegebenen Slots (alle Standorte)
 */
export function listAllAvailableSlots(): AvailableSlot[] {
  const { slots } = readAll();
  return slots.sort((a, b) =>
    a.location.localeCompare(b.location) ||
    a.date.localeCompare(b.date) ||
    a.openTime.localeCompare(b.openTime)
  );
}

/**
 * Hole den freigegebenen Slot für ein bestimmtes Datum und Standort
 */
export function getAvailableSlotForDate(location: LocationId, date: string): AvailableSlot | null {
  const { slots } = readAll();
  return slots.find(s => s.location === location && s.date === date) || null;
}

/**
 * Prüfe ob ein Datum für einen Standort freigegeben ist
 */
export function isDateAvailable(location: LocationId, date: string): boolean {
  return getAvailableSlotForDate(location, date) !== null;
}

/**
 * Liste alle freigegebenen Daten für einen Standort (für Kalender-UI)
 */
export function listAvailableDates(location: LocationId): string[] {
  const slots = listAvailableSlots(location);
  const today = new Date().toISOString().split('T')[0];
  return slots
    .filter(s => s.date >= today)
    .map(s => s.date);
}

/**
 * Füge einen neuen freigegebenen Slot hinzu
 */
export function addAvailableSlot(input: {
  location: LocationId;
  date: string;
  openTime: string;
  closeTime: string;
}): AvailableSlot {
  const data = readAll();

  // Prüfe ob bereits ein Slot für dieses Datum existiert
  const existingIdx = data.slots.findIndex(
    s => s.location === input.location && s.date === input.date
  );

  const slot: AvailableSlot = {
    id: generateId(),
    location: input.location,
    date: input.date,
    openTime: input.openTime,
    closeTime: input.closeTime,
    createdAt: new Date().toISOString(),
  };

  if (existingIdx !== -1) {
    // Überschreibe existierenden Slot für dieses Datum
    slot.id = data.slots[existingIdx].id; // Behalte alte ID
    data.slots[existingIdx] = slot;
  } else {
    data.slots.push(slot);
  }

  writeAll(data);
  return slot;
}

/**
 * Lösche einen freigegebenen Slot
 */
export function deleteAvailableSlot(id: string): boolean {
  const data = readAll();
  const next = data.slots.filter(s => s.id !== id);
  if (next.length === data.slots.length) return false;
  writeAll({ slots: next });
  return true;
}

/**
 * Lösche alle vergangenen Slots (Cleanup)
 */
export function cleanupPastSlots(): number {
  const data = readAll();
  const today = new Date().toISOString().split('T')[0];
  const future = data.slots.filter(s => s.date >= today);
  const removed = data.slots.length - future.length;
  if (removed > 0) {
    writeAll({ slots: future });
  }
  return removed;
}
