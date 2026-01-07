/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B2F4F',
          hover: '#08243e'
        },
        secondary: {
          DEFAULT: '#F58220',
          hover: '#d96d15'
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#059669'
        },
        warning: '#F59E0B',
        error: '#EF4444',
        background: '#F4F7FA',
        surface: '#FFFFFF',
        text: {
          primary: '#111827',
          secondary: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
      }
    },
  },
  plugins: [],
}
