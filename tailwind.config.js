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
          dark: '#0a1f2e',
          hover: '#08243e',
          50: '#e8f0f7',
          100: '#d1e0ef',
          900: '#0B2F4F'
        },
        secondary: {
          DEFAULT: '#F58220',
          hover: '#d96d15',
          light: '#ff9a47',
          dark: '#c26a1a'
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
          secondary: '#6B7280',
          muted: '#9CA3AF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
        md: '8px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #0B2F4F 0%, #1e5a7a 50%, #8b6f47 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
