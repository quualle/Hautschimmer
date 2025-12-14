export async function GET() {
  const robotsTxt = `# Robots.txt for hautschimmer.de
User-agent: *
Allow: /

# Sitemap
Sitemap: https://hautschimmer.de/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow important paths explicitly
Allow: /blog/
Allow: /behandlungen
Allow: /preise
Allow: /standorte
Allow: /neumarkt
Allow: /koenigs-wusterhausen
Allow: /kontakt
Allow: /ueber-uns
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
