var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SideNavigationItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isLeft, isRight, isMinus, isPlus, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import { SIDE_NAVIGATION_ICON_COLLAPSE, SIDE_NAVIGATION_ICON_EXPAND, SIDE_NAVIGATION_OVERFLOW_ITEM_LABEL, SIDE_NAVIGATION_PARENT_ITEM_SELECTABLE_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
// Templates
import SideNavigationItemTemplate from "./SideNavigationItemTemplate.js";
// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a navigation action. It can provide sub items.
 * The `ui5-side-navigation-item` is used within `ui5-side-navigation` or `ui5-side-navigation-group` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @abstract
 * @public
 * @since 1.0.0-rc.8
 */
let SideNavigationItem = SideNavigationItem_1 = class SideNavigationItem extends SideNavigationSelectableItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines if the item is expanded
         *
         * @public
         * @default false
         */
        this.expanded = false;
        /**
         * Defines if the item should be collapsible or not.
         * It is true, for example, for the items inside the Popover of the Side Navigation
         * @private
         * @default false
         * @since 1.10.0
         */
        this._fixed = false;
    }
    onBeforeRendering() {
        this.items.forEach(item => {
            item._parentDisabled = this.effectiveDisabled;
        });
    }
    get overflowItems() {
        return [this];
    }
    get hasSubItems() {
        return this.items.length > 0;
    }
    get effectiveDisabled() {
        return this.disabled || this._groupDisabled;
    }
    get selectableItems() {
        if (this.inPopover && this.unselectable && this.items.length) {
            return [...this.items];
        }
        return [this, ...this.items];
    }
    get focusableItems() {
        if (this.sideNavCollapsed) {
            return [this];
        }
        if (this.inPopover && this.unselectable && this.items.length) {
            return [...this.items];
        }
        if (this.expanded) {
            return [this, ...this.items];
        }
        return [this];
    }
    get allItems() {
        return [this, ...this.items];
    }
    get effectiveTabIndex() {
        if (this.inPopover && this.unselectable) {
            return undefined;
        }
        return super.effectiveTabIndex;
    }
    get _ariaHasPopup() {
        if (this.inPopover && this.accessibilityAttributes?.hasPopup) {
            return this.accessibilityAttributes.hasPopup;
        }
        if (!this.effectiveDisabled && this.sideNavCollapsed && this.items.length) {
            return "tree";
        }
        if (this.accessibilityAttributes?.hasPopup) {
            return this.accessibilityAttributes.hasPopup;
        }
        if (this.isOverflow) {
            return "menu";
        }
        return undefined;
    }
    get _ariaChecked() {
        if (this.isOverflow || this.unselectable || !this.sideNavCollapsed) {
            return undefined;
        }
        return this.selected;
    }
    get _groupId() {
        if (!this.items.length || this.sideNavCollapsed) {
            return undefined;
        }
        return `${this._id}-group`;
    }
    get _expanded() {
        if (!this.items.length || this.sideNavCollapsed) {
            return undefined;
        }
        return this.expanded;
    }
    get _describedBy() {
        if (!this.effectiveDisabled && this.items.length && !this.unselectable) {
            return SideNavigationItem_1.i18nBundle.getText(SIDE_NAVIGATION_PARENT_ITEM_SELECTABLE_DESCRIPTION, this.text ?? "");
        }
    }
    get classesArray() {
        const classes = super.classesArray;
        if (!this.effectiveDisabled && this.items.length) {
            classes.push("ui5-sn-item-with-expander");
        }
        if (this._fixed) {
            classes.push("ui5-sn-item-fixed");
        }
        return classes;
    }
    get _selected() {
        if (this.sideNavCollapsed || !this.expanded) {
            return this.selected || this.items.some(item => item.selected);
        }
        return this.selected;
    }
    get _arrowTooltip() {
        return this.expanded ? SideNavigationItem_1.i18nBundle.getText(SIDE_NAVIGATION_ICON_COLLAPSE)
            : SideNavigationItem_1.i18nBundle.getText(SIDE_NAVIGATION_ICON_EXPAND);
    }
    get _ariaLabel() {
        if (this.isOverflow) {
            return SideNavigationItem_1.i18nBundle.getText(SIDE_NAVIGATION_OVERFLOW_ITEM_LABEL);
        }
        return undefined;
    }
    applyInitialFocusInPopover() {
        if (this.unselectable && this.items.length) {
            this.items[0]?.focus();
        }
        else {
            this.focus();
        }
    }
    _onToggleClick(e) {
        e.stopPropagation();
        this._toggle();
    }
    _onkeydown(e) {
        if (this.effectiveDisabled) {
            return;
        }
        const isRTL = this.effectiveDir === "rtl";
        if (this.sideNavigation.classList.contains("ui5-side-navigation-in-popover") || this.sideNavCollapsed) {
            super._onkeydown(e);
            return;
        }
        if (isLeft(e)) {
            e.preventDefault();
            this.expanded = isRTL;
            return;
        }
        if (isRight(e)) {
            e.preventDefault();
            this.expanded = !isRTL;
            return;
        }
        if (isMinus(e)) {
            e.preventDefault();
            this.expanded = false;
            return;
        }
        if (isPlus(e)) {
            e.preventDefault();
            this.expanded = true;
            return;
        }
        if (isEnter(e)) {
            if (!this.inPopover && this.unselectable && !this.isExternalLink) {
                e.preventDefault();
            }
        }
        super._onkeydown(e);
    }
    _onkeyup(e) {
        super._onkeyup(e);
    }
    _onfocusin(e) {
        if (this.inPopover && this.unselectable && this.items.length) {
            this.sideNavigation?.focusItem(this.items[0]);
        }
        else {
            super._onfocusin(e);
        }
    }
    _onclick(e) {
        if (!this.inPopover && this.unselectable) {
            this._toggle();
        }
        super._onclick(e);
    }
    _onfocusout() {
        if (!this.sideNavCollapsed) {
            return;
        }
        this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
    }
    _onmouseenter() {
        if (!this.sideNavCollapsed) {
            return;
        }
        this.getDomRef().classList.remove("ui5-sn-item-no-hover-effect");
    }
    _onmouseleave() {
        if (!this.sideNavCollapsed || !this._selected) {
            return;
        }
        this.getDomRef().classList.add("ui5-sn-item-no-hover-effect");
    }
    _toggle() {
        if (this.items.length && !this.effectiveDisabled) {
            this.expanded = !this.expanded;
        }
    }
    get isSideNavigationItem() {
        return true;
    }
};
__decorate([
    property({ type: Boolean })
], SideNavigationItem.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItem.prototype, "_fixed", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SideNavigationItem.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SideNavigationItem, "i18nBundle", void 0);
SideNavigationItem = SideNavigationItem_1 = __decorate([
    customElement({
        tag: "ui5-side-navigation-item",
        renderer: jsxRender,
        template: SideNavigationItemTemplate,
        styles: SideNavigationItemCss,
    })
], SideNavigationItem);
SideNavigationItem.define();
export default SideNavigationItem;
export const isInstanceOfSideNavigationItem = createInstanceChecker("isSideNavigationItem");
//# sourceMappingURL=SideNavigationItem.js.map