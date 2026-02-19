import { slotStrict as slot, property, customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import ListItemBase from "./ListItemBase.js";
import type { ExpandableTextTemplateParams } from "./types/ExpandableTextTemplateParams.js";

import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";

// Template
import ListItemGroupHeaderTemplate from "./ListItemGroupHeaderTemplate.js";

// Styles
import ListItemGroupHeaderCss from "./generated/themes/ListItemGroupHeader.css.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
import type WrappingType from "./types/WrappingType.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";

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
type ExpandableTextTemplate = (this: ListItemGroupHeader, params: ExpandableTextTemplateParams) => JSX.Element;

/**
 * @class
 * The `ui5-li-group-header` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @private
 */
@customElement({
	tag: "ui5-li-group-header",
	languageAware: true,
	template: ListItemGroupHeaderTemplate,
	styles: [ListItemBase.styles, ListItemGroupHeaderCss],
})
class ListItemGroupHeader extends ListItemBase {
	eventDetails!: ListItemBase["eventDetails"];
	/**
	 * Defines the text alternative of the component.
	 *
	 * **Note:** If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	@property()
	accessibleRole: `${ListItemAccessibleRole}` = ListItemAccessibleRole.ListItem;

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
	 * @since 2.15.0
	 */
	@property()
	wrappingType: `${WrappingType}` = "None";

	/**
	 * Defines the current media query size.
	 * @default "S"
	 * @private
	 */
	@property()
	mediaRange = "S";

	/**
	 * The expandableText template.
	 * @private
	 */
	@property({ noAttribute: true })
	expandableTextTemplate?: ExpandableTextTemplate;

	@slot()
	subItems!: Slot<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get effectiveAccRole(): AriaRole {
		return toLowercaseEnumValue(this.accessibleRole);
	}

	get groupItem() {
		return true;
	}

	get _pressable() {
		return false;
	}

	get groupHeaderText() {
		return ListItemGroupHeader.i18nBundle.getText(GROUP_HEADER_TEXT);
	}

	get defaultSlotText(): string {
		return this.textContent!;
	}

	get ariaLabelText() {
		return [this.textContent, this.accessibleName].filter(Boolean).join(" ");
	}

	get hasSubItems() {
		return this.subItems.length > 0;
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		// Only load ExpandableText if "Normal" wrapping is used
		if (this.wrappingType === "Normal") {
			// If feature is already loaded (preloaded by the user via importing ListItemGroupHeaderExpandableText.js), the template is already available
			if (ListItemGroupHeader.ExpandableTextTemplate) {
				this.expandableTextTemplate = ListItemGroupHeader.ExpandableTextTemplate;
				// If feature is not preloaded, load the template dynamically
			} else {
				import("./features/ListItemStandardExpandableTextTemplate.js").then(module => {
					this.expandableTextTemplate = module.default;
				});
			}
		}
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

	/**
	 * Returns the content text, either from text property or from the default slot
	 * @private
	 */
	get _textContent(): string {
		return this.defaultSlotText || this.groupHeaderText || "";
	}

	static ExpandableTextTemplate?: ExpandableTextTemplate;
}

ListItemGroupHeader.define();

export default ListItemGroupHeader;
