import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG = {
	collectionName: "SAP-icons",
	versions: ["v4", "v5"],
};

async function sortIconData(version) {
	const filePath = join(__dirname, `../../src/${version}/${CONFIG.collectionName}.json`);

	// Read the JSON file
	const fileContent = await readFile(filePath, "utf-8");
	const iconData = JSON.parse(fileContent);

	// Sort the data object alphabetically by icon name
	const sortedData = Object.keys(iconData.data)
		.sort()
		.reduce((acc, key) => {
			acc[key] = iconData.data[key];
			return acc;
		}, {});

	// Replace the data with sorted data
	iconData.data = sortedData;

	// Write back to file
	const content = JSON.stringify(iconData, null, 2);
	await writeFile(filePath, content + "\n", "utf-8");

	console.log(`✓ Sorted ${filePath}`);
	console.log(`  Total icons: ${Object.keys(sortedData).length}`);
}

async function sortAllIcons() {
	try {
		console.log("Sorting icon data keys...");
		await Promise.all(CONFIG.versions.map(sortIconData));
		console.log("✓ All icon files sorted successfully");
	} catch (error) {
		console.error("✗ Error sorting icons:", error);
		process.exit(1);
	}
}

sortAllIcons();
