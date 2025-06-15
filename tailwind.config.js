import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './src/components/ui/**/*.{ts,tsx}',
        './node_modules/@radix-ui/**/*.{js,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config