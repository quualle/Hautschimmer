import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { supabase } from '@/src/lib/supabase/marketing'
import { BlogArticle, TreatmentType, AgeGroup } from '@/src/types/blog'

// Force dynamic rendering to ensure we always get the latest content
export const dynamic = 'force-dynamic'

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

async function getArticle(slug: string) {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error || !data) {
        return null
    }

    return data as BlogArticle
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticle(params.slug)

    if (!article) {
        return {
            title: 'Artikel nicht gefunden',
        }
    }

    return {
        title: `${article.title} | Hautschimmer Blog`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: article.featured_image ? [article.featured_image] : [],
        },
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug)

    if (!article) {
        notFound()
    }

    // Parse Markdown content
    const htmlContent = DOMPurify.sanitize(await marked(article.content))

    const getApplicationBadge = (type: string) => {
        switch (type) {
            case 'medical':
                return <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">Medizinisch</span>
            case 'cosmetic':
                return <span className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">Kosmetisch</span>
            case 'both':
                return <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Med. & Kosm.</span>
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <article className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                            {treatmentTypeLabels[article.treatment_type]}
                        </span>
                        {getApplicationBadge(article.application_type)}
                        <span className="text-foreground/50 text-sm bg-secondary/10 px-3 py-1 rounded-full">
                            {ageGroupLabels[article.target_age_group]}
                        </span>
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-center text-foreground/60 gap-4 text-sm">
                        <span className="font-medium">Von {article.author || 'Saskia Heer'}</span>
                        <span className="w-1 h-1 bg-foreground/30 rounded-full"></span>
                        <time>{new Date(article.published_at || article.created_at).toLocaleDateString('de-DE')}</time>
                    </div>
                </header>

                {/* Featured Image */}
                {article.featured_image && (
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg prose-stone max-w-none mb-16">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>

                {/* Author Box */}
                <div className="bg-white border border-secondary/20 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                        <Image
                            src="/images/saskia.png"
                            alt="Saskia Heer"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-2">Über die Autorin</h3>
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                            Saskia Heer ist approbierte Ärztin mit Spezialisierung auf ästhetische Medizin.
                            Durch zahlreiche Fachkurse und Zertifizierungen garantiert sie höchste
                            Behandlungsqualität und Sicherheit.
                        </p>
                        <Link href="/ueber-uns" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Mehr über Saskia erfahren →
                        </Link>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center px-8 py-3 border border-secondary/30 rounded-full text-foreground/70 hover:bg-secondary/5 transition-colors"
                    >
                        ← Zurück zur Übersicht
                    </Link>
                </div>
            </article>
        </div>
    )
}
