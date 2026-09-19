let groups = [];
const isFastNavGroupElemenet = (el) => {
    return el.getAttribute("data-sap-ui-fastnavgroup") === "true";
};
const isElementVisible = (el) => {
    const style = window.getComputedStyle(el);
    return style.width !== "0px"
        && style.height !== "0px"
        && style.opacity !== "0"
        && style.display !== "none"
        && style.visibility !== "hidden";
};
const findFastNavigationGroups = (container, startFromContainer) => {
    let child, assignedElements, index = 0;
    if (!isElementVisible(container)) {
        return;
    }
    if (isFastNavGroupElemenet(container)) {
        groups.push(container);
    }
    if (container.shadowRoot) {
        child = container.shadowRoot.firstChild;
    }
    else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
        assignedElements = container.assignedNodes();
        child = assignedElements[0];
    }
    else if (startFromContainer) {
        child = container;
    }
    else {
        child = container.firstElementChild;
    }
    while (child) {
        const originalChild = child;
        if (!child) {
            return;
        }
        if (child.nodeType === 1) {
            findFastNavigationGroups(child, false);
        }
        if (child === container) {
            child = assignedElements && assignedElements.length ? assignedElements[++index] : null;
        }
        else {
            child = assignedElements && assignedElements.length ? assignedElements[++index] : originalChild.nextElementSibling;
        }
    }
};
const getFastNavigationGroups = (container) => {
    groups = [];
    findFastNavigationGroups(container, true);
    return groups;
};
export default getFastNavigationGroups;
//# sourceMappingURL=getFastNavigationGroups.js.map