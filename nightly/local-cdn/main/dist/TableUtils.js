import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
const isInstanceOfTable = createInstanceChecker("isTable");
const isSelectionCell = (e) => {
    return e.composedPath().some((el) => el.hasAttribute?.("data-ui5-table-selection-cell"));
};
const isHeaderSelectionCell = (e) => {
    return isSelectionCell(e) && e.composedPath().some((el) => el instanceof HTMLElement && el.hasAttribute("ui5-table-header-row"));
};
const findRowInPath = (composedPath) => {
    return composedPath.find((el) => el instanceof HTMLElement && el.hasAttribute("ui5-table-row"));
};
const findVerticalScrollContainer = (element, requireOverflow = false) => {
    while (element) {
        const { overflowY } = window.getComputedStyle(element);
        if ((overflowY === "auto" || overflowY === "scroll") && (!requireOverflow || element.scrollHeight > element.clientHeight)) {
            return element;
        }
        if (element.parentNode instanceof ShadowRoot) {
            element = element.parentNode.host;
        }
        else {
            element = element.parentElement;
        }
    }
    return document.scrollingElement || document.documentElement;
};
const AXIS_PROPS = {
    x: { start: "left", end: "right", size: "width" },
    y: { start: "top", end: "bottom", size: "height" },
};
// Computes the scroll delta needed to bring an element into view within a scroll container, considering sticky elements that may be in the way
const computeAxisScrollDelta = (element, scrollContainer, stickyElements, axis) => {
    const { start, end, size } = AXIS_PROPS[axis];
    const elementRect = element.getBoundingClientRect();
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    let pinStart = 0;
    let pinEnd = 0;
    stickyElements.forEach(sticky => {
        if (sticky === element || sticky.contains(element)) {
            return;
        }
        const stickyStyle = getComputedStyle(sticky);
        const stickyRect = sticky.getBoundingClientRect();
        if (stickyStyle[start] !== "auto") {
            pinStart = Math.max(pinStart, stickyRect[end] - scrollContainerRect[start]);
        }
        if (stickyStyle[end] !== "auto") {
            pinEnd = Math.max(pinEnd, scrollContainerRect[end] - stickyRect[start]);
        }
    });
    const viewportStart = scrollContainerRect[start] + pinStart;
    const viewportEnd = scrollContainerRect[end] - pinEnd;
    // Element already spans the whole container
    if (elementRect[start] <= scrollContainerRect[start] && elementRect[end] >= scrollContainerRect[end]) {
        return 0;
    }
    // Element larger than the visible viewport
    if (elementRect[size] > viewportEnd - viewportStart) {
        return (axis === "x" && element.matches(":dir(rtl)")) ? elementRect[end] - viewportEnd : elementRect[start] - viewportStart;
    }
    if (elementRect[start] < viewportStart) {
        return elementRect[start] - viewportStart;
    }
    if (elementRect[end] > viewportEnd) {
        return elementRect[end] - viewportEnd;
    }
    return 0;
};
const isFeature = (element, identifier) => {
    return element.identifier === identifier;
};
const throttle = (callback) => {
    let timer;
    return () => {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(() => {
            callback();
        });
    };
};
const toggleAttribute = (element, attribute, condition, value) => {
    if (condition) {
        if (value === undefined) {
            element.toggleAttribute(attribute, true);
        }
        else {
            element.setAttribute(attribute, value);
        }
    }
    else if (element.hasAttribute(attribute)) {
        element.removeAttribute(attribute);
    }
};
/**
 * Checks if a given width is valid for a column.
 *
 * @param width Width string to check
 * @returns {boolean} true if the width is valid, false otherwise
 */
const isValidColumnWidth = (width) => {
    const element = document.createElement("div");
    element.style.width = `max(3rem, ${width})`;
    return element.style.width !== "";
};
export { isInstanceOfTable, isSelectionCell, isHeaderSelectionCell, findRowInPath, findVerticalScrollContainer, computeAxisScrollDelta, isFeature, throttle, toggleAttribute, isValidColumnWidth, };
//# sourceMappingURL=TableUtils.js.map