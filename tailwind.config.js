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
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Warm food-inspired dark theme colors
        warm: {
          // Warm browns and beiges for backgrounds
          '50': '#fdf8f6',
          '100': '#f2e8e5',
          '200': '#eaddd7',
          '300': '#e0cec7',
          '400': '#d2bab0',
          '500': '#bfa094',
          '600': '#a18072',
          '700': '#977669',
          '800': '#846358',
          '900': '#43302b',
        },
        // Warm accent colors
        amber: {
          '50': '#fffbeb',
          '100': '#fef3c7',
          '200': '#fde68a',
          '300': '#fcd34d',
          '400': '#fbbf24',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f',
        },
        // Warm oranges
        orange: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed7aa',
          '300': '#fdba74',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          '700': '#c2410c',
          '800': '#9a3412',
          '900': '#7c2d12',
        },
        // Warm reds for food elements
        warmred: {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#dc2626',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d',
        },
        // Dark warm backgrounds
        dark: {
          '50': '#f8f5f0',
          '100': '#f0e6d6',
          '200': '#e6d4b8',
          '300': '#d9c19a',
          '400': '#c9a97c',
          '500': '#b8956a',
          '600': '#a67c5a',
          '700': '#8b5a3c',
          '800': '#6d4429',
          '900': '#4a2c1a',
        }
      }
    },
  },
  plugins: [],
}
