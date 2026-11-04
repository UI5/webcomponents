import postcss from "postcss";

/**
 * Merges two CSS theme files (light and dark) into a single auto-theme file.
 *
 * Walks the entire CSS tree of both files without targeting a specific selector.
 * Every rule found (under any at-rule context) is merged by (atRuleContext, selector):
 *   - identical values  → base selector block
 *   - differing colors  → light-dark() in base selector block
 *   - differing other   → split into @media (prefers-color-scheme: light/dark) blocks
 *
 * @param {string} lightCSS
 * @param {string} darkCSS
 * @returns {string} Merged CSS string
 */
const mergeLightDark = (lightCSS, darkCSS) => {
	// Extract all custom property declarations from each theme
	const lightGroups = extractVarGroups(postcss.parse(lightCSS));
	const darkGroups = extractVarGroups(postcss.parse(darkCSS));

	const allContexts = new Set([...lightGroups.keys(), ...darkGroups.keys()]);
	const root = postcss.root();

	for (const context of allContexts) {
		const lightSelectors = lightGroups.get(context) ?? new Map();
		const darkSelectors = darkGroups.get(context) ?? new Map();

		const allSelectors = new Set([...lightSelectors.keys(), ...darkSelectors.keys()]);

		const sharedNodes = [];
		const lightNodes = [];
		const darkNodes = [];

		for (const selector of allSelectors) {
			const lightVars = lightSelectors.get(selector) ?? new Map();
			const darkVars = darkSelectors.get(selector) ?? new Map();

			const allProps = new Set([...lightVars.keys(), ...darkVars.keys()]);

			const sharedRule = postcss.rule({ selector });
			const lightRule = postcss.rule({ selector });
			const darkRule = postcss.rule({ selector });

			for (const prop of allProps) {
				const lightVal = lightVars.get(prop);
				const darkVal = darkVars.get(prop);

				if (prop.startsWith("--sapThemeMetaData")) {
					if (lightVal !== undefined) {
						sharedRule.append(postcss.decl({ prop, value: lightVal }));
					}
					continue;
				}

				if (lightVal !== undefined && darkVal !== undefined) {
					if (lightVal === darkVal) {
						// Identical values - output once
						sharedRule.append(postcss.decl({ prop, value: lightVal }));
					} else if (isColorValue(lightVal) && isColorValue(darkVal)) {
						// Different color values - use light-dark()
						sharedRule.append(postcss.decl({ prop, value: `light-dark(${lightVal}, ${darkVal})` }));
					} else {
						// Different non-color values - use space toggle
						lightRule.append(postcss.decl({ prop, value: lightVal }));
						darkRule.append(postcss.decl({ prop, value: darkVal }));
					}
				} else if (lightVal !== undefined) {
					// Only in light theme - use space toggle with guaranteed-invalid for dark
					lightRule.append(postcss.decl({ prop, value: lightVal }));
				} else {
					// Only in dark theme - use space toggle with guaranteed-invalid for light
					darkRule.append(postcss.decl({ prop, value: darkVal }));
				}
			}

			if (sharedRule.nodes.length > 0) sharedNodes.push(sharedRule);
			if (lightRule.nodes.length > 0) lightNodes.push(lightRule);
			if (darkRule.nodes.length > 0) darkNodes.push(darkRule);
		}

		const appendGroup = (nodes, mediaParams) => {
			if (nodes.length === 0) return;
			const wrapped = context ? wrapInAtRule(context, nodes) : nodes;
			if (mediaParams) {
				const media = postcss.atRule({ name: "media", params: mediaParams });
				if (Array.isArray(wrapped)) {
					wrapped.forEach(n => media.append(n));
				} else {
					media.append(wrapped);
				}
				root.append(media);
			} else {
				if (Array.isArray(wrapped)) {
					wrapped.forEach(n => root.append(n));
				} else {
					root.append(wrapped);
				}
			}
		};

		appendGroup(sharedNodes, null);
		appendGroup(lightNodes, "(prefers-color-scheme: light)");
		appendGroup(darkNodes, "(prefers-color-scheme: dark)");
	}

	return root.toString();
};

/**
 * Wraps an array of rules inside a clone of an at-rule identified by its signature.
 * The signature is "{name} {params}", e.g. "container style(--foo: bar)".
 */
const wrapInAtRule = (signature, rules) => {
	const spaceIdx = signature.indexOf(" ");
	const name = signature.slice(0, spaceIdx);
	const params = signature.slice(spaceIdx + 1);
	const atRule = postcss.atRule({ name, params });
	rules.forEach(r => atRule.append(r));
	return atRule;
};

/**
 * Extract custom property declarations grouped by (atRuleContext, selector).
 *
 * Returns: Map<atRuleContext, Map<selector, Map<prop, value>>>
 *   atRuleContext — "" for top-level rules, "{name} {params}" for rules inside an at-rule
 */
const extractVarGroups = (root) => {
	const groups = new Map();

	const addVar = (context, selector, prop, value) => {
		if (!groups.has(context)) groups.set(context, new Map());
		const bySelector = groups.get(context);
		if (!bySelector.has(selector)) bySelector.set(selector, new Map());
		bySelector.get(selector).set(prop, value);
	};

	root.walk(node => {
		if (node.type !== "rule") return;

		const parent = node.parent;
		const context = (parent && parent.type === "atrule")
			? `${parent.name} ${parent.params}`
			: "";

		node.walkDecls(decl => {
			if (decl.prop.startsWith("--")) {
				addVar(context, node.selector, decl.prop, decl.value);
			}
		});
	});

	return groups;
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
