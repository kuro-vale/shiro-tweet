/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "xl": {"max": "1360px"},
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
      "border": "var(--color-border)"
    }
  },
  plugins: [],
};

