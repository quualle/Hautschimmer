'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function AdminLoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/blog/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            })

            const data = await response.json()

            if (response.ok) {
                // Store the session token in a cookie
                Cookies.set('admin_session', data.sessionToken, { expires: 7 })
                router.push('/admin/dashboard')
            } else {
                setError(data.error || 'Login fehlgeschlagen')
            }
        } catch (err) {
            setError('Ein Fehler ist aufgetreten')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full border border-secondary/10">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl text-foreground mb-2">Admin Login</h1>
                    <p className="text-foreground/60">Hautschimmer Verwaltung</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground/70 mb-2">
                            Passwort
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="••••••••"
                            required
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                    >
                        {loading ? 'Anmeldung läuft...' : 'Anmelden'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-sm text-foreground/50 hover:text-primary transition-colors">
                        Zurück zur Website
                    </a>
                </div>
            </div>
        </div>
    )
}
