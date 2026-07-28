// vite.config.js
import virtualIndex from '../lib/dev-server/virtual-index-html-plugin.mjs';

export default {
	build: {
		emptyOutDir: false,
	},
	plugins: [virtualIndex()],
};
