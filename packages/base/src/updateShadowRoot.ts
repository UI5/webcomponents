import getConstructableStyle from "./theming/getConstructableStyle.js";
import { getComponentStyles } from "./theming/componentStyles.js";
import type UI5Element from "./UI5Element.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 */
const updateShadowRoot = (element: UI5Element) => {
	const ctor = element.constructor as typeof UI5Element;
	const shadowRoot = element.shadowRoot;

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	shadowRoot.adoptedStyleSheets = [getComponentStyles(), ...getConstructableStyle(ctor)];
	ctor.renderer(element, shadowRoot);
};

export default updateShadowRoot;
