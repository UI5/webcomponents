import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	property,
	eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import ComboBoxItemCustom from "./ComboBoxItemCustom.js";
import type CheckBox from "./CheckBox.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import type MultiComboBox from "./MultiComboBox.js";
import {
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
} from "./generated/i18n/i18n-defaults.js";
import styles from "./generated/themes/MultiComboBoxItemCustom.css.js";
import MultiComboBoxItemCustomTemplate from "./MultiComboBoxItemCustomTemplate.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";
import type { AriaRole } from "@ui5/webcomponents-base";

/**
 * @class
 * The `ui5-mcb-item-custom` is a multi-combobox item component
 * that can be used to place custom content in the multi-combobox item.
 * The text property is used for filtering and token display.
 * In case the user needs highlighting functionality, check "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js"
 *
 * @constructor
 * @extends ComboBoxItemCustom
 * @implements {IMultiComboBoxItem}
 * @public
 * @since 2.24.0
 */
@customElement({
	tag: "ui5-mcb-item-custom",
	template: MultiComboBoxItemCustomTemplate,
	styles: [ComboBoxItemCustom.styles, styles],
})

@event("selection-requested", {
	bubbles: true,
})
class MultiComboBoxItemCustom extends ComboBoxItemCustom implements IMultiComboBoxItem {
	eventDetails!: ComboBoxItemCustom["eventDetails"] & {
		"selection-requested": SelectionRequestEventDetail,
	}

	/**
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_readonly = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering(): void {
		// Synchronize selected state from parent's selectedValues
		// This ensures the checkbox reflects the correct state
		if (this.value) {
			const parent = this.closest<MultiComboBox>("[ui5-multi-combobox]");
			if (parent) {
				this.selected = parent.selectedValues?.includes(this.value) ?? false;
			}
		}
	}

	get isMultiComboBoxItem() {
		return true;
	}

	_onclick(e: MouseEvent) {
		if ((e.target as HTMLElement)?.hasAttribute("ui5-checkbox")) {
			const checkboxCheckedState = (e.target as CheckBox).checked;

			// The checkbox has already toggled itself, so use its current state
			return this.fireDecoratorEvent("selection-requested", { item: this, selected: checkboxCheckedState, selectionComponentPressed: true });
		}

		super._onclick(e);
	}

	get _accessibleName() {
		return MultiComboBoxItemCustom.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX);
	}

	get checkBoxAccInfo() {
		return {
			role: "presentation" as AriaRole,
		};
	}
}

MultiComboBoxItemCustom.define();

export default MultiComboBoxItemCustom;
