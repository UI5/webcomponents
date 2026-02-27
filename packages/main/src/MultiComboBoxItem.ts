import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	property,
	eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import ListItemBase from "./ListItemBase.js";
import CheckBox from "./CheckBox.js";
import type { IMultiComboBoxItem } from "./MultiComboBox.js";
import {
	ARIA_LABEL_LIST_ITEM_CHECKBOX,
} from "./generated/i18n/i18n-defaults.js";

import ListItemBaseCss from "./generated/themes/ListItemBase.css.js";
import MultiComboBoxItemCss from "./generated/themes/MultiComboBoxItem.css.js";
import MultiComboBoxItemTemplate from "./MultiComboBoxItemTemplate.js";
import type { SelectionRequestEventDetail } from "./ListItem.js";
import type { AriaRole } from "@ui5/webcomponents-base";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

/**
 * @class
 * The `ui5-mcb-item` represents the item for a `ui5-multi-combobox`.
 * @constructor
 * @extends ListItemBase
 * @implements {IMultiComboBoxItem}
 * @public
 */
@customElement({
	tag: "ui5-mcb-item",
	template: MultiComboBoxItemTemplate,
	styles: [ListItemBaseCss, MultiComboBoxItemCss],
	dependencies: [CheckBox],
})

@event("selection-requested", {
	bubbles: true,
})
class MultiComboBoxItem extends ListItemBase implements IMultiComboBoxItem {
	eventDetails!: ListItemBase["eventDetails"] & {
		"selection-requested": SelectionRequestEventDetail,
	}

	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the additional text of the component.
	 * @default undefined
	 * @since 1.0.0-rc.11
	 * @public
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	/**
	 * Defines whether the item is filtered
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isVisible = false;

	@property({ type: Boolean, noAttribute: true })
	_readonly = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get isMultiComboBoxItem() {
		return true;
	}

	_onclick(e: MouseEvent) {
		if ((e.target as HTMLElement)?.hasAttribute("ui5-checkbox")) {
			return this.fireDecoratorEvent("selection-requested", { item: this, selected: (e.target as CheckBox).checked, selectionComponentPressed: true });
		}

		super._onclick(e);
	}

	get _accessibleName() {
		return MultiComboBoxItem.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX);
	}

	get checkBoxAccInfo() {
		return {
			role: "presentation" as AriaRole,
		};
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
export const isInstanceOfMultiComboBoxItem = createInstanceChecker<MultiComboBoxItem>("isMultiComboBoxItem");
