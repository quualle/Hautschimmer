'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { BlogArticle as BlogArticleType, TreatmentType, AgeGroup } from '@/src/types/blog'

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

interface Props {
  article: BlogArticleType
  relatedArticles: BlogArticleType[]
}

export default function BlogArticle({ article, relatedArticles }: Props) {
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const getApplicationBadge = (type: string) => {
    switch (type) {
      case 'medical':
        return <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">Medizinisch</span>
      case 'cosmetic':
        return <span className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded">Kosmetisch</span>
      case 'both':
        return <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded">Med. & Kosm.</span>
      default:
        return null
    }
  }

  // Entferne duplizierte Titel-Überschrift aus dem Content
  const cleanedContent = React.useMemo(() => {
    const lines = article.content.split('\n');
    
    // Prüfe die ersten 3 Zeilen nach duplizierten Titeln
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i].trim();
      const cleanLine = line.replace(/^#+\s*/, '').trim();
      
      if (cleanLine === article.title ||
          (cleanLine.length > 20 &&
          article.title.includes(cleanLine.substring(0, 50)))) {
        lines.splice(i, 1);
        break;
      }
    }
    
    return lines.join('\n').trim();
  }, [article.content, article.title]);

  // Format and convert markdown to HTML
  const formattedContent = React.useMemo(() => {
    let html = cleanedContent

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-3 mt-6 text-gray-800">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 mt-8 text-gray-800">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-5 mt-10 text-gray-800">$1</h1>')
    
    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Lists
    html = html.replace(/^\* (.+)$/gim, '<li class="ml-6 mb-2">• $1</li>')
    html = html.replace(/^- (.+)$/gim, '<li class="ml-6 mb-2">• $1</li>')
    html = html.replace(/^\d+\. (.+)$/gim, '<li class="ml-6 mb-2">$&</li>')
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
    html = '<p class="mb-4 text-gray-700 leading-relaxed">' + html + '</p>'
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-rose-600 hover:text-rose-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Blockquotes
    html = html.replace(/^> (.+)$/gim, '<blockquote class="border-l-4 border-rose-300 pl-4 py-2 mb-4 italic text-gray-600">$1</blockquote>')
    
    return html
  }, [cleanedContent])

  const [htmlContent, setHtmlContent] = useState('')
  
  React.useEffect(() => {
    const processContent = async () => {
      const markedHtml = await marked(formattedContent)
      setHtmlContent(DOMPurify.sanitize(markedHtml))
    }
    processContent()
  }, [formattedContent])

  return (
    <article className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded">
            {treatmentTypeLabels[article.treatment_type]}
          </span>
          {getApplicationBadge(article.application_type)}
          <span className="text-gray-500 text-sm">
            {ageGroupLabels[article.target_age_group]}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          {article.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-6 gap-3">
          <div className="text-sm sm:text-base">
            <span className="font-medium">{article.author}</span>
            <span className="mx-2">•</span>
            <time>{new Date(article.published_at || article.created_at).toLocaleDateString('de-DE')}</time>
          </div>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {showCopySuccess ? 'Kopiert!' : 'Link kopieren'}
          </button>
        </div>
      </header>

      {/* Featured Image */}
      {article.featured_image && (
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      {/* Trust Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src="/images/saskia.png"
            alt="Saskia Heer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-rose-800 mb-2 text-lg">Ihre Expertin</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Saskia Heer ist approbierte Ärztin mit Spezialisierung auf ästhetische Medizin. 
              Durch zahlreiche Fachkurse und Zertifizierungen garantiert sie höchste 
              Behandlungsqualität und Sicherheit.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Mitglied der Ärztekammer Brandenburg und Bayern
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-rose max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Weitere Artikel zu {treatmentTypeLabels[article.treatment_type]}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <article key={related.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {related.featured_image && (
                  <img
                    src={related.featured_image}
                    alt={related.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">
                    <Link href={`/blog/${related.slug}`} className="hover:text-rose-600 transition-colors">
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}