/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#c9c6c5",
        "surface-tint": "#c9c6c5",
        "on-primary-fixed-variant": "#474646",
        "surface-variant": "#343535",
        "on-surface": "#e3e2e2",
        "on-tertiary": "#3c0091",
        "on-error-container": "#ffdad6",
        "tertiary-fixed": "#e9ddff",
        "surface-bright": "#383939",
        "on-secondary-fixed-variant": "#004395",
        "on-tertiary-fixed": "#23005c",
        "secondary": "#adc6ff",
        "tertiary": "#d0bcff",
        "primary-container": "#0a0a0a",
        "on-primary-container": "#7b7979",
        "secondary-container": "#0566d9",
        "on-surface-variant": "#c4c7c7",
        "on-secondary": "#002e6a",
        "inverse-on-surface": "#2f3131",
        "background": "#121414",
        "on-secondary-container": "#e6ecff",
        "tertiary-fixed-dim": "#d0bcff",
        "surface-container": "#1e2020",
        "outline": "#8e9192",
        "on-error": "#690005",
        "error": "#ffb4ab",
        "surface-container-highest": "#343535",
        "secondary-fixed-dim": "#adc6ff",
        "primary-fixed-dim": "#c9c6c5",
        "on-tertiary-fixed-variant": "#5516be",
        "surface": "#1a1a1a",
        "surface-container-high": "#292a2a",
        "secondary-fixed": "#d8e2ff",
        "text-primary": "#ffffff",
        "surface-container-low": "#1a1c1c",
        "surface-dim": "#121414",
        "inverse-primary": "#5f5e5e",
        "on-tertiary-container": "#895af4",
        "inverse-surface": "#e3e2e2",
        "on-secondary-fixed": "#001a42",
        "tertiary-container": "#0e002f",
        "on-background": "#e3e2e2",
        "on-primary": "#313030",
        "outline-variant": "#444748",
        "error-container": "#93000a",
        "on-primary-fixed": "#1c1b1b",
        "border-subtle": "#2e2e2e",
        "text-secondary": "#a1a1a1",
        "surface-container-lowest": "#0d0e0f",
        "primary-fixed": "#e5e2e1"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "40px",
        "gutter": "24px",
        "unit": "8px",
        "container-max": "1200px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "display-lg": ["Geist", "sans-serif"],
        "headline-sm": ["Geist", "sans-serif"],
        "body-md": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "display-lg-mobile": ["Geist", "sans-serif"],
        "label-md": ["JetBrains Mono", "monospace"],
        "headline-md": ["Geist", "sans-serif"],
        "label-sm": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "headline-sm": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-lg-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "headline-md": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }]
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      transitionDuration: {
        "180": "180ms",
        "360": "360ms"
      },
      boxShadow: {
        "ambient": "0px 4px 20px rgba(0,0,0,0.5)",
        "glow": "0px 0px 15px rgba(59, 130, 246, 0.3)"
      }
    }
  },
  plugins: [],
}