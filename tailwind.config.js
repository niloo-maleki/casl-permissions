import plugin from "tailwindcss/plugin";
import { tokens } from "@shatel/ui-kit/dist/ui-tokens/token";

export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: tokens.color,
    textColor: {
      ...tokens.color.typography,
      cta: tokens.color.cta,
      action: tokens.color.actionResult,
    },
    borderColor: {
      ...tokens.borderColor,
      cta: tokens.color.cta,
      typography: tokens.color.typography,
    },
    backgroundColor: {
      ...tokens.color.background,
      cta: tokens.color.cta,
      main: tokens.color.main,
      hover: tokens.color.hover,
      action: tokens.color.actionResult,
    },
    borderRadius: tokens.borderRadius,
    borderWidth: tokens.borderWidth,
    screens: tokens.breakpoints,
    padding: tokens.spacing,
    margin: tokens.spacing,
    gap: tokens.spacing,
    extend: {
      width: {
        65: "260px",
        77: "308px",
        90: "360px",
      },
    },
  },
  plugins: [
    plugin(({ addVariant, matchVariant }) => {
      addVariant("child", "& > *");
    }),
  ],
};
