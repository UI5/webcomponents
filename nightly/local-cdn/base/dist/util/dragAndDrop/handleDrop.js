import DragRegistry from "./DragRegistry.js";
function handleDrop(e, component, target, placement, settings = {}) {
    e.preventDefault();
    const draggedElement = DragRegistry.getDraggedElement();
    if (!draggedElement && settings?.crossDnD) {
        return;
    }
    const originalEvent = settings.originalEvent ? { originalEvent: e } : {};
    component.fireDecoratorEvent("move", {
        ...originalEvent,
        source: {
            element: draggedElement,
        },
        destination: {
            element: target,
            placement,
        },
    });
    draggedElement?.focus();
}
export default handleDrop;
//# sourceMappingURL=handleDrop.js.map