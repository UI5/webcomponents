/**
 * Marks an element whose `inert` was set by a popup, so it can be cleared on close.
 * Elements that were already `inert` before the popup opened do not get this marker,
 * so their author-set `inert` is left untouched.
 */
const POPUP_INERT_ATTR = "data-ui5-dialog-old-no-inert";

/**
 * Backstop cleanup: removes any `inert` left behind by a popup.
 *
 * Called when no popups remain open, so there must be nothing legitimately inerted-by-us left.
 * Guards against a leak if an individual revert missed an element (e.g. it was moved in the DOM
 * between open and close). Author-set `inert` is untouched, as it never carries the marker.
 */
const clearResidualInert = () => {
	document.querySelectorAll(`[${POPUP_INERT_ATTR}]`).forEach(element => {
		element.removeAttribute("inert");
		element.removeAttribute(POPUP_INERT_ATTR);
	});
};

export { POPUP_INERT_ATTR, clearResidualInert };
