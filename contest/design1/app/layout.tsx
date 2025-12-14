import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hautschimmer.de'),
  title: {
    default: "Hautschimmer | Ästhetische Medizin Saskia Heer",
    template: "%s | Hautschimmer"
  },
  description: "Professionelle Schönheitsbehandlungen für natürliche Ergebnisse. Ärztlich durchgeführt in Berlin, Königs Wusterhausen und Neumarkt i.d.Opf.",
  keywords: ["Ästhetische Medizin", "Botox", "Hyaluron", "Faltenbehandlung", "Neumarkt", "Königs Wusterhausen", "Berlin", "Hautschimmer", "Saskia Heer"],
  authors: [{ name: "Saskia Heer" }],
  creator: "Hautschimmer",
  publisher: "Hautschimmer",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://hautschimmer.de',
    siteName: 'Hautschimmer',
    title: 'Hautschimmer | Ästhetische Medizin Saskia Heer',
    description: 'Professionelle Schönheitsbehandlungen für natürliche Ergebnisse. Standorte in Königs Wusterhausen und Neumarkt i.d.Opf.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hautschimmer - Ästhetische Medizin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hautschimmer | Ästhetische Medizin',
    description: 'Professionelle Schönheitsbehandlungen für natürliche Ergebnisse.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Google Search Console verifizieren
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FCFAF7] text-[#2F2A26]`}
      >
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
