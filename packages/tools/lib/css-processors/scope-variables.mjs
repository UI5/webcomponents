import * as path from "path";
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Tries to detect an override for a package
 * @param {*} filePath For example: /my_project/src/themes/overrides/@ui5/webcomponents/my_custom_theme/parameters-bundle.css
 * @returns
 */
const getOverrideVersion = filePath => {
    if (!filePath) {
        return;
    }

	if (!filePath.includes(`overrides${path.sep}`)) {
		return; // The "overrides/" directory is the marker
	}
	const override = filePath.split(`overrides${path.sep}`)[1]; // For example, this will be: @ui5/webcomponents/my_custom_theme/parameters-bundle.css
	if (!override) {
		return; // There must be other directories after overrides/, the path can't end with it
	}
	const parts = override.split(path.sep);
	if (parts.length < 3) {
		return; // There must be at least a directory for the theme that is being overridden (my_custom_theme) and the name of the CSS file after the name of the package that is overridden
	}
	const packageName = parts.slice(0, -2).join(path.sep); // After the last 2 parts are removed (my_custom_theme and parameters-bundle.css from the example), the rest is the package

	let overrideVersion;
	try {
		overrideVersion = require(`${packageName}${path.sep}package.json`).version;
	} catch (e) {
		if (process.env.UI5_VERBOSE === "true") {
			console.log(`Error requiring package ${packageName}: ${e.message}`);
		}
	}

	return overrideVersion;
}

/**
 * `packageJSON` should reference the `package.json` of the base package,
 * as it serves as the starting point for every runtime and carries a unique version.
 * The `getScopedVarName` function is also defined in the base package
 * and is consumed by all other packages.
 *
 * Runtime (2.19.0)
 * - base (2.19.0)
 * - At least one of the following packages: ai / main / fiori / compat (2.19.0)
 * - Custom package (x.x.x)
 *
 * It is not possible to have a runtime with the main package at version 2.19.0
 * and the base package at a different version (e.g., 2.18.0),
 * because the main package depends on the base package.
 * Such a mismatch would create a new runtime.
 *
 * Therefore, we can safely assume that the base package version
 * matches the runtime version and can be reliably used for scoping.
 *
 * It is still needed for third-party packages that have not yet migrated to the
 * component-level variable approach.
 */

const scopeVariables = (cssText, packageJSON, inputFile) => {
    const escapeVersion = version => "v" + version?.replaceAll(/[^0-9A-Za-z\-_]/g, "-");
    const versionStr = escapeVersion(getOverrideVersion(inputFile) || packageJSON.version);

    const expr = /(--_?ui5)([^\,\:\)\s]+)/g;

    return cssText.replaceAll(expr, `$1-${versionStr}$2`);
}

export default scopeVariables;

