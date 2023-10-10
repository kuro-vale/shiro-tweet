/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "lg": {"max": "1200px"},
      "md": {"max": "1000px"},
      "sm": {"max": "600px"},
      "xs": {"max": "500px"},
      "ht": {"raw": "(max-height: 800px)"},
    },
    colors: {
      "primary": "rgb(29, 155, 240)",
      "secondary": "rgb(113, 118, 123)",
      "white": "white",
      "black": "black",
      "google": "rgb(60, 64, 67)",
      "hover-pop": "rgb(22, 24, 28)",
      "hover-black": "rgba(239, 243, 244, 0.1)",
      "hover-login": "rgba(29, 155, 240, 0.1)",
      "hover-primary": "rgb(26, 140, 216)",
      "hover-white": "rgb(215, 219, 220)",
    }
  },
  plugins: [],
};

