var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
let ToolbarItemBase = 
/**
 * @class
 * Represents an abstract base class for items used in the `ui5-toolbar`.
 *
 *
 * @cssState overflowed - When the item is displayed in the overflow popover.
 * Use this state to apply different styles when the item is overflowed.
 * Available since 2.20.0.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
class ToolbarItemBase extends UI5Element {
    constructor() {
        super(...arguments);
        /**
        * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
        * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
        * @public
        * @default "Default"
        */
        this.overflowPriority = "Default";
        /**
         * Defines if the toolbar overflow popup should close upon interaction with the item.
         * It will close by default.
         * @default false
         * @public
         */
        this.preventOverflowClosing = false;
        this._isOverflowed = false;
        this._maxWidth = 0;
        this._isRendering = true;
    }
    get isOverflowed() {
        return this._isOverflowed;
    }
    /**
     * Defines if the toolbar item is overflowed.
     * @default false
     * @protected
     * @since 2.11.0
     */
    set isOverflowed(value) {
        this._isOverflowed = value;
        if (value) {
            this._internals.states.add("overflowed");
        }
        else {
            this._internals.states.delete("overflowed");
        }
    }
    onAfterRendering() {
        this._isRendering = false;
    }
    /**
    * Defines if the width of the item should be ignored in calculating the whole width of the toolbar
    * @protected
    */
    get ignoreSpace() {
        return false;
    }
    /**
     * Returns if the item is flexible. An item that is returning true for this property will make
     * the toolbar expand to fill the 100% width of its container.
     * @protected
     */
    get hasFlexibleWidth() {
        return false;
    }
    /**
     * Returns if the item is interactive.
     * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
     * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
     * @protected
     */
    get isInteractive() {
        return true;
    }
    get hasOverflow() {
        return false;
    }
    /**
     * Returns if the item is separator.
     * @protected
     */
    get isSeparator() {
        return false;
    }
    /**
     * Returns if the item is a spacer.
     * A spacer item is an item that takes space in the toolbar, but does not render any content.
     * @protected
     * @since 2.21.0
     */
    get isSpacer() {
        return false;
    }
    get stableDomRef() {
        return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
    }
    get classes() {
        return {
            root: {
                "ui5-tb-popover-item": this.isOverflowed,
                "ui5-tb-item": true,
            },
        };
    }
    get styles() {
        return {};
    }
};
__decorate([
    property()
], ToolbarItemBase.prototype, "overflowPriority", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarItemBase.prototype, "preventOverflowClosing", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarItemBase.prototype, "isOverflowed", null);
ToolbarItemBase = __decorate([
    event("close-overflow", {
        bubbles: true,
    })
    /**
     * @class
     * Represents an abstract base class for items used in the `ui5-toolbar`.
     *
     *
     * @cssState overflowed - When the item is displayed in the overflow popover.
     * Use this state to apply different styles when the item is overflowed.
     * Available since 2.20.0.
     * @constructor
     * @extends UI5Element
     * @abstract
     * @public
     * @since 1.17.0
     */
], ToolbarItemBase);
export default ToolbarItemBase;
//# sourceMappingURL=ToolbarItemBase.js.map