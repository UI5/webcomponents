import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";
import type ListItemBase from "./ListItemBase.js";
import type { ListItemBaseClickEventDetail } from "./ListItemBase.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ListItemGroupBase` is the abstract base for grouping components. It provides the minimal
 * "group" contract shared by `ui5-li-group` and `ui5-option-group`: a header text, the default
 * items slot, and the plumbing the internal `ui5-list` relies on to flatten grouped items.
 *
 * Concrete group components extend this class and add only the public API that is relevant to them.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 * @since 2.26.0
 */
@customElement({
	renderer: jsxRenderer,
})
class ListItemGroupBase extends UI5Element {
	eventDetails!: {
		"click"?: ListItemBaseClickEventDetail,
	}

	/**
	 * Defines the header text of the group.
	 * @public
	 * @default undefined
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the items of the group.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: DefaultSlot<ListItemBase>;

	get groupHeaderItem() {
		return this.shadowRoot!.querySelector<ListItemGroupHeader>("[ui5-li-group-header]")!;
	}

	get isListItemGroup() {
		return true;
	}
}

export default ListItemGroupBase;
export const isInstanceOfListItemGroup = createInstanceChecker<ListItemGroupBase>("isListItemGroup");
