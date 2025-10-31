'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Cookies from 'js-cookie'
import { BlogArticle, TreatmentType, AgeGroup } from '../src/types/blog'

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
  article: BlogArticle
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export default function BlogArticleEditModal({ article, isOpen, onClose, onSave }: Props) {
  const [editedArticle, setEditedArticle] = useState<BlogArticle>(article)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  useEffect(() => {
    setEditedArticle(article)
  }, [article])

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

  // Clean content (remove duplicate title)
  const cleanedContent = useMemo(() => {
    const lines = editedArticle.content.split('\n')

    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i].trim()
      const cleanLine = line.replace(/^#+\s*/, '').trim()

      if (cleanLine === editedArticle.title ||
          (cleanLine.length > 20 &&
          editedArticle.title.includes(cleanLine.substring(0, 50)))) {
        lines.splice(i, 1)
        break
      }
    }

    return lines.join('\n').trim()
  }, [editedArticle.content, editedArticle.title])

  // Format content for preview
  const formattedContent = useMemo(() => {
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

  useEffect(() => {
    const processContent = async () => {
      const markedHtml = await marked(formattedContent)
      setHtmlContent(DOMPurify.sanitize(markedHtml))
    }
    processContent()
  }, [formattedContent])

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      const sessionToken = Cookies.get('admin_session')
      const response = await fetch(`/api/blog/admin/articles/${editedArticle.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editedArticle.title,
          content: editedArticle.content,
          excerpt: editedArticle.excerpt,
          author: editedArticle.author
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save article')
      }

      onSave()
      onClose()
    } catch (err) {
      console.error('Error saving article:', err)
      setError('Fehler beim Speichern des Artikels')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Artikel bearbeiten</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b px-6">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'edit'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Bearbeiten
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Vorschau
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {activeTab === 'edit' ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel
                    </label>
                    <input
                      type="text"
                      value={editedArticle.title}
                      onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zusammenfassung
                    </label>
                    <textarea
                      value={editedArticle.excerpt}
                      onChange={(e) => setEditedArticle({ ...editedArticle, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={editedArticle.author}
                      onChange={(e) => setEditedArticle({ ...editedArticle, author: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inhalt (Markdown)
                    </label>
                    <textarea
                      value={editedArticle.content}
                      onChange={(e) => setEditedArticle({ ...editedArticle, content: e.target.value })}
                      rows={20}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent font-mono text-sm resize-none"
                    />
                  </div>
                </div>
              ) : (
                <article className="max-w-4xl mx-auto">
                  {/* Preview Header */}
                  <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-rose-100 text-rose-800 text-sm px-3 py-1 rounded">
                        {treatmentTypeLabels[editedArticle.treatment_type]}
                      </span>
                      {getApplicationBadge(editedArticle.application_type)}
                      <span className="text-gray-500 text-sm">
                        {ageGroupLabels[editedArticle.target_age_group]}
                      </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                      {editedArticle.title}
                    </h1>

                    <div className="flex items-center justify-between text-gray-600 mb-6">
                      <div>
                        <span className="font-medium">{editedArticle.author}</span>
                        <span className="mx-2">•</span>
                        <time>{new Date(editedArticle.published_at || editedArticle.created_at).toLocaleDateString('de-DE')}</time>
                      </div>
                    </div>
                  </header>

                  {/* Featured Image */}
                  {editedArticle.featured_image && (
                    <img
                      src={editedArticle.featured_image}
                      alt={editedArticle.title}
                      className="w-full h-96 object-cover rounded-lg mb-8"
                    />
                  )}

                  {/* Trust Box */}
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-4">
                      <img
                        src="/images/saskia.png"
                        alt="Saskia Heer"
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-rose-800 mb-2 text-lg">Ihre Expertin</h3>
                        <p className="text-gray-700 text-sm">
                          Saskia Heer ist approbierte Ärztin mit Spezialisierung auf ästhetische Medizin.
                          Durch zahlreiche Fachkurse und Zertifizierungen garantiert sie höchste
                          Behandlungsqualität und Sicherheit.
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          Mitglied der Ärztekammer Brandenburg und Bayern
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="prose prose-rose max-w-none mb-12">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </article>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
              <div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={saving}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Speichern...
                    </>
                  ) : (
                    'Speichern'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
