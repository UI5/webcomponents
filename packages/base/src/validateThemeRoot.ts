import { getLocationHref } from "./Location.js";

const getMetaTagValue = (metaTagName: string) => {
	const metaTag = document.querySelector(`META[name="${metaTagName}"]`),
		metaTagContent = metaTag && metaTag.getAttribute("content");

	return metaTagContent;
};

const validateThemeOrigin = (origin: string, isSameOrigin: boolean = false) => {
	const allowedOrigins = getMetaTagValue("sap-allowed-theme-origins") ?? getMetaTagValue("sap-allowedThemeOrigins"); // Prioritize the new meta tag name

	// If no allowed origins are specified, block.
	if (!allowedOrigins) {
		return false;
	}

	// If it's same-origin (relative URL resolved to current page), allow it when there's any meta tag present
	// The presence of the meta tag indicates the user wants to use theme roots
	if (isSameOrigin) {
		return true;
	}

	return allowedOrigins.split(",").some(allowedOrigin => {
		return allowedOrigin === "*" || origin === allowedOrigin.trim();
	});
};

const validateThemeRoot = (themeRoot: string) => {
	let resultUrl;
	let isSameOrigin = false;

	try {
		if (themeRoot.startsWith(".") || themeRoot.startsWith("/")) {
			// Handle relative url
			// new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
			// new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
			// new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
			resultUrl = new URL(themeRoot, getLocationHref()).toString();
			isSameOrigin = true;
		} else {
			const themeRootURL = new URL(themeRoot);
			const origin = themeRootURL.origin;
			const currentOrigin = new URL(getLocationHref()).origin;

			// Check if the absolute URL is same-origin
			isSameOrigin = origin === currentOrigin;

			if (origin && validateThemeOrigin(origin, isSameOrigin)) {
				// If origin is allowed, use it
				resultUrl = themeRootURL.toString();
			} else {
				// If origin is not allowed, return undefined to indicate validation failed
				return undefined;
			}
		}

		if (!resultUrl.endsWith("/")) {
			resultUrl = `${resultUrl}/`;
		}

		return `${resultUrl}UI5/`;
	} catch (e) {
		// Catch if URL is not correct
		return undefined;
	}
};

export default validateThemeRoot;
