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
type PopupInfo = {
    type: "OpenUI5" | "WebComponent";
    instance: object;
};
declare const addOpenedPopup: (popupInfo: PopupInfo) => void;
declare const removeOpenedPopup: (popup: object) => void;
declare const getTopmostPopup: () => object;
declare const patchPopup: (Popup: OpenUI5Popup) => void;
export { patchPopup, addOpenedPopup, removeOpenedPopup, getTopmostPopup, };
export type { OpenUI5Popup, PopupInfo };
