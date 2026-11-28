import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";
export default function ListItemGroupTemplate() {
    // Only the default list role exposes the header as a heading and nests the
    // items in an inner role="list". For listbox/menu/tree the items must stay
    // direct members of the role="group", so header and wrapper are role="none".
    return (_jsxs("div", { role: this.exposeGroupRole ? "group" : undefined, "aria-label": this.exposeGroupRole ? this.groupLabel : undefined, children: [this.hasHeader &&
                _jsx(ListItemGroupHeader, { wrappingType: this.wrappingType, focused: this.focused, part: "header", exportparts: "title", accessibleRole: this.isDefaultListRole ? "Heading" : "None", children: this.hasFormattedHeader ? _jsx("slot", { name: "header" }) : this.headerText }), _jsxs("div", { class: "ui5-group-li-root", role: this.isDefaultListRole && this.exposeGroupRole ? "list" : "none", "aria-label": this.isDefaultListRole && this.exposeGroupRole ? this.groupLabel : undefined, onDragEnter: this._ondragenter, onDragOver: this._ondragover, onDrop: this._ondrop, onDragLeave: this._ondragleave, id: `${this._id}-content`, children: [_jsx("slot", {}), _jsx(DropIndicator, { orientation: "Horizontal", ownerReference: this })] })] }));
}
//# sourceMappingURL=ListItemGroupTemplate.js.map