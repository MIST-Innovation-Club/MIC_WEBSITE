/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0E1A",
          50: "#F4F6FC",
          100: "#E7ECFA",
          400: "#8C99BF",
          600: "#4A5786",
          800: "#182347",
          900: "#111830",
          950: "#0A0E1A",
        },
        brand: {
          DEFAULT: "#3B63E8",
          light: "#6B8CFF",
          dark: "#28409E",
        },
        circuit: {
          DEFAULT: "#E8A33D",
          light: "#F5C371",
          dark: "#B87A22",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(139,153,191,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,153,191,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(232,163,61,0.25)",
        "glow-blue": "0 0 40px rgba(59,99,232,0.3)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        traceFlow: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        traceFlow: "traceFlow 3s linear forwards",
      },
    },
  },
  plugins: [],
};
