import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function PageTemplate() {
    return (_jsxs("div", { class: "ui5-page-root", children: [_jsx("header", { id: "ui5-page-header", class: "ui5-page-header-root", children: _jsx("slot", { name: "header" }) }), _jsx("section", { part: "content", class: "ui5-page-content-root", style: {
                    "padding-bottom": this.footer.length && this._contentPaddingBottom,
                    "scroll-padding-bottom": this.footer.length && this._contentPaddingBottom,
                    "margin-bottom": this.footer.length && this._contentBottom,
                    "bottom": this.footer.length && this._contentBottom,
                    "top": this._contentTop,
                }, children: _jsx("slot", {}) }), _jsx("footer", { class: "ui5-page-footer-root", children: _jsx("slot", { name: "footer" }) })] }));
}
//# sourceMappingURL=PageTemplate.js.map