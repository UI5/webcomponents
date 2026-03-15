import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
export default function ListItemGroupTemplate() {
    return (_jsxs(_Fragment, { children: [this.hasHeader &&
                _jsxs(ListItemGroupHeader, { wrappingType: this.wrappingType, focused: this.focused, part: "header", exportparts: "title", accessibleRole: ListItemAccessibleRole.ListItem, children: [this.hasFormattedHeader ? _jsx("slot", { name: "header" }) : this.headerText, _jsx("div", { role: "list", slot: "subItems", "aria-owns": `${this._id}-content`, "aria-label": this.headerText })] }), _jsxs("div", { class: "ui5-group-li-root", onDragEnter: this._ondragenter, onDragOver: this._ondragover, onDrop: this._ondrop, onDragLeave: this._ondragleave, id: `${this._id}-content`, children: [_jsx("slot", {}), _jsx(DropIndicator, { orientation: "Horizontal", ownerReference: this })] })] }));
}
//# sourceMappingURL=ListItemGroupTemplate.js.map