import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        desktop: "1280px",
      },
    },
    extend: {
      width: {
        sideBar: "260px",
        sideBarResponsive: "76px",
      },
      boxShadow: {
        blue: "0 0 20px 0 rgba(37, 99, 235, 0.5)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          border: "hsl(var(--success-border))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          border: "hsl(var(--warning-border))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          border: "hsl(var(--error-border))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          border: "hsl(var(--info-border))",
        },
        "novel-highlight-purple": {
          DEFAULT: "hsl(var(--novel-highlight-purple-var))",
        },
        "novel-highlight-red": {
          DEFAULT: "hsl(var(--novel-highlight-red-var))",
        },
        "novel-highlight-gray": {
          DEFAULT: "hsl(var(--novel-highlight-gray-var))",
        },
        "novel-highlight-blue": {
          DEFAULT: "hsl(var(--novel-highlight-blue-var))",
        },
        "novel-highlight-green": {
          DEFAULT: "hsl(var(--novel-highlight-green-var))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} as Config);
