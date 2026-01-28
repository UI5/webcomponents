import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type MultiComboBoxItem from "./MultiComboBoxItem.js";
import MultiComboBoxItemGroupTemplate from "./MultiComboBoxItemGroupTemplate.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
import ComboBoxItemGroup from "./ComboBoxItemGroup.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * The `ui5-mcb-item-group` is type of suggestion item,
 * that can be used to split the `ui5-multi-combobox` suggestions into groups.
 * @constructor
 * @extends ComboBoxItemGroup
 * @public
 * @implements {IMultiComboBoxItem}
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-mcb-item-group",
	template: MultiComboBoxItemGroupTemplate,
})
class MultiComboBoxItemGroup extends ComboBoxItemGroup implements IMultiComboBoxItem {
	eventDetails!: ComboBoxItemGroup["eventDetails"];
	/**
	 * Defines the items of the <code>ui5-mcb-item-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		individualSlots: true,
		type: HTMLElement,
	})
	items!: DefaultSlot<MultiComboBoxItem[]>;

	/**
	 * Used to avoid tag name checks
	 * @protected
	 */
	get isGroupItem() {
		return true;
	}

	get selected() {
		return false;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	getFocusDomRef() {
		return this.shadowRoot!.querySelector("[ui5-li-group-header]") as ListItemGroupHeader;
	}
}

MultiComboBoxItemGroup.define();

const isInstanceOfMultiComboBoxItemGroup = (object: any): object is MultiComboBoxItemGroup => {
	return "isGroupItem" in object;
};

export default MultiComboBoxItemGroup;

export { isInstanceOfMultiComboBoxItemGroup };
