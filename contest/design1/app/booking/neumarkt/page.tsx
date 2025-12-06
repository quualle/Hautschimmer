"use client";

import { useEffect, useMemo, useState } from 'react';
import { categories, TREATMENTS } from '@/src/data/treatments';
import { NEUMARKT_CONFIG } from '@/src/data/neumarkt-config';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slot = { time: string; available: boolean };

// Helper: Check if a day is a working day (Monday=1, Saturday=6)
function isWorkingDay(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  // Convert to ISO weekday: Monday=1, Saturday=6
  const isoDay = dayOfWeek === 0 ? 7 : dayOfWeek;
  return NEUMARKT_CONFIG.workingHours.some(w => w.day === isoDay);
}

// Helper: Get days in month
function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Helper: Get day name
function getDayName(date: Date): string {
  return date.toLocaleDateString('de-DE', { weekday: 'long' });
}

export default function NeumarktBookingPage() {
  const today = useMemo(() => new Date(), []);
  const startDate = useMemo(() => new Date(NEUMARKT_CONFIG.startDate), []);

  const [category, setCategory] = useState<typeof categories[number]['id']>('muskelrelaxans');
  const [treatmentId, setTreatmentId] = useState<string>(TREATMENTS.find(t => t.category === 'muskelrelaxans')!.id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const start = new Date(Math.max(today.getTime(), startDate.getTime()));
    return { year: start.getFullYear(), month: start.getMonth() };
  });
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | any>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync treatment when category changes
  useEffect(() => {
    const first = TREATMENTS.find(t => t.category === category);
    if (first) setTreatmentId(first.id);
  }, [category]);

  // Load slots when date changes
  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    async function loadSlots() {
      setLoadingSlots(true);
      setSelectedTime('');
      try {
        const dateStr = formatDateInput(selectedDate!);
        const r = await fetch(`/api/neumarkt/slots?date=${dateStr}&treatmentId=${treatmentId}`);
        const json = await r.json();
        setSlots(json.slots || []);
      } catch (e) {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [selectedDate, treatmentId]);

  const selectedTreatment = useMemo(() => TREATMENTS.find(t => t.id === treatmentId)!, [treatmentId]);

  const priceLabel = (t: { id: string; priceEUR: number; notes?: string }) => {
    if (t.notes === 'on_request' || t.priceEUR <= 0) return 'Preis nach Absprache';
    if (t.id === 'hy-standard-1ml') return `ab ${t.priceEUR} €/ml`;
    if (t.id === 'prp-2x') return `ab ${t.priceEUR} € (2 Termine)`;
    return `ab ${t.priceEUR} €`;
  };

  function normalizePhone(input: string) {
    if (!input) return '';
    let p = input.replace(/[^+0-9]/g, '');
    if (p.startsWith('00')) p = '+' + p.slice(2);
    if (p.startsWith('+')) return p;
    if (p.startsWith('0')) return '+49' + p.slice(1);
    return p.startsWith('+') ? p : '+' + p;
  }

  function validatePhone(input: string) {
    const p = normalizePhone(input);
    const digits = p.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  }

  async function submitBooking() {
    if (!selectedDate) return;
    setSubmitting(true);
    setError(null);
    try {
      if (!validatePhone(phone)) {
        setPhoneError('Bitte gültige Handynummer (z. B. +49 173 1234567)');
        setSubmitting(false);
        return;
      }
      setPhoneError(null);

      const res = await fetch('/api/neumarkt/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email,
          phone: normalizePhone(phone),
          smsOptIn, treatmentId,
          date: formatDateInput(selectedDate),
          time: selectedTime
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Buchung fehlgeschlagen');
      setSuccess(json.booking);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Calendar navigation
  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // Calendar data
  const daysInMonth = useMemo(() => getDaysInMonth(currentMonth.year, currentMonth.month), [currentMonth]);
  const firstDayOfMonth = useMemo(() => {
    const d = new Date(currentMonth.year, currentMonth.month, 1).getDay();
    return d === 0 ? 6 : d - 1; // Convert to Monday=0
  }, [currentMonth]);

  const monthName = useMemo(() => {
    return new Date(currentMonth.year, currentMonth.month).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  }, [currentMonth]);

  // Check if we can go to previous month
  const canGoPrev = useMemo(() => {
    const prevMonth = currentMonth.month === 0
      ? new Date(currentMonth.year - 1, 11, 1)
      : new Date(currentMonth.year, currentMonth.month - 1, 1);
    const minDate = new Date(Math.max(today.getTime(), startDate.getTime()));
    return prevMonth >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  }, [currentMonth, today, startDate]);

  if (success) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 py-16 pt-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Termin bestätigt</h1>
            <p className="text-gray-600 mb-6">Vielen Dank für Ihre Buchung in Neumarkt i.d.Opf.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Info label="Behandlung" value={success.treatmentName} />
              <Info label="Preis" value={
                (() => {
                  const bId = success.treatmentId as string | undefined;
                  if (bId === 'hy-standard-1ml') return `ab ${success.priceEUR} €/ml`;
                  if (bId === 'prp-2x') return `ab ${success.priceEUR} € (2 Termine)`;
                  return `ab ${success.priceEUR} €`;
                })()
              } />
              <Info label="Datum" value={new Date(`${success.date}T00:00:00`).toLocaleDateString('de-DE', { weekday:'long', day:'2-digit', month:'long', year:'numeric' })} />
              <Info label="Uhrzeit" value={`${success.startTime} – ${success.endTime} Uhr`} />
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => downloadICS(success)} className="px-4 py-2 rounded-xl text-white bg-gray-900 hover:bg-gray-800 shadow">
                In Kalender speichern (.ics)
              </button>
              <a className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700" href="/" aria-label="Zurück zur Website">Zurück zur Website</a>
            </div>

            <p className="text-sm text-gray-500 mt-6">Sie erhalten eine Bestätigung per E‑Mail{success.smsOptIn ? ' und SMS' : ''}. Eine Erinnerung wird automatisch einen Tag vorher versendet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-gray-100 py-12 pt-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm tracking-wide uppercase text-gray-500">Neumarkt i.d.Opf</p>
              <h1 className="text-4xl font-serif text-gray-900 mt-1">Termin buchen</h1>
              <p className="text-gray-600 mt-2">Wählen Sie Ihre Behandlung und einen verfügbaren Termin.</p>
            </div>
            <a href="/" className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 whitespace-nowrap" aria-label="Zurück zur Website">
              Zurück zur Website
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auswahl: Behandlung */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-serif text-xl text-gray-900 mb-3">1. Behandlung wählen</h2>
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      category === c.id
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {TREATMENTS.filter(t => t.category === category).map(t => (
                <label key={t.id} className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${treatmentId === t.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="treatment" className="accent-gray-900" checked={treatmentId === t.id} onChange={() => setTreatmentId(t.id)} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">ca. {t.durationMinutes} Min</div>
                  </div>
                  <div className="font-semibold text-gray-700 whitespace-nowrap">{priceLabel(t)}</div>
                </label>
              ))}
            </div>
          </section>

          {/* Auswahl: Datum & Zeit */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-serif text-xl text-gray-900 mb-3">2. Datum & Uhrzeit</h2>

            {/* Custom Calendar */}
            <div className="mb-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPrevMonth}
                  disabled={!canGoPrev}
                  className={`p-2 rounded-lg transition-colors ${canGoPrev ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-medium text-gray-900 capitalize">{monthName}</h3>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, i) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-medium py-2 ${
                      i === 0 || i === 5 ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Actual days */}
                {daysInMonth.map((day) => {
                  const isWorking = isWorkingDay(day);
                  const isPast = day < today || day < startDate;
                  const isSelected = selectedDate &&
                    day.getDate() === selectedDate.getDate() &&
                    day.getMonth() === selectedDate.getMonth() &&
                    day.getFullYear() === selectedDate.getFullYear();
                  const isToday = day.toDateString() === today.toDateString();

                  const canSelect = isWorking && !isPast;

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => canSelect && setSelectedDate(day)}
                      disabled={!canSelect}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all relative
                        ${isSelected
                          ? 'bg-gray-900 text-white shadow-md'
                          : canSelect
                            ? 'bg-emerald-50 text-gray-900 hover:bg-emerald-100 border-2 border-emerald-200'
                            : 'text-gray-300 cursor-not-allowed'
                        }
                        ${isToday && !isSelected ? 'ring-2 ring-gray-400 ring-offset-1' : ''}
                      `}
                      title={canSelect ? `${getDayName(day)} - Verfügbar` : isPast ? 'Vergangen' : 'Nicht verfügbar'}
                    >
                      {day.getDate()}
                      {canSelect && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-50 border-2 border-emerald-200" />
                  <span>Verfügbar (Mo & Sa)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-900" />
                  <span>Ausgewählt</span>
                </div>
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-900">
                    {selectedDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">Verfügbare Zeiten:</div>
                {loadingSlots ? (
                  <div className="text-sm text-gray-500">Lade verfügbare Zeiten…</div>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-auto pr-1">
                    {slots.length === 0 && <div className="text-sm text-gray-500">Keine Zeiten verfügbar</div>}
                    {slots.map(s => (
                      <button
                        key={s.time}
                        disabled={!s.available}
                        onClick={() => setSelectedTime(s.time)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                          !s.available
                            ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                            : selectedTime === s.time
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!selectedDate && (
              <div className="text-center py-6 text-gray-500">
                <p>Bitte wählen Sie einen grün markierten Tag aus.</p>
              </div>
            )}
          </section>

          {/* Kundendaten */}
          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-serif text-xl text-gray-900 mb-3">3. Ihre Angaben</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Vorname</label>
                <input className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nachname</label>
                <input className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">E‑Mail</label>
                <input type="email" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+49 173 1234567"
                  className={`w-full border rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${phoneError ? 'border-red-400' : 'border-gray-300'}`}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onBlur={() => {
                    if (validatePhone(phone)) {
                      setPhone(normalizePhone(phone));
                      setPhoneError(null);
                    } else if (phone) {
                      setPhoneError('Bitte gültige Handynummer (z. B. +49 173 1234567)');
                    }
                  }}
                />
                {phoneError && <p className="text-xs text-red-600 mt-1">{phoneError}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
              <input type="checkbox" className="accent-gray-900 w-4 h-4" checked={smsOptIn} onChange={e => setSmsOptIn(e.target.checked)} />
              Bestätigungs‑SMS erhalten + automatische Erinnerung einen Tag vorher
            </label>
            <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <input type="checkbox" className="accent-gray-900 w-4 h-4" checked={agree} onChange={e => setAgree(e.target.checked)} />
              Ich stimme der Verarbeitung meiner Daten zur Terminvereinbarung zu (DSGVO).
            </label>
            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            <button
              disabled={submitting || !agree || !selectedTime || !firstName || !lastName || !email || !phone || !selectedDate}
              onClick={submitBooking}
              className={`mt-4 w-full px-4 py-3 rounded-xl text-white font-medium shadow transition-colors ${
                submitting || !agree || !selectedTime || !firstName || !lastName || !email || !phone || !selectedDate
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {submitting ? 'Bucht…' : 'Termin verbindlich buchen'}
            </button>
            {(!agree || !selectedTime || !firstName || !lastName || !email || !phone || !selectedDate) && (
              <p className="text-xs text-gray-500 mt-2">Bitte füllen Sie alle Felder aus, wählen Sie Datum & Uhrzeit und bestätigen Sie die DSGVO‑Einwilligung.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function formatDateInput(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-gray-200 rounded-xl p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

function downloadICS(booking: any) {
  const ics = toICS(booking);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hautschimmer-${booking.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function toICS(booking: any) {
  const dtStart = toICSDateTime(booking.date, booking.startTime);
  const dtEnd = toICSDateTime(booking.date, booking.endTime);
  const uid = `hautschimmer-${booking.id}@neumarkt`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hautschimmer//Booking//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDateTimeStamp(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'SUMMARY:Behandlung – Hautschimmer Neumarkt',
    `DESCRIPTION:${escapeICS(`${booking.treatmentName} (Preis €${booking.priceEUR})`)}\\nKontakt: ${escapeICS(booking.email)} / ${escapeICS(booking.phone)}`,
    'LOCATION:Hautschimmer Neumarkt i.d.Opf',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return lines.join('\r\n');
}

function toICSDateTime(date: string, time: string): string {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, m] = time.split(':').map(Number);
  return `${Y}${String(M).padStart(2, '0')}${String(D).padStart(2, '0')}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00Z`;
}

function toICSDateTimeStamp(d: Date): string {
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, '0');
  const D = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return `${Y}${M}${D}T${h}${m}${s}Z`;
}

function escapeICS(input: string): string {
  return input.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
