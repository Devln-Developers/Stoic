// Typography tokens derived from the Figma design system (Aurylius Website)
// Use these to ensure consistent type across all pages and components.

export const fontFamily = {
  sans: "Inter, Arial, sans-serif",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  black: 900,
} as const;

export const fontSize = {
  hero: "120px",     // Hero heading (STOIC MINDSET)
  h1: "96px",        // Large section headings
  h2: "64px",        // Section headings
  h3: "48px",        // Sub-section headings
  h4: "32px",        // Card / block headings
  xl: "20px",        // Large body / label
  lg: "16px",        // Body large
  base: "14px",      // Body / UI default
  sm: "12px",        // Caption / helper text
} as const;

export const lineHeight = {
  hero: "128px",     // Paired with fontSize.hero
  h1: "104px",
  h2: "72px",
  h3: "56px",
  h4: "40px",
  xl: "28px",
  lg: "22px",
  base: "20px",
  sm: "16px",
} as const;

export const colors = {
  neutral: {
    white: "#FFFFFF",
    bodyText: "#747474",  // Secondary / muted text
    black: "#030303",     // Page background
    stroke: "#2D2D2D",    // Border / divider
  },
  golden: {
    100: "#FBBF24",       // Star ratings / accent
  },
} as const;

// Tailwind class shorthands for the most-used type styles
export const textStyles = {
  hero: "text-[120px] font-black leading-[128px] uppercase",
  h2: "text-[64px] font-black leading-[72px] uppercase",
  bodyLg: "text-[16px] font-normal leading-[22px]",
  body: "text-[14px] font-normal leading-[20px]",
  label: "text-[14px] font-semibold leading-[20px]",
  caption: "text-[12px] font-normal leading-[16px]",
  navLink: "text-[14px] font-medium leading-[20px]",
} as const;
