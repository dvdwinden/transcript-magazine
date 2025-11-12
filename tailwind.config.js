/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Family', 'Georgia', 'Times New Roman', 'Times', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1.3125rem',
            lineHeight: '1.5',
            color: '#222',
            maxWidth: '65ch',
            p: {
              marginBottom: '1.5rem',
            },
            'h2': {
              fontSize: 'clamp(1.75rem, 1.25rem + 1.5vw, 2.25rem)',
              fontWeight: '300',
              letterSpacing: '0.03em',
              marginBottom: '1rem',
              textWrap: 'pretty',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
