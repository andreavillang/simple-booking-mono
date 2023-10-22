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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: colors.slate[950],
        foreground: colors.slate[200],
        primary: colors.blue[600],
        secondary: colors.cyan[600],
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
