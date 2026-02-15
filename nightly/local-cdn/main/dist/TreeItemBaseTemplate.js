import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import ListItemTemplate from "./ListItemTemplate.js";
import Icon from "./Icon.js";
import navigationDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import navigationRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
const predefinedHooks = {
    listItemPreContent,
    listItemContent,
    imageBegin,
    iconBegin,
};
export default function TreeItemBaseTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks };
    return _jsxs("div", { children: [ListItemTemplate.call(this, currentHooks), listItemPostContent.call(this)] });
}
function listItemPreContent() {
    return (_jsx("div", { class: "ui5-li-tree-toggle-box", style: this.styles.preContent, children: this.showToggleButton &&
            _jsx(Icon, { part: "toggle-icon", class: "ui5-li-tree-toggle-icon", name: this.expanded ? navigationDownArrow : navigationRightArrow, showTooltip: true, accessibleName: this.iconAccessibleName, 
                // @ts-expect-error
                onClick: this._toggleClick }) }));
}
function listItemPostContent() {
    if (this.expanded) {
        return (_jsx("ul", { role: "group", id: `${this._id}-subtree`, class: "ui5-tree-li-subtree", children: _jsx("slot", {}) }));
    }
}
function listItemContent() { }
function imageBegin() {
    if (this.hasImage) {
        return _jsx("div", { class: "ui5-tree-item-image", children: _jsx("slot", { name: "image" }) });
    }
}
function iconBegin() {
    return this.icon ? _jsx(Icon, { part: "icon", name: this.icon, class: "ui5-li-icon" }) : _jsx(_Fragment, {});
}
//# sourceMappingURL=TreeItemBaseTemplate.js.map