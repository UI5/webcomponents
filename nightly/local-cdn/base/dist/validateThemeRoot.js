import { getLocationHref } from "./Location.js";
const getMetaTagValue = (metaTagName) => {
    const metaTag = document.querySelector(`META[name="${metaTagName}"]`), metaTagContent = metaTag && metaTag.getAttribute("content");
    return metaTagContent;
};
const validateThemeOrigin = (origin) => {
    const allowedOrigins = getMetaTagValue("sap-allowed-theme-origins") ?? getMetaTagValue("sap-allowedThemeOrigins"); // Prioritize the new meta tag name
    // If no allowed origins are specified, block.
    if (!allowedOrigins) {
        return false;
    }
    return allowedOrigins.split(",").some(allowedOrigin => {
        return allowedOrigin === "*" || origin === allowedOrigin.trim();
    });
};
const buildCorrectUrl = (oldUrl, newOrigin) => {
    const oldUrlPath = new URL(oldUrl).pathname;
    return new URL(oldUrlPath, newOrigin).toString();
};
const validateThemeRoot = (themeRoot) => {
    let resultUrl;
    try {
        if (themeRoot.startsWith(".") || themeRoot.startsWith("/")) {
            // Handle relative url
            // new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            // new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
            // new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            resultUrl = new URL(themeRoot, getLocationHref()).toString();
        }
        else {
            const themeRootURL = new URL(themeRoot);
            const origin = themeRootURL.origin;
            if (origin && validateThemeOrigin(origin)) {
                // If origin is allowed, use it
                resultUrl = themeRootURL.toString();
            }
            else {
                // If origin is not allow and the URL is not relative, we have to replace the origin
                // with current location
                resultUrl = buildCorrectUrl(themeRootURL.toString(), getLocationHref());
            }
        }
        if (!resultUrl.endsWith("/")) {
            resultUrl = `${resultUrl}/`;
        }
        return `${resultUrl}UI5/`;
    }
    catch (e) {
        // Catch if URL is not correct
    }
};
export default validateThemeRoot;
//# sourceMappingURL=validateThemeRoot.js.map