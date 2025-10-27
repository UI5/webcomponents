import { customElement, i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import { TABLE_GENERATED_BY_AI } from "./generated/i18n/i18n-defaults.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/ai.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell-action-ai` component defines a dedicated AI action for the table column.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";`
 *
 * @constructor
 * @extends TableHeaderCellActionBase
 * @since 2.8.0
 * @public
 */
@customElement({ tag: "ui5-table-header-cell-action-ai" })

class TableHeaderCellActionAI extends TableHeaderCellActionBase {
	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onAfterRendering() {
		super.onAfterRendering();
		this.toggleAttribute("_popin", !this.parentElement?.hasAttribute("ui5-table-header-cell"));
	}

	getRenderInfo() {
		return {
			icon: "ai",
			tooltip: TableHeaderCellActionAI.i18nBundle.getText(TABLE_GENERATED_BY_AI),
		};
	}
}

TableHeaderCellActionAI.define();

export default TableHeaderCellActionAI;
