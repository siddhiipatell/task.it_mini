// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-1': 'var(--primary-1)',
        'primary-translucent': 'var(--primary-translucent)',
      },
      backgroundImage: {
        'primary-gradient': 'var(--primary-gradient)',
      },
      minHeight: {
        '2': '40px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
