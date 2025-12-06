import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/src/lib/supabase/marketing'

export async function GET(request: NextRequest) {
    try {
        // Verify auth token
        const authHeader = request.headers.get('Authorization')
        const token = authHeader?.split(' ')[1]

        if (token !== process.env.ADMIN_SESSION_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data, error } = await supabaseAdmin
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
        }

        return NextResponse.json(data || [])
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        // Verify auth token
        const authHeader = request.headers.get('Authorization')
        const token = authHeader?.split(' ')[1]

        if (token !== process.env.ADMIN_SESSION_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()

        const { data, error } = await supabaseAdmin
            .from('articles')
            .insert([body])
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
