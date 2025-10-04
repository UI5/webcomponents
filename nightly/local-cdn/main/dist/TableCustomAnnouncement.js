import TableExtension from "./TableExtension.js";
import I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { TABLE_ROW, TABLE_ROW_INDEX, TABLE_ROW_SELECTED, TABLE_ROW_ACTIVE, TABLE_ROW_NAVIGABLE, TABLE_COLUMN_HEADER_ROW, TABLE_CELL_SINGLE_CONTROL, TABLE_CELL_MULTIPLE_CONTROLS, TABLE_ACC_STATE_EMPTY, TABLE_ACC_STATE_REQUIRED, TABLE_ACC_STATE_DISABLED, TABLE_ACC_STATE_READONLY, } from "./generated/i18n/i18n-defaults.js";
let invisibleText;
const i18nBundle = new I18nBundle("@ui5/webcomponents/main");
const checkVisibility = (element) => {
    return element.checkVisibility() || getComputedStyle(element).display === "contents";
};
const updateInvisibleText = (element, text = []) => {
    const invisibleTextId = "ui5-table-invisible-text";
    if (!invisibleText || !invisibleText.isConnected) {
        invisibleText = document.createElement("span");
        invisibleText.id = invisibleTextId;
        invisibleText.ariaHidden = "true";
        invisibleText.style.display = "none";
        document.body.appendChild(invisibleText);
    }
    let ariaLabelledBy = (element.getAttribute("aria-labelledby") || "").split(" ").filter(Boolean);
    const invisibleTextAssociated = ariaLabelledBy.includes(invisibleTextId);
    text = Array.isArray(text) ? text.filter(Boolean).join(" . ").trim() : text.trim();
    if (text && !invisibleTextAssociated) {
        ariaLabelledBy.push(invisibleTextId);
    }
    else if (!text && invisibleTextAssociated) {
        ariaLabelledBy = ariaLabelledBy.filter(id => id !== invisibleTextId);
    }
    invisibleText.textContent = text;
    if (ariaLabelledBy.length > 0) {
        element.setAttribute("aria-labelledby", ariaLabelledBy.join(" "));
    }
    else {
        element.removeAttribute("aria-labelledby");
    }
};
const getAccessibilityDescription = (element, lessDetails = false, _isRootElement = true) => {
    if (!element) {
        return "";
    }
    if (element.nodeType === Node.TEXT_NODE) {
        return element.data.trim();
    }
    if (!(element instanceof HTMLElement)) {
        return "";
    }
    if (element.hasAttribute("data-ui5-table-acc-text")) {
        return element.getAttribute("data-ui5-table-acc-text") || "";
    }
    if (element.ariaHidden === "true" || !checkVisibility(element)) {
        return _isRootElement ? i18nBundle.getText(TABLE_ACC_STATE_EMPTY) : "";
    }
    let childNodes = [];
    const descriptions = [];
    const accessibilityInfo = element.accessibilityInfo;
    if (accessibilityInfo) {
        const { type, description, required, disabled, readonly, children, } = accessibilityInfo;
        childNodes = children || [];
        type && descriptions.push(type);
        description && descriptions.push(description);
        if (!lessDetails) {
            required && descriptions.push(i18nBundle.getText(TABLE_ACC_STATE_REQUIRED));
            disabled && descriptions.push(i18nBundle.getText(TABLE_ACC_STATE_DISABLED));
            readonly && descriptions.push(i18nBundle.getText(TABLE_ACC_STATE_READONLY));
        }
    }
    else if (element.localName === "slot") {
        childNodes = element.assignedNodes({ flatten: true });
    }
    else {
        childNodes = element.shadowRoot ? [...element.shadowRoot.childNodes] : [...element.childNodes];
    }
    childNodes.forEach(child => {
        const childDescription = getAccessibilityDescription(child, lessDetails, false);
        childDescription && descriptions.push(childDescription);
    });
    if (_isRootElement) {
        const hasDescription = descriptions.length > 0;
        if (!hasDescription || !lessDetails) {
            const tabbables = getTabbableElements(element);
            const bundleKey = [
                hasDescription ? "" : TABLE_ACC_STATE_EMPTY,
                TABLE_CELL_SINGLE_CONTROL,
                TABLE_CELL_MULTIPLE_CONTROLS,
            ][Math.min(tabbables.length, 2)];
            if (bundleKey) {
                hasDescription && descriptions.push(".");
                descriptions.push(i18nBundle.getText(bundleKey));
            }
        }
    }
    return descriptions.join(" ").trim();
};
/**
 * Handles the custom announcement for the ui5-table.
 *
 * @class
 * @private
 */
class TableCustomAnnouncement extends TableExtension {
    constructor(table) {
        super();
        this._tableAttributes = ["ui5-table-header-row", "ui5-table-header-cell", "ui5-table-row", "ui5-table-cell"];
        this._table = table;
    }
    _onfocusin(e, eventOrigin) {
        const tableAttribute = this._tableAttributes.find(attr => eventOrigin.hasAttribute(attr));
        if (!tableAttribute) {
            return;
        }
        const tableElementName = tableAttribute.replace("ui5-table", "Table").replace(/-([a-z])/g, g => g[1].toUpperCase());
        const eventHandlerName = `_handle${tableElementName}Focusin`;
        const eventHandler = this[eventHandlerName];
        if (typeof eventHandler === "function") {
            eventHandler.call(this, eventOrigin, e);
        }
        else {
            this._handleTableElementFocusin(eventOrigin);
        }
    }
    _onfocusout(e, eventOrigin) {
        const isTableElement = this._tableAttributes.some(attr => eventOrigin.hasAttribute(attr));
        isTableElement && updateInvisibleText(eventOrigin);
    }
    _handleTableElementFocusin(element) {
        const description = getAccessibilityDescription(element);
        updateInvisibleText(element, description);
    }
    _handleTableHeaderRowFocusin(headerRow) {
        const descriptions = [
            i18nBundle.getText(TABLE_COLUMN_HEADER_ROW),
        ];
        if (headerRow._hasSelector) {
            descriptions.push(headerRow._isMultiSelect ? headerRow._selectionCellAriaDescription : headerRow._i18nSelection);
        }
        headerRow._visibleCells.forEach(headerCell => {
            const cellDescription = getAccessibilityDescription(headerCell, true);
            descriptions.push(cellDescription);
        });
        if (headerRow._rowActionCount > 0) {
            descriptions.push(headerRow._i18nRowActions);
        }
        updateInvisibleText(headerRow, descriptions);
    }
    _handleTableRowFocusin(row) {
        if (!row._table) {
            return;
        }
        const descriptions = [
            i18nBundle.getText(TABLE_ROW),
            i18nBundle.getText(TABLE_ROW_INDEX, row.ariaRowIndex, this._table._ariaRowCount),
        ];
        if (row._isSelected) {
            descriptions.push(i18nBundle.getText(TABLE_ROW_SELECTED));
        }
        if (row._isNavigable) {
            descriptions.push(i18nBundle.getText(TABLE_ROW_NAVIGABLE));
        }
        else if (row.interactive) {
            descriptions.push(i18nBundle.getText(TABLE_ROW_ACTIVE));
        }
        const cells = [...row._visibleCells, ...row._popinCells];
        cells.flatMap(cell => {
            return cell._popin ? [cell._popinHeader, cell._popinContent] : [cell._headerCell, cell];
        }).forEach(node => {
            const nodeDescription = getAccessibilityDescription(node, true);
            descriptions.push(nodeDescription);
        });
        if (row._availableActionsCount > 0) {
            descriptions.push(row._actionCellAccText);
        }
        updateInvisibleText(row, descriptions);
    }
    _handleTableCellFocusin(cell) {
        if (cell.hasAttribute("data-ui5-table-popin-cell")) {
            const popinCells = cell.getDomRef().assignedNodes({ flatten: true });
            const descriptions = popinCells.flatMap(popinCell => {
                const headerDescription = getAccessibilityDescription(popinCell._popinHeader);
                const contentDescription = getAccessibilityDescription(popinCell._popinContent);
                return [headerDescription, contentDescription];
            });
            updateInvisibleText(cell, descriptions);
        }
        else {
            this._handleTableElementFocusin(cell);
        }
    }
}
export default TableCustomAnnouncement;
//# sourceMappingURL=TableCustomAnnouncement.js.map