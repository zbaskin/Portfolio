
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          dark: '#0369a1'
        }
      }
    }
  },
  plugins: []
} satisfies Config
