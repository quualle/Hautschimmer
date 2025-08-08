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
        primary: "#3C322D",     // Deeper, richer brown
        secondary: "#D2B48C",   // Luxurious champagne gold
        accent: "#E6C9A8",      // Soft peach/rose gold
        highlight: "#F5E1C9",   // Delicate cream highlight
        dark: "#2A2420",        // Almost black-brown for contrast
        light: "#FFF9F4"        // Warmer, softer white
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        serif: ['var(--font-playfair-display)'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(210, 180, 140, 0.12)',
        'gold': '0 6px 25px rgba(210, 180, 140, 0.15), 0 2px 10px rgba(210, 180, 140, 0.2)',
        'glow': '0 0 15px rgba(210, 180, 140, 0.2), 0 0 5px rgba(210, 180, 140, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #D2B48C 0%, #E6C9A8 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
