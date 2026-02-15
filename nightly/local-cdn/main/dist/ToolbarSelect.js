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
import ToolbarItem from "./ToolbarItem.js";
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
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
let ToolbarSelect = class ToolbarSelect extends ToolbarItem {
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
        // Internal value storage, in case the composite select is not rendered on the the assignment happens
        this._value = "";
    }
    /**
     * Defines the value of the component:
     *
     * @public
     * @default ""
     * @since 2.15.0
     */
    set value(newValue) {
        if (this.select && this.select.value !== newValue) {
            this.select.value = newValue;
        }
        this._value = newValue;
    }
    get value() {
        return this.select ? this.select.value : this._value;
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
    onChange(e) {
        e.stopImmediatePropagation();
        const prevented = !this.fireDecoratorEvent("change", { ...e.detail, targetRef: e.target });
        if (!prevented) {
            this.fireDecoratorEvent("close-overflow");
        }
        this._syncOptions(e.detail.selectedOption);
    }
    _syncOptions(selectedOption) {
        const selectedOptionIndex = Number(selectedOption?.getAttribute("data-ui5-external-action-item-index"));
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