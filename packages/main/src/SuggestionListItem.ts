import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItemStandard from "./ListItemStandard.js";
import SuggestionListItemTemplate from "./SuggestionListItemTemplate.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 * The `ui5-li-suggestion-item` represents the suggestion item in the `ui5-input`
 * suggestion popover.
 * @constructor
 * @extends ListItemStandard
 * @csspart title - Used to style the title of the suggestion list item
 * @csspart description - Used to style the description of the suggestion list item
 * @csspart info - Used to style the info of the suggestion list item
 */
@customElement({
	renderer: jsxRenderer,
	tag: "ui5-li-suggestion-item",
	template: SuggestionListItemTemplate,
})
class SuggestionListItem extends ListItemStandard {
	/**
	 * Defines a description that can contain HTML.
	 * **Note:** If not specified, the `description` property will be used.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	richDescription!: Slot<HTMLElement[]>;

	/**
	 * Defines the title text of the suggestion item.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	titleText!: DefaultSlot<Node[]>;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!this.titleText.length;
	}

	get effectiveTitle() {
		return this.titleText.filter(node => node.nodeType !== Node.COMMENT_NODE).map(el => el.textContent).join("");
	}

	get hasDescription() {
		return this.richDescription.length > 0 || this.description;
	}

	get groupItem() {
		return false;
	}
}

SuggestionListItem.define();

export default SuggestionListItem;
