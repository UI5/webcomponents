interface ControlHandlers {
    closeValueState: () => void;
    focusInput: () => void;
    navigateToItem: () => void;
    isPopoverOpen: () => boolean;
}
declare const attachListeners: (e: KeyboardEvent, links: Array<HTMLElement>, index: number, handlers: ControlHandlers) => void;
export { attachListeners, ControlHandlers };
