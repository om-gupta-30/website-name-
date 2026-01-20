module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        dark: "var(--dark)",
        light: "var(--light)",
        muted: "var(--muted)",
      },
      fontFamily: {
        brand: ["Montserrat", "Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 25px 65px rgba(12, 2, 3, 0.3)",
      },
    },
  },
  plugins: [],
};
