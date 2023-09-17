import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		fontFamily: {
			subsets: ["latin"],
			oswald: ["Oswald"],
			inter: ["Inter"],
			barlow: ["Barlow"],
		},
		colors: {
			primary: "#ff422e",
			secondary: "#202328",
			neutral: {
				100: "#fefefe",
				200: "#dfe2e6",
				300: "#abafb3",
				400: "#82878d",
				500: "#555b64",
				600: "#282d35",
				700: "#11161d",
				800: "#11161f",
				900: "#04080f",
			},
			black: colors.black,
			white: colors.white,
			gray: colors.slate,
			green: colors.emerald,
			purple: colors.violet,
			yellow: colors.amber,
			pink: colors.fuchsia,
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				oswald: ["var(--font-oswald)"],
				inter: ["var(--font-inter)"],
				barlow: ["var(--font-barlow)"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
