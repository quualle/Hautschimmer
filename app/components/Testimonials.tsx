"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getPlanityBookingUrl } from '../utils/planityBooking';

const testimonials = [
  {
    id: 1,
    name: 'Sophie K.',
    age: 42,
    treatment: 'Muskelrelaxans & Fillers',
    content: 'Bin sehr zufrieden mit den Ergebnissen. Meine Freunde haben bemerkt, dass ich frischer aussehe, konnten aber nicht sagen warum. Genau was ich wollte – natürlich aussehen, nicht \"gemacht\".',
    rating: 5
  },
  {
    id: 2,
    name: 'Thomas M.',
    age: 38,
    treatment: 'PRP Therapie',
    content: 'War anfangs skeptisch, aber die Ergebnisse sprechen für sich. Meine Haut sieht deutlich besser aus, und der ganze Prozess war unkomplizierter als erwartet. Werde definitiv wiederkommen.',
    rating: 5
  },
  {
    id: 3,
    name: 'Elisa B.',
    age: 45,
    treatment: 'Hyaluronsäure Filler',
    content: 'Die Filler haben einen echten Unterschied gemacht. Das verlorene Volumen in meinen Wangen ist wieder da, und ich sehe jünger aus, ohne dass es unnatürlich wirkt. Die Praxis selbst ist auch sehr angenehm.',
    rating: 5
  },
  {
    id: 4,
    name: 'Maria D.',
    age: 36,
    treatment: 'Muskelrelaxans',
    content: 'Habe schon Muskelrelaxanzien in verschiedenen Kliniken probiert, aber hier war das Ergebnis am besten. Man nimmt sich Zeit und achtet darauf, dass die Mimik erhalten bleibt. Das Resultat ist genau, was ich wollte.',
    rating: 5
  },
  {
    id: 5,
    name: 'Lukas G.',
    age: 47,
    treatment: 'PRP & Fillers',
    content: 'Die Kombination aus PRP und Fillern hat gut funktioniert. Beim Blick in den Spiegel bin ich jedes Mal überrascht, wie viel jünger ich wirke. Subtil, aber der Unterschied ist da und mein Selbstbewusstsein ist gestiegen.',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [inView]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-24 bg-primary/10">
      <div className="section-container !pt-0 !pb-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Kunden<span className="text-[#C0A080]">stimmen</span></h2>
          <p className="paragraph max-w-3xl mx-auto">
            Entdecken Sie, was unsere zufriedenen Kunden über ihre Erfahrungen und Ergebnisse bei MedEstetique zu sagen haben.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0,
                x: activeIndex === index ? 0 : (activeIndex > index ? -100 : 100) 
              }}
              transition={{ duration: 0.5 }}
              className={`${activeIndex === index ? 'block' : 'hidden'} bg-white rounded-2xl shadow-xl p-8 md:p-10`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                
                <p className="text-xl italic mb-8">"{testimonial.content}"</p>
                
                <div>
                  <h4 className="text-lg font-bold">{testimonial.name}, {testimonial.age}</h4>
                  <p className="text-[#C0A080]">{testimonial.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-[#C0A080] w-6' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a href={getPlanityBookingUrl()} target="_blank" rel="noopener noreferrer" className="button-primary">
            Jetzt Termin Buchen
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;