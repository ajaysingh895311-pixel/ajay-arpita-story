/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070d',
          900: '#0b0c17',
          800: '#111221',
          700: '#181a30',
          600: '#22243f',
        },
        rose: {
          200: '#f3d6d8',
          300: '#e9b8bd',
          400: '#dd949e',
          500: '#c96e7c',
        },
        gold: {
          200: '#f1e2c2',
          300: '#e4c98f',
          400: '#d4ac5f',
        },
        mist: '#efe9de',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wideish: '0.04em',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(228, 201, 143, 0.35)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-18px) translateX(6px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        twinkle: 'twinkle 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
