/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette inspired by the reference image
        bg: "#0f0f0f", // dark background
        text: "#eaeaea", // off-white text
        muted: "#a1a1a1", // muted gray for secondary text
        accent: {
          DEFAULT: "#FF6B3D", // main orange accent
          200: "#FF835C", // lighter orange (borders/hover)
          700: "#E25A30", // deeper orange (active)
        },
        surface: {
          100: "#161616", // slightly lighter than bg
          200: "#1d1d1d",
        },
        mint: {
          200: "#CFE0D6", // pastel mint like the illustration bg
          300: "#BCD5C9",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "'Liberation Mono'",
          "'Courier New'",
          "monospace",
        ],
      },
      boxShadow: {
        card: "12px 12px 0 rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
