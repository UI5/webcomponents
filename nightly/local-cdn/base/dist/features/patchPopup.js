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
const openNativePopover = (domRef) => {
    domRef.setAttribute("popover", "manual");
    domRef.showPopover();
};
const closeNativePopover = (domRef) => {
    if (domRef.hasAttribute("popover")) {
        domRef.hidePopover();
        domRef.removeAttribute("popover");
    }
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
const patchPopupBasedControl = (PopupBasedControl) => {
    const origOnsapescape = PopupBasedControl.prototype.onsapescape;
    PopupBasedControl.prototype.onsapescape = function onsapescape(e) {
        if (hasWebComponentPopupAbove(this.oPopup)) {
            return;
        }
        origOnsapescape.call(this, e);
    };
};
const patchOpen = (Popup) => {
    const origOpen = Popup.prototype.open;
    Popup.prototype.open = function open(...args) {
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
const patchClosed = (Popup) => {
    const _origClosed = Popup.prototype._closed;
    Popup.prototype._closed = function _closed(...args) {
        const element = this.getContent();
        const domRef = element instanceof HTMLElement ? element : element?.getDomRef();
        _origClosed.apply(this, args); // only then call _close
        if (domRef) {
            closeNativePopover(domRef); // unset the popover attribute and close the native popover, but only if still in DOM
        }
        removeOpenedPopup(this);
    };
};
const patchFocusEvent = (Popup) => {
    const origFocusEvent = Popup.prototype.onFocusEvent;
    Popup.prototype.onFocusEvent = function onFocusEvent(e) {
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
const patchPopup = (Popup, Dialog, Popover) => {
    insertOpenUI5PopupStyles();
    patchOpen(Popup); // Popup.prototype.open
    patchClosed(Popup); // Popup.prototype._closed
    createGlobalStyles(); // Ensures correct popover positioning by OpenUI5 (otherwise 0,0 is the center of the screen)
    patchFocusEvent(Popup); // Popup.prototype.onFocusEvent
    patchPopupBasedControl(Dialog); // Dialog.prototype.onsapescape
    patchPopupBasedControl(Popover); // Popover.prototype.onsapescape
};
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
//# sourceMappingURL=patchPopup.js.map