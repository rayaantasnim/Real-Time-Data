tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          accent: "#00f0ff",
        },
        brand: {
          dark: "#020617",
          card: "#090d16",
          blue: "#0072ff",
          glow: "rgba(0, 240, 255, 0.3)",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(0, 240, 255, 0.35)",
        "neon-lg": "0 0 50px rgba(0, 240, 255, 0.5)",
        "cyan-glow": "0 0 15px rgba(0, 240, 255, 0.25)",
      },
    },
  },
};
