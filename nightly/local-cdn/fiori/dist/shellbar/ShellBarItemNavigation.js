import { isEnd, isHome, isLeft, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
class ShellBarItemNavigation {
    constructor(params) {
        this.params = params;
    }
    handleKeyDown(e) {
        if (!this.shouldHandle(e)) {
            return;
        }
        const domRef = this.params.getDomRef();
        if (!domRef) {
            return;
        }
        const activeElement = getActiveElement();
        if (!activeElement) {
            return;
        }
        if (this.shouldChildHandleNavigation(activeElement, e)) {
            return;
        }
        const items = this.getTabbableItems(domRef);
        const currentIndex = items.findIndex(el => el === activeElement);
        if (currentIndex !== -1) {
            e.preventDefault();
            this.navigateToItem(items, currentIndex, e);
        }
    }
    shouldHandle(e) {
        return isLeft(e) || isRight(e) || isHome(e) || isEnd(e);
    }
    shouldChildHandleNavigation(element, e) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
            return this.shouldInputHandleNavigation(element, e);
        }
        return false;
    }
    shouldInputHandleNavigation(input, e) {
        const cursorPos = input.selectionStart || 0;
        const textLength = input.value.length;
        if (isLeft(e) && cursorPos > 0) {
            return true;
        }
        if (isRight(e) && cursorPos < textLength) {
            return true;
        }
        return false;
    }
    getTabbableItems(domRef) {
        return getTabbableElements(domRef).filter(el => this.isVisible(el));
    }
    isVisible(element) {
        const style = getComputedStyle(element);
        return style.display !== "none"
            && style.visibility !== "hidden"
            && element.offsetWidth > 0
            && element.offsetHeight > 0;
    }
    navigateToItem(items, currentIndex, e) {
        if (isLeft(e)) {
            this.focusPrevious(items, currentIndex);
        }
        else if (isRight(e)) {
            this.focusNext(items, currentIndex);
        }
        else if (isHome(e)) {
            items[0]?.focus();
        }
        else if (isEnd(e)) {
            items[items.length - 1]?.focus();
        }
    }
    focusPrevious(items, currentIndex) {
        if (currentIndex > 0) {
            items[currentIndex - 1].focus();
        }
    }
    focusNext(items, currentIndex) {
        if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
        }
    }
}
export default ShellBarItemNavigation;
//# sourceMappingURL=ShellBarItemNavigation.js.map