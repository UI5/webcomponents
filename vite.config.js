import { defineConfig } from 'vite';
import virtualIndex from "@ui5/webcomponents-tools/lib/dev-server/virtual-index-html-plugin.js";
import customHotUpdate from "@ui5/webcomponents-tools/lib/dev-server/custom-hot-update-plugin.js";
import path, { dirname, join, resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

// use after path.join and path.resolve as they turn paths to windows separators and comparisons and replacements stop working
const toPosixPath = (pathStr) => {
	return pathStr.split(path.sep).join(path.posix.sep);
}

const customResolver = (id, source, options) => {
	// jsx-dev-runtime should be resolved as a .ts file so all of its imports are also fetched as .ts files
	if (id === "@ui5/webcomponents-base/jsx-dev-runtime") {
		const importerRoot = source.replace(/packages\/.*/, "packages");
		const resolved = join(importerRoot, "base/src", "jsx-dev-runtime.ts");
		return resolved;
	}
	const isIconImporter = source.includes("packages/icons") || source.includes("packages/icons-tnt/") || source.includes("packages/icons-business-suite/")
	if (isIconImporter && id.startsWith("@ui5/webcomponents-base/dist")) {
		const importerRoot = source.replace(/packages\/icons.*/, "packages");
		const resolved = join(importerRoot, "base/src", id.replace("@ui5/webcomponents-base/dist/", "")).replace(".js", ".ts");
		return resolved;
	}

	if (isIconImporter && id.startsWith("../generated")) {
		let absoluteId = join(dirname(source), id);
		// join returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
		absoluteId = toPosixPath(absoluteId);
		const resolved = absoluteId.replace("/dist/", "/src/").replace(/\.js$/, ".ts");
		return resolved;
	}

	// json files are always in dist, this saves a separate copy task
	if (id.endsWith(".json")) {
		let absoluteId = join(dirname(source), id);
		// join returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
		absoluteId = toPosixPath(absoluteId);
		const resolved = absoluteId.replace("/src/", "/dist/");
		return resolved;
	}

	if (id.startsWith("./") || id.startsWith("../")) {
		//   `/sap/base/` and `sap/ui/core/` files imported from `src` are actually in dist
		//   except 4 files with are ts files in src and could be imported from `dist`
		let absoluteId = resolve(dirname(source), id);
		// resolve returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
		absoluteId = toPosixPath(absoluteId);
		if (absoluteId.includes("/sap/base/") || absoluteId.includes("/sap/ui/core/")) {
			const virtSource = source.replace(/packages\/(\w+)\/src\//, "packages/$1/dist/");
			let resolved = join(dirname(virtSource), id);
			// join returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
			resolved = toPosixPath(resolved);
			if (resolved.endsWith("localization/dist/sap/ui/core/Core.js") && resolved.includes("/dist/")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/base/i18n/Localization.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/ui/core/Configuration.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/ui/core/FormatSettings.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/base/util/LoaderExtensions.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/base/util/ObjectPath.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			if (resolved.endsWith("localization/dist/sap/base/i18n/Formatting.js")) {
				resolved = resolved.replace("/dist/", "/src/").replace(".js", ".ts");
			}
			return resolved;
		}
	}

	// relative imports from fiori src that are to a folder starting with `illustrations` are in dist
	if (source.includes("fiori/src/") && id.includes("/illustrations") && !id.includes("AllIllustrations") && id.startsWith(".")) {
		let absoluteId = resolve(dirname(source), id);
		// join returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
		absoluteId = toPosixPath(absoluteId);
		const resolved = absoluteId.replace("/src/", "/dist/");
		return resolved;
	}

	// generated illustrations search for i18n texts which are in `src/generated`
	if (source.includes("fiori/dist/illustrations") && id.startsWith("../generated")) {
		let absoluteId = join(dirname(source), id);
		// join returns paths with \\ on windows, so the replaces won't work unless converted to posix paths /
		absoluteId = toPosixPath(absoluteId);
		const resolved = absoluteId.replace("/dist/", "/src/").replace(/\.js$/, ".ts");
		return resolved;
	}

	if (source.includes("fiori/dist/illustrations") && id.startsWith("@ui5/webcomponents-base/dist")) {
		const importerRoot = source.replace(/packages\/fiori.*/, "packages");
		const resolved = join(importerRoot, "base/src", id.replace("@ui5/webcomponents-base/dist/", "")).replace(".js", ".ts");
		return resolved;
	}
}
export default defineConfig(async () => {
	return {
		build: {
			emptyOutDir: false,
		},
		plugins: [
			await virtualIndex(),
			tsconfigPaths(),
			customHotUpdate(),
			!process.env.UI5_BASE && checker({
				// e.g. use TypeScript check
				typescript: {
					tsconfigPath: "packages/fiori/tsconfig.json",
					buildMode: true,
				}
			}),
			istanbul({
				include: ['packages/**/src/*','src/*'],
				exclude: ['node_modules', 'test/'],
				extension: ['.js', '.ts', '.tsx'],
				requireEnv: true,
				cypress: true,
			}),
		],
		resolve: {
			alias: [
				// { find: /\@ui5\/webcomponents-base\/dist\/(.*)/, replacement: "../base/src/$1" },
				// { find: /\@ui5\/webcomponents-icons\/dist\/(.*)/, replacement: "../icons/src/$1" },
				// { find: /\@ui5\/webcomponents-icons-tnt\/dist\/(.*)/, replacement: "../icons-tnt/src/$1" },
				// { find: /\@ui5\/webcomponents-icons-business-suite\/dist\/(.*)/, replacement: "../icons-business-suite/src/$1" },
				{ find: /(\@ui5)(.*)/, replacement: "$1$2", customResolver },
				{ find: /(..\/generated)(.*)/, replacement: "$1$2", customResolver },
				// ../sap files are in dist, not src
				{ find: /^(\..*)/, replacement: "$1", customResolver },
			],
		}
	}
});
