import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import handleDragOver from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDragOver.js";
import handleDrop from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDrop.js";
import TableExtension from "./TableExtension.js";
export default class TableDragAndDrop extends TableExtension {
    constructor(table) {
        super();
        this._table = table;
    }
    _ondragstart(e) {
        DragRegistry.setDraggedElement(e.target);
    }
    _ondragend() {
        DragRegistry.clearDraggedElement();
    }
    _ondragenter(e) {
        e.preventDefault();
    }
    _ondragleave(e) {
        if (e.relatedTarget instanceof Node && this._table.shadowRoot.contains(e.relatedTarget)) {
            return;
        }
        this._table.dropIndicatorDOM.targetReference = null;
    }
    _ondragover(e) {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const closestPosition = findClosestPosition(this._table.rows, e.clientY, Orientation.Vertical);
        if (!closestPosition) {
            this._table.dropIndicatorDOM.targetReference = null;
            return;
        }
        const { targetReference, placement } = handleDragOver(e, this._table, closestPosition, closestPosition.element, { crossDnD: true, originalEvent: true });
        this._table.dropIndicatorDOM.targetReference = targetReference;
        this._table.dropIndicatorDOM.placement = placement;
    }
    _ondrop(e) {
        if (!this._table.dropIndicatorDOM?.targetReference || !this._table.dropIndicatorDOM?.placement) {
            return;
        }
        handleDrop(e, this._table, this._table.dropIndicatorDOM.targetReference, this._table.dropIndicatorDOM.placement);
        this._table.dropIndicatorDOM.targetReference = null;
    }
}
//# sourceMappingURL=TableDragAndDrop.js.map