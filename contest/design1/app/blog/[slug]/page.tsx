import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogArticleComponent from '../../components/BlogArticle'
import { supabase } from '@/src/lib/supabase/marketing'
import { BlogArticle } from '@/src/types/blog'

// Revalidate every 60 seconds - changes in Supabase will be visible after max 1 minute
export const revalidate = 60

// Allow new articles to be rendered on-demand (not just those from generateStaticParams)
export const dynamicParams = true

export async function generateStaticParams() {
  const { data } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published')

  return (data || []).map((article) => ({
    slug: article.slug,
  }))
}

async function getArticle(slug: string): Promise<BlogArticle | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function getRelatedArticles(currentId: string, treatmentType: string): Promise<BlogArticle[]> {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('treatment_type', treatmentType)
    .neq('id', currentId)
    .limit(3)
    .order('published_at', { ascending: false })

  return data || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Artikel nicht gefunden | Hautschimmer',
      description: 'Der gesuchte Artikel konnte nicht gefunden werden.',
    }
  }

  return {
    title: article.meta_title || `${article.title} | Hautschimmer`,
    description: article.meta_description || article.excerpt,
    keywords: article.keywords?.join(', '),
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, article.treatment_type)

  return (
    <div className="min-h-screen bg-background">
      <BlogArticleComponent article={article} relatedArticles={relatedArticles} />
    </div>
  )
}
