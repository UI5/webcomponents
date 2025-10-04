import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "./Title.js";
export default function FormTemplate() {
    return (_jsxs("div", { class: "ui5-form-root", role: this.effectiveAccessibleRole, "aria-label": this.effectiveAccessibleName, "aria-labelledby": this.effectiveАccessibleNameRef, children: [this.hasHeader &&
                _jsx("div", { class: "ui5-form-header", part: "header", children: this.hasCustomHeader ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { id: `${this._id}-header-text`, level: this.headerLevel, children: this.headerText }) }), _jsx("div", { class: "ui5-form-layout", part: "layout", children: this.hasGroupItems ?
                    _jsx(_Fragment, { children: this.groupItemsInfo.map(groupItemInfo => {
                            const groupItem = groupItemInfo.groupItem;
                            return (_jsx("div", { class: {
                                    "ui5-form-column": true,
                                    [`ui5-form-column-spanL-${groupItem.colsL}`]: true,
                                    [`ui5-form-column-spanXL-${groupItem.colsXl}`]: true,
                                    [`ui5-form-column-spanM-${groupItem.colsM}`]: true,
                                    [`ui5-form-column-spanS-${groupItem.colsS}`]: true,
                                }, part: "column", children: _jsxs("div", { class: "ui5-form-group", role: "form", "aria-labelledby": groupItemInfo.accessibleNameRef, children: [groupItem.headerText &&
                                            _jsx("div", { class: "ui5-form-group-heading", children: _jsx(Title, { id: `${groupItem._id}-group-header-text`, level: groupItem.headerLevel, size: "H6", children: groupItem.headerText }) }), _jsx("div", { class: "ui5-form-group-layout", children: _jsx("slot", { name: groupItem._individualSlot }) })] }) }));
                        }) })
                    :
                        _jsx(_Fragment, { children: this.itemsInfo.map(itemInfo => {
                                const item = itemInfo.item;
                                return (_jsx("div", { class: {
                                        "ui5-form-item": true,
                                        [`ui5-form-item-span-${item.columnSpan}`]: item.columnSpan !== undefined,
                                    }, children: _jsx("slot", { name: item._individualSlot }) }));
                            }) }) })] }));
}
//# sourceMappingURL=FormTemplate.js.map