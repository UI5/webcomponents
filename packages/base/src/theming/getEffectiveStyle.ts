import { getCustomCSS, attachCustomCSSChange } from "./CustomStyle.js";
import getStylesString from "./getStylesString.js";
import type UI5Element from "../UI5Element.js";

const effectiveStyleMap = new Map<string, string>();

attachCustomCSSChange((tag: string) => {
	effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

const getEffectiveStyle = (ElementClass: typeof UI5Element) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_normal`;

	if (!effectiveStyleMap.has(key)) {
		const customStyle = getCustomCSS(tag) || "";
		const builtInStyles = getStylesString(ElementClass.styles);

		const effectiveStyle = `${builtInStyles} ${customStyle}`;
		effectiveStyleMap.set(key, effectiveStyle);
	}

	return effectiveStyleMap.get(key)!; // The key is guaranteed to exist
};

export default getEffectiveStyle;
