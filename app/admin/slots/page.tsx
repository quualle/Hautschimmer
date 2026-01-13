'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

type AvailableSlot = {
  id: string;
  location: 'neumarkt' | 'kw';
  date: string;
  openTime: string;
  closeTime: string;
  createdAt: string;
};

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [location, setLocation] = useState<'kw' | 'neumarkt'>('kw');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Morgen als Default
    return d.toISOString().split('T')[0];
  });
  const [openTime, setOpenTime] = useState('10:00');
  const [closeTime, setCloseTime] = useState('18:00');

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('admin_session');
    if (!token) {
      router.push('/admin/login');
    } else {
      setLoading(false);
      loadSlots();
    }
  }, [router]);

  async function loadSlots() {
    try {
      const token = Cookies.get('admin_session');
      const res = await fetch('/api/admin/available-slots', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSlots(data.slots || []);
      } else {
        setError(data.error || 'Fehler beim Laden');
      }
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function addSlot(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const token = Cookies.get('admin_session');
      const res = await fetch('/api/admin/available-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location, date, openTime, closeTime }),
      });

      const data = await res.json();
      if (res.ok) {
        await loadSlots();
        // Reset date to next day
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        setDate(nextDate.toISOString().split('T')[0]);
      } else {
        setError(data.error || 'Fehler beim Hinzufügen');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteSlot(id: string) {
    if (!confirm('Diesen Tag wirklich entfernen?')) return;

    try {
      const token = Cookies.get('admin_session');
      const res = await fetch(`/api/admin/available-slots?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        await loadSlots();
      } else {
        const data = await res.json();
        setError(data.error || 'Fehler beim Löschen');
      }
    } catch (e: any) {
      setError(e.message);
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-light to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Filter slots by location
  const kwSlots = slots.filter((s) => s.location === 'kw');
  const neumarktSlots = slots.filter((s) => s.location === 'neumarkt');

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Verfügbare Termine</h1>
            <p className="text-primary/60 mt-1">Tage freigeben, an denen Buchungen möglich sind</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/bookings"
              className="text-secondary hover:text-primary transition-colors"
            >
              Zu den Buchungen
            </Link>
            <button
              onClick={() => {
                Cookies.remove('admin_session');
                router.push('/admin/login');
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </header>

        {/* Neuen Slot hinzufügen */}
        <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Tag freigeben</h2>

          <form onSubmit={addSlot} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm text-primary/70 mb-1">Standort</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as 'kw' | 'neumarkt')}
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="kw">Königs Wusterhausen</option>
                <option value="neumarkt">Neumarkt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-primary/70 mb-1">Datum</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border rounded-xl px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-primary/70 mb-1">Von</label>
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full border rounded-xl px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-primary/70 mb-1">Bis</label>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full border rounded-xl px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 disabled:opacity-50"
            >
              {submitting ? 'Speichern...' : '+ Freigeben'}
            </button>
          </form>

          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </section>

        {/* Liste der freigegebenen Slots */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Freigegebene Tage
            <span className="text-sm font-normal text-primary/60 ml-2">
              ({slots.length} {slots.length === 1 ? 'Tag' : 'Tage'})
            </span>
          </h2>

          {slots.length === 0 ? (
            <p className="text-primary/60 text-center py-8">
              Noch keine Tage freigegeben. Füge oben einen neuen Tag hinzu.
            </p>
          ) : (
            <div className="space-y-6">
              {/* KW Slots */}
              {kwSlots.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Königs Wusterhausen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {kwSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="border border-blue-200 bg-blue-50 rounded-xl p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-primary">{formatDate(slot.date)}</div>
                          <div className="text-sm text-primary/60">
                            {slot.openTime} – {slot.closeTime} Uhr
                          </div>
                        </div>
                        <button
                          onClick={() => deleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Löschen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neumarkt Slots */}
              {neumarktSlots.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Neumarkt i.d.Opf
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {neumarktSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="border border-green-200 bg-green-50 rounded-xl p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-primary">{formatDate(slot.date)}</div>
                          <div className="text-sm text-primary/60">
                            {slot.openTime} – {slot.closeTime} Uhr
                          </div>
                        </div>
                        <button
                          onClick={() => deleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Löschen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
