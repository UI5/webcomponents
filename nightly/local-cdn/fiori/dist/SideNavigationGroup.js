var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SideNavigationGroup_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isSpace, isLeft, isRight, isMinus, isPlus, } from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationGroupTemplate from "./SideNavigationGroupTemplate.js";
import { SIDE_NAVIGATION_ICON_COLLAPSE, SIDE_NAVIGATION_ICON_EXPAND, } from "./generated/i18n/i18n-defaults.js";
// Styles
import SideNavigationGroupCss from "./generated/themes/SideNavigationGroup.css.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
let SideNavigationGroup = SideNavigationGroup_1 = class SideNavigationGroup extends SideNavigationItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines if the item is expanded
         *
         * @public
         * @default false
         */
        this.expanded = false;
        this.belowGroup = false;
    }
    onBeforeRendering() {
        this.allItems.forEach(item => {
            item._groupDisabled = this.disabled;
        });
    }
    get overflowItems() {
        const separator1 = this.shadowRoot.querySelector(".ui5-sn-item-separator:first-child");
        const separator2 = this.shadowRoot.querySelector(".ui5-sn-item-separator:last-child");
        const overflowItems = this.items.reduce((result, item) => {
            return result.concat(item.overflowItems);
        }, new Array());
        return [separator1, ...overflowItems, separator2];
    }
    get selectableItems() {
        return this.items.reduce((result, item) => {
            return result.concat(item.selectableItems);
        }, new Array());
    }
    get focusableItems() {
        if (this.sideNavCollapsed) {
            return this.items;
        }
        if (this.expanded) {
            return this.items.reduce((result, item) => {
                return result.concat(item.focusableItems);
            }, new Array(this));
        }
        return [this];
    }
    get allItems() {
        return this.items.reduce((result, item) => {
            return result.concat(item.allItems);
        }, new Array(this));
    }
    get _groupId() {
        if (!this.items.length) {
            return undefined;
        }
        return `${this._id}-group`;
    }
    get _expanded() {
        if (!this.items.length) {
            return undefined;
        }
        return this.expanded;
    }
    get belowGroupClassName() {
        return this.belowGroup ? "ui5-sn-item-group-below-group" : "";
    }
    get _arrowTooltip() {
        return this.expanded ? SideNavigationGroup_1.i18nBundle.getText(SIDE_NAVIGATION_ICON_COLLAPSE)
            : SideNavigationGroup_1.i18nBundle.getText(SIDE_NAVIGATION_ICON_EXPAND);
    }
    _onkeydown(e) {
        if (this.disabled) {
            return;
        }
        if (isSpace(e)) {
            e.preventDefault();
        }
        const isRTL = this.effectiveDir === "rtl";
        if (isLeft(e)) {
            e.preventDefault();
            this.expanded = isRTL;
            return;
        }
        if (isRight(e)) {
            e.preventDefault();
            this.expanded = !isRTL;
        }
        if (isMinus(e)) {
            e.preventDefault();
            this.expanded = false;
            return;
        }
        if (isPlus(e)) {
            e.preventDefault();
            this.expanded = true;
        }
    }
    _onclick() {
        this._toggle();
    }
    _onfocusin(e) {
        e.stopPropagation();
        this.sideNavigation?.focusItem(this);
    }
    _toggle() {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    }
    get isSideNavigationGroup() {
        return true;
    }
};
__decorate([
    property({ type: Boolean })
], SideNavigationGroup.prototype, "expanded", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SideNavigationGroup.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], SideNavigationGroup, "i18nBundle", void 0);
SideNavigationGroup = SideNavigationGroup_1 = __decorate([
    customElement({
        tag: "ui5-side-navigation-group",
        renderer: jsxRender,
        template: SideNavigationGroupTemplate,
        styles: SideNavigationGroupCss,
    })
], SideNavigationGroup);
SideNavigationGroup.define();
export const isInstanceOfSideNavigationGroup = createInstanceChecker("isSideNavigationGroup");
export default SideNavigationGroup;
//# sourceMappingURL=SideNavigationGroup.js.map