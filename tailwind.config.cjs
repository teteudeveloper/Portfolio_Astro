/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'bg-dark': '#000000',
        'text-light': '#000000',
        'text-dark': '#ffffff',
        'gray-border': '#e5e5e5',
        'gray-dark-border': '#333333',
      },
    },
  },
  plugins: [],
}