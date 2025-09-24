"use client";

import { useEffect, useMemo, useState } from 'react';
import { categories, TREATMENTS } from '../../../src/data/treatments';
import { NEUMARKT_CONFIG } from '../../../src/data/neumarkt-config';

type Slot = { time: string; available: boolean };

export default function NeumarktBookingPage() {
  const today = useMemo(() => new Date(), []);
  const [category, setCategory] = useState<typeof categories[number]['id']>('muskelrelaxans');
  const [treatmentId, setTreatmentId] = useState<string>(TREATMENTS.find(t => t.category === 'muskelrelaxans')!.id);
  const [date, setDate] = useState<string>(() => {
    const d = new Date(Math.max(today.getTime(), new Date(NEUMARKT_CONFIG.startDate).getTime()));
    return formatDateInput(d);
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

  useEffect(() => {
    async function loadSlots() {
      setLoadingSlots(true);
      setSelectedTime('');
      try {
        const r = await fetch(`/api/neumarkt/slots?date=${date}&treatmentId=${treatmentId}`);
        const json = await r.json();
        setSlots(json.slots || []);
      } catch (e) {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [date, treatmentId]);

  const selectedTreatment = useMemo(() => TREATMENTS.find(t => t.id === treatmentId)!, [treatmentId]);

  const abIds = useMemo(() => new Set([
    'hy-lippen','hy-nasolabial','hy-jawline','hy-wangen','hy-kinn','hy-liquid-lift'
  ]), []);

  const priceLabel = (t: { id: string; priceEUR: number; notes?: string }) => {
    if (t.notes === 'on_request' || t.priceEUR <= 0) return 'Preis nach Absprache';
    if (t.id === 'hy-standard-1ml') return `ab € ${t.priceEUR} / ml`;
    if (t.id === 'prp-2x') return `ab € ${t.priceEUR} [zwei Termine]`;
    return `ab € ${t.priceEUR}`;
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
    // rudimentary E.164 length check (7–15 digits ignoring '+')
    const digits = p.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  }

  async function submitBooking() {
    setSubmitting(true);
    setError(null);
    try {
      // validate phone
      if (!validatePhone(phone)) {
        setPhoneError('Bitte gültige Handynummer (z. B. +49 173 1234567)');
        setSubmitting(false);
        return;
      }
      setPhoneError(null);

      const res = await fetch('/api/neumarkt/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone: normalizePhone(phone), smsOptIn, treatmentId, date, time: selectedTime })
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

  if (success) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-b from-[#F7FAFC] to-[#EDF2F7] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl p-8">
            <h1 className="text-3xl font-serif text-primary mb-2">Termin bestätigt</h1>
            <p className="text-primary/70 mb-6">Vielen Dank für Ihre Buchung in Neumarkt i.d.Opf.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Info label="Behandlung" value={success.treatmentName} />
              <Info label="Preis" value={
                (() => {
                  const bId = success.treatmentId as string | undefined;
                  if (bId === 'hy-standard-1ml') return `ab € ${success.priceEUR} / ml`;
                  if (bId === 'prp-2x') return `ab € ${success.priceEUR} [zwei Termine]`;
                  return `ab € ${success.priceEUR}`;
                })()
              } />
              <Info label="Datum" value={new Date(`${success.date}T00:00:00`).toLocaleDateString('de-DE', { weekday:'long', day:'2-digit', month:'long', year:'numeric' })} />
              <Info label="Uhrzeit" value={`${success.startTime} – ${success.endTime} Uhr`} />
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => downloadICS(success)} className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-secondary to-secondary/90 shadow">
                In Kalender speichern (.ics)
              </button>
              <a className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50" href="/" aria-label="Zurück zur Website">Zurück zur Website</a>
            </div>

            <p className="text-sm text-primary/70 mt-6">Sie erhalten eine Bestätigung per E‑Mail{success.smsOptIn ? ' und SMS' : ''}. Eine Erinnerung wird automatisch einen Tag vorher versendet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#F7FAFC] to-[#EDF2F7] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm tracking-wide uppercase text-secondary">Neumarkt i.d.Opf</p>
              <h1 className="text-4xl font-serif text-primary mt-1">Termin buchen</h1>
              <p className="text-primary/70 mt-2">Wählen Sie Ihre Behandlung, ein Datum und eine passende Uhrzeit. Bereits belegte Zeiten sind gekennzeichnet.</p>
            </div>
            <a href="/" className="inline-flex items-center px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-primary whitespace-nowrap" aria-label="Zurück zur Website">
              Zurück zur Website
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auswahl: Behandlung */}
          <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5">
            <h2 className="font-serif text-xl text-primary mb-3">Behandlung</h2>
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      category === c.id
                        ? 'bg-secondary text-white border-secondary'
                        : 'border-gray-300 text-primary hover:bg-gray-50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {TREATMENTS.filter(t => t.category === category).map(t => (
                <label key={t.id} className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer ${treatmentId === t.id ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="treatment" className="accent-secondary" checked={treatmentId === t.id} onChange={() => setTreatmentId(t.id)} />
                  <div className="flex-1">
                    <div className="font-medium text-primary">{t.name}</div>
                    <div className="text-sm text-primary/60">ca. {t.durationMinutes} Min</div>
                  </div>
                  <div className="font-semibold text-secondary whitespace-nowrap">{priceLabel(t)}</div>
                </label>
              ))}
            </div>
          </section>

          {/* Auswahl: Datum & Zeit */}
          <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5">
            <h2 className="font-serif text-xl text-primary mb-3">Datum & Uhrzeit</h2>
            <div className="mb-4">
              <label className="block text-sm text-primary/80 mb-1">Datum</label>
              <input type="date" className="w-full border rounded-xl px-3 py-2" min={NEUMARKT_CONFIG.startDate} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <div className="text-sm text-primary/80 mb-2">Verfügbare Zeiten</div>
              {loadingSlots ? (
                <div className="text-sm text-primary/60">Lade verfügbare Zeiten…</div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-[320px] overflow-auto pr-1">
                  {slots.length === 0 && <div className="text-sm text-primary/60">Keine Zeiten verfügbar</div>}
                  {slots.map(s => (
                    <button key={s.time} disabled={!s.available} onClick={() => setSelectedTime(s.time)}
                      className={`px-3 py-2 rounded-xl border text-sm ${!s.available ? 'opacity-40 cursor-not-allowed border-gray-200' : selectedTime === s.time ? 'border-secondary bg-secondary/10 text-secondary' : 'border-gray-200 hover:bg-gray-50'}`}>
                      {s.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Kundendaten */}
          <section className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5">
            <h2 className="font-serif text-xl text-primary mb-3">Ihre Angaben</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-primary/80 mb-1">Vorname</label>
                <input className="w-full border rounded-xl px-3 py-2" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-primary/80 mb-1">Nachname</label>
                <input className="w-full border rounded-xl px-3 py-2" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-primary/80 mb-1">E‑Mail</label>
                <input type="email" className="w-full border rounded-xl px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-primary/80 mb-1">Telefon</label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+49 173 1234567" className={`w-full border rounded-xl px-3 py-2 ${phoneError ? 'border-red-400' : ''}`} value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => { if (validatePhone(phone)) { setPhone(normalizePhone(phone)); setPhoneError(null); } else { setPhoneError('Bitte gültige Handynummer (z. B. +49 173 1234567)'); } }} />
                {phoneError && <p className="text-xs text-red-600 mt-1">{phoneError}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2 mt-3 text-sm">
              <input type="checkbox" className="accent-secondary" checked={smsOptIn} onChange={e => setSmsOptIn(e.target.checked)} />
              Bestätigungs‑SMS erhalten + automatische Erinnerung einen Tag vorher
            </label>
            <label className="flex items-center gap-2 mt-2 text-xs text-primary/70">
              <input type="checkbox" className="accent-secondary" checked={agree} onChange={e => setAgree(e.target.checked)} />
              Ich stimme der Verarbeitung meiner Daten zur Terminvereinbarung zu (DSGVO).
            </label>
            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            <button
              disabled={submitting || !agree || !selectedTime || !firstName || !lastName || !email || !phone}
              onClick={submitBooking}
              className={`mt-4 w-full px-4 py-3 rounded-xl text-white shadow ${submitting ? 'bg-gray-400' : 'bg-gradient-to-r from-secondary to-secondary/90 hover:opacity-95'}`}
            >
              {submitting ? 'Bucht…' : 'Termin verbindlich buchen'}
            </button>
            {!agree || !selectedTime || !firstName || !lastName || !email || !phone ? (
              <p className="text-xs text-primary/60 mt-2">Bitte füllen Sie alle Felder aus, wählen Datum & Uhrzeit und bestätigen Sie die DSGVO‑Einwilligung.</p>
            ) : null}
            <p className="text-xs text-primary/60 mt-2">Mit Klick auf „Termin verbindlich buchen“ bestätigen Sie Ihre Angaben.</p>
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
    <div className="border rounded-xl p-3">
      <div className="text-xs text-primary/60">{label}</div>
      <div className="font-medium text-primary">{value}</div>
    </div>
  );
}

function downloadICS(booking: any) {
  const ics = toICS(booking);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `medestetique-${booking.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function toICS(booking: any) {
  const dtStart = toICSDateTime(booking.date, booking.startTime);
  const dtEnd = toICSDateTime(booking.date, booking.endTime);
  const uid = `medestetique-${booking.id}@neumarkt`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MedEstetique//Booking//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDateTimeStamp(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'SUMMARY:Behandlung – MedEstetique Neumarkt',
    `DESCRIPTION:${escapeICS(`${booking.treatmentName} (Preis €${booking.priceEUR})`)}\\nKontakt: ${escapeICS(booking.email)} / ${escapeICS(booking.phone)}`,
    'LOCATION:MedEstetique Neumarkt i.d.Opf',
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return lines.join('\r\n');
}

function toICSDateTime(date: string, time: string): string {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, m] = time.split(':').map(Number);
  // treat as local but mark Z to ensure import on devices; acceptable for basic use
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
