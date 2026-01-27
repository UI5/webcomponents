import UI5Element, { type DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type ToolbarSelect from "./ToolbarSelect.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar-select-option` component defines the content of an option in the `ui5-toolbar-select`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
@customElement("ui5-toolbar-select-option")
class ToolbarSelectOption extends UI5Element {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	set selected(value: boolean) {
		if (value) {
			this.setAttribute("selected", "");
			this._clearSiblingsAndSync();
		} else {
			this.removeAttribute("selected");
		}
	}

	get selected(): boolean {
		return this.hasAttribute("selected");
	}

	_clearSiblingsAndSync(): void {
		const parent = this.parentElement as ToolbarSelect;
		if (parent) {
			parent.options?.forEach(option => {
				if (option !== this) {
					option.removeAttribute("selected");
				}
			});
			if (parent.select) {
				parent.select.value = this.textContent || "";
			}
		}
	}

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	text!: DefaultSlot<Array<Node>>;
}

ToolbarSelectOption.define();

export default ToolbarSelectOption;
