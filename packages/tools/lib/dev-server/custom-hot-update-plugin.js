import fs from "fs";

/**
 * A change is observed on MacOS since 13.5, where the build generates a large amount
 * of JSON file that spotlight search has to index, as they are considered new files.
 *
 * Starting the vitejs dev server reads all of these files and this triggers the indexing.
 * The indexing has a side effect of changing some file metadata (can be checked with `mdls <path_to_file>`).
 * This metadata change is changing the ctime of the file, but not the mtime. This can be checked with `stat -x <path_to_file>
 *
 * Essentially only metadata is changed, not content. This should not cause a page refresh,
 * but chokidar reports this change and vite refreshes the page.
 * The indexing is running with a 10 second interval, so for roughtly 20 minutes vite is refreshing the page every 10 seconds
 *
 * This plugin checks if the file causing the refresh is a generated json file (dist/*.json) and if ctime is changed after mtime
 * In that case, returing an empty array tells vitejs that a custom update will be made by the plugin,
 * which is in effect ignoring the page refresh.
 */

const customHotUpdate = async () => {
	return {
		name: 'custom-hot-update',
		handleHotUpdate(ctx) {
			// custom check for generated json files
			if (ctx.file.endsWith(".json")) {
				const stat = fs.statSync(ctx.file);

				// metadata change only
				if (stat.ctime > stat.mtime) {
					// uncomment for debugging
					// console.log("ignoring hot update for:", ctx.file);
					return [];
				}
			}
		}
	}
};

export default customHotUpdate;
