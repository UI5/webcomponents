import getActiveElement from "./getActiveElement.js";
const getFocusedElement = () => {
    const element = getActiveElement();
    return (element && typeof element.focus === "function") ? element : null;
};
const isFocusedElementWithinNode = (node) => {
    const fe = getFocusedElement();
    if (fe) {
        return isNodeContainedWithin(node, fe);
    }
    return false;
};
const isNodeContainedWithin = (parent, child) => {
    let currentNode = parent;
    if (currentNode.shadowRoot) {
        const children = Array.from(currentNode.shadowRoot.children);
        currentNode = children.find(n => n.localName !== "style");
        if (!currentNode) {
            return false;
        }
    }
    if (currentNode === child) {
        return true;
    }
    const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;
    if (childNodes) {
        return Array.from(childNodes).some(n => isNodeContainedWithin(n, child));
    }
    return false;
};
const isPointInRect = (x, y, rect) => {
    return x >= rect.left && x <= rect.right
        && y >= rect.top && y <= rect.bottom;
};
const isClickInRect = (e, rect) => {
    let x;
    let y;
    if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
    }
    else {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
    }
    return isPointInRect(x, y, rect);
};
function instanceOfPopup(object) {
    return "isUI5Element" in object && "_show" in object;
}
const getClosedPopupParent = (el) => {
    const parent = el.parentElement || (el.getRootNode && el.getRootNode().host);
    if (parent && ((instanceOfPopup(parent) || parent === document.documentElement))) {
        return parent;
    }
    return getClosedPopupParent(parent);
};
export { getFocusedElement, isClickInRect, getClosedPopupParent, isFocusedElementWithinNode, };
//# sourceMappingURL=PopupUtils.js.map