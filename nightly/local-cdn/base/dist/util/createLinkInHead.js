/**
 * Creates a `<link>` tag in the `<head>` tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 */
const createLinkInHead = (href, attributes) => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (attributes) {
        Object.entries(attributes).forEach(pair => link.setAttribute(...pair));
    }
    link.href = href;
    document.head.appendChild(link);
    return new Promise(resolve => {
        link.addEventListener("load", resolve);
        link.addEventListener("error", resolve); // intended
    });
};
export default createLinkInHead;
//# sourceMappingURL=createLinkInHead.js.map