/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D3748",     // Cool slate gray
        secondary: "#718096",   // Medium cool gray
        accent: "#A0AEC0",      // Light cool gray
        highlight: "#E2E8F0",   // Very light gray
        dark: "#1A202C",        // Deep charcoal
        light: "#F7FAFC"        // Clean cool white
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        serif: ['var(--font-playfair-display)'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(113, 128, 150, 0.15)',
        'gold': '0 6px 25px rgba(113, 128, 150, 0.18), 0 2px 10px rgba(113, 128, 150, 0.25)',
        'glow': '0 0 15px rgba(113, 128, 150, 0.25), 0 0 5px rgba(113, 128, 150, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #718096 0%, #A0AEC0 100%)',
      },
    },
  },
  plugins: [],
};
