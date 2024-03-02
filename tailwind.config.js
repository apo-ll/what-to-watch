/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'azure-radiance': {
          '50': '#edfaff',
          '100': '#d6f3ff',
          '200': '#b5ecff',
          '300': '#83e2ff',
          '400': '#48cfff',
          '500': '#1eb1ff',
          '600': '#0694ff',
          '700': '#0080ff',
          '800': '#0861c5',
          '900': '#0d549b',
          '950': '#0e335d',
      },
      "variable-collection-color": "var(--variable-collection-color)",
      },
    },
  },
  plugins: [],
};
