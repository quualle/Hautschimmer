'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BlogArticle, TreatmentType, AgeGroup } from '@/src/types/blog'

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

export default function BlogPage() {
    const [articles, setArticles] = useState<BlogArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | ''>('')
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | ''>('')

    useEffect(() => {
        fetchArticles()
    }, [selectedTreatment, selectedAgeGroup])

    const fetchArticles = async () => {
        try {
            const params = new URLSearchParams()
            if (selectedTreatment) params.append('treatment_type', selectedTreatment)
            if (selectedAgeGroup) params.append('target_age_group', selectedAgeGroup)

            const response = await fetch(`/api/blog/articles?${params}`)
            const data = await response.json()
            setArticles(data)
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const getApplicationBadge = (type: string) => {
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

    return (
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

                {/* Filter Section */}
                <div className="bg-white/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 mb-12">
                    <h2 className="font-serif text-2xl mb-6 text-foreground">Filter</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2 uppercase tracking-wider">
                                Behandlungsart
                            </label>
                            <select
                                value={selectedTreatment}
                                onChange={(e) => setSelectedTreatment(e.target.value as TreatmentType | '')}
                                className="w-full px-4 py-3 bg-white border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            >
                                <option value="">Alle Behandlungen</option>
                                {Object.entries(treatmentTypeLabels).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2 uppercase tracking-wider">
                                Altersgruppe
                            </label>
                            <select
                                value={selectedAgeGroup}
                                onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup | '')}
                                className="w-full px-4 py-3 bg-white border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            >
                                <option value="">Alle Altersgruppen</option>
                                {Object.entries(ageGroupLabels).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
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
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                                            {treatmentTypeLabels[article.treatment_type]}
                                        </span>
                                        {getApplicationBadge(article.application_type)}
                                    </div>

                                    <h3 className="font-serif text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${article.slug}`} className="block">
                                            {article.title}
                                        </Link>
                                    </h3>

                                    <p className="text-foreground/60 mb-6 line-clamp-3 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-foreground/40 pt-6 border-t border-secondary/10">
                                        <span>{ageGroupLabels[article.target_age_group]}</span>
                                        <span>{new Date(article.published_at || article.created_at).toLocaleDateString('de-DE')}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                {!loading && articles.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-foreground/50 text-lg">Keine Artikel gefunden. Bitte passen Sie Ihre Filter an.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
