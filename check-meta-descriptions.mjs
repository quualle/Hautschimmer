import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ujsljedliuvuwgudggoe.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqc2xqZWRsaXV2dXdndWRnZ29lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDEyNjY3NiwiZXhwIjoyMDY5NzAyNjc2fQ.iU3Ot2GbEccyhh8z9WF2EqfoRmZGONlfQndWA7F8igc';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function checkMetaDescriptions() {
  console.log('Verbinde mit Supabase Marketing-Datenbank...\n');

  // Alle Artikel abrufen
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, meta_description')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fehler beim Abrufen der Artikel:', error);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log('Keine Artikel in der Datenbank gefunden.');
    process.exit(0);
  }

  // Artikel analysieren
  const withMetaDesc = [];
  const withoutMetaDesc = [];

  articles.forEach((article) => {
    if (article.meta_description && article.meta_description.trim() !== '') {
      withMetaDesc.push(article);
    } else {
      withoutMetaDesc.push(article);
    }
  });

  // Ergebnisse ausgeben
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('ÜBERSICHT: Meta-Descriptions in Blog-Artikeln');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log(`📊 STATISTIK:`);
  console.log(`   Gesamt:                 ${articles.length} Artikel`);
  console.log(`   ✅ Mit meta_description: ${withMetaDesc.length} Artikel (${Math.round((withMetaDesc.length / articles.length) * 100)}%)`);
  console.log(`   ❌ OHNE meta_description: ${withoutMetaDesc.length} Artikel (${Math.round((withoutMetaDesc.length / articles.length) * 100)}%)`);
  console.log('');

  if (withoutMetaDesc.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`❌ ARTIKEL OHNE meta_description (${withoutMetaDesc.length}):`);
    console.log('═══════════════════════════════════════════════════════════════\n');

    withoutMetaDesc.forEach((article, index) => {
      console.log(`${index + 1}. "${article.title}"`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   ID:   ${article.id}`);
      console.log('');
    });
  }

  if (withMetaDesc.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`✅ ARTIKEL MIT meta_description (${withMetaDesc.length}):`);
    console.log('═══════════════════════════════════════════════════════════════\n');

    withMetaDesc.forEach((article, index) => {
      console.log(`${index + 1}. "${article.title}"`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Meta: ${article.meta_description.substring(0, 80)}${article.meta_description.length > 80 ? '...' : ''}`);
      console.log('');
    });
  }

  console.log('═══════════════════════════════════════════════════════════════');
}

checkMetaDescriptions().catch(console.error);
