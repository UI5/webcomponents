// vite.config.js
import virtualIndex from '../lib/dev-server/virtual-index-html-plugin.js';

export default {
	build: {
		emptyOutDir: false,
	},
	plugins: [virtualIndex()],
};