var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isSpace, isEnter, isEnterShift, isEnterCtrl, isEnterAlt, isLeft, isRight, } from "@ui5/webcomponents-base/dist/Keys.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
/**
 * Fired when the component is activated either with a click/tap or by using the [Enter] or [Space] keys.
 *
 * @public
 * @param {boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
 * @param {boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
 * @param {boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
 * @param {boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
 */
let SideNavigationSelectableItemBase = class SideNavigationSelectableItemBase extends SideNavigationItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines if the item's parent is disabled.
         * @private
         * @default false
         * @since 2.10.0
         */
        this._parentDisabled = false;
        /**
         * Defines whether the item is selected.
         *
         * **Note:** Items that have a set `href` and `target` set to `_blank` should not be selectable.
         *
         * @public
         * @default false
         */
        this.selected = false;
        /**
         * Item design.
         *
         * **Note:** Items with "Action" design must not have sub-items.
         *
         * @public
         * @default "Default"
         * @since 2.7.0
         */
        this.design = "Default";
        /**
         * Indicates whether the navigation item is selectable. By default, all items are selectable unless specifically marked as unselectable.
         *
         * When a parent item is marked as unselectable, selecting it will only expand or collapse its sub-items.
         * To improve user experience do not mix unselectable parent items with selectable parent items in a single side navigation.
         *
         *
         * **Guidelines**:
         * - Items with an assigned `href` and a target of `_blank` should be marked as unselectable.
         * - Items that trigger actions (with design "Action") should be marked as unselectable.
         *
         * @public
         * @default false
         * @since 2.7.0
         */
        this.unselectable = false;
        /**
         * Defines the additional accessibility attributes that will be applied to the component.
         * The following fields are supported:
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         *
         * **Note:** Do not use it on parent items, as it will be overridden if the item is in the overflow menu.
         *
         * @public
         * @default {}
         * @since 2.7.0
         */
        this.accessibilityAttributes = {};
        /**
         * @private
         * @default false
         */
        this.isOverflow = false;
    }
    get ariaRole() {
        if (this.sideNavCollapsed) {
            return this.isOverflow || this.unselectable ? "menuitem" : "menuitemradio";
        }
        return "treeitem";
    }
    get isSelectable() {
        return !this.unselectable && !this.effectiveDisabled;
    }
    get _href() {
        return (!this.effectiveDisabled && this.href) ? this.href : undefined;
    }
    get _target() {
        return (!this.effectiveDisabled && this.href && this.target) ? this.target : undefined;
    }
    get isExternalLink() {
        return this.href && this.target === "_blank";
    }
    get _selected() {
        return this.selected;
    }
    get _effectiveTag() {
        return this._href ? "a" : "div";
    }
    get effectiveDisabled() {
        return this.disabled || this._parentDisabled;
    }
    get _ariaHasPopup() {
        if (this.accessibilityAttributes?.hasPopup) {
            return this.accessibilityAttributes.hasPopup;
        }
        return undefined;
    }
    get classesArray() {
        const classes = [];
        if (this.effectiveDisabled) {
            classes.push("ui5-sn-item-disabled");
        }
        if (this._selected) {
            classes.push("ui5-sn-item-selected");
        }
        return classes;
    }
    get _classes() {
        return this.classesArray.join(" ");
    }
    get _ariaCurrent() {
        if (!this.sideNavCollapsed && !this.selected) {
            return undefined;
        }
        return "page";
    }
    get _ariaSelected() {
        if (!this.sideNavCollapsed) {
            return undefined;
        }
        return this.selected;
    }
    _onkeydown(e) {
        const isRTL = this.effectiveDir === "rtl";
        if (isSpace(e) || isRight(e) || isLeft(e)) {
            e.preventDefault();
        }
        // "Enter" + "Meta" is missing since it is often reserved by the operating system or window manager
        if (isEnter(e) || isEnterShift(e) || isEnterCtrl(e) || isEnterAlt(e)) {
            if (!this.unselectable) {
                this._activate(e);
            }
        }
        if ((isRTL ? isLeft(e) : isRight(e)) && this.sideNavCollapsed && this.hasSubItems) {
            this._activate(e);
        }
        if ((isRTL ? isRight(e) : isLeft(e)) && this.inPopover) {
            this.associatedItem?.sideNavigation?.closePicker();
        }
    }
    _onkeyup(e) {
        // "Space" + modifier is often reserved by the operating system or window manager
        if (isSpace(e)) {
            this._activate(e);
            if (this.href && !e.defaultPrevented) {
                const customEvent = new MouseEvent("click");
                customEvent.stopImmediatePropagation();
                if (this.getDomRef().querySelector("a")) {
                    this.getDomRef().querySelector("a").dispatchEvent(customEvent);
                }
                else {
                    // when Side Navigation is collapsed and it is first level item we have directly <a> element
                    this.getDomRef().dispatchEvent(customEvent);
                }
            }
        }
    }
    _onclick(e) {
        this._activate(e);
    }
    _onfocusin(e) {
        e.stopPropagation();
        this.sideNavigation?.focusItem(this);
    }
    _activate(e) {
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        e.stopPropagation();
        if (this.isOverflow) {
            const executeEvent = this.fireDecoratorEvent("click", {
                altKey,
                ctrlKey,
                metaKey,
                shiftKey,
            });
            if (!executeEvent) {
                e.preventDefault();
            }
        }
        else {
            this.sideNavigation?._handleItemClick(e, this);
        }
    }
    get isSideNavigationSelectableItemBase() {
        return true;
    }
};
__decorate([
    property({ type: Boolean, noAttribute: true })
], SideNavigationSelectableItemBase.prototype, "_parentDisabled", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationSelectableItemBase.prototype, "selected", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "href", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "target", void 0);
__decorate([
    property()
], SideNavigationSelectableItemBase.prototype, "design", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationSelectableItemBase.prototype, "unselectable", void 0);
__decorate([
    property({ type: Object })
], SideNavigationSelectableItemBase.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Boolean })
], SideNavigationSelectableItemBase.prototype, "isOverflow", void 0);
SideNavigationSelectableItemBase = __decorate([
    event("click", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * @class
     * Base class for the navigation items that support actions.
     *
     * @constructor
     * @extends SideNavigationItemBase
     * @abstract
     * @public
     * @since 1.24.0
     */
    ,
    customElement()
], SideNavigationSelectableItemBase);
export default SideNavigationSelectableItemBase;
export const isInstanceOfSideNavigationSelectableItemBase = createInstanceChecker("isSideNavigationSelectableItemBase");
//# sourceMappingURL=SideNavigationSelectableItemBase.js.map