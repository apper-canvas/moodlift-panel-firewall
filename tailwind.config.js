/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B5B95',
        secondary: '#88B0D3',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FC',
        success: '#82B366',
        warning: '#F4A460',
        error: '#DC6B6B',
        info: '#6B9BD1',
        // Mood-specific colors
        happy: {
          bg: '#FFE5B4',
          card: '#FFF8DC',
          text: '#8B4513',
          accent: '#FF8C00'
        },
        sad: {
          bg: '#E6F3FF',
          card: '#F0F8FF',
          text: '#4682B4',
          accent: '#87CEEB'
        },
        love: {
          bg: '#FFE4E6',
          card: '#FFF0F1',
          text: '#DC143C',
          accent: '#FF69B4'
        },
        angry: {
          bg: '#FFE6E6',
          card: '#FFF5F5',
          text: '#B22222',
          accent: '#FF4500'
        },
        cool: {
          bg: '#E0F2E7',
          card: '#F0FFF0',
          text: '#2E8B57',
          accent: '#00CED1'
        },
        calm: {
          bg: '#F0E6FF',
          card: '#F8F0FF',
          text: '#9370DB',
          accent: '#DDA0DD'
        }
      },
      fontFamily: {
        display: ['Quicksand', 'ui-sans-serif', 'system-ui'],
        body: ['Open Sans', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(107, 91, 149, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(107, 91, 149, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}