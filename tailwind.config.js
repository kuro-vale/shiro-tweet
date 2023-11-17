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
      "primary": "var(--color-primary)",
      "secondary": "var(--color-secondary)",
      "white": "white",
      "black": "black",
      "google": "var(--color-google)",
      "info": "var(--color-info)",
      "hover-black": "var(--color-hover-black)",
      "hover-login": "var(--color-hover-login)",
      "hover-primary": "var(--color-hover-primary)",
      "hover-white": "var(--color-hover-white)",
      "hover-gray": "var(--color-hover-gray)",
      "border": "var(--color-border)",
      "tag": "var(--color-tag)",
      "red": "var(--color-red)",
      "hover-red": "var(--color-hover-red)",
      "transparency": "var(--color-transparency)",
      "heart": "var(--color-heart)",
      "retweet": "var(--color-retweet)",
    }
  },
  plugins: [],
};

