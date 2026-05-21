import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
export default function ListItemGroupTemplate(hooks) {
    const items = hooks?.items || defaultItems;
    return (_jsxs("ul", { role: "group", class: "ui5-group-li-root", onDragEnter: this._ondragenter, onDragOver: this._ondragover, onDrop: this._ondrop, onDragLeave: this._ondragleave, children: [this.hasHeader &&
                _jsx(ListItemGroupHeader, { focused: this.focused, part: "header", accessibleRole: ListItemAccessibleRole.Group, wrappingType: this.getGroupHeaderWrapping(), children: this.hasFormattedHeader ? _jsx("slot", { name: "header" }) : this.headerText }), items.call(this), _jsx(DropIndicator, { orientation: "Horizontal", ownerReference: this })] }));
}
function defaultItems() {
    return _jsx("slot", {});
}
//# sourceMappingURL=ListBoxItemGroupTemplate.js.map