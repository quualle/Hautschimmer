import { supabase } from '@/src/lib/supabase/marketing'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export async function GET() {
  const baseUrl = 'https://hautschimmer.de'

  // Static pages
  const staticPages: SitemapUrl[] = [
    { loc: baseUrl, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
    { loc: `${baseUrl}/behandlungen`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/preise`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.9 },
    { loc: `${baseUrl}/standorte`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/kontakt`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/ueber-uns`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/impressum`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/datenschutz`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
    // Location pages
    { loc: `${baseUrl}/neumarkt`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/koenigs-wusterhausen`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
    // Service + Location pages - Neumarkt
    { loc: `${baseUrl}/neumarkt/botox`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/neumarkt/hyaluron`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/neumarkt/lippen`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/neumarkt/masseter-bruxismus`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/neumarkt/hyperhidrose`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/neumarkt/prp`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    // Service + Location pages - Königs Wusterhausen
    { loc: `${baseUrl}/koenigs-wusterhausen/botox`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/koenigs-wusterhausen/hyaluron`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/koenigs-wusterhausen/lippen`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/koenigs-wusterhausen/masseter-bruxismus`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/koenigs-wusterhausen/hyperhidrose`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/koenigs-wusterhausen/prp`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  ]

  // Fetch blog articles from Supabase
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const blogUrls: SitemapUrl[] = (articles || []).map(article => ({
    loc: `${baseUrl}/blog/${article.slug}`,
    lastmod: article.updated_at || article.created_at,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }))

  const allUrls = [...staticPages, ...blogUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod.split('T')[0]}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
