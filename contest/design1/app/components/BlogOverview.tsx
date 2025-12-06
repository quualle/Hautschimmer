"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock Data Types
type TreatmentType = 'botox' | 'hyaluron' | 'prp' | 'mesotherapie' | 'andere';
type AgeGroup = '18-35' | '35-55' | '55+';

interface BlogArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image?: string;
    treatment_type: TreatmentType;
    application_type: 'medical' | 'cosmetic' | 'both';
    target_age_group: AgeGroup;
    published_at: string;
}

const treatmentTypeLabels: Record<TreatmentType, string> = {
    botox: 'Botox',
    hyaluron: 'Hyaluron',
    prp: 'PRP',
    mesotherapie: 'Mesotherapie',
    andere: 'Andere'
};

const ageGroupLabels: Record<AgeGroup, string> = {
    '18-35': '18-35 Jahre',
    '35-55': '35-55 Jahre',
    '55+': '55+ Jahre'
};

// Mock Data
const MOCK_ARTICLES: BlogArticle[] = [
    {
        id: '1',
        title: 'Mythen über Botox: Was stimmt wirklich?',
        slug: 'mythen-ueber-botox',
        excerpt: 'Botox ist eines der bekanntesten, aber auch am meisten missverstandenen Behandlungen. Wir klären auf, was wirklich hinter dem Wirkstoff steckt.',
        treatment_type: 'botox',
        application_type: 'medical',
        target_age_group: '35-55',
        published_at: '2023-10-15T10:00:00Z',
        featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070'
    },
    {
        id: '2',
        title: 'Hyaluron vs. Botox: Was ist der Unterschied?',
        slug: 'hyaluron-vs-botox',
        excerpt: 'Oft verwechselt, aber grundverschieden. Erfahren Sie, wann Hyaluron und wann Botox die richtige Wahl für Ihre ästhetischen Ziele ist.',
        treatment_type: 'hyaluron',
        application_type: 'cosmetic',
        target_age_group: '18-35',
        published_at: '2023-11-02T14:30:00Z',
        featured_image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2070'
    },
    {
        id: '3',
        title: 'PRP-Therapie: Eigenblut für strahlende Haut',
        slug: 'prp-therapie-vampire-lift',
        excerpt: 'Das sogenannte Vampire-Lift nutzt die Kraft des eigenen Blutes zur Hautverjüngung. Wie es funktioniert und für wen es geeignet ist.',
        treatment_type: 'prp',
        application_type: 'medical',
        target_age_group: '35-55',
        published_at: '2023-11-20T09:15:00Z',
        featured_image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=2070'
    }
];

const BlogOverview = () => {
    const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | ''>('');
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | ''>('');

    const filteredArticles = MOCK_ARTICLES.filter(article => {
        if (selectedTreatment && article.treatment_type !== selectedTreatment) return false;
        if (selectedAgeGroup && article.target_age_group !== selectedAgeGroup) return false;
        return true;
    });

    const getApplicationBadge = (type: string) => {
        switch (type) {
            case 'medical':
                return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Medizinisch</span>;
            case 'cosmetic':
                return <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">Kosmetisch</span>;
            case 'both':
                return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Med. & Kosm.</span>;
            default:
                return null;
        }
    };

    return (
        <div>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
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
                                <span>{new Date(article.published_at).toLocaleDateString('de-DE')}</span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-foreground/50 text-lg">Keine Artikel gefunden. Bitte passen Sie Ihre Filter an.</p>
                </div>
            )}
        </div>
    );
};

export default BlogOverview;
