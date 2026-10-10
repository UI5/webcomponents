type Control = {
    getDomRef: () => HTMLElement | null;
};
type OpenUI5Popup = {
    open: (...args: any[]) => void;
    _closed: (...args: any[]) => void;
    getOpenState: () => "CLOSED" | "CLOSING" | "OPEN" | "OPENING";
    getContent: () => Control | HTMLElement | null;
    onFocusEvent: (...args: any[]) => void;
    getModal: () => boolean;
};
type OpenUI5PopupClass = {
    prototype: OpenUI5Popup;
};
type OpenUI5DialogClass = {
    prototype: {
        onsapescape: (...args: any[]) => void;
        oPopup: OpenUI5Popup;
    };
};
type PopupInfo = {
    type: "WebComponent";
    instance: object;
} | {
    type: "OpenUI5";
    instance: OpenUI5Popup;
};
declare const addOpenedPopup: (popupInfo: PopupInfo) => void;
declare const removeOpenedPopup: (popup: object) => void;
declare const getTopmostPopup: () => object | null;
declare const patchPopup: (Popup: OpenUI5PopupClass, Dialog: OpenUI5DialogClass) => void;
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
export type { OpenUI5PopupClass, OpenUI5DialogClass, PopupInfo };
