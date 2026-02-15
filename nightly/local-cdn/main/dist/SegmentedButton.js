var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SegmentedButton_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts, getEffectiveAriaDescriptionText, } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isSpace, isEnter, isShift, isEscape, isSpaceShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import "./SegmentedButtonItem.js";
import SegmentedButtonSelectionMode from "./types/SegmentedButtonSelectionMode.js";
// Template
import SegmentedButtonTemplate from "./SegmentedButtonTemplate.js";
// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 */
let SegmentedButton = SegmentedButton_1 = class SegmentedButton extends UI5Element {
    constructor() {
        super();
        /**
         * Defines the component selection mode.
         * @default "Single"
         * @public
         * @since 1.14.0
         */
        this.selectionMode = "Single";
        /**
         * Determines whether the segmented button items should be sized to fit their content.
         *
         * If set to `true`, each item will be sized to fit its content, with any extra space distributed after the last item.
         * If set to `false` (the default), all items will be equally sized to fill the available space.
         *
         * @default false
         * @public
         * @since 2.16.0
        */
        this.itemsFitContent = false;
        this._itemNavigation = new ItemNavigation(this, {
            getItemsCallback: () => this.navigatableItems,
        });
        this.hasPreviouslyFocusedItem = false;
        this._cancelAction = false;
        this._isSpacePressed = false;
    }
    onBeforeRendering() {
        const items = this.getSlottedNodes("items");
        const visibleItems = items.filter(item => !item.hidden);
        let index = 1;
        items.forEach(item => {
            item.posInSet = item.hidden ? undefined : index++;
            item.sizeOfSet = item.hidden ? undefined : visibleItems.length;
        });
        this.normalizeSelection();
        if (!this.itemsFitContent) {
            this.style.setProperty("--_ui5_segmented_btn_items_count", `${visibleItems.length}`);
        }
    }
    normalizeSelection() {
        if (!this.items.length) {
            return;
        }
        switch (this.selectionMode) {
            case SegmentedButtonSelectionMode.Single: {
                const selectedItems = this.selectedItems;
                const selectedItemIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;
                if (this._selectedItem && selectedItems.length > 1) {
                    selectedItems.splice(selectedItemIndex, 1);
                }
                const selectedItem = selectedItems.pop() || this.items[0];
                this._applySingleSelection(selectedItem);
                break;
            }
            default:
        }
    }
    getFocusDomRef() {
        return this._itemNavigation._getCurrentItem();
    }
    _selectItem(e) {
        const target = e.target;
        const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");
        if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
            return;
        }
        switch (this.selectionMode) {
            case SegmentedButtonSelectionMode.Multiple:
                if (e instanceof KeyboardEvent) {
                    target.selected = !target.selected;
                }
                break;
            default:
                this._applySingleSelection(target);
        }
        this.fireDecoratorEvent("selection-change", {
            selectedItems: this.selectedItems,
        });
        this._itemNavigation.setCurrentItem(target);
        return this;
    }
    _applySingleSelection(item) {
        this.items.forEach(currentItem => {
            currentItem.selected = false;
        });
        item.selected = true;
        this._selectedItem = item;
    }
    _onclick(e) {
        this._selectItem(e);
    }
    _onkeydown(e) {
        if (isEnter(e)) {
            this._selectItem(e); // Enter key behavior remains unaffected
        }
        else if (isSpace(e)) {
            e.preventDefault(); // Prevent scrolling
            this._isSpacePressed = true;
        }
        else if (isShift(e) || isEscape(e)) {
            this._cancelAction = true; // Set the flag to cancel the action
        }
    }
    _onkeyup(e) {
        const isSpaceKey = isSpace(e);
        const isCancelKey = isShift(e) || isEscape(e);
        if (isSpaceKey || isSpaceShift(e)) {
            if (this._cancelAction) {
                this._cancelAction = false;
                this._isSpacePressed = false;
                e.preventDefault();
                return;
            }
            this._isSpacePressed = false;
        }
        else if (isCancelKey && !this._isSpacePressed) {
            this._cancelAction = false;
        }
        if (isSpaceKey) {
            this._selectItem(e);
        }
    }
    _onmousedown(e) {
        const eventTarget = e.target;
        const isTargetSegmentedButtonItem = eventTarget.hasAttribute("ui5-segmented-button-item");
        if (isTargetSegmentedButtonItem) {
            this._itemNavigation.setCurrentItem(eventTarget);
            this.hasPreviouslyFocusedItem = true;
        }
    }
    _onfocusin(e) {
        // If the component was previously focused,
        // update the ItemNavigation to sync the button's tabindex values
        if (this.hasPreviouslyFocusedItem) {
            this._itemNavigation.setCurrentItem(e.target);
            return;
        }
        // If the component is focused for the first time
        // focus the selected item if such is present
        if (this.selectedItems.length) {
            this._itemNavigation.setCurrentItem(this.selectedItems[0]);
            this.selectedItems[0].focus();
            this.hasPreviouslyFocusedItem = true;
        }
    }
    /**
     * Returns an array of the currently selected items.
     * @since 1.14.0
     * @public
     * @default []
     */
    get selectedItems() {
        return this.items.filter(item => item.selected);
    }
    get navigatableItems() {
        return this.getSlottedNodes("items").filter(item => {
            return !item.disabled;
        });
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined;
    }
    get ariaDescriptionText() {
        return `${(getEffectiveAriaDescriptionText(this) || "")} ${SegmentedButton_1.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY)}`.trim();
    }
    get ariaRoleDescription() {
        return SegmentedButton_1.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
    }
};
__decorate([
    property()
], SegmentedButton.prototype, "accessibleName", void 0);
__decorate([
    property()
], SegmentedButton.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], SegmentedButton.prototype, "accessibleDescription", void 0);
__decorate([
    property()
], SegmentedButton.prototype, "accessibleDescriptionRef", void 0);
__decorate([
    property()
], SegmentedButton.prototype, "selectionMode", void 0);
__decorate([
    property({ type: Boolean })
], SegmentedButton.prototype, "itemsFitContent", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], SegmentedButton.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], SegmentedButton, "i18nBundle", void 0);
SegmentedButton = SegmentedButton_1 = __decorate([
    customElement({
        tag: "ui5-segmented-button",
        languageAware: true,
        renderer: jsxRenderer,
        template: SegmentedButtonTemplate,
        styles: SegmentedButtonCss,
    })
    /**
     * Fired when the selected item changes.
     * @param {Array<ISegmentedButtonItem>} selectedItems an array of selected items. Since: 1.14.0
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
    })
], SegmentedButton);
SegmentedButton.define();
export default SegmentedButton;
//# sourceMappingURL=SegmentedButton.js.map