const isElementHidden = (el) => {
    if (el.nodeName === "SLOT") {
        return false;
    }
    const computedStyle = window.getComputedStyle(el);
    return (computedStyle.display !== "contents" && (el.offsetWidth <= 0 && el.offsetHeight <= 0)) || (computedStyle.visibility === "hidden");
};
export default isElementHidden;
//# sourceMappingURL=isElementHidden.js.map