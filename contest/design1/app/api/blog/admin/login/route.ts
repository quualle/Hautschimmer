import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json({ error: 'Passwort erforderlich' }, { status: 400 })
        }

        const adminPassword = process.env.ADMIN_PASSWORD
        const adminSessionToken = process.env.ADMIN_SESSION_TOKEN

        if (!adminPassword) {
            console.error('Admin password not configured')
            return NextResponse.json({ error: 'Server-Konfigurationsfehler' }, { status: 500 })
        }

        if (password !== adminPassword) {
            return NextResponse.json({ error: 'Ungültiges Passwort' }, { status: 401 })
        }

        // If no session token is configured, generate one and log it
        if (!adminSessionToken) {
            const generatedToken = crypto.randomBytes(32).toString('hex')
            console.log('Generated ADMIN_SESSION_TOKEN:', generatedToken)
            console.log('Please add this to your .env.local and Netlify environment variables')
            return NextResponse.json({
                success: true,
                sessionToken: generatedToken,
                message: 'Token generated - check server logs'
            })
        }

        return NextResponse.json({
            success: true,
            sessionToken: adminSessionToken
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 })
    }
}
