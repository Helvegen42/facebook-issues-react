import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
      fontSize: {
        custom: "16px",
      },
    },
  },
  plugins: [typography],
};
