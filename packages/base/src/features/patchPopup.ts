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
		onFocusEvent: (...args: any[]) => void,
	}
};

type OpenUI5PopupBasedControl = {
	prototype: {
		onsapescape: (...args: any[]) => void,
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

const blocks: any[] = [];
const popovers: any[] = [];

const openNativePopover = (domRef: HTMLElement) => {
	const block = document.getElementById("sap-ui-blocklayer-popup");
	popovers.push(domRef);

	if (block?.hasAttribute("popover")) {
		const newBlock = block?.cloneNode(true);
		if (newBlock) {
			(newBlock as HTMLElement).setAttribute("id", `sap-ui-blocklayer-popup${blocks.length}`);
			const staticArea = document.getElementById("sap-ui-static");

			staticArea?.appendChild(newBlock);
			block?.hidePopover();
			block?.removeAttribute("popover");
			blocks.push(newBlock);
		}

		block?.removeAttribute("popover");
	}

	block?.setAttribute("popover", "manual");
	// blocks.push(block);
	block?.showPopover();

	domRef.setAttribute("popover", "manual");
	domRef.showPopover();
};

const closeNativePopover = () => {
	const allPopupsIndex = AllOpenedPopupsRegistry.openedRegistry.findIndex(element => {
		const instance = element.instance as { _sInitialFocusId?: string };
		return instance._sInitialFocusId === popovers[popovers.length - 1].id;
	});
	if (AllOpenedPopupsRegistry.openedRegistry[allPopupsIndex - 1]?.type === "WebComponent") {
		popovers.pop();
		if (popovers.length > 0 && blocks.length > 0) {
			popovers[popovers.length - 1].hidePopover();
			blocks[blocks.length - 1].hidePopover();
			document.getElementById("sap-ui-blocklayer-popup")?.hidePopover();

			(AllOpenedPopupsRegistry.openedRegistry[allPopupsIndex - 1].instance as HTMLElement).addEventListener("ui5-close", () => {
				if ((AllOpenedPopupsRegistry.openedRegistry[allPopupsIndex - 2]?.type === "OpenUI5")) {
					popovers[1].hidePopover();
					const lastBlock = blocks[blocks.length - 1];
					const lastPopover = popovers[popovers.length - 1];

					arrangeBlocksAndPopovers(lastBlock as HTMLElement, lastPopover as HTMLElement);
				}
			});
			return;
		}
	}

	popovers.pop();
	if (popovers.length > 0 && blocks.length > 0) {
		const lastBlock = blocks[blocks.length - 1];
		const lastPopover = popovers[popovers.length - 1];
		arrangeBlocksAndPopovers(lastBlock as HTMLElement, lastPopover as HTMLElement);
	}
	if (popovers.length === 0 && blocks.length > 0) {
		blocks[blocks.length - 1]?.hidePopover();
	}
};

const arrangeBlocksAndPopovers = (block: HTMLElement, popover: HTMLElement) => {
	block?.hidePopover();
	popover.hidePopover();
	block?.showPopover();

	const ui5block = document.getElementById("sap-ui-blocklayer-popup");
	if (ui5block) {
		ui5block.style.visibility = "hidden";
	}
	if (popover.isConnected) {
		popover?.showPopover();
	} else if (popovers.length === 1 && AllOpenedPopupsRegistry.openedRegistry[0]?.type === "WebComponent") {
		blocks.forEach(b => { b.hidePopover(); });
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
	PopupBasedControl.prototype.onsapescape = function onsapescape(...args: any[]) {
		if (hasWebComponentPopupAbove(this.oPopup)) {
			return;
		}

		origOnsapescape.apply(this, args);
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
			closeNativePopover(); // unset the popover attribute and close the native popover, but only if still in DOM
		}

		removeOpenedPopup(this);
	};
};

const patchFocusEvent = (Popup: OpenUI5Popup) => {
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
