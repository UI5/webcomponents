import { jsx as _jsx, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import arrowRightIcon from "@ui5/webcomponents-icons/dist/arrow-right.js";
const predefinedHooks = {
    listItemContent,
    iconBegin,
    iconEnd,
};
export default function NavigationMenuItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks, };
    return _jsx(_Fragment, { children: this._href ? (_jsx("a", { role: "menuitem", class: "ui5-navmenu-item-link", href: this.href, target: this.target, children: MenuItemTemplate.call(this, currentHooks) })) : MenuItemTemplate.call(this, currentHooks) });
}
function listItemContent() {
    return _jsx(_Fragment, { children: this.text });
}
function iconBegin() {
    if (this.hasIcon) {
        return _jsx(Icon, { part: "icon", class: "ui5-li-icon", name: this.icon });
    }
    if (this._siblingsWithIcon) {
        return _jsx("div", { class: "ui5-menu-item-dummy-icon" });
    }
}
function iconEnd() {
    if (this.hasSubmenu) {
        return _jsx(Icon, { part: "icon", name: slimArrowRightIcon, class: "ui5-menu-item-icon-end" });
    }
    if (this.isExternalLink) {
        return _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRightIcon });
    }
}
//# sourceMappingURL=NavigationMenuItemTemplate.js.map