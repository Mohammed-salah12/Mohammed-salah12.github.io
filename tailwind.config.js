/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effcf7',
          100: '#d7f7eb',
          200: '#b2eed8',
          300: '#7addbd',
          400: '#3fc495',
          500: '#18a874',
          600: '#0c885f',
          700: '#0b6c4d',
          800: '#0b563f',
          900: '#0c4735',
        },
        sand: {
          50: '#fff9ef',
          100: '#fff1d5',
          200: '#ffe3a8',
          300: '#ffd172',
          400: '#ffbb3f',
          500: '#f79d18',
          600: '#db780f',
        },
        ink: {
          900: '#11232c',
          800: '#1b3340',
          700: '#284956',
          600: '#3e6470',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(17, 35, 44, 0.12)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(24,168,116,0.16), transparent 40%), radial-gradient(circle at bottom left, rgba(247,157,24,0.14), transparent 35%)',
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
