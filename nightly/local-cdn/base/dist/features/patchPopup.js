// OpenUI5's Control.js subset
import getSharedResource from "../getSharedResource.js";
import insertOpenUI5PopupStyles from "./insertOpenUI5PopupStyles.js";
// contains all OpenUI5 and Web Component popups that are currently opened
const AllOpenedPopupsRegistry = getSharedResource("AllOpenedPopupsRegistry", { openedRegistry: [] });
const addOpenedPopup = (popupInfo) => {
    AllOpenedPopupsRegistry.openedRegistry.push(popupInfo);
};
const removeOpenedPopup = (popup) => {
    const index = AllOpenedPopupsRegistry.openedRegistry.findIndex(el => el.instance === popup);
    if (index === AllOpenedPopupsRegistry.openedRegistry.length - 1) {
        fixTopmostOpenUI5Popup();
    }
    if (index > -1) {
        AllOpenedPopupsRegistry.openedRegistry.splice(index, 1);
    }
};
const getTopmostPopup = () => {
    if (AllOpenedPopupsRegistry.openedRegistry.length === 0) {
        return null;
    }
    return AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 1].instance;
};
/**
 * Determines whether there is a Web Component popup opened above (a specified popup).
 *
 * @param {object} popup The popup instance to check against.
 * @returns {boolean} `true` if a Web Component popup is opened above (the given popup instance); otherwise `false`.
 */
const hasWebComponentPopupAbove = (popup) => {
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
const getPopupContentElement = (popup) => {
    const content = popup.getContent();
    return content instanceof HTMLElement ? content : content?.getDomRef() || null;
};
const openNativePopoverForOpenUI5 = (popup) => {
    const openingInitiated = ["OPENING", "OPEN"].includes(popup.getOpenState());
    if (!openingInitiated || !isNativePopoverOpen()) {
        return;
    }
    const domRef = getPopupContentElement(popup);
    if (!domRef) {
        return;
    }
    const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");
    if (popup.getModal() && openUI5BlockLayer) {
        openUI5BlockLayer.setAttribute("popover", "manual");
        openUI5BlockLayer.hidePopover();
        openUI5BlockLayer.showPopover();
    }
    domRef.setAttribute("popover", "manual");
    domRef.showPopover();
};
const closeNativePopoverForOpenUI5 = (popup) => {
    const domRef = getPopupContentElement(popup);
    if (!domRef) {
        return;
    }
    if (domRef.hasAttribute("popover")) {
        domRef.hidePopover();
        domRef.removeAttribute("popover");
    }
    if (getTopmostPopup() !== popup) {
        return;
    }
    // The OpenUI5 block layer is only one for all modal OpenUI5 popups,
    // and it is displayed above all opened pupups - OpenUI5 and Web Components,
    // as a result, we need to hide this block layer.
    // If the underlying popup is a Web Component - it is displayed like a native popover, and we don't need to do anything
    // If the underlying popup is an OpenUI5 popup, it will be fixed in fixTopmostOpenUI5Popup method.
    if (popup.getModal()) {
        const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");
        if (openUI5BlockLayer && openUI5BlockLayer.hasAttribute("popover")) {
            openUI5BlockLayer.hidePopover();
        }
    }
};
const fixTopmostOpenUI5Popup = () => {
    if (!isNativePopoverOpen()) {
        return;
    }
    const prevPopup = AllOpenedPopupsRegistry.openedRegistry[AllOpenedPopupsRegistry.openedRegistry.length - 2];
    if (!prevPopup
        || prevPopup.type !== "OpenUI5"
        || !prevPopup.instance.getModal()) {
        return;
    }
    const content = getPopupContentElement(prevPopup.instance);
    const openUI5BlockLayer = document.getElementById("sap-ui-blocklayer-popup");
    content?.hidePopover();
    openUI5BlockLayer?.showPopover();
    content?.showPopover();
};
const isNativePopoverOpen = (root = document) => {
    if (root.querySelector(":popover-open")) {
        return true;
    }
    return Array.from(root.querySelectorAll("*")).some(element => {
        const shadowRoot = element.shadowRoot;
        return shadowRoot && isNativePopoverOpen(shadowRoot);
    });
};
const patchDialog = (Dialog) => {
    const origOnsapescape = Dialog.prototype.onsapescape;
    Dialog.prototype.onsapescape = function onsapescape(...args) {
        if (hasWebComponentPopupAbove(this.oPopup)) {
            return;
        }
        origOnsapescape.apply(this, args);
    };
};
const patchOpen = (Popup) => {
    const origOpen = Popup.prototype.open;
    Popup.prototype.open = function open(...args) {
        origOpen.apply(this, args); // call open first to initiate opening
        openNativePopoverForOpenUI5(this);
        addOpenedPopup({
            type: "OpenUI5",
            instance: this,
        });
    };
};
const patchClosed = (Popup) => {
    const _origClosed = Popup.prototype._closed;
    Popup.prototype._closed = function _closed(...args) {
        closeNativePopoverForOpenUI5(this);
        _origClosed.apply(this, args); // only then call _close
        removeOpenedPopup(this);
    };
};
const patchFocusEvent = (Popup) => {
    const origFocusEvent = Popup.prototype.onFocusEvent;
    Popup.prototype.onFocusEvent = function onFocusEvent(...args) {
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
const patchPopup = (Popup, Dialog) => {
    insertOpenUI5PopupStyles();
    patchOpen(Popup); // Popup.prototype.open
    patchClosed(Popup); // Popup.prototype._closed
    createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
    patchFocusEvent(Popup); // Popup.prototype.onFocusEvent
    patchDialog(Dialog); // Dialog.prototype.onsapescape
};
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
//# sourceMappingURL=patchPopup.js.map