import svg from '@poppanator/sveltekit-svg';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			// Kit 3 polls hourly by default. Keep the previous off-by-default behavior.
			version: {
				pollInterval: 0
			}
		}),
		svg({
			includePaths: ['./src/lib/icons/'],
			// Bare `*.svg` imports stay URLs. `?component` inlines the file.
			type: 'url'
		})
	]
});
