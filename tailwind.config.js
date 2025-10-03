/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./css/**/*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E1EEBC',   // Lightest sage
          100: '#d4e8b0',  // Very light sage
          200: '#b8dda0',  // Light sage
          300: '#90C67C',  // Medium-light sage
          400: '#7ab970',  // Medium sage
          500: '#67AE6E',  // Main sage green
          600: '#5a9d63',  // Darker sage
          700: '#4d8b58',  // Dark sage
          800: '#328E6E',  // Forest green
          900: '#2a7459',  // Darkest
        },
        sage: {
          DEFAULT: '#67AE6E',
          light: '#90C67C',
          lighter: '#E1EEBC',
          dark: '#328E6E',
        },
        dark: {
          bg: '#432323',       // Dark brown background
          surface: '#2F5755',  // Dark teal surface
          accent: '#5A9690',   // Medium teal accent
          text: '#E0D9D9',     // Light gray text
        }
      }
    },
  },
  plugins: [],
}
