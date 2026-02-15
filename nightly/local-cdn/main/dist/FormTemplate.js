import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "./Title.js";
export default function FormTemplate() {
    return (_jsxs("div", { class: "ui5-form-root", role: this.effectiveAccessibleRole, "aria-label": this.effectiveAccessibleName, "aria-labelledby": this.effectiveАccessibleNameRef, children: [this.hasHeader &&
                _jsx("div", { class: "ui5-form-header", part: "header", children: this.hasCustomHeader ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { id: `${this._id}-header-text`, level: this.headerLevel, children: this.headerText }) }), this.hasGroupItems ? groupedItemsLayout.call(this) : standaloneItemsLayout.call(this)] }));
}
function groupedItemsLayout() {
    return _jsx("div", { class: "ui5-form-layout", part: "layout", children: this.groupItemsInfo.map(groupItemInfo => {
            const groupItem = groupItemInfo.groupItem;
            return _jsx("div", { class: {
                    "ui5-form-column": true,
                    [`ui5-form-column-spanL-${groupItem.colsL}`]: true,
                    [`ui5-form-column-spanXL-${groupItem.colsXl}`]: true,
                    [`ui5-form-column-spanM-${groupItem.colsM}`]: true,
                    [`ui5-form-column-spanS-${groupItem.colsS}`]: true,
                }, part: "column", children: _jsxs("div", { class: "ui5-form-group", role: groupItemInfo.role, "aria-labelledby": groupItemInfo.accessibleNameRef, "aria-label": groupItemInfo.accessibleName, children: [groupItem.headerText &&
                            _jsx("div", { class: "ui5-form-group-heading", children: _jsx(Title, { id: `${groupItem._id}-group-header-text`, level: groupItem.headerLevel, size: "H6", children: groupItem.headerText }) }), this.accessibleMode === "Edit" ?
                            _jsx("div", { class: "ui5-form-group-layout", children: _jsx("slot", { name: groupItem._individualSlot }) })
                            :
                                _jsx("dl", { class: "ui5-form-group-layout", "aria-labelledby": groupItemInfo.accessibleNameRefInner, "aria-label": groupItemInfo.accessibleNameInner, children: _jsx("slot", { name: groupItem._individualSlot }) })] }) });
        }) });
}
function standaloneItemsLayout() {
    return (this.accessibleMode === "Edit" ?
        _jsx("div", { class: "ui5-form-layout", part: "layout", children: standaloneItemsLayoutContent.call(this) })
        :
            _jsx("dl", { class: "ui5-form-layout", part: "layout", children: standaloneItemsLayoutContent.call(this) }));
}
function standaloneItemsLayoutContent() {
    return this.itemsInfo.map(itemInfo => {
        const item = itemInfo.item;
        return (_jsx("div", { class: {
                "ui5-form-item": true,
                [`ui5-form-item-span-${item.columnSpan}`]: item.columnSpan !== undefined,
            }, children: _jsx("slot", { name: item._individualSlot }) }));
    });
}
//# sourceMappingURL=FormTemplate.js.map