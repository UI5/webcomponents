import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import handleDragOver from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDragOver.js";
import handleDrop from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDrop.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
class DragAndDropHandler {
    constructor(component, config) {
        this.component = component;
        this.config = {
            orientation: Orientation.Vertical,
            clientCoordinate: "clientY",
            ...config,
        };
    }
    ondragenter(e) {
        e.preventDefault();
    }
    ondragleave(e) {
        if (e.relatedTarget instanceof Node && this.component.shadowRoot?.contains(e.relatedTarget)) {
            return;
        }
        const dropIndicator = this.config.getDropIndicator();
        if (dropIndicator) {
            dropIndicator.targetReference = null;
        }
    }
    ondragover(e) {
        if (!this._validateDragOver(e)) {
            return;
        }
        const draggedElement = DragRegistry.getDraggedElement();
        const dropIndicator = this.config.getDropIndicator();
        const closestPosition = this._findClosestPosition(e);
        if (!closestPosition) {
            dropIndicator.targetReference = null;
            return;
        }
        const targetElement = this._transformTargetElement(closestPosition.element);
        if (!this._isValidDragTarget(draggedElement, targetElement)) {
            dropIndicator.targetReference = null;
            return;
        }
        // Filter placements if needed (e.g., ListItemGroup filtering out MovePlacement.On)
        const placements = this._filterPlacements(closestPosition.placements, draggedElement, targetElement);
        const settings = this.config.useOriginalEvent ? { originalEvent: true } : {};
        const { targetReference, placement } = handleDragOver(e, this.component, {
            element: targetElement,
            placements,
        }, targetElement, settings);
        dropIndicator.targetReference = targetReference;
        dropIndicator.placement = placement;
    }
    ondrop(e) {
        const dropIndicator = this.config.getDropIndicator();
        if (!dropIndicator?.targetReference || !dropIndicator?.placement) {
            e.preventDefault();
            return;
        }
        const settings = this.config.useOriginalEvent ? { originalEvent: true } : {};
        handleDrop(e, this.component, dropIndicator.targetReference, dropIndicator.placement, settings);
        dropIndicator.targetReference = null;
    }
    _validateDragOver(e) {
        if (!(e.target instanceof HTMLElement)) {
            return false;
        }
        const draggedElement = DragRegistry.getDraggedElement();
        const dropIndicator = this.config.getDropIndicator();
        return !!(draggedElement && dropIndicator);
    }
    _findClosestPosition(e) {
        const items = this.config.getItems();
        const coordinate = this.config.clientCoordinate === "clientX" ? e.clientX : e.clientY;
        return findClosestPosition(items, coordinate, this.config.orientation);
    }
    _transformTargetElement(element) {
        if (this.config.transformElement) {
            return this.config.transformElement(element);
        }
        return element;
    }
    _isValidDragTarget(draggedElement, targetElement) {
        if (this.config.validateDraggedElement) {
            return this.config.validateDraggedElement(draggedElement, targetElement);
        }
        return true;
    }
    _filterPlacements(placements, draggedElement, targetElement) {
        if (this.config.filterPlacements) {
            return this.config.filterPlacements(placements, draggedElement, targetElement);
        }
        return placements;
    }
}
export default DragAndDropHandler;
//# sourceMappingURL=DragAndDropHandler.js.map