var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * @class
 * Base class for the items that are accepted by the `ui5-side-navigation` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.19.0
 */
class SideNavigationItemBase extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the component is disabled.
         * A disabled component can't be pressed or
         * focused, and it is not in the tab chain.
         *
         * @default false
         * @public
         * @since 1.19.0
         */
        this.disabled = false;
        this.forcedTabIndex = "-1";
        this.sideNavCollapsed = false;
        this.inPopover = false;
        /**
         * Defines if the item's group is disabled.
         * @private
         * @default false
         * @since 2.10.0
         */
        this._groupDisabled = false;
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    get _tooltip() {
        return this.tooltip || undefined;
    }
    get hasSubItems() {
        return false;
    }
    get effectiveDisabled() {
        return this.disabled;
    }
    get classesArray() {
        const classes = [];
        if (this.effectiveDisabled) {
            classes.push("ui5-sn-item-disabled");
        }
        return classes;
    }
    get _classes() {
        return this.classesArray.join(" ");
    }
    get effectiveTabIndex() {
        return this.forcedTabIndex !== undefined ? parseInt(this.forcedTabIndex) : undefined;
    }
    get sideNavigation() {
        return this._sideNavigation;
    }
    set sideNavigation(sideNavigation) {
        this._sideNavigation = sideNavigation;
    }
    get isFixedItem() {
        let element = this; // eslint-disable-line
        let parentElement = element.parentElement;
        while (parentElement) {
            if (parentElement.hasAttribute("ui5-side-navigation")) {
                break;
            }
            element = parentElement;
            parentElement = element.parentElement;
        }
        return element?.slot === "fixedItems";
    }
    get isSideNavigationItemBase() {
        return true;
    }
    /**
     * @private
     */
    applyInitialFocusInPopover() {
    }
}
__decorate([
    property()
], SideNavigationItemBase.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItemBase.prototype, "disabled", void 0);
__decorate([
    property()
], SideNavigationItemBase.prototype, "tooltip", void 0);
__decorate([
    property({ noAttribute: true })
], SideNavigationItemBase.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItemBase.prototype, "sideNavCollapsed", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationItemBase.prototype, "inPopover", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], SideNavigationItemBase.prototype, "_groupDisabled", void 0);
export default SideNavigationItemBase;
export const isInstanceOfSideNavigationItemBase = createInstanceChecker("isSideNavigationItemBase");
//# sourceMappingURL=SideNavigationItemBase.js.map