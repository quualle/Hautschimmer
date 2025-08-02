import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBook, FaArrowRight } from 'react-icons/fa';

const BlogCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="section-container text-center"
      >
        <div className="max-w-3xl mx-auto">
          <FaBook className="text-5xl text-rose-400 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Entdecken Sie unseren Expertenblog
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Erfahren Sie alles über moderne Behandlungsmethoden, Hautpflege-Tipps und die neuesten 
            Trends der ästhetischen Medizin. Saskia Heer teilt ihr Fachwissen und beantwortet 
            die häufigsten Fragen ihrer Patienten.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog" 
              className="button-primary inline-flex items-center justify-center gap-2 group"
            >
              Zum Blog
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/blog?treatment_type=botox" 
              className="button-secondary inline-flex items-center justify-center"
            >
              Botox-Artikel lesen
            </Link>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-800 mb-2">Mythen aufklären</h3>
              <p className="text-sm text-gray-600">
                Wir räumen mit Vorurteilen auf und liefern wissenschaftlich fundierte Informationen.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-800 mb-2">Behandlungsvergleiche</h3>
              <p className="text-sm text-gray-600">
                Finden Sie heraus, welche Behandlung am besten zu Ihren Bedürfnissen passt.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-800 mb-2">Pflegetipps</h3>
              <p className="text-sm text-gray-600">
                Praktische Ratschläge für die optimale Vor- und Nachsorge Ihrer Behandlungen.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogCTA;