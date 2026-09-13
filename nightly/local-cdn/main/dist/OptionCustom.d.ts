import type { IOption } from "./Select.js";
import ListItemBase from "./ListItemBase.js";
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
declare class OptionCustom extends ListItemBase implements IOption {
    eventDetails: ListItemBase["eventDetails"];
    /**
     * Defines the text, displayed inside the `ui5-select` input filed
     * when the option gets selected.
     * @default undefined
     * @public
     */
    displayText?: string;
    /**
     * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
     * For more information on HTML Form support, see the `name` property of `ui5-select`.
     * @default undefined
     * @public
     */
    value?: string;
    /**
     * Defines the content of the component.
     * @public
     */
    content: DefaultSlot<Node>;
    /**
     * Defines the tooltip of the option.
     * @default undefined
     * @public
     */
    tooltip?: string;
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    get effectiveDisplayText(): string;
}
export default OptionCustom;
