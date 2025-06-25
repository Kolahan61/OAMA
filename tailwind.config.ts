import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#060505',
          red: '#e31414',
          redHover: '#f34141',
          redMuted: '#a80e0e',
          white: '#ffffff',
          textMuted: '#bbbbbb',
          textDisabled: '#888888',
          surface: '#121212',
          border: '#1e1e1e',
        },
      },
      fontFamily: {
        heading: ['var(--font-bebas-neue)', 'sans-serif'],
        body: ['var(--font-roboto)', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config 