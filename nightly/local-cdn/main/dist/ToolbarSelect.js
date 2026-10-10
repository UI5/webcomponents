var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import ToolbarSelectCss from "./generated/themes/ToolbarSelect.css.js";
// Templates
import ToolbarSelectTemplate from "./ToolbarSelectTemplate.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItemBase
 * @public
 * @since 1.17.0
 */
let ToolbarSelect = class ToolbarSelect extends ToolbarItemBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the value state of the component.
         * @default "None"
         * @public
         */
        this.valueState = "None";
        /**
         * Defines whether the component is in disabled state.
         *
         * **Note:** A disabled component is noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        // Staging buffer for value= assignments that arrive before options are available.
        this._pendingValue = "";
        this._hasPendingValue = false;
        // Computed in onBeforeRendering: index of the last selected option (-1 = none)
        this._lastSelectedIndex = -1;
    }
    /**
     * Defines the value of the component:
     *
     * @public
     * @default ""
     * @since 2.15.0
     */
    set value(newValue) {
        if (this.options.length) {
            // Options are available: resolve immediately by setting selected on the matching outer option.
            // Empty string clears all selections.
            this.options.forEach(option => {
                option.selected = newValue !== "" && (option.value === newValue || option.textContent?.trim() === newValue);
            });
            this._pendingValue = "";
            this._hasPendingValue = false;
        }
        else {
            // Options not yet available (pre-render): stage for onBeforeRendering to resolve.
            this._pendingValue = newValue;
            this._hasPendingValue = true;
        }
    }
    get value() {
        const selectedOption = this._lastSelectedIndex >= 0 ? this.options[this._lastSelectedIndex] : undefined;
        return selectedOption?.value || selectedOption?.textContent?.trim() || "";
    }
    get select() {
        return this.shadowRoot.querySelector("[ui5-select]");
    }
    onClick(e) {
        e.stopImmediatePropagation();
        const prevented = !this.fireDecoratorEvent("click", { targetRef: e.target });
        if (prevented && !this.preventOverflowClosing) {
            this.fireDecoratorEvent("close-overflow");
        }
    }
    onOpen(e) {
        e.stopImmediatePropagation();
        const prevented = !this.fireDecoratorEvent("open", { targetRef: e.target });
        if (prevented) {
            this.fireDecoratorEvent("close-overflow");
        }
    }
    onClose(e) {
        e.stopImmediatePropagation();
        const prevented = !this.fireDecoratorEvent("close", { targetRef: e.target });
        if (prevented) {
            this.fireDecoratorEvent("close-overflow");
        }
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        // Resolve a pending value= assignment now that options are available.
        if (this._hasPendingValue && this.options.length) {
            const pending = this._pendingValue;
            this.options.forEach(option => {
                option.selected = pending !== "" && (option.value === pending || option.textContent?.trim() === pending);
            });
            this._pendingValue = "";
            this._hasPendingValue = false;
        }
        // Last selected wins — mirrors Select._applyAutoSelection behaviour.
        this._lastSelectedIndex = this.options.reduce((last, option, index) => (option.selected ? index : last), -1);
    }
    onChange(e) {
        e.stopImmediatePropagation();
        const selectedOptionIndex = Number(e.detail.selectedOption?.getAttribute("data-ui5-external-action-item-index"));
        const selectedToolbarOption = this.options[selectedOptionIndex];
        const prevented = !this.fireDecoratorEvent("change", { ...e.detail, targetRef: e.target, selectedToolbarOption });
        if (!prevented) {
            this.fireDecoratorEvent("close-overflow");
        }
        this._syncOptions(selectedOptionIndex);
    }
    _syncOptions(selectedOptionIndex) {
        this._pendingValue = "";
        this._hasPendingValue = false;
        this.options.forEach((option, index) => {
            option.selected = index === selectedOptionIndex;
        });
    }
    get styles() {
        return {
            width: this.isOverflowed ? undefined : this.width,
        };
    }
    get hasCustomLabel() {
        return !!this.label.length;
    }
    // Drives the inner Select via its value= API (non-deprecated path).
    // When nothing is selected, the sentinel prevents _applyAutoSelection from forcing index 0.
    // The sentinel never leaks to a form: ToolbarSelect is not form-associated and the inner Select lives in shadow DOM.
    get _innerSelectValue() {
        if (this._lastSelectedIndex === -1) {
            return "__no-selection__";
        }
        const opt = this.options[this._lastSelectedIndex];
        return opt?.value || opt?.textContent?.trim() || "";
    }
};
__decorate([
    property()
], ToolbarSelect.prototype, "width", void 0);
__decorate([
    slot({
        "default": true,
        type: HTMLElement,
        invalidateOnChildChange: true,
    })
], ToolbarSelect.prototype, "options", void 0);
__decorate([
    slot()
], ToolbarSelect.prototype, "label", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], ToolbarSelect.prototype, "disabled", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "accessibleName", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], ToolbarSelect.prototype, "value", null);
ToolbarSelect = __decorate([
    customElement({
        tag: "ui5-toolbar-select",
        template: ToolbarSelectTemplate,
        renderer: jsxRenderer,
        styles: ToolbarSelectCss,
    })
    /**
     * Fired when the selected option changes.
     * @param {HTMLElement} selectedOption the selected option.
     * @param {HTMLElement} selectedToolbarOption the original toolbar select option.
     * @since 2.25.0
     * @public
     */
    ,
    event("change", {
        bubbles: true,
        cancelable: true,
    })
    /**
     * Fired after the component's dropdown menu opens.
     * @public
     */
    ,
    event("open", {
        bubbles: true,
    })
    /**
     * Fired after the component's dropdown menu closes.
     * @public
     */
    ,
    event("close")
], ToolbarSelect);
ToolbarSelect.define();
export default ToolbarSelect;
//# sourceMappingURL=ToolbarSelect.js.map