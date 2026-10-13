/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        /* Deep Navy + Electric Violet, with Cyan as a restrained secondary accent. */
        paper: "#0A1022", // main background (deep navy)
        section: "#0E1732", // alternate section background
        card: "#121C3C", // card surfaces
        ink: "#F8FAFC", // primary text
        slate2: "#CBD5E1", // body copy
        muted: "#94A3B8", // secondary text
        line: "#25315C", // borders
        accent: "#7C4DFF", // electric violet: fills, borders, glows
        violet: "#A98BFF", // lighter violet for text highlights
        cyan: "#22D3EE", // secondary accent: use sparingly
        accentSoft: "rgba(124, 77, 255, 0.15)",
        /* Button fill: electric violet with white labels at 4.9:1 (WCAG AA). */
        btn: "#7C4DFF",
        btnHover: "#6A3AF0",
      },
      fontFamily: {
        sans: ["Calibri", "Carlito", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Calibri", "Carlito", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      maxWidth: {
        shell: "1120px",
      },
    },
  },
  plugins: [],
};
