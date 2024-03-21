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
        'blue-padrao': '#06AED5',
        'yellow-padrao': '#F0C808',
        'orange-padrao': '#F34213',
        'orange-light': '#F5680A',
        'blue-secundario': '#086788',
        light: '#FFF1D0',
        'dark-shadow': 'rgba(0, 0, 0, 0.5)',
      },
      screens: {
        sm: '640px',
        'sm-xl': '700px',
        md: '1000px',
        lg: '1200px',
        xl: '1500px',
        '2xl': '2000px',
      },
    },
  },
  plugins: [],
}
export default config
