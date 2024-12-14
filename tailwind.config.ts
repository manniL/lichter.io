import tailwindTypography from '@tailwindcss/typography'
import tailwindForms from '@tailwindcss/forms'
import { typographyStyles } from './typography.js'
import type { Config } from "tailwindcss/types/config.js";

const config: Partial<Config> = {
  plugins: [tailwindTypography, tailwindForms],
  theme: {
    typography: typographyStyles,
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      animation: {
        "bg-shift": "bg-shift 2s linear infinite",
        "pulse-slow": "pulse 3s linear infinite",
      },
      keyframes: {
        "bg-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
};

export default config