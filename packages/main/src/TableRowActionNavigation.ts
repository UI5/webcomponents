import { customElement, property, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import TableRowActionBase from "./TableRowActionBase.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { TABLE_NAVIGATION } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-action-navigation` component defines a navigation action for table rows.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowActionNavigation.js";`
 *
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
@customElement({ tag: "ui5-table-row-action-navigation" })

class TableRowActionNavigation extends TableRowActionBase {
	/**
	 * Defines the interactive state of the navigation action.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	isFixedAction() {
		return true;
	}

	getRenderInfo() {
		return {
			text: this._i18nNavigation,
			icon: "navigation-right-arrow",
			interactive: this.interactive,
		};
	}

	get _i18nNavigation() {
		return TableRowActionNavigation.i18nBundle.getText(TABLE_NAVIGATION);
	}
}

TableRowActionNavigation.define();

export default TableRowActionNavigation;
