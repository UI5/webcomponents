import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "./Title.js";
export default function FormTemplate() {
    return (_jsxs("div", { class: "ui5-form-root", role: this.effectiveAccessibleRole, "aria-label": this.effectiveAccessibleName, "aria-labelledby": this.effectiveAccessibleNameRef, style: {
            "--ui5-form-columns-s": this.columnsS,
            "--ui5-form-columns-m": this.columnsM,
            "--ui5-form-columns-l": this.columnsL,
            "--ui5-form-columns-xl": this.columnsXl,
            "--ui5-form-item-layout-S": this.getFormItemLayout("S"),
            "--ui5-form-item-layout-M": this.getFormItemLayout("M"),
            "--ui5-form-item-layout-L": this.getFormItemLayout("L"),
            "--ui5-form-item-layout-XL": this.getFormItemLayout("XL"),
        }, children: [this.hasHeader &&
                _jsx("div", { class: "ui5-form-header", part: "header", children: this.hasCustomHeader ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { id: `${this._id}-header-text`, level: this.headerLevel, children: this.headerText }) }), this.hasGroupItems ? groupedItemsLayout.call(this) : standaloneItemsLayout.call(this)] }));
}
function groupedItemsLayout() {
    return _jsx("div", { class: "ui5-form-layout", part: "layout", children: this.groupItemsInfo.map(groupItemInfo => {
            const groupItem = groupItemInfo.groupItem;
            return _jsx("div", { class: "ui5-form-column", style: {
                    "--ui5-form-column-span-s": groupItem.colsS,
                    "--ui5-form-column-span-m": groupItem.colsM,
                    "--ui5-form-column-span-l": groupItem.colsL,
                    "--ui5-form-column-span-xl": groupItem.colsXl,
                }, part: "column", children: _jsxs("div", { class: "ui5-form-group", role: groupItemInfo.role, "aria-labelledby": groupItemInfo.accessibleNameRef, "aria-label": groupItemInfo.accessibleName, children: [groupItem.headerText &&
                            _jsx("div", { class: "ui5-form-group-heading", children: _jsx(Title, { id: `${groupItem._id}-group-header-text`, level: groupItem.headerLevel, size: "H6", children: groupItem.headerText }) }), this.accessibleMode === "Edit" ?
                            _jsx("div", { class: "ui5-form-group-layout", children: _jsx("slot", { name: groupItem._individualSlot }) })
                            :
                                _jsx("dl", { class: "ui5-form-group-layout", "aria-labelledby": groupItemInfo.accessibleNameRefInner, "aria-label": groupItemInfo.accessibleNameInner, children: _jsx("slot", { name: groupItem._individualSlot }) })] }) });
        }) });
}
function standaloneItemsLayout() {
    const column = _jsx("div", { class: "ui5-form-column", style: {
            "--ui5-form-column-span-s": this.columnsS,
            "--ui5-form-column-span-m": this.columnsM,
            "--ui5-form-column-span-l": this.columnsL,
            "--ui5-form-column-span-xl": this.columnsXl,
        }, part: "column", children: this.accessibleMode === "Edit" ?
            _jsx("div", { class: "ui5-form-group-layout", children: standaloneItemsLayoutContent.call(this) })
            :
                _jsx("dl", { class: "ui5-form-group-layout", children: standaloneItemsLayoutContent.call(this) }) });
    return _jsx("div", { class: "ui5-form-layout", part: "layout", children: column });
}
function standaloneItemsLayoutContent() {
    return this.itemsInfo.map(itemInfo => {
        const item = itemInfo.item;
        return (_jsx("div", { class: "ui5-form-item", children: _jsx("slot", { name: item._individualSlot }) }));
    });
}
//# sourceMappingURL=FormTemplate.js.map