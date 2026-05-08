import postcss from "postcss";

/**
 * Merges two CSS theme files (light and dark) into a single file using
 * CSS light-dark() for color values and space toggles for non-color values.
 *
 * The space toggle pattern uses --_ui5-dark-scheme / --_ui5-light-scheme,
 * following the same approach as the compact/cozy density toggles.
 *
 * @param {string} lightCSS - The light theme CSS string
 * @param {string} darkCSS - The dark theme CSS string
 * @param {string} selector - The selector to match (":root" for theming package, ":host" for component packages)
 * @returns {string} Merged CSS string with light-dark() and space toggle values
 */
const mergeLightDark = (lightCSS, darkCSS, selector = ":root") => {
	const lightRoot = postcss.parse(lightCSS);
	const darkRoot = postcss.parse(darkCSS);

	// Extract all custom property declarations from each theme
	const lightVars = extractVars(lightRoot, selector);
	const darkVars = extractVars(darkRoot, selector);

	// Build merged declarations
	const allProps = new Set([...lightVars.keys(), ...darkVars.keys()]);
	const mergedRule = postcss.rule({ selector });

	for (const prop of allProps) {
		const lightVal = lightVars.get(prop);
		const darkVal = darkVars.get(prop);

		if (prop.startsWith("--sapThemeMetaData")) {
			// Keep light version only for metadata
			if (lightVal !== undefined) {
				mergedRule.append(postcss.decl({ prop, value: lightVal }));
			}
			continue;
		}

		if (lightVal !== undefined && darkVal !== undefined) {
			if (lightVal === darkVal) {
				// Identical values - output once
				mergedRule.append(postcss.decl({ prop, value: lightVal }));
			} else if (isColorValue(lightVal) && isColorValue(darkVal)) {
				// Different color values - use light-dark()
				mergedRule.append(postcss.decl({ prop, value: `light-dark(${lightVal}, ${darkVal})` }));
			} else {
				// Different non-color values - use space toggle
				mergedRule.append(postcss.decl({
					prop,
					value: `var(--_ui5-light-scheme, ${lightVal}) var(--_ui5-dark-scheme, ${darkVal})`,
				}));
			}
		} else if (lightVal !== undefined) {
			// Only in light theme - use space toggle with guaranteed-invalid for dark
			mergedRule.append(postcss.decl({
				prop,
				value: `var(--_ui5-light-scheme, ${lightVal}) var(--_ui5-dark-scheme, var(--_ui5-f2d95f8))`,
			}));
		} else {
			// Only in dark theme - use space toggle with guaranteed-invalid for light
			mergedRule.append(postcss.decl({
				prop,
				value: `var(--_ui5-dark-scheme, ${darkVal}) var(--_ui5-light-scheme, var(--_ui5-f2d95f8))`,
			}));
		}
	}

	return mergedRule.toString();
};

/**
 * Extract custom property declarations from a parsed CSS root for a given selector.
 * @param {postcss.Root} root
 * @param {string} selector
 * @returns {Map<string, string>}
 */
const extractVars = (root, selector) => {
	const vars = new Map();
	root.walkRules(rule => {
		if (rule.selector === selector) {
			rule.walkDecls(decl => {
				if (decl.prop.startsWith("--")) {
					vars.set(decl.prop, decl.value);
				}
			});
		}
	});
	return vars;
};

/**
 * Heuristic to determine if a CSS value is a color value.
 * light-dark() only works with <color> values.
 */
const isColorValue = (value) => {
	const v = value.trim().toLowerCase();

	// hex colors
	if (/^#[0-9a-f]{3,8}$/.test(v)) return true;

	// rgb/rgba/hsl/hsla functions
	if (/^(rgba?|hsla?|oklch|oklab|lab|lch|color)\s*\(/.test(v)) return true;

	// transparent and common CSS color keywords
	if (v === "transparent" || v === "currentcolor") return true;

	// Named CSS colors - check for common ones used in SAP themes
	const namedColors = new Set([
		"black", "white", "red", "green", "blue", "yellow", "orange", "purple",
		"pink", "gray", "grey", "brown", "cyan", "magenta", "lime", "navy",
		"teal", "aqua", "silver", "maroon", "olive", "fuchsia",
	]);
	if (namedColors.has(v)) return true;

	// var() references to SAP color variables
	// Match patterns like var(--sapXxxColor), var(--sapXxx_Background), etc.
	if (/^var\(--sap\w*(Color|Background|BorderColor|TextColor|IconColor|ForegroundColor|HoverColor|ActiveColor|SelectedColor|Shadow)\w*\)$/.test(value.trim())) return true;

	// Compound values containing color-related var() references
	// e.g., "0.0625rem solid var(--sapContent_FocusColor)"
	if (/var\(--sap\w*(Color|BorderColor|TextColor|IconColor|ForegroundColor|SelectedColor)\w*\)/.test(value)) {
		// If the value also contains dimensional tokens, it's likely a shorthand (border, box-shadow)
		// These are NOT pure color values - light-dark() won't work
		if (/\d+(\.\d+)?(rem|px|em|%)/.test(value)) return false;
		return true;
	}

	return false;
};

export { mergeLightDark, isColorValue };
