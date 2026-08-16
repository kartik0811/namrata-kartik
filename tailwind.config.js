/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Soft, elegant wedding palette — tweak freely to match your theme.
        blush: "#f7d9d6",
        rose: "#e9a6a1",
        ivory: "#fffaf3",
        champagne: "#f4e4c9",
        gold: "#c8a15a",
        goldDark: "#a67c33",
        lavender: "#e3dcf2",
        peach: "#fbe0d0",
        cocoa: "#5b463b",
        wine: "#7a3b46",
      },
      fontFamily: {
        script: ["'Great Vibes'", "cursive"],
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(122, 59, 70, 0.25)",
        glow: "0 0 40px rgba(200, 161, 90, 0.45)",
      },
      backgroundImage: {
        "gradient-romance":
          "linear-gradient(135deg, #fffaf3 0%, #fbe0d0 35%, #f7d9d6 70%, #e3dcf2 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #c8a15a 0%, #f4e4c9 50%, #a67c33 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.06)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.06)" },
          "40%": { transform: "scale(1)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        heartbeat: "heartbeat 2.4s ease-in-out infinite",
        spinSlow: "spinSlow 24s linear infinite",
      },
    },
  },
  plugins: [],
};
