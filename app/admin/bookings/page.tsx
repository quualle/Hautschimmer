'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminBookings from '../../../components/AdminBookings'

export default function AdminBookingsPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('admin_session')
    if (!token) {
      router.push('/admin/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-light to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Admin – Termine</h1>
          <button
            onClick={() => {
              Cookies.remove('admin_session')
              router.push('/admin/login')
            }}
            className="text-secondary hover:text-primary transition-colors"
          >
            Abmelden
          </button>
        </header>
        <AdminBookings />
      </div>
    </div>
  )
}

