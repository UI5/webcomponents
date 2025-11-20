import {
	isTabNext, isTabPrevious, isF2, isF7, isUp, isDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ListItem from "./ListItem.js";
import ListItemCustomTemplate from "./ListItemCustomTemplate.js";

// Styles
import ListItemCustomCss from "./generated/themes/ListItemCustom.css.js";

/**
 * @class
 *
 * A component to be used as custom list item within the `ui5-list`
 * the same way as the standard `ui5-li`.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the content of the component.
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	tag: "ui5-li-custom",
	template: ListItemCustomTemplate,
	renderer: jsxRenderer,
	styles: [ListItem.styles, ListItemCustomCss],
})
class ListItemCustom extends ListItem {
	/**
	 * Defines whether the item is movable.
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	movable = false;

	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note**: If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	declare accessibleName?: string;

	_onkeydown(e: KeyboardEvent) {
		const isFocused = this.matches(":focus");
		const shouldHandle = isFocused
			|| isTabNext(e) || isTabPrevious(e)
			|| isF2(e) || isF7(e)
			|| isUp(e) || isDown(e);

		if (shouldHandle) {
			super._onkeydown(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const isFocused = this.matches(":focus");
		const shouldHandle = isFocused
			|| isTabNext(e) || isTabPrevious(e)
			|| isF2(e) || isF7(e)
			|| isUp(e) || isDown(e);

		if (shouldHandle) {
			super._onkeyup(e);
		}
	}

	get classes(): ClassMap {
		const result = super.classes;

		result.main["ui5-custom-li-root"] = true;

		return result;
	}
}

ListItemCustom.define();

export default ListItemCustom;
