import DragRegistry from "./DragRegistry.js";
/**
 * Handles the dragover event.
 */
function handleDragOver(e, component, position, target, settings = {}) {
    const draggedElement = DragRegistry.getDraggedElement();
    const dragOverResult = {
        targetReference: null,
        placement: null,
    };
    if (!draggedElement && !settings?.crossDnD) {
        return dragOverResult;
    }
    const placements = position.placements;
    dragOverResult.targetReference = e.target;
    const placementAccepted = placements.some(placement => {
        const originalEvent = settings.originalEvent ? { originalEvent: e } : {};
        const beforeItemMovePrevented = !component.fireDecoratorEvent("move-over", {
            ...originalEvent,
            source: {
                element: draggedElement,
            },
            destination: {
                element: target,
                placement,
            },
        });
        if (beforeItemMovePrevented) {
            e.preventDefault();
            dragOverResult.targetReference = position.element;
            dragOverResult.placement = placement;
            return true;
        }
        return false;
    });
    if (!placementAccepted) {
        dragOverResult.targetReference = null;
    }
    return dragOverResult;
}
export default handleDragOver;
//# sourceMappingURL=handleDragOver.js.map