import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: {
          DEFAULT: colors.slate[950],
          dark: '#000000',
        },
        foreground: colors.slate[200],
        primary: colors.blue[600],
        secondary: colors.cyan[600],
        card: {
          lightest: colors.slate[700],
          light: colors.slate[800],
          DEFAULT: colors.slate[900],
        },
        danger: colors.red[600],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
  safelist: [
    {
      pattern: /(stroke|fill|bg|text|border)-[a-zA-Z0-9_.-]*$/,
    },
  ],
}
export default config
