import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IOption } from "./Select.js";
import ListItemBase from "./ListItemBase.js";

// Template
import OptionCustomTemplate from "./OptionCustomTemplate.js";

// Styles
import optionBaseCss from "./generated/themes/OptionBase.css.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option-custom` component defines a custom content of an option in the `ui5-select`.
 * A component to be the same way as the standard `ui5-option`.
 * The component accepts arbitrary HTML content to allow full customization.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/OptionCustom.js";`
 * @constructor
 * @since 2.0.0
 * @extends ListItemBase
 * @implements {IOption}
 * @public
 */
@customElement({
	tag: "ui5-option-custom",
	template: OptionCustomTemplate,
	styles: [
		ListItemBase.styles,
		optionBaseCss,
	],
})
class OptionCustom extends ListItemBase implements IOption {
	eventDetails!: ListItemBase["eventDetails"];

	/**
	 * Defines the text, displayed inside the `ui5-select` input filed
	 * when the option gets selected.
	 * @default undefined
	 * @public
	 */
	@property()
	displayText?: string;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default undefined
	 * @public
	 */
	@property()
	value?: string;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	content!: DefaultSlot<Node[]>;

	/**
	 * Defines the tooltip of the option.
	 * @default undefined
	 * @public
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	declare selected: boolean;

	get effectiveDisplayText() {
		return this.displayText || this.textContent || "";
	}
}

OptionCustom.define();

export default OptionCustom;
