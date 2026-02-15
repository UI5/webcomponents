import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Title from "@ui5/webcomponents/dist/Title.js";
export default function IllustratedMessageTemplate() {
    return (_jsxs("div", { class: "ui5-illustrated-message-root", children: [_jsxs("div", { class: "ui5-illustrated-message-inner", children: [_jsx("div", { class: "ui5-illustrated-message-illustration", role: this.decorative ? "presentation" : "img", "aria-hidden": this.decorative ? true : undefined, "aria-label": !this.decorative ? this.name : undefined, children: renderIllustration.call(this) }), _jsxs("div", { class: "ui5-illustrated-message-text-and-actions-container", children: [this.hasTitle &&
                                _jsx("div", { part: "title", class: "ui5-illustrated-message-title", children: this.hasFormattedTitle ?
                                        _jsx("slot", { name: "title" })
                                        :
                                            _jsx(Title, { children: this.effectiveTitleText }) }), this.hasSubtitle &&
                                _jsx("div", { part: "subtitle", class: "ui5-illustrated-message-subtitle", children: this.hasFormattedSubtitle ?
                                        _jsx("slot", { name: "subtitle" })
                                        :
                                            this.effectiveSubitleText }), this.hasActions &&
                                _jsx("div", { class: "ui5-illustrated-message-actions", children: _jsx("slot", {}) })] })] }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", class: "ui5-illustrated-message-util", children: _jsxs("defs", { children: [_jsxs("pattern", { id: "sapIllus_PatternShadow", "data-name": "sapIllus_PatternShadow", width: "3", height: "5.5", patternUnits: "userSpaceOnUse", viewBox: "0 0 3 5.5", children: [_jsx("rect", { class: "sapIllus_NoColor sapIllus_NoColor_Fill", width: "3", height: "5.5" }), _jsx("circle", { class: "sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill", cx: "3", cy: "5.5001", r: "0.5" }), _jsx("circle", { class: "sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill", cy: "5.5001", r: "0.5" }), _jsx("circle", { class: "sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill", cx: "1.5", cy: "2.7501", r: "0.5" }), _jsx("circle", { class: "sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill", cx: "3", cy: "0.0001", r: "0.5" }), _jsx("circle", { class: "sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill", cy: "0.0001", r: "0.5" })] }), _jsxs("pattern", { id: "sapIllus_PatternHighlight", "data-name": "sapIllus_PatternHighlight", width: "3", height: "5.5", patternTransform: "translate(35.9059 309.6208)", patternUnits: "userSpaceOnUse", viewBox: "0 0 3 5.5", children: [_jsx("rect", { class: "sapIllus_NoColor sapIllus_NoColor_Fill", width: "3", height: "5.5" }), _jsx("circle", { class: "sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill", cx: "3.0001", cy: "5.5001", r: "0.5" }), _jsx("circle", { class: "sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill", cx: "0.0001", cy: "5.5001", r: "0.5" }), _jsx("circle", { class: "sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill", cx: "1.5001", cy: "2.7501", r: "0.5" }), _jsx("circle", { class: "sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill", cx: "3.0001", cy: "0.0001", r: "0.5" }), _jsx("circle", { class: "sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill", cx: "0.0001", cy: "0.0001", r: "0.5" })] })] }) })] }));
}
function renderIllustration() {
    const illustration = this.effectiveIllustration;
    // Safe variant: render template
    if (illustration && typeof illustration === "object") {
        return illustration;
    }
    // Unsafe variant: render SVG string
    if (illustration && typeof illustration === "string") {
        return _jsx("div", { dangerouslySetInnerHTML: { __html: illustration } });
    }
    return null;
}
//# sourceMappingURL=IllustratedMessageTemplate.js.map