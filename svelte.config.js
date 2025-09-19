import { sveltePreprocess } from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: sveltePreprocess(),

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			precompress: true,
			strict: true
		}),
		alias: {
			"$styles": "src/styles"
		}
	}
};

export default config;
