const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;
const isElementClickable = (el) => {
    if (el.disabled) {
        return false;
    }
    const tabIndex = el.getAttribute("tabindex");
    if (tabIndex !== null && tabIndex !== undefined) {
        return parseInt(tabIndex) >= 0;
    }
    return rFocusable.test(el.nodeName)
        || (rClickable.test(el.nodeName)
            && !!el.href);
};
export default isElementClickable;
//# sourceMappingURL=isElementClickable.js.map