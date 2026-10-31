import { isDown, isUp, isTabNext, isTabPrevious, isEscape, } from "../Keys.js";
const attachListeners = (e, links, index, handlers) => {
    if (isTabNext(e)) {
        if (index !== links.length - 1) {
            e.stopImmediatePropagation();
            e.preventDefault();
            links[index + 1].focus();
        }
        else {
            handlers.closeValueState();
            handlers.focusInput();
        }
    }
    if (isTabPrevious(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (index > 0) {
            links[index - 1].focus();
        }
        else {
            handlers.focusInput();
        }
    }
    if (isUp(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        handlers.isPopoverOpen() && handlers.focusInput();
    }
    if (isDown(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        handlers.navigateToItem();
    }
    if (isEscape(e)) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
};
export { attachListeners };
//# sourceMappingURL=valueStateNavigation.js.map