import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ToolbarSelectCss from "./generated/themes/ToolbarSelect.css.js";
import type Select from "./Select.js";

// Templates
import ToolbarSelectTemplate from "./ToolbarSelectTemplate.js";
import ToolbarItemBase from "./ToolbarItemBase.js";
import type { ToolbarItemEventDetail } from "./ToolbarItemBase.js";
import type ToolbarSelectOption from "./ToolbarSelectOption.js";
import type { SelectChangeEventDetail } from "./Select.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

type ToolbarSelectChangeEventDetail = ToolbarItemEventDetail & SelectChangeEventDetail & {
	selectedToolbarOption: ToolbarSelectOption | undefined;
};

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
@customElement({
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
@event("change", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired after the component's dropdown menu opens.
 * @public
 */
@event("open", {
	bubbles: true,
})

/**
 * Fired after the component's dropdown menu closes.
 * @public
 */
@event("close")
class ToolbarSelect extends ToolbarItemBase {
	eventDetails!: ToolbarItemBase["eventDetails"] & {
		change: ToolbarSelectChangeEventDetail;
		open: ToolbarItemEventDetail;
		close: ToolbarItemEventDetail;
		"click": ToolbarItemEventDetail;
	}

	/**
	 * Defines the width of the select.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @default undefined
	 * @public
	 */
	@property()
	width?: string;

	/**
	 * Defines the component options.
	 *
	 * **Note:** Only one selected option is allowed.
	 * If more than one option is defined as selected, the last one would be considered as the selected one.
	 *
	 * **Note:** Use the `ui5-toolbar-select-option` component to define the desired options.
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	options!: DefaultSlot<ToolbarSelectOption>;

	/**
	 * Defines the HTML element that will be displayed in the component input part,
	 * representing the selected option.
	 * @public
	 * @since 2.15.0
	*/
	@slot()
	label!: Slot<HTMLElement>;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleName?: string

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the value of the component:
	 *
	 * @public
	 * @default ""
	 * @since 2.15.0
	 */
	@property()
	set value(newValue: string) {
		if (this.options.length) {
			// Options are available: resolve immediately by setting selected on the matching outer option.
			// Empty string clears all selections.
			this.options.forEach(option => {
				option.selected = newValue !== "" && (option.value === newValue || option.textContent?.trim() === newValue);
			});
			this._pendingValue = "";
			this._hasPendingValue = false;
		} else {
			// Options not yet available (pre-render): stage for onBeforeRendering to resolve.
			this._pendingValue = newValue;
			this._hasPendingValue = true;
		}
	}

	get value(): string {
		const selectedOption = this._lastSelectedIndex >= 0 ? this.options[this._lastSelectedIndex] : undefined;
		return selectedOption?.value || selectedOption?.textContent?.trim() || "";
	}

	get select(): Select | null {
		return this.shadowRoot!.querySelector<Select>("[ui5-select]");
	}

	// Staging buffer for value= assignments that arrive before options are available.
	_pendingValue: string = "";
	_hasPendingValue: boolean = false;

	// Computed in onBeforeRendering: index of the last selected option (-1 = none)
	_lastSelectedIndex: number = -1;

	onClick(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
		if (prevented && !this.preventOverflowClosing) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onOpen(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("open", { targetRef: e.target as HTMLElement });
		if (prevented) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onClose(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("close", { targetRef: e.target as HTMLElement });
		if (prevented) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onBeforeRendering(): void {
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

	onChange(e: CustomEvent<SelectChangeEventDetail>): void {
		e.stopImmediatePropagation();
		const selectedOptionIndex = Number(e.detail.selectedOption?.getAttribute("data-ui5-external-action-item-index"));
		const selectedToolbarOption = this.options[selectedOptionIndex];
		const prevented = !this.fireDecoratorEvent("change", { ...e.detail, targetRef: e.target as HTMLElement, selectedToolbarOption });
		if (!prevented) {
			this.fireDecoratorEvent("close-overflow");
		}

		this._syncOptions(selectedOptionIndex);
	}

	_syncOptions(selectedOptionIndex: number): void {
		this._pendingValue = "";
		this._hasPendingValue = false;
		this.options.forEach((option: ToolbarSelectOption, index: number) => {
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
	get _innerSelectValue(): string | undefined {
		if (this._lastSelectedIndex === -1) {
			return "__no-selection__";
		}
		const opt = this.options[this._lastSelectedIndex];
		return opt?.value || opt?.textContent?.trim() || "";
	}
}

ToolbarSelect.define();

export default ToolbarSelect;

export type {
	ToolbarSelectChangeEventDetail,
};
