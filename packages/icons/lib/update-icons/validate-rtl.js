import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sapIconsPath = join(__dirname, "../../../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/SAP-icons.json");
const iconsMapPath = join(__dirname, "icons.json");

function normalizUnicode(unicode) {
	// icons.json uses 0x1eXXX, SAP-icons.json uses 0xeXXX — strip the leading '1'
	if (unicode.startsWith("0x1")) {
		return "0x" + unicode.slice(3);
	}
	return unicode;
}

async function validateRtl() {
	const sapIconsData = JSON.parse(await readFile(sapIconsPath, "utf-8"));
	const iconsMap = JSON.parse(await readFile(iconsMapPath, "utf-8"));

	const errors = [];

	for (const [iconName, unicode] of Object.entries(iconsMap)) {
		const startsWithOne = unicode.startsWith("0x1");
		const normalizedUnicode = normalizUnicode(unicode);
		const icon = sapIconsData[normalizedUnicode];

		if (!icon) {
			errors.push(`  [MISSING] "${iconName}" (${unicode}) not found in SAP-icons.json`);
			continue;
		}

		if (startsWithOne && icon.rtl !== "flip") {
			errors.push(`  [WRONG RTL] "${iconName}" (${unicode}) starts with 0x1 but has rtl="${icon.rtl}" (expected "flip")`);
		}
	}

	if (errors.length === 0) {
		console.log("✓ All RTL flags are correct.");
	} else {
		console.error(`✗ Found ${errors.length} RTL issue(s):\n`);
		errors.forEach(e => console.error(e));
		process.exit(1);
	}
}

validateRtl().catch(err => {
	console.error("✗ Error:", err);
	process.exit(1);
});
