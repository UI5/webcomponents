// OpenUI5's Control.js subset
import getSharedResource from "../getSharedResource.js";
import insertOpenUI5PopupStyles from "./insertOpenUI5PopupStyles.js";

type Control = {
	getDomRef: () => HTMLElement | null,
}

type OpenUI5Popup = {
	open: (...args: any[]) => void,
	_closed: (...args: any[]) => void,
	getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING",
	getContent: () => Control | HTMLElement | null, // this is the OpenUI5 Element/Control instance that opens the Popup (usually sap.m.Popover/sap.m.Dialog)
	onFocusEvent: (...args: any[]) => void,
	getModal: () => boolean
};

// The lifecycle of Popup.js is open -> _opened -> close -> _closed, we're interested in the first (open) and last (_closed)
type OpenUI5PopupClass = {
	prototype: OpenUI5Popup
};

type OpenUI5DialogClass = {
	prototype: {
		onsapescape: (...args: any[]) => void,
		oPopup: OpenUI5Popup,
	}
};

type PopupInfo = {
	type: "WebComponent";
	instance: object;
} | {
	type: "OpenUI5";
	instance: OpenUI5Popup;
};

// contains all OpenUI5 and Web Component popups that are currently opened
const AllOpenedPopupsRegistry = getSharedResource<{ openedRegistry: Array<PopupInfo> }>("AllOpenedPopupsRegistry", { openedRegistry: [] });

const addOpenedPopup = (popupInfo: PopupInfo) => {
	AllOpenedPopupsRegistry.openedRegistry.push(popupInfo);
};

const removeOpenedPopup = (popup: object) => {
	const index = AllOpenedPopupsRegistry.openedRegistry.findIndex(el => el.instance === popup);

	if (index === AllOpenedPopupsRegistry.openedRegistry.length - 1) {
		fixOpenUI5PopupBelow();
	}

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

const enableNativePopoverForOpenUI5 = (domRef: HTMLElement, popup: OpenUI5Popup) => {
	const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");

	if (popup.getModal() && openUI5BlockLayer) {
		openUI5BlockLayer.setAttribute("popover", "manual");
		openUI5BlockLayer.hidePopover();
		openUI5BlockLayer.showPopover();
	}

	domRef.setAttribute("popover", "manual");
	domRef.showPopover();
};

const disableNativePopoverForOpenUI5 = (domRef: HTMLElement) => {
	if (domRef.hasAttribute("popover")) {
		domRef.hidePopover();
		domRef.removeAttribute("popover");
	}

	const lastPopup = AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 1];
	if (lastPopup.type === "OpenUI5" && lastPopup.instance.getModal()) {
		const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");
		if (openUI5BlockLayer && openUI5BlockLayer.hasAttribute("popover")) {
			openUI5BlockLayer.hidePopover();
		}
	}
};

const fixOpenUI5PopupBelow = () => {
	if (!isNativePopoverOpen()) {
		return;
	}

	const prevPopup = AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 2];
	if (!prevPopup || prevPopup.type !== "OpenUI5" || !prevPopup.instance.getModal()) {
		return;
	}

	const prevPopupContent = prevPopup.instance.getContent()!;
	const content = prevPopupContent instanceof HTMLElement ? prevPopupContent : prevPopupContent?.getDomRef();

	const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");

	content?.hidePopover();

	if (prevPopup.instance.getModal()) {
		openUI5BlockLayer?.showPopover();
	}

	content?.showPopover();
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

const patchDialog = (Dialog: OpenUI5DialogClass) => {
	const origOnsapescape = Dialog.prototype.onsapescape;
	Dialog.prototype.onsapescape = function onsapescape(...args: any[]) {
		if (hasWebComponentPopupAbove(this.oPopup)) {
			return;
		}

		origOnsapescape.apply(this, args);
	};
};

const patchOpen = (Popup: OpenUI5PopupClass) => {
	const origOpen = Popup.prototype.open;
	Popup.prototype.open = function open(...args: any[]) {
		origOpen.apply(this, args); // call open first to initiate opening
		const openingInitiated = ["OPENING", "OPEN"].includes(this.getOpenState());
		if (openingInitiated && isNativePopoverOpen()) {
			const element = this.getContent();
			if (element) {
				const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
				if (domRef) {
					enableNativePopoverForOpenUI5(domRef, this);
				}
			}
		}

		addOpenedPopup({
			type: "OpenUI5",
			instance: this,
		});
	};
};

const patchClosed = (Popup: OpenUI5PopupClass) => {
	const _origClosed = Popup.prototype._closed;
	Popup.prototype._closed = function _closed(...args: any[]) {
		const element = this.getContent();
		const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
		_origClosed.apply(this, args); // only then call _close
		if (domRef) {
			disableNativePopoverForOpenUI5(domRef); // unset the popover attribute and close the native popover, but only if still in DOM
		}

		removeOpenedPopup(this);
	};
};

const patchFocusEvent = (Popup: OpenUI5PopupClass) => {
	const origFocusEvent = Popup.prototype.onFocusEvent;
	Popup.prototype.onFocusEvent = function onFocusEvent(...args: any[]) {
		if (!hasWebComponentPopupAbove(this)) {
			origFocusEvent.apply(this, args);
		}
	};
};

const createGlobalStyles = () => {
	const stylesheet = new CSSStyleSheet();
	stylesheet.replaceSync(`.sapMPopup-CTX:popover-open { inset: unset; }`);
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
};

const patchPopup = (Popup: OpenUI5PopupClass, Dialog: OpenUI5DialogClass) => {
	insertOpenUI5PopupStyles();
	patchOpen(Popup); // Popup.prototype.open
	patchClosed(Popup); // Popup.prototype._closed
	createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
	patchFocusEvent(Popup);// Popup.prototype.onFocusEvent
	patchDialog(Dialog); // Dialog.prototype.onsapescape
};

export {
	patchPopup,
	addOpenedPopup,
	removeOpenedPopup,
	getTopmostPopup,
};

export type { OpenUI5PopupClass, OpenUI5DialogClass, PopupInfo };
