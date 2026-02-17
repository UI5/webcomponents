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

const createStyle = (content: string, name: string, value = "", theme?: string) => {
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(content);
	(stylesheet as Record<string, any>)._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
	if (theme) {
		(stylesheet as Record<string, any>)._ui5RuntimeIndex = currentRuntimeIndex;
		(stylesheet as Record<string, any>)._ui5Theme = theme;
	}
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

const updateStyle = (content: string, name: string, value = "", theme?: string) => {
	const currentRuntimeIndex = getCurrentRuntimeIndex();

	const stylesheet = document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
	if (!stylesheet) {
		return;
	}

	if (!theme) {
		stylesheet.replaceSync(content || "");
	} else {
		const stylesheetRuntimeIndex: string | undefined = (stylesheet as Record<string, any>)._ui5RuntimeIndex;
		const stylesheetTheme: string | undefined = (stylesheet as Record<string, any>)._ui5Theme;
		if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
			stylesheet.replaceSync(content || "");
			(stylesheet as Record<string, any>)._ui5RuntimeIndex = String(currentRuntimeIndex);
			(stylesheet as Record<string, any>)._ui5Theme = theme;
		}
	}
};

const hasStyle = (name: string, value = ""): boolean => {
	if (isSSR) {
		return true;
	}

	return !!document.adoptedStyleSheets.find(sh => (sh as Record<string, any>)._ui5StyleId === getStyleId(name, value));
};

const removeStyle = (name: string, value = "") => {
	document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => (sh as Record<string, any>)._ui5StyleId !== getStyleId(name, value));
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
