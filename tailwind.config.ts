import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'rgba-white': 'rgba(255, 255, 255, 0.70)',
      },
      boxShadow: {
        '4xl':'0 5px 30px -15px rgba(0, 0, 0, 0.3)'
      }, 
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [],
}
export default config
