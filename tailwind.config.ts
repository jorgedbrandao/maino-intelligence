import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          10: "#A3C9F0",
          20: "#2E73B8",
          30: "#1C5B99",
          40: "#033860",
          50: "#092441",
        },
        secondary: {
          10: "#C4EDC0",
          20: "#6ED161",
          30: "#41AE32",
          40: "#2A7221",
          50: "#1E441E",
        },
        grey: {
          "00": "#FFFFFF",
          10: "#F8F8F8",
          15: "#F0F0F0",
          20: "#E3E3E3",
          30: "#D4D4D4",
          40: "#C1C1C1",
          50: "#979899",
          60: "#727273",
          70: "#535353",
          80: "#393939",
          90: "#242424",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
