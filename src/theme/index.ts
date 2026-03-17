import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff9e6" },
          100: { value: "#ffefb3" },
          200: { value: "#ffe580" },
          300: { value: "#ffdb4d" },
          400: { value: "#ffd11a" },
          500: { value: "#f5c518" },
          600: { value: "#cc9a00" },
          700: { value: "#997300" },
          800: { value: "#664d00" },
          900: { value: "#332600" },
          950: { value: "#1a1300" },
        },
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.950}" },
          fg: { value: "{colors.brand.600}" },
          muted: { value: "{colors.brand.200}" },
          subtle: { value: "{colors.brand.100}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});
