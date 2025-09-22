export const dynamic = 'force-dynamic';

import dynamicImport from 'next/dynamic';

const AnnouncementBanner = dynamicImport(() => import('./components/AnnouncementBanner'), { ssr: false });
const Navbar = dynamicImport(() => import('./components/Navbar'), { ssr: false });
const Hero = dynamicImport(() => import('./components/Hero'), { ssr: false });
const Treatments = dynamicImport(() => import('./components/Treatments'), { ssr: false });
const BlogCTA = dynamicImport(() => import('./components/BlogCTA'), { ssr: false });
const Pricing = dynamicImport(() => import('./components/Pricing'), { ssr: false });
const About = dynamicImport(() => import('./components/About'));
const Testimonials = dynamicImport(() => import('./components/Testimonials'), { ssr: false });
const TreatmentRooms = dynamicImport(() => import('./components/TreatmentRooms'));
const Contact = dynamicImport(() => import('./components/Contact'));
const Footer = dynamicImport(() => import('./components/Footer'));

export default function Home() {
  return (
    <main>
      <AnnouncementBanner />
      <div className="relative z-50">
        <Navbar />
      </div>
      <Hero />
      {/* Background overlay to prevent hero background from showing through */}
      <div className="relative z-10 bg-[#F7FAFC]">
        <Treatments />
        <Pricing />
        <Testimonials />
        <About />
        <TreatmentRooms />
        <Contact />
        <BlogCTA />
        <Footer />
      </div>
    </main>
  );
}