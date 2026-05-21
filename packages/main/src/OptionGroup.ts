import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import ListItemGroup from "./ListItemGroup.js";
import type Option from "./Option.js";
import OptionGroupTemplate from "./OptionGroupTemplate.js";
import { LIST_ITEM_GROUP_HEADER } from "./generated/i18n/i18n-defaults.js";
import OptionGroupCss from "./generated/themes/OptionGroup.css.js";

/**
 * @class
 * The `ui5-option-group` component is used to group options within a `ui5-select`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/OptionGroup.js";`
 * @constructor
 * @extends ListItemGroup
 * @public
 * @since 2.x.0
 */
@customElement({
	tag: "ui5-option-group",
	languageAware: true,
	template: OptionGroupTemplate,
	styles: [OptionGroupCss],
})
class OptionGroup extends ListItemGroup {
	eventDetails!: ListItemGroup["eventDetails"];

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	/**
	 * Defines the options of the group.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		individualSlots: true,
		type: HTMLElement,
	})
	items!: DefaultSlot<Option>;

	get isOptionGroup(): boolean {
		return true;
	}

	get _groupHeaderRoleDescription(): string {
		return OptionGroup.i18nBundle.getText(LIST_ITEM_GROUP_HEADER);
	}
}

OptionGroup.define();

export const isInstanceOfOptionGroup = createInstanceChecker<OptionGroup>("isOptionGroup");
export default OptionGroup;
