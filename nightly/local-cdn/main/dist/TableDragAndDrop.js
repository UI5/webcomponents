import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPosition, findClosestPositionsByKey, isMovingKey } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import handleDragOver from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDragOver.js";
import handleDrop from "@ui5/webcomponents-base/dist/util/dragAndDrop/handleDrop.js";
import { isCtrl } from "@ui5/webcomponents-base/dist/Keys.js";
import TableExtension from "./TableExtension.js";
export default class TableDragAndDrop extends TableExtension {
    constructor(table) {
        super();
        this._table = table;
    }
    _ondragstart(e) {
        DragRegistry.setDraggedElement(e.target, e);
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
    _onkeydown(e) {
        if (!isCtrl(e) || !isMovingKey(e.key)) {
            return;
        }
        const row = e.target;
        if (!row || !row.movable) {
            return;
        }
        this._moveRow(row, e);
    }
    _moveRow(row, e) {
        const closestPositions = findClosestPositionsByKey(this._table.rows, row, e);
        if (!closestPositions.length) {
            return;
        }
        e.preventDefault();
        const acceptedPosition = closestPositions.find(({ element, placement }) => {
            return !this._table.fireDecoratorEvent("move-over", {
                originalEvent: e,
                source: {
                    element: row,
                },
                destination: {
                    element,
                    placement,
                },
            });
        });
        if (acceptedPosition) {
            this._table.fireDecoratorEvent("move", {
                originalEvent: e,
                source: {
                    element: row,
                },
                destination: {
                    element: acceptedPosition.element,
                    placement: acceptedPosition.placement,
                },
            });
            row.focus();
        }
    }
}
//# sourceMappingURL=TableDragAndDrop.js.map