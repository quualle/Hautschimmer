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
        // Warmer palette
        primary: "#2F2A26",     // Warm dark taupe
        secondary: "#C0A080",   // Soft gold/taupe accent
        accent: "#E6D9C8",      // Warm beige
        highlight: "#F5EFE6",   // Warm light
        dark: "#1F1B18",        // Warm near-black
        light: "#FCFAF7"        // Warm white
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
        'gradient-luxury': 'linear-gradient(135deg, #C0A080 0%, #E6D9C8 100%)',
      },
    },
  },
  plugins: [],
};
