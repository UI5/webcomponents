import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TabTemplate() {
    return (_jsxs("div", { id: this._id, class: "ui5-tab-root", "data-ui5-stable": this.stableDomRef, children: [_jsx("slot", { name: this._defaultSlotName }), this.tabs.map(tab => _jsx("slot", { name: tab._effectiveSlotName }))] }));
}
//# sourceMappingURL=TabTemplate.js.map