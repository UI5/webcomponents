import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Icon from "./Icon.js";
import editIcon from "@ui5/webcomponents-icons/dist/edit.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
const predefinedHooks = {
    listItemPreContent,
    listItemContent,
    imageBegin,
    iconBegin,
    iconEnd,
    selectionElement,
};
export default function ListItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return _jsxs("li", { part: "native-li", "data-sap-focus-ref": true, tabindex: this._effectiveTabIndex, class: this.classes.main, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onMouseUp: this._onmouseup, onMouseDown: this._onmousedown, onTouchStart: this._onmousedown, onTouchEnd: this._ontouchend, onClick: this._onclick, draggable: this.movable, onDragStart: this._ondragstart, onDragEnd: this._ondragend, role: this._accInfo.role, title: this._accInfo.tooltip, "aria-expanded": this._accInfo.ariaExpanded, "aria-level": this._accInfo.ariaLevel, "aria-haspopup": this._accInfo.ariaHaspopup, "aria-posinset": this._accInfo.posinset, "aria-setsize": this._accInfo.setsize, "aria-describedby": `${this._id}-invisibleText-describedby`, "aria-labelledby": this._accessibleNameRef, "aria-disabled": this._ariaDisabled, "aria-selected": this._accInfo.ariaSelected, "aria-checked": this._accInfo.ariaChecked, "aria-owns": this._accInfo.ariaOwns, "aria-keyshortcuts": this._accInfo.ariaKeyShortcuts, children: [currentHooks.listItemPreContent.call(this), this.placeSelectionElementBefore && selectionElement.call(this), this._hasHighlightColor && _jsx("div", { class: "ui5-li-highlight" }), _jsxs("div", { part: "content", id: `${this._id}-content`, class: "ui5-li-content", children: [currentHooks.imageBegin.call(this), currentHooks.iconBegin.call(this), currentHooks.listItemContent.call(this)] }), currentHooks.iconEnd.call(this), this.typeDetail && (_jsx("div", { class: "ui5-li-detailbtn", children: _jsx(Button, { part: "detail-button", design: "Transparent", onClick: this.onDetailClick, icon: editIcon }) })), this.typeNavigation && (_jsx(Icon, { name: slimArrowRightIcon })), this.navigated && (_jsx("div", { class: "ui5-li-navigated" })), this.placeSelectionElementAfter && (currentHooks.selectionElement.call(this)), _jsx("span", { id: `${this._id}-invisibleText`, class: "ui5-hidden-text", children: this.ariaLabelledByText }), _jsx("span", { id: `${this._id}-invisibleText-describedby`, class: "ui5-hidden-text", children: this._accInfo.ariaSelectedText })] });
}
function listItemPreContent() { }
function listItemContent() { }
function imageBegin() { }
function iconBegin() { }
function iconEnd() { }
function selectionElement() {
    switch (true) {
        case this.modeSingleSelect:
            return (_jsx(RadioButton, { part: "radio", disabled: this.isInactive, accessibleName: this._accInfo.ariaLabelRadioButton, tabindex: -1, id: `${this._id}-singleSelectionElement`, class: "ui5-li-singlesel-radiobtn", checked: this.selected, onChange: this.onSingleSelectionComponentPress }));
        case this.modeMultiple:
            return (_jsx(CheckBox, { part: "checkbox", disabled: this.isInactive, indeterminate: this.indeterminate, tabindex: -1, id: `${this._id}-multiSelectionElement`, class: "ui5-li-multisel-cb", checked: this.selected, accessibleName: this._accInfo.ariaLabel, onChange: this.onMultiSelectionComponentPress }));
        case this.modeDelete:
            return (_jsx("div", { class: "ui5-li-deletebtn", children: this.hasDeleteButtonSlot ?
                    (_jsx("slot", { name: "deleteButton" })) : (_jsx(Button, { part: "delete-button", tabindex: -1, "data-sap-no-tab-ref": true, id: `${this._id}-deleteSelectionElement`, design: "Transparent", icon: declineIcon, onClick: this.onDelete, tooltip: this.deleteText })) }));
    }
}
//# sourceMappingURL=ListItemTemplate.js.map