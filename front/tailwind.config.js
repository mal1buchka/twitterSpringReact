/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',  // Убедитесь, что Tailwind будет работать с файлами .jsx и .tsx
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }