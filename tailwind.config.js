/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        "100": "100"
      },
      boxShadow: {
        "custom-shadow": "0 4px 8px rgba(0,0,0,0.3)"
      },
      colors: {
        'lightpink': "#F2F2F2",
        'lightblue': '#D1E4FF',
        'gray': '#43474E',
        'lightgray': '#E8E9EB',
        'setting': '#1A1C1E',
        'eventblue': "4A00FF"
      },
      borderWidth: {
        '5': '5px', // Add custom border width
      },
      borderColor: theme => ({
        ...theme('colors'), // Include existing theme colors
        'lightgray': theme('colors.lightgray'), // Use the existing gray color from the theme
      }),
    },
    
  },
  plugins: [],
}