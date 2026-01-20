"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ5yKVRH9ln0cRJVfC8beejys';

type Step = 'rating' | 'feedback' | 'success' | 'redirect';

const treatmentOptions = [
  'Botox / Muskelrelaxans',
  'Hyaluron-Filler',
  'Lippen aufspritzen',
  'PRP / Vampir-Lifting',
  'Mesotherapie',
  'Andere Behandlung',
];

export default function BewertungPage() {
  const [step, setStep] = useState<Step>('rating');
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [treatment, setTreatment] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [contactPermission, setContactPermission] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);

    // Short delay for animation, then route
    setTimeout(() => {
      if (selectedRating >= 4) {
        setStep('redirect');
        // Redirect to Google after showing thank you
        setTimeout(() => {
          window.location.href = GOOGLE_REVIEW_URL;
        }, 2000);
      } else {
        setStep('feedback');
      }
    }, 600);
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          treatment_type: treatment,
          improvement_suggestion: suggestion,
          contact_permission: contactPermission,
          contact_email: contactPermission ? contactEmail : null,
        }),
      });

      if (response.ok) {
        setStep('success');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-white to-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {/* Step 1: Star Rating */}
          {step === 'rating' && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg ring-4 ring-primary/20">
                  <Image
                    src="/images/logo.jpg"
                    alt="Hautschimmer"
                    width={80}
                    height={80}
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl text-foreground mb-3"
              >
                Wie war Ihre Erfahrung?
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-foreground/60 mb-10 text-lg"
              >
                Ihre Meinung ist uns wichtig
              </motion.p>

              {/* Star Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-2 md:gap-3 mb-8"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full transition-all"
                  >
                    <Star
                      size={48}
                      className={`transition-all duration-200 ${
                        star <= displayRating
                          ? 'fill-primary text-primary drop-shadow-lg'
                          : 'text-secondary/60 hover:text-secondary'
                      }`}
                      strokeWidth={1.5}
                    />
                    {star <= displayRating && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Rating Labels */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-8"
              >
                {displayRating > 0 && (
                  <motion.p
                    key={displayRating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-lg font-medium ${
                      displayRating >= 4 ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    {displayRating === 1 && 'Sehr unzufrieden'}
                    {displayRating === 2 && 'Unzufrieden'}
                    {displayRating === 3 && 'Okay'}
                    {displayRating === 4 && 'Zufrieden'}
                    {displayRating === 5 && 'Sehr zufrieden'}
                  </motion.p>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-foreground/40 text-sm mt-8"
              >
                Tippen Sie auf einen Stern
              </motion.p>
            </motion.div>
          )}

          {/* Step 2: Feedback Form (1-3 stars) */}
          {step === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={star <= rating ? 'fill-primary text-primary' : 'text-secondary/30'}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                    Danke für Ihr Feedback
                  </h2>
                  <p className="text-foreground/60">
                    Helfen Sie uns, besser zu werden
                  </p>
                </div>

                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  {/* Treatment Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-3">
                      Welche Behandlung hatten Sie?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {treatmentOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setTreatment(option)}
                          className={`p-3 text-sm rounded-xl border-2 transition-all ${
                            treatment === option
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-secondary/20 text-foreground/70 hover:border-secondary/40'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Improvement Suggestion */}
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-3">
                      Was können wir verbessern?
                    </label>
                    <textarea
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      placeholder="Ihre ehrliche Meinung hilft uns sehr..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-secondary/20 focus:border-primary focus:ring-0 bg-background/50 text-foreground placeholder:text-foreground/40 resize-none transition-colors"
                    />
                  </div>

                  {/* Contact Permission */}
                  <div className="bg-secondary/10 rounded-xl p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contactPermission}
                        onChange={(e) => setContactPermission(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-secondary/30 text-primary focus:ring-primary/50"
                      />
                      <span className="text-sm text-foreground/70">
                        Ich möchte kontaktiert werden, um das Problem zu lösen
                      </span>
                    </label>

                    <AnimatePresence>
                      {contactPermission && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="Ihre E-Mail-Adresse"
                            className="w-full mt-3 px-4 py-3 rounded-xl border-2 border-secondary/20 focus:border-primary focus:ring-0 bg-white text-foreground placeholder:text-foreground/40 transition-colors"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-foreground text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Feedback senden <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success (after feedback submission) */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="text-green-600" size={48} />
              </motion.div>

              <h2 className="font-serif text-3xl text-foreground mb-4">
                Vielen Dank!
              </h2>
              <p className="text-foreground/60 text-lg mb-8 max-w-sm mx-auto">
                Ihr Feedback hilft uns, unseren Service kontinuierlich zu verbessern.
              </p>

              {contactPermission && (
                <p className="text-primary text-sm">
                  Wir melden uns in Kürze bei Ihnen.
                </p>
              )}
            </motion.div>
          )}

          {/* Step 4: Redirect to Google (4-5 stars) */}
          {step === 'redirect' && (
            <motion.div
              key="redirect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Heart className="text-primary fill-primary" size={48} />
              </motion.div>

              <h2 className="font-serif text-3xl text-foreground mb-4">
                Das freut uns sehr!
              </h2>
              <p className="text-foreground/60 text-lg mb-8 max-w-sm mx-auto">
                Sie werden zu Google weitergeleitet, um Ihre Bewertung zu teilen.
              </p>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center justify-center gap-2 text-primary"
              >
                <span>Weiterleitung</span>
                <ArrowRight size={20} />
              </motion.div>

              <a
                href={GOOGLE_REVIEW_URL}
                className="inline-block mt-6 text-sm text-foreground/50 hover:text-primary transition-colors"
              >
                Falls Sie nicht automatisch weitergeleitet werden, klicken Sie hier
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
