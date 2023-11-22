/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage:{
        "close-menu": "url('../images/close.svg')",
        "open-menu": "url('../images/navigation.svg')"
      }
    },
  },
  plugins: [],
}
