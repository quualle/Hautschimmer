export type TreatmentType = 'botox' | 'hyaluron' | 'prp' | 'mesotherapie' | 'andere'
export type AgeGroup = '18-35' | '35-55' | '55+'
export type ApplicationType = 'medical' | 'cosmetic' | 'both'
export type GenderFocus = 'female' | 'male' | 'unisex'
export type ContentIntent = 'informational' | 'transactional' | 'navigational'
export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface BlogArticle {
    id: string
    created_at: string
    updated_at: string
    title: string
    slug: string
    excerpt: string
    content: string
    featured_image?: string
    author_id?: string
    author?: string
    status: ArticleStatus
    published_at?: string

    // SEO & Categorization
    treatment_type: TreatmentType
    target_age_group: AgeGroup
    application_type: ApplicationType
    gender_focus: GenderFocus
    treatment_area?: string
    content_intent: ContentIntent

    // Meta
    meta_title?: string
    meta_description?: string
    keywords?: string[]
}

export interface BlogFilters {
    treatment_type?: TreatmentType
    target_age_group?: AgeGroup
    application_type?: ApplicationType
    gender_focus?: GenderFocus
    treatment_area?: string
    content_intent?: ContentIntent
}
