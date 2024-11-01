import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['JetBrains Mono', ...defaultTheme.fontFamily.sans],
				serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
			},
			colors: {
				'background-primary': 'rgb(var(--color-background-primary))',
				'text-primary': 'rgb(var(--color-text-primary))',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
