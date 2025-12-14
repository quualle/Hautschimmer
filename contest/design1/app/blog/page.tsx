import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { supabase } from '@/src/lib/supabase/marketing'
import { BlogArticle, TreatmentType, AgeGroup } from '@/src/types/blog'
import BlogFilters from './BlogFilters'

export const metadata: Metadata = {
  title: 'Blog | Expertenwissen zur ästhetischen Medizin | Hautschimmer',
  description: 'Informieren Sie sich über Botox, Hyaluron, PRP und weitere Behandlungen der ästhetischen Medizin. Fachartikel von Ärztin Saskia Heer aus Neumarkt i.d.Opf und Königs Wusterhausen.',
  keywords: 'Ästhetische Medizin Blog, Botox Ratgeber, Hyaluron Informationen, Faltenbehandlung, Neumarkt, Königs Wusterhausen',
  openGraph: {
    title: 'Blog | Expertenwissen zur ästhetischen Medizin | Hautschimmer',
    description: 'Fachartikel zu Botox, Hyaluron und ästhetischer Medizin von Ärztin Saskia Heer.',
    url: 'https://hautschimmer.de/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://hautschimmer.de/blog',
  },
}

const treatmentTypeLabels: Record<TreatmentType, string> = {
  botox: 'Botox',
  hyaluron: 'Hyaluron',
  prp: 'PRP',
  mesotherapie: 'Mesotherapie',
  andere: 'Andere'
}

const ageGroupLabels: Record<AgeGroup, string> = {
  '18-35': '18-35 Jahre',
  '35-55': '35-55 Jahre',
  '55+': '55+ Jahre'
}

async function getArticles(): Promise<BlogArticle[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data || []
}

function getApplicationBadge(type: string) {
  switch (type) {
    case 'medical':
      return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Medizinisch</span>
    case 'cosmetic':
      return <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">Kosmetisch</span>
    case 'both':
      return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Med. & Kosm.</span>
    default:
      return null
  }
}

function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/^[-*]\s+/gm, '') // Remove list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

export default async function BlogPage() {
  const articles = await getArticles()

  // Generate JSON-LD for blog listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Hautschimmer Blog',
    description: 'Expertenwissen zur ästhetischen Medizin von Ärztin Saskia Heer',
    url: 'https://hautschimmer.de/blog',
    author: {
      '@type': 'Person',
      name: 'Saskia Heer',
      jobTitle: 'Ärztin für ästhetische Medizin',
    },
    blogPost: articles.slice(0, 10).map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      url: `https://hautschimmer.de/blog/${article.slug}`,
      datePublished: article.published_at || article.created_at,
      dateModified: article.updated_at || article.created_at,
      author: {
        '@type': 'Person',
        name: 'Saskia Heer',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Expertenwissen aus der ästhetischen Medizin
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Informieren Sie sich über die neuesten Behandlungsmethoden, räumen Sie mit Mythen auf
              und erfahren Sie alles Wissenswerte rund um ästhetische Medizin.
            </p>
          </div>

          {/* Client-side Filters */}
          <Suspense fallback={<div className="mb-12 h-12" />}>
            <BlogFilters />
          </Suspense>

          {/* Articles Grid - Server Rendered */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-secondary/10 group"
              >
                {article.featured_image && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                      {treatmentTypeLabels[article.treatment_type as TreatmentType] || article.treatment_type}
                    </span>
                    {getApplicationBadge(article.application_type)}
                  </div>

                  <h2 className="font-serif text-xl md:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/blog/${article.slug}`} className="block">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-foreground/60 mb-6 line-clamp-3 leading-relaxed text-sm">
                    {article.meta_description || generateExcerpt(article.content)}
                  </p>

                  <div className="flex items-center justify-between text-sm text-foreground/40 pt-6 border-t border-secondary/10">
                    <span>{article.target_age_group ? ageGroupLabels[article.target_age_group as AgeGroup] : 'Alle'}</span>
                    <time dateTime={article.published_at || article.created_at}>
                      {new Date(article.published_at || article.created_at).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-foreground/50 text-lg">Keine Artikel gefunden.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
