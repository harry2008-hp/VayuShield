/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aqi: {
          good: "#10b981",       // Green
          moderate: "#f59e0b",   // Amber
          unhealthyGroup: "#f97316", // Orange
          unhealthy: "#ef4444",   // Red
          veryUnhealthy: "#8b5cf6", // Purple
          hazardous: "#7f1d1d",  // Deep Maroon
        }
      }
    },
  },
  plugins: [],
}
