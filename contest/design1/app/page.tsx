import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import BlogCTA from './components/BlogCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Philosophy />
      <Testimonials />
      <BlogCTA />
    </main>
  );
}
