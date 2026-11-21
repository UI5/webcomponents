import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import highlightText from "@ui5/webcomponents-base/dist/util/highlightText.js";
export default function SideNavigationItemTextTemplate(item, id) {
    const highlighted = item._highlightedText
        ? highlightText(item.text, item._highlightedText, "ui5-sn-item-highlight")
        : undefined;
    return highlighted
        ? _jsx("div", { class: "ui5-sn-item-text", id: id, dangerouslySetInnerHTML: { __html: highlighted } })
        : _jsx("div", { class: "ui5-sn-item-text", id: id, children: item.text });
}
//# sourceMappingURL=SideNavigationItemTextTemplate.js.map