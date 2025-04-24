/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				amber: {
					50: "#FFF8E1",
					400: "#FFD54F",
				},
			},
		},
	},
	plugins: [],
};
