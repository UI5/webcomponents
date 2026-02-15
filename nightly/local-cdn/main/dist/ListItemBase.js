var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isEnter, isSpace, isTabNext, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
// Styles
import styles from "./generated/themes/ListItemBase.css.js";
import draggableElementStyles from "./generated/themes/DraggableElement.css.js";
/**
 * @class
 * A class to serve as a foundation
 * for the `ListItem` and `ListItemGroupHeader` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
let ListItemBase = class ListItemBase extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the selected state of the component.
         * @default false
         * @private
         */
        this.selected = false;
        /**
         * Defines whether the item is movable.
         * @default false
         * @private
         * @since 2.0.0
         */
        this.movable = false;
        /**
        * Defines if the list item should display its bottom border.
        * @private
        */
        this.hasBorder = false;
        /**
        * Defines whether `ui5-li` is in disabled state.
        *
        * **Note:** A disabled `ui5-li` is noninteractive.
        * @default false
        * @protected
        * @since 1.0.0-rc.12
        */
        this.disabled = false;
        /**
         * Indicates if the element is on focus
         * @private
         */
        this.focused = false;
        /**
         * Indicates if the list item is actionable, e.g has hover and pressed effects.
         * @private
         */
        this.actionable = false;
    }
    onEnterDOM() {
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onBeforeRendering() {
        this.actionable = true;
    }
    _onfocusin(e) {
        this.fireDecoratorEvent("request-tabindex-change", e);
        if (e.target !== this.getFocusDomRef()) {
            return;
        }
        this.fireDecoratorEvent("_focused", e);
    }
    _onkeydown(e) {
        if (isTabNext(e)) {
            return this._handleTabNext(e);
        }
        if (isTabPrevious(e)) {
            return this._handleTabPrevious(e);
        }
        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
            return;
        }
        if (this._isSpace(e)) {
            e.preventDefault();
        }
        if (this._isEnter(e)) {
            this.fireItemPress(e);
        }
    }
    _onkeyup(e) {
        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
            return;
        }
        if (this._isSpace(e)) {
            this.fireItemPress(e);
        }
    }
    _onclick(e) {
        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
            return;
        }
        this.fireItemPress(e);
    }
    /**
     * Override from subcomponent, if needed
     */
    _isSpace(e) {
        return isSpace(e);
    }
    /**
     * Override from subcomponent, if needed
     */
    _isEnter(e) {
        return isEnter(e);
    }
    fireItemPress(e) {
        if (this.disabled || !this._pressable) {
            return;
        }
        if (isEnter(e)) {
            e.preventDefault();
        }
        this.fireDecoratorEvent("_press", { item: this, selected: this.selected, key: e.key });
    }
    _handleTabNext(e) {
        if (this.shouldForwardTabAfter()) {
            if (!this.fireDecoratorEvent("forward-after")) {
                e.preventDefault();
            }
        }
    }
    _handleTabPrevious(e) {
        const target = e.target;
        if (this.shouldForwardTabBefore(target)) {
            this.fireDecoratorEvent("forward-before");
        }
    }
    /**
     * Determines if th current list item either has no tabbable content or
     * [Tab] is performed onto the last tabbale content item.
     */
    shouldForwardTabAfter() {
        const aContent = getTabbableElements(this.getFocusDomRef());
        return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
    }
    /**
     * Determines if the current list item is target of [SHIFT+TAB].
     */
    shouldForwardTabBefore(target) {
        return this.getFocusDomRef() === target;
    }
    get classes() {
        return {
            main: {
                "ui5-li-root": true,
                "ui5-li--focusable": this._focusable,
            },
        };
    }
    get _ariaDisabled() {
        return this.disabled ? true : undefined;
    }
    get _focusable() {
        return !this.disabled;
    }
    get _pressable() {
        return true;
    }
    get hasConfigurableMode() {
        return false;
    }
    get _effectiveTabIndex() {
        if (!this._focusable) {
            return -1;
        }
        if (this.selected) {
            return 0;
        }
        return this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined;
    }
    get isListItemBase() {
        return true;
    }
};
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "movable", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "hasBorder", void 0);
__decorate([
    property()
], ListItemBase.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean })
], ListItemBase.prototype, "actionable", void 0);
ListItemBase = __decorate([
    customElement({
        renderer: jsxRenderer,
        styles: [styles, draggableElementStyles],
    }),
    event("request-tabindex-change", {
        bubbles: true,
    }),
    event("_press", {
        bubbles: true,
    }),
    event("_focused", {
        bubbles: true,
    }),
    event("forward-after", {
        bubbles: true,
        cancelable: true,
    }),
    event("forward-before", {
        bubbles: true,
    })
], ListItemBase);
export default ListItemBase;
//# sourceMappingURL=ListItemBase.js.map