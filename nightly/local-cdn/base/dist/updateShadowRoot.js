import getConstructableStyle from "./theming/getConstructableStyle.js";
/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 */
const updateShadowRoot = (element) => {
    const ctor = element.constructor;
    const shadowRoot = element.shadowRoot;
    if (!shadowRoot) {
        console.warn(`There is no shadow root to update`); // eslint-disable-line
        return;
    }
    shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor);
    ctor.renderer(element, shadowRoot);
};
export default updateShadowRoot;
//# sourceMappingURL=updateShadowRoot.js.map