// OpenUI5's Control.js subset
import getSharedResource from "../getSharedResource.js";
import insertOpenUI5PopupStyles from "./insertOpenUI5PopupStyles.js";

type Control = {
	getDomRef: () => HTMLElement | null,
}

// The lifecycle of Popup.js is open -> _opened -> close -> _closed, we're interested in the first (open) and last (_closed)
type OpenUI5Popup = {
	prototype: {
		open: (...args: any[]) => void,
		_closed: (...args: any[]) => void,
		getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING",
		getContent: () => Control | HTMLElement | null, // this is the OpenUI5 Element/Control instance that opens the Popup (usually sap.m.Popover/sap.m.Dialog)
		onFocusEvent: (e: FocusEvent) => void,
	}
};

type OpenUI5PopupBasedControl = {
	prototype: {
		onsapescape: (e: Event) => void,
		oPopup: OpenUI5Popup,
	}
};

type PopupInfo = {
	type: "OpenUI5" | "WebComponent";
	instance: object;
};

// contains all OpenUI5 and Web Component popups that are currently opened
const AllOpenedPopupsRegistry = getSharedResource<{ openedRegistry: Array<PopupInfo> }>("AllOpenedPopupsRegistry", { openedRegistry: [] });

const addOpenedPopup = (popupInfo: PopupInfo) => {
	AllOpenedPopupsRegistry.openedRegistry.push(popupInfo);
};

const removeOpenedPopup = (popup: object) => {
	const index = AllOpenedPopupsRegistry.openedRegistry.findIndex(el => el.instance === popup);
	if (index > -1) {
		AllOpenedPopupsRegistry.openedRegistry.splice(index, 1);
	}
};

const getTopmostPopup = () => {
	return AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 1].instance;
};

/**
 * Determines whether there is a Web Component popup opened above (a specified popup).
 *
 * @param {object} popup The popup instance to check against.
 * @returns {boolean} `true` if a Web Component popup is opened above (the given popup instance); otherwise `false`.
 */
const hasWebComponentPopupAbove = (popup: object) => {
	for (let i = AllOpenedPopupsRegistry.openedRegistry.length - 1; i >= 0; i--) {
		const popupInfo = AllOpenedPopupsRegistry.openedRegistry[i];
		if (popupInfo.type === "WebComponent") {
			return true;
		}

		if (popupInfo.instance === popup) {
			break;
		}
	}

	return false;
};

const openNativePopover = (domRef: HTMLElement) => {
	domRef.setAttribute("popover", "manual");
	domRef.showPopover();
};

const closeNativePopover = (domRef: HTMLElement) => {
	if (domRef.hasAttribute("popover")) {
		domRef.hidePopover();
		domRef.removeAttribute("popover");
	}
};

const isNativePopoverOpen = (root: Document | ShadowRoot = document): boolean => {
	if (root.querySelector(":popover-open")) {
		return true;
	}

	return Array.from(root.querySelectorAll("*")).some(element => {
		const shadowRoot = element.shadowRoot;
		return shadowRoot && isNativePopoverOpen(shadowRoot);
	});
};

const patchPopupBasedControl = (PopupBasedControl: OpenUI5PopupBasedControl) => {
	const origOnsapescape = PopupBasedControl.prototype.onsapescape;
	PopupBasedControl.prototype.onsapescape = function onsapescape(e: Event) {
		if (hasWebComponentPopupAbove(this.oPopup)) {
			return;
		}

		origOnsapescape.call(this, e);
	};
};

const patchOpen = (Popup: OpenUI5Popup) => {
	const origOpen = Popup.prototype.open;
	Popup.prototype.open = function open(...args: any[]) {
		origOpen.apply(this, args); // call open first to initiate opening
		const topLayerAlreadyInUse = isNativePopoverOpen();
		const openingInitiated = ["OPENING", "OPEN"].includes(this.getOpenState());
		if (openingInitiated && topLayerAlreadyInUse) {
			const element = this.getContent();
			if (element) {
				const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
				if (domRef) {
					openNativePopover(domRef);
				}
			}
		}

		addOpenedPopup({
			type: "OpenUI5",
			instance: this,
		});
	};
};

const patchClosed = (Popup: OpenUI5Popup) => {
	const _origClosed = Popup.prototype._closed;
	Popup.prototype._closed = function _closed(...args: any[]) {
		const element = this.getContent();
		const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
		_origClosed.apply(this, args); // only then call _close
		if (domRef) {
			closeNativePopover(domRef); // unset the popover attribute and close the native popover, but only if still in DOM
		}

		removeOpenedPopup(this);
	};
};

const patchFocusEvent = (Popup: OpenUI5Popup) => {
	const origFocusEvent = Popup.prototype.onFocusEvent;
	Popup.prototype.onFocusEvent = function onFocusEvent(e: FocusEvent) {
		if (!hasWebComponentPopupAbove(this)) {
			origFocusEvent.call(this, e);
		}
	};
};

const createGlobalStyles = () => {
	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(`.sapMPopup-CTX:popover-open { inset: unset; }`);
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

const patchPopup = (Popup: OpenUI5Popup, Dialog: OpenUI5PopupBasedControl, Popover: OpenUI5PopupBasedControl) => {
	insertOpenUI5PopupStyles();
	patchOpen(Popup); // Popup.prototype.open
	patchClosed(Popup); // Popup.prototype._closed
	createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
	patchFocusEvent(Popup);// Popup.prototype.onFocusEvent
	patchPopupBasedControl(Dialog); // Dialog.prototype.onsapescape
	patchPopupBasedControl(Popover); // Popover.prototype.onsapescape
};

export {
	patchPopup,
	addOpenedPopup,
	removeOpenedPopup,
	getTopmostPopup,
};

export type { OpenUI5Popup, OpenUI5PopupBasedControl, PopupInfo };
