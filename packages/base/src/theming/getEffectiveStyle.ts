import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";
import { getFeature } from "../FeaturesRegistry.js";
import type UI5Element from "../UI5Element.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import { getThemeProperties } from "../asset-registries/Themes.js";

const effectiveStyleMap = new Map<string, string>();

attachCustomCSSChange((tag: string) => {
	effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

const getEffectiveStyle = (ElementClass: typeof UI5Element) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_normal`;
	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");

	if (!effectiveStyleMap.has(key)) {
		let busyIndicatorStyles = "";

		if (openUI5Enablement) {
			busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
		}

		const customStyle = getCustomCSS(tag) || "";
		const builtInStyles = getStylesString(ElementClass.styles);
		const properties = ElementClass.themeProperties?.replaceAll(":root", ":host") || "";

		const effectiveStyle = `${builtInStyles} ${customStyle} ${busyIndicatorStyles} ${properties}`;
		effectiveStyleMap.set(key, effectiveStyle);
	}

	return effectiveStyleMap.get(key)!; // The key is guaranteed to exist
};

export default getEffectiveStyle;
