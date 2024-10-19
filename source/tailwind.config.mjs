import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['Noto Sans JP Variable', ...defaultTheme.fontFamily.sans],
		},
		extend: {},
	},
	daisyui: {
		themes: ["garden"]
	},
	plugins: [
		require('daisyui'),
	],
}
