import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function HeroBannerTemplate() {
    const actionsBottomStart = this.actionsPlacement === "BottomStart";
    return (_jsx("div", { class: "ui5-banner-root", role: "banner", part: "canvas", children: _jsxs("div", { class: {
                "ui5-banner-content": true,
                "ui5-banner-columns-equal": this.columnsRatio === "Equal" && this._hasEndContent,
                "ui5-banner-columns-first-wider": this.columnsRatio === "FirstWider" && this._hasEndContent,
            }, part: "content", children: [_jsxs("div", { class: "ui5-banner-header", part: "header", children: [_jsxs("div", { class: "ui5-banner-header-text", children: [this.overlineText &&
                                    _jsx("div", { class: "ui5-banner-overline", children: this.overlineText }), this.headerText &&
                                    _jsx("h2", { class: "ui5-banner-heading", children: this.headerText }), actionsBottomStart && this._hasActions &&
                                    _jsx("div", { class: "ui5-banner-actions ui5-banner-actions-bottom-start", children: _jsx("slot", { name: "actions" }) })] }), !actionsBottomStart && !this._actionsAsGridItem && this._hasActions &&
                            _jsx("div", { class: "ui5-banner-actions", children: _jsx("slot", { name: "actions" }) })] }), this._hasStartContent &&
                    _jsx("div", { class: "ui5-banner-block ui5-banner-block-start", part: "startContent", children: _jsx("slot", {}) }), this._hasEndContent &&
                    _jsx("div", { class: "ui5-banner-block ui5-banner-block-end", part: "endContent", children: _jsx("slot", { name: "endContent" }) }), this._actionsAsGridItem &&
                    _jsx("div", { class: "ui5-banner-actions ui5-banner-actions-grid-item", children: _jsx("slot", { name: "actions" }) })] }) }));
}
//# sourceMappingURL=HeroBannerTemplate.js.map