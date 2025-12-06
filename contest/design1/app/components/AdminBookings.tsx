'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { TREATMENTS } from '@/src/data/treatments'

type Booking = {
    id: string
    location: 'neumarkt'
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    sms_opt_in?: boolean
    treatment_id: string
    price_eur: number
    date: string
    start_time: string
    end_time: string
    duration_minutes: number
    status: 'confirmed' | 'cancelled'
    created_at: string
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [edit, setEdit] = useState<{ date: string; time: string; treatmentId: string } | null>(null)
    const [error, setError] = useState<string | null>(null)

    const treatmentMap = useMemo(() => Object.fromEntries(TREATMENTS.map(t => [t.id, t.name])), [])

    const fetchBookings = async () => {
        try {
            setLoading(true)
            const token = Cookies.get('admin_session')
            const res = await fetch('/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Fehler beim Laden der Buchungen')
            setBookings(json.bookings || [])
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchBookings() }, [])

    const startEdit = (b: Booking) => {
        setEditingId(b.id)
        setEdit({ date: b.date, time: b.start_time.slice(0, 5), treatmentId: b.treatment_id })
    }

    const cancelEdit = () => { setEditingId(null); setEdit(null) }

    const saveEdit = async (id: string) => {
        if (!edit) return
        try {
            const token = Cookies.get('admin_session')
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ date: edit.date, time: edit.time, treatmentId: edit.treatmentId })
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Aktualisierung fehlgeschlagen')
            cancelEdit()
            fetchBookings()
        } catch (e: any) {
            setError(e.message)
        }
    }

    const cancelBooking = async (id: string) => {
        try {
            const token = Cookies.get('admin_session')
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: 'cancelled' })
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Stornierung fehlgeschlagen')
            fetchBookings()
        } catch (e: any) {
            setError(e.message)
        }
    }

    const deleteBooking = async (id: string) => {
        if (!confirm('Termin wirklich löschen?')) return
        try {
            const token = Cookies.get('admin_session')
            const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Löschen fehlgeschlagen')
            fetchBookings()
        } catch (e: any) {
            setError(e.message)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary"></div></div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-primary">Gebuchte Termine</h2>
                <button onClick={fetchBookings} className="px-3 py-2 text-sm rounded-md border border-secondary/30 hover:bg-secondary/10">Aktualisieren</button>
            </div>
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-highlight/60">
                        <tr>
                            <Th>Datum</Th>
                            <Th>Uhrzeit</Th>
                            <Th>Behandlung</Th>
                            <Th>Kunde</Th>
                            <Th>Kontakt</Th>
                            <Th>Status</Th>
                            <Th>Erstellt</Th>
                            <Th className="text-right">Aktionen</Th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {bookings.map(b => (
                            <tr key={b.id} className="align-top">
                                <Td>
                                    {editingId === b.id ? (
                                        <input type="date" className="border rounded px-2 py-1" value={edit?.date || ''} onChange={e => setEdit(s => ({ ...(s as any), date: e.target.value }))} />
                                    ) : (
                                        <span>{new Date(`${b.date}T00:00:00`).toLocaleDateString('de-DE')}</span>
                                    )}
                                </Td>
                                <Td>
                                    {editingId === b.id ? (
                                        <input type="time" className="border rounded px-2 py-1" value={edit?.time || ''} onChange={e => setEdit(s => ({ ...(s as any), time: e.target.value }))} />
                                    ) : (
                                        <span>{b.start_time.slice(0, 5)}–{b.end_time.slice(0, 5)} Uhr</span>
                                    )}
                                </Td>
                                <Td>
                                    {editingId === b.id ? (
                                        <select className="border rounded px-2 py-1" value={edit?.treatmentId || ''} onChange={e => setEdit(s => ({ ...(s as any), treatmentId: e.target.value }))}>
                                            {TREATMENTS.map(t => (<option key={t.id} value={t.id}>{t.name}</option>))}
                                        </select>
                                    ) : (
                                        <div>
                                            <div className="font-medium text-primary">{treatmentMap[b.treatment_id] || b.treatment_id}</div>
                                            <div className="text-xs text-primary/60">ab €{Number(b.price_eur).toFixed(0)}</div>
                                        </div>
                                    )}
                                </Td>
                                <Td>
                                    <div className="leading-tight">
                                        <div className="font-medium">{[b.first_name, b.last_name].filter(Boolean).join(' ')}</div>
                                        <div className="text-xs text-primary/60">SMS: {b.sms_opt_in ? 'ja' : 'nein'}</div>
                                    </div>
                                </Td>
                                <Td>
                                    <div className="leading-tight">
                                        <div className="text-sm">{b.email}</div>
                                        <div className="text-sm">{b.phone}</div>
                                    </div>
                                </Td>
                                <Td>
                                    <span className={`px-2 py-1 rounded text-xs ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{b.status}</span>
                                </Td>
                                <Td>
                                    <span className="text-sm text-primary/70">{new Date(b.created_at).toLocaleString('de-DE')}</span>
                                </Td>
                                <Td className="text-right whitespace-nowrap space-x-2">
                                    {editingId === b.id ? (
                                        <>
                                            <button className="px-2 py-1 text-sm rounded border border-secondary/30" onClick={() => saveEdit(b.id)}>Speichern</button>
                                            <button className="px-2 py-1 text-sm rounded border" onClick={cancelEdit}>Abbrechen</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="px-2 py-1 text-sm rounded border border-secondary/30" onClick={() => startEdit(b)}>Bearbeiten</button>
                                            {b.status !== 'cancelled' && (
                                                <button className="px-2 py-1 text-sm rounded border border-secondary/30" onClick={() => cancelBooking(b.id)}>Stornieren</button>
                                            )}
                                            <button className="px-2 py-1 text-sm rounded border border-red-300 text-red-700" onClick={() => deleteBooking(b.id)}>Löschen</button>
                                        </>
                                    )}
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Th({ children, className = '' }: any) {
    return <th className={`px-3 md:px-4 py-2 text-left text-xs font-medium text-primary/80 uppercase tracking-wider ${className}`}>{children}</th>
}
function Td({ children, className = '' }: any) {
    return <td className={`px-3 md:px-4 py-3 align-middle ${className}`}>{children}</td>
}
