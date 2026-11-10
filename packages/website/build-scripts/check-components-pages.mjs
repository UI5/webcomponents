/**
 * Preflight check: fail the build if any hand-authored MDX files still exist
 * under docs/_components_pages/.
 *
 * The old workflow required contributors to manually edit an MDX file in
 * _components_pages/ to add samples. The new workflow generates component pages
 * automatically from the Custom Elements Manifest (CEM) and samples.json.
 *
 * Migration guide
 * ---------------
 * To add or update samples for a component:
 *
 *   1. Create the sample files in docs/_samples/<package>/<Component>/<SampleName>/
 *      (sample.html, main.js, and optionally main.css + <SampleName>.md)
 *
 *   2. Register the sample in docs/components/<package>/samples.json:
 *      {
 *        "MyComponent": {
 *          "samples": [
 *            { "name": "Basic" },
 *            { "name": "MySample", "title": "My Feature", "description": "..." }
 *          ]
 *        }
 *      }
 *
 *   3. Delete the corresponding file from docs/_components_pages/ (it is no
 *      longer used and will block the build as long as it exists).
 *
 * The component page MDX is then generated automatically by running:
 *   yarn generate-api-reference
 */

import { existsSync, readdirSync, statSync } from "fs";
import path from "path";

const root = "./docs/_components_pages";

if (!existsSync(root)) {
	process.exit(0);
}

const collect = (dir) => {
	let found = [];
	for (const entry of readdirSync(dir)) {
		const full = path.join(dir, entry);
		if (statSync(full).isDirectory()) {
			found = found.concat(collect(full));
		} else if (entry.endsWith(".mdx") || entry.endsWith(".md")) {
			found.push(full);
		}
	}
	return found;
};

const stale = collect(root);

if (stale.length === 0) {
	process.exit(0);
}

console.error(`
ERROR: Found ${stale.length} hand-authored file(s) in docs/_components_pages/ that are no longer used.

Component pages are now generated automatically from the Custom Elements Manifest
(CEM) and docs/components/<package>/samples.json. The _components_pages/ directory
is obsolete — any files there will be ignored by the build.

Stale files:
${stale.map(f => `  ${f}`).join("\n")}

How to migrate each file:
  1. Move samples to  docs/_samples/<package>/<Component>/<SampleName>/
  2. Register them in docs/components/<package>/samples.json
  3. Delete the stale file from docs/_components_pages/

See docs/docs/08-contributing/04-website.md for the full workflow.
`);

process.exit(1);
