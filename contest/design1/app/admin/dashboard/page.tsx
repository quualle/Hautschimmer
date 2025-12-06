'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminDashboard from '../../components/AdminDashboard'

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is authenticated
        const sessionToken = Cookies.get('admin_session')

        if (!sessionToken) {
            router.push('/admin/login')
        } else {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-6">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="font-serif text-3xl text-foreground">Admin Dashboard</h1>
                    <div className="flex items-center gap-6">
                        <a href="/admin/bookings" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                            Zu den Terminen
                        </a>
                        <button
                            onClick={() => {
                                Cookies.remove('admin_session')
                                router.push('/admin/login')
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                            Abmelden
                        </button>
                    </div>
                </header>

                <AdminDashboard />
            </div>
        </div>
    )
}
