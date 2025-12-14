import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bewertung | Hautschimmer',
  description: 'Teilen Sie Ihre Erfahrung mit Hautschimmer. Ihre Meinung hilft uns, unseren Service zu verbessern.',
  robots: 'noindex, nofollow', // Don't index the review page
};

export default function BewertungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
