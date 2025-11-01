import isElementHidden from "./isElementHidden.js";
/**
 * Returns if the HTMLElement is tabbable.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { boolean } true if the element is tabbable or false - if not
 */
const isElementTabbable = (el) => {
    if (!el) {
        return false;
    }
    if (el.hasAttribute("data-sap-no-tab-ref")) {
        return false;
    }
    if (isElementHidden(el)) {
        return false;
    }
    const tabIndex = el.getAttribute("tabindex");
    if (tabIndex !== null && tabIndex !== undefined) {
        return parseInt(tabIndex) >= 0;
    }
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === "a" || /^(input|select|textarea|button|object)$/.test(nodeName)) {
        return !el.disabled;
    }
    return false;
};
export default isElementTabbable;
//# sourceMappingURL=isElementTabbable.js.map