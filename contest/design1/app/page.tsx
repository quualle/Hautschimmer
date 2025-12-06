import Hero from './components/Hero';
import AnnouncementBanner from './components/AnnouncementBanner';
import Testimonials from './components/Testimonials';
import BlogCTA from './components/BlogCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementBanner />
      <Hero />
      <Testimonials />
      <BlogCTA />
    </main>
  );
}
