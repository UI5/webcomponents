import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function ColorPaletteItemTemplate() {
    return (_jsx("div", { class: "ui5-cp-item", tabindex: parseInt(this.forcedTabIndex), role: "button", "aria-label": `${this.colorLabel} - ${this.index}: ${this.value}`, "aria-pressed": this.selected, title: `${this.colorLabel} - ${this.index}: ${this.value}` }));
}
//# sourceMappingURL=ColorPaletteItemTemplate.js.map