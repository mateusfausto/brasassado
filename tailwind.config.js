/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['var(--font-body)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        ember: {
          50:  '#fff8f1',
          100: '#ffecd8',
          200: '#ffd4ad',
          300: '#ffb478',
          400: '#ff8a3d',
          500: '#ff6b1a',
          600: '#f04f0a',
          700: '#c73b09',
          800: '#9e3110',
          900: '#7f2c11',
          950: '#451308',
        },
        smoke: {
          50:  '#f7f6f4',
          100: '#ece9e4',
          200: '#d9d3cb',
          300: '#c0b6a9',
          400: '#a49585',
          500: '#8f7e6d',
          600: '#7d6b5c',
          700: '#68584d',
          800: '#574a42',
          900: '#4a3f39',
          950: '#27201c',
        },
        coal: {
          900: '#1a1208',
          950: '#0d0904',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#3d2e1e',
            '--tw-prose-headings': '#1a1208',
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
