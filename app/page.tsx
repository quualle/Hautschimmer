import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import BlogCTA from './components/BlogCTA';
import Pricing from './components/Pricing';
import About from './components/About';
import Testimonials from './components/Testimonials';
import TreatmentRooms from './components/TreatmentRooms';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <div className="relative z-50">
        <Navbar />
      </div>
      <Hero />
      {/* Background overlay to prevent hero background from showing through */}
      <div className="relative z-10 bg-[#FFFBF6]">
        <Treatments />
        <BlogCTA />
        <Pricing />
        <Testimonials />
        <About />
        <TreatmentRooms />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}