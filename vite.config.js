import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
// import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		laravel({ input: ['resources/frontend/main.tsx'], refresh: true }),
		react(),

		// Uncomment to analyze bundle size during "npm run build"
		// analyze({
		//   summaryOnly: true,
		//   limit: 100
		// }),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './resources/frontend'),
		},
	},
});
