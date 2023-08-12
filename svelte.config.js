import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte"],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    alias: {
      "~": "./src",
    },
  },
};

export default config;
