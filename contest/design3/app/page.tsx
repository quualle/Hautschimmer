import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Treatments from './components/Treatments';
import About from './components/About';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111] text-white selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <Treatments />
      <About />
      <Footer />
    </main>
  );
}
