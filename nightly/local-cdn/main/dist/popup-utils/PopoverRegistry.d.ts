import type Popover from "../Popover.js";
type RegisteredPopover = {
    instance: Popover;
    parentPopovers: Array<Popover>;
};
declare const addOpenedPopover: (instance: Popover) => void;
declare const removeOpenedPopover: (instance: Popover) => void;
declare const getRegistry: () => RegisteredPopover[];
export { addOpenedPopover, removeOpenedPopover, getRegistry };
