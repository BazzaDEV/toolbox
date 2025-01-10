import type { Config } from 'tailwindcss'
import { default as baseConfig } from '@repo/ui/tailwind'

export default {
  presets: [baseConfig],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        mono: ['var(--font-berkeley-mono)'],
      },
    },
  },
} satisfies Config
