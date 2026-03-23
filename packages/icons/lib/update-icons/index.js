import { writeFile, readFile } from "fs/promises";
import { JSDOM } from "jsdom";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
	collectionName: "SAP-icons",
	packageName: "@ui5/webcomponents-icons",
	versions: ["v4", "v5"],
	svgPaths: {
		v4: join(__dirname, "../../../../node_modules/@sap-theming/theming-base-content/content/Base/icons/baseTheme/img"),
		v5: join(__dirname, "../../../../node_modules/@sap-theming/theming-base-content/content/Base/icons/sap_horizon/img"),
	},
};

async function extractSvgPath(iconName, version) {
	const svgBasePath = CONFIG.svgPaths[version];
	const svgFilePath = join(svgBasePath, `${iconName}.svg`);

	try {
		const svgContent = await readFile(svgFilePath, "utf-8");
		const dom = new JSDOM(svgContent, { contentType: "image/svg+xml" });
		const pathElements = dom.window.document.querySelectorAll("path");

		if (pathElements.length === 0) {
			throw new Error(`No path elements found in ${iconName}.svg (${version})`);
		}

		if (pathElements.length > 1) {
			throw new Error(`Multiple path elements found in ${iconName}.svg (${version}). Expected exactly one path element.`);
		}

		const pathData = pathElements[0].getAttribute("d");
		if (!pathData) {
			throw new Error(`Path element missing "d" attribute in ${iconName}.svg (${version})`);
		}

		return pathData;
	} catch (error) {
		if (error.code === "ENOENT") {
			throw new Error(`SVG file not found: ${svgFilePath}`);
		}
		throw error;
	}
}

async function generateIconData(version) {
	// Import the SAP-icons.json from theming-base-content
	const sapIconsPath = join(__dirname, "../../../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/SAP-icons.json");
	const sapIconsJson = await readFile(sapIconsPath, "utf-8");
	const sapIconsData = JSON.parse(sapIconsJson);

	// Import the acc mapping
	const accMappingPath = join(__dirname, "acc-mapping.json");
	const accMappingJson = await readFile(accMappingPath, "utf-8");
	const accMapping = JSON.parse(accMappingJson);

	// Transform the data
	const data = {};
	for (const unicode in sapIconsData) {
		const icon = sapIconsData[unicode];

		// Iterate over all names for this unicode
		if (icon.names.length > 1) {
			console.warn(`Warning: Icon with unicode ${unicode} has multiple names: ${icon.names.join(", ")}. All names will be included in the output.`);
		}
		for (const iconName of icon.names) {
			// Extract SVG path data
			const pathData = await extractSvgPath(iconName, version);

			const iconData = {
				path: pathData,
				viewBox: "0 0 16 16"
			};

			if (icon.rtl === "none") {
				iconData.ltr = true;
			}

			// Add acc if it exists in the mapping
			if (accMapping[iconName]) {
				iconData.acc = accMapping[iconName];
			}

			data[iconName] = iconData;
		}
	}

	// Sort the data object alphabetically by icon name
	const sortedData = Object.keys(data)
		.sort()
		.reduce((acc, key) => {
			acc[key] = data[key];
			return acc;
		}, {});

	return {
		collection: `${CONFIG.collectionName}-${version}`,
		packageName: CONFIG.packageName,
		version,
		versions: CONFIG.versions,
		data: sortedData,
	};
}

async function writeIconFile(version) {
	const data = await generateIconData(version);
	const filePath = join(__dirname, `../../src/${version}/${CONFIG.collectionName}.json`);
	const content = JSON.stringify(data, null, 2);

	await writeFile(filePath, content + "\n", "utf-8");
	console.log(`✓ Updated ${filePath}`);
}

async function detectIconChanges(version) {
	const filePath = join(__dirname, `../../src/${version}/${CONFIG.collectionName}.json`);

	try {
		// Read existing icon data
		const existingContent = await readFile(filePath, "utf-8");
		const existingData = JSON.parse(existingContent);
		const existingIcons = Object.keys(existingData.data);

		// Generate new icon data
		const newData = await generateIconData(version);
		const newIcons = Object.keys(newData.data);

		// Detect changes
		const added = newIcons.filter(icon => !existingIcons.includes(icon));
		const removed = existingIcons.filter(icon => !newIcons.includes(icon));

		// Detect potential renames (icons with similar names or same path data)
		const renamed = [];
		for (const removedIcon of removed) {
			const removedPath = existingData.data[removedIcon].path;
			for (const addedIcon of added) {
				const addedPath = newData.data[addedIcon].path;
				if (removedPath === addedPath) {
					renamed.push({ old: removedIcon, new: addedIcon });
					break;
				}
			}
		}

		// Remove renamed icons from added/removed lists
		const renamedOld = renamed.map(r => r.old);
		const renamedNew = renamed.map(r => r.new);
		const actuallyAdded = added.filter(icon => !renamedNew.includes(icon));
		const actuallyRemoved = removed.filter(icon => !renamedOld.includes(icon));

		return {
			version,
			added: actuallyAdded,
			removed: actuallyRemoved,
			renamed,
			hasChanges: actuallyAdded.length > 0 || actuallyRemoved.length > 0 || renamed.length > 0
		};
	} catch (error) {
		if (error.code === "ENOENT") {
			// File doesn't exist yet, this is a new installation
			return {
				version,
				added: [],
				removed: [],
				renamed: [],
				hasChanges: false
			};
		}
		throw error;
	}
}

function printChangeSummary(changes) {
	console.log("\n" + "=".repeat(60));
	console.log("ICON CHANGES DETECTED");
	console.log("=".repeat(60));

	for (const change of changes) {
		if (!change.hasChanges) continue;

		console.log(`\n${change.version.toUpperCase()}:`);

		if (change.added.length > 0) {
			console.log(`\n  ✚ Added (${change.added.length}):`);
			change.added.forEach(icon => console.log(`    - ${icon}`));
		}

		if (change.removed.length > 0) {
			console.log(`\n  ✖ Removed (${change.removed.length}):`);
			change.removed.forEach(icon => console.log(`    - ${icon}`));
		}

		if (change.renamed.length > 0) {
			console.log(`\n  ⟲ Renamed (${change.renamed.length}):`);
			change.renamed.forEach(r => console.log(`    - ${r.old} → ${r.new}`));
		}
	}

	console.log("\n" + "=".repeat(60));
	console.log("\nTo proceed with these changes, run:");
	console.log("  yarn update --force");
	console.log("=".repeat(60) + "\n");
}

async function updateIcons() {
	try {
		const hasForceFlag = process.argv.includes("--force");

		console.log("Checking for icon changes...");

		// Detect changes for all versions
		const allChanges = await Promise.all(CONFIG.versions.map(detectIconChanges));
		const hasAnyChanges = allChanges.some(change => change.hasChanges);

		if (hasAnyChanges && !hasForceFlag) {
			printChangeSummary(allChanges);
			process.exit(1);
		}

		if (hasAnyChanges) {
			console.log("\n--force flag provided. Proceeding with icon update...\n");
		} else {
			console.log("No icon changes detected. Proceeding with update...\n");
		}

		console.log("Updating icon files...");
		await Promise.all(CONFIG.versions.map(writeIconFile));
		console.log("✓ All icons updated successfully");
	} catch (error) {
		console.error("✗ Error updating icons:", error);
		process.exit(1);
	}
}

updateIcons();