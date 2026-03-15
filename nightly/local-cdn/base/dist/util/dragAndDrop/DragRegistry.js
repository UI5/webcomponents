import MultipleDragGhostCss from "../../generated/css/MultipleDragGhost.css.js";
import { getI18nBundle } from "../../i18nBundle.js";
import { DRAG_DROP_MULTIPLE_TEXT, } from "../../generated/i18n/i18n-defaults.js";
const MIN_MULTI_DRAG_COUNT = 2;
let draggedElement = null;
const setDraggedElement = (element, e) => {
    draggedElement = element;
    // Store the dragged element's ID in the dataTransfer object to ensure
    // the drag operation is recognized across different browsers and contexts.
    // Without this, Safari browser in iOS may not recognize the drag operation.
    e?.dataTransfer?.setData("text/plain", element ? element.id : "");
};
const clearDraggedElement = () => {
    draggedElement = null;
};
const getDraggedElement = () => {
    return draggedElement;
};
const createDefaultMultiDragElement = async (count) => {
    const dragElement = document.createElement("div");
    const i18nBundle = await getI18nBundle("@ui5/webcomponents-base");
    const dragElementShadow = dragElement.attachShadow({ mode: "open" });
    const styles = new CSSStyleSheet();
    styles.replaceSync(MultipleDragGhostCss);
    dragElementShadow.adoptedStyleSheets = [styles];
    dragElementShadow.textContent = i18nBundle.getText(DRAG_DROP_MULTIPLE_TEXT, count);
    return dragElement;
};
/**
 * Starts a multiple drag operation by creating a drag ghost element.
 * The drag ghost will be displayed when dragging multiple items.
 *
 * @param {number} count - The number of items being dragged.
 * @param {DragEvent} e - The drag event that triggered the operation.
 * @public
 */
const startMultipleDrag = async (count, e) => {
    if (count < MIN_MULTI_DRAG_COUNT) {
        console.warn(`Cannot start multiple drag with count ${count}. Minimum is ${MIN_MULTI_DRAG_COUNT}.`); // eslint-disable-line
        return;
    }
    if (!e.dataTransfer) {
        return;
    }
    const customDragElement = await createDefaultMultiDragElement(count);
    // Add to document body temporarily
    document.body.appendChild(customDragElement);
    e.dataTransfer.setDragImage(customDragElement, 0, 0);
    // Clean up the temporary element after the drag operation starts
    requestAnimationFrame(() => {
        customDragElement.remove();
    });
};
const DragRegistry = {
    setDraggedElement,
    clearDraggedElement,
    getDraggedElement,
    startMultipleDrag,
};
export default DragRegistry;
export { startMultipleDrag, };
//# sourceMappingURL=DragRegistry.js.map