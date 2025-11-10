import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, eventStrict } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableHeaderCellActionBaseTemplate from "./TableHeaderCellActionBaseTemplate.js";
import TableHeaderCellActionBaseStyles from "./generated/themes/TableHeaderCellActionBase.css.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type TableCell from "./TableCell.js";
import type Button from "./Button.js";

/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
type TableHeaderCellActionClickEventDetail = {
	targetRef: HTMLElement;
};

/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
@eventStrict("click", {
	bubbles: false,
})

/**
 * @class
 * The `TableHeaderCellActionBase` class serves as a foundation for table header cell actions.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.8.0
 * @public
 */
@customElement({
	renderer: jsxRenderer,
	styles: TableHeaderCellActionBaseStyles,
	template: TableHeaderCellActionBaseTemplate,
})
abstract class TableHeaderCellActionBase extends UI5Element {
	eventDetails!: {
		"click": TableHeaderCellActionClickEventDetail,
	}

	abstract getRenderInfo(): {
		icon: string;
		tooltip: string;
	};

	onBeforeRendering() {
		this.toggleAttribute("_popin", !this.parentElement);
	}

	_onClick(e: UI5CustomEvent<Button, "click">) {
		// Retrieve the real action (if parent is header cell this instance is fine, otherwise retrieve it from the header cell)
		const action = this.parentElement?.hasAttribute("ui5-table-header-cell") ? this : ((this.getRootNode() as ShadowRoot).host as TableCell)._headerCell.action[0] as this;
		action.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
		e.stopPropagation();
	}

	get accessibilityInfo() {
		return {
			description: getActiveElement()?.hasAttribute("ui5-table-cell-base") ? this._tooltip : "",
		};
	}

	get _tooltip() {
		return this.getRenderInfo().tooltip;
	}

	get _icon() {
		return this.getRenderInfo().icon;
	}
}

export default TableHeaderCellActionBase;

export type {
	TableHeaderCellActionClickEventDetail,
};
