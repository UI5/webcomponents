import { getCurrentRuntimeIndex, compareRuntimes } from "./Runtimes.js";

const isSSR = typeof document === "undefined";

const getStyleId = (name: string, value: string) => {
	return value ? `${name}|${value}` : name;
};

const shouldUpdate = (runtimeIndex: string | undefined) => {
	if (runtimeIndex === undefined) {
		return true;
	}
	return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) >= 1; // 1 or larger means the current is newer, 0 means the same, -1 means the resource's runtime is newer
};

// Safari strips expando properties from CSSStyleSheet objects returned by document.adoptedStyleSheets.
// Use external Maps to preserve stylesheet metadata across reads.
const styleSheetIds = new Map<CSSStyleSheet, string>();
const styleSheetRuntimeIndexes = new Map<CSSStyleSheet, string>();
const styleSheetThemes = new Map<CSSStyleSheet, string>();

const createStyle = (content: string, name: string, value = "", theme?: string) => {
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(content);
	styleSheetIds.set(stylesheet, getStyleId(name, value));
	if (theme) {
		styleSheetRuntimeIndexes.set(stylesheet, String(currentRuntimeIndex));
		styleSheetThemes.set(stylesheet, theme);
	}
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

const updateStyle = (content: string, name: string, value = "", theme?: string) => {
	if (isSSR) {
		return;
	}

	const currentRuntimeIndex = getCurrentRuntimeIndex();

	const stylesheet = document.adoptedStyleSheets.find(sh => styleSheetIds.get(sh) === getStyleId(name, value));
	if (!stylesheet) {
		return;
	}

	if (!theme) {
		stylesheet.replaceSync(content || "");
	} else {
		const stylesheetRuntimeIndex: string | undefined = styleSheetRuntimeIndexes.get(stylesheet);
		const stylesheetTheme: string | undefined = styleSheetThemes.get(stylesheet);
		if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
			stylesheet.replaceSync(content || "");
			styleSheetRuntimeIndexes.set(stylesheet, String(currentRuntimeIndex));
			styleSheetThemes.set(stylesheet, theme);
		}
	}
};

const hasStyle = (name: string, value = ""): boolean => {
	if (isSSR) {
		return true;
	}

	return !!document.adoptedStyleSheets.find(sh => styleSheetIds.get(sh) === getStyleId(name, value));
};

const removeStyle = (name: string, value = "") => {
	const styleId = getStyleId(name, value);
	const removed: Array<CSSStyleSheet> = [];
	document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => {
		if (styleSheetIds.get(sh) === styleId) {
			removed.push(sh);
			return false;
		}
		return true;
	});
	removed.forEach(sh => {
		styleSheetIds.delete(sh);
		styleSheetRuntimeIndexes.delete(sh);
		styleSheetThemes.delete(sh);
	});
};

const createOrUpdateStyle = (content: string, name: string, value = "", theme?: string) => {
	if (hasStyle(name, value)) {
		updateStyle(content, name, value, theme);
	} else {
		createStyle(content, name, value, theme);
	}
};

const mergeStyles = (style1?: string, style2?: string) => {
	if (style1 === undefined) {
		return style2;
	}
	if (style2 === undefined) {
		return style1;
	}
	return `${style1} ${style2}`;
};

export {
	createStyle,
	hasStyle,
	updateStyle,
	removeStyle,
	createOrUpdateStyle,
	mergeStyles,
};
