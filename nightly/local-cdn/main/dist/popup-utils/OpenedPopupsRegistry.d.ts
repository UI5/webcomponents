import type Popup from "../Popup.js";
type RegisteredPopup = {
    instance: Popup;
    parentPopovers: Array<Popup>;
};
declare const addOpenedPopup: (instance: Popup, parentPopovers?: Array<Popup>) => void;
declare const removeOpenedPopup: (instance: Popup) => void;
declare const getOpenedPopups: () => RegisteredPopup[];
export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
