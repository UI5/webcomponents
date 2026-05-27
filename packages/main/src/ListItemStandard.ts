import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import type { IAccessibleListItem } from "./ListItem.js";
import type WrappingType from "./types/WrappingType.js";
import ListItemStandardTemplate from "./ListItemStandardTemplate.js";
import type { ExpandableTextTemplateParams } from "./types/ExpandableTextTemplateParams.js";
import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * Maximum number of characters to display for small screens (Size S)
 * @private
 */
const MAX_CHARACTERS_SIZE_S = 100;

/**
 * Maximum number of characters to display for medium and larger screens (Size M and above)
 * @private
 */
const MAX_CHARACTERS_SIZE_M = 300;

// Specific template type for expandable text
type ExpandableTextTemplate = (this: ListItemStandard, params: ExpandableTextTemplateParams) => JSX.Element;

/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @constructor
 * @extends ListItem
 * @public
 */
@customElement({
	tag: "ui5-li",
	renderer: jsxRenderer,
	template: ListItemStandardTemplate,
})
class ListItemStandard extends ListItem implements IAccessibleListItem {
	/**
	 * Defines the text of the component.
	 *
	 * @default undefined
	 * @public
	 * @since 2.10.0
	 */
	@property()
	text?: string;

	/**
	 * Defines the description displayed right under the item text, if such is present.
	 * @default undefined
	 * @public
	 * @since 0.8.0
	 */
	@property()
	description?: string;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd = false;

	/**
	 * Defines the `additionalText`, displayed in the end of the list item.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the state of the `additionalText`.
	 *
	 * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
	 * @default "None"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	additionalTextState: `${ValueState}` = "None";

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
	 * Note: If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	declare accessibleName?: string;

	/**
	 * Defines if the text of the component should wrap when it's too long.
	 * When set to "Normal", the content (title, description) will be wrapped
	 * using the `ui5-expandable-text` component.<br/>
	 *
	 * The text can wrap up to 100 characters on small screens (size S) and
	 * up to 300 characters on larger screens (size M and above). When text exceeds
	 * these limits, it truncates with an ellipsis followed by a text expansion trigger.
	 *
	 * Available options are:
	 * - `None` (default) - The text will truncate with an ellipsis.
	 * - `Normal` - The text will wrap (without truncation).
	 *
	 * @default "None"
	 * @public
	 * @since 2.10.0
	 */
	@property()
	wrappingType: `${WrappingType}` = "None";

	/**
	 * Indicates if the list item has text content.
	 * @private
	 */
	@property({ type: Boolean })
	hasTitle = false;

	@property({ type: Boolean })
	_hasImage = false;

	/**
	 * The expandableText template.
	 * @private
	 */
	@property({ noAttribute: true })
	expandableTextTemplate?: ExpandableTextTemplate;

	/**
	 * Defines the custom formatted text of the component.
	 *
	 * **Note:** For optimal text wrapping and a consistent layout, it is strongly recommended to use the `text` property.
	 *
	 * Use the `default` slot only when custom formatting with HTML elements (e.g., `<b>`, `<i>`) is required.
	 * Be aware that wrapping (via `wrappingType="Normal"`) may not function correctly with custom HTML content in the `default` slot.
	 *
	 * If both `text` and `default` slot are used, the `text` property takes precedence.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: DefaultSlot<Node>;

	/**
	 * **Note:** While the slot allows option for setting custom avatar, to match the
	 * design guidelines, please use the `ui5-avatar` with it's default size - S.
	 *
	 * **Note:** If bigger `ui5-avatar` needs to be used, then the size of the
	 * `ui5-li` should be customized in order to fit.
	 * @since 2.0.0
	 * @public
	 */
	@slot()
	image!: Slot<HTMLElement>;

	onBeforeRendering() {
		super.onBeforeRendering();
		this.hasTitle = !!(this.text || this.textContent);
		this._hasImage = this.hasImage;

		// Only load ExpandableText if "Normal" wrapping is used
		if (this.wrappingType === "Normal") {
			// If feature is already loaded (preloaded by the user via importing ListItemStandardExpandableText.js), the template is already available
			if (ListItemStandard.ExpandableTextTemplate) {
				this.expandableTextTemplate = ListItemStandard.ExpandableTextTemplate;
				// If feature is not preloaded, load the template dynamically
			} else {
				import("./features/ListItemStandardExpandableTextTemplate.js").then(module => {
					this.expandableTextTemplate = module.default;
				});
			}
		}
	}

	/**
	 * Returns the content text, either from text property or from the default slot
	 * @private
	 */
	get _textContent(): string {
		return this.text || this.textContent || "";
	}

	/**
	 * Determines the maximum characters to display based on the current media range.
	 * - Size S: 100 characters
	 * - Size M and larger: 300 characters
	 * @private
	 */
	get _maxCharacters(): number {
		return this.mediaRange === "S" ? MAX_CHARACTERS_SIZE_S : MAX_CHARACTERS_SIZE_M;
	}

	get displayIconBegin(): boolean {
		return !!(this.icon && !this.iconEnd);
	}

	get displayIconEnd(): boolean {
		return !!(this.icon && this.iconEnd);
	}

	get hasImage(): boolean {
		return !!this.image.length;
	}

	static ExpandableTextTemplate?: ExpandableTextTemplate;
}

ListItemStandard.define();

export default ListItemStandard;
