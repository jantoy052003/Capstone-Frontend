/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar' : '#444648',
        'bg-input' : '#2c2e30',
        'bg-focus' : '#33373A',
        'idle' : '#e0e0e0',
        'body' : '#1D1F21'
      },
    },
  },
  plugins: [],
}

