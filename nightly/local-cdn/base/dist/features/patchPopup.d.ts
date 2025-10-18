type Control = {
    getDomRef: () => HTMLElement | null;
};
type OpenUI5Popup = {
    prototype: {
        open: (...args: any[]) => void;
        _closed: (...args: any[]) => void;
        getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING";
        getContent: () => Control | HTMLElement | null;
        onFocusEvent: (e: FocusEvent) => void;
    };
};
type OpenUI5PopupBasedControl = {
    prototype: {
        onsapescape: (e: Event) => void;
        oPopup: OpenUI5Popup;
    };
};
type PopupInfo = {
    type: "OpenUI5" | "WebComponent";
    instance: object;
};
declare const addOpenedPopup: (popupInfo: PopupInfo) => void;
declare const removeOpenedPopup: (popup: object) => void;
declare const getTopmostPopup: () => object;
declare const patchPopup: (Popup: OpenUI5Popup, Dialog: OpenUI5PopupBasedControl, Popover: OpenUI5PopupBasedControl) => void;
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
export type { OpenUI5Popup, OpenUI5PopupBasedControl, PopupInfo };
