/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blurBackground: {
          DEFAULT: 'rgba(0, 0, 0, 0.5)', // Define color with alpha channel
        },
      },
    },
  },
  plugins: [],
};
