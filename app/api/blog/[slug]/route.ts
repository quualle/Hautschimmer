import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../src/lib/supabase/marketing'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Related articles based on treatment_type
    const { data: relatedArticles } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('treatment_type', data.treatment_type)
      .neq('id', data.id)
      .limit(3)
      .order('published_at', { ascending: false })

    return NextResponse.json({
      article: data,
      relatedArticles: relatedArticles || []
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}