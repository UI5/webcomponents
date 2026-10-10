import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type WrappingType from "./types/WrappingType.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-label` is a component used to represent a label for elements like input, textarea, select.
 * The `for` property of the `ui5-label` must be the same as the id attribute of the related input element.
 * Screen readers read out the label, when the user focuses the labelled control.
 *
 * The `ui5-label` appearance can be influenced by properties,
 * such as `required` and `wrappingType`.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Label";`
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
declare class Label extends UI5Element {
    /**
     * Defines the labeled input by providing its ID.
     *
     * **Note:** Can be used with both `ui5-input` and native input.
     * @default undefined
     * @public
     */
    for?: string;
    /**
     * Defines whether colon is added to the component text.
     *
     * **Note:** Usually used in forms.
     * @default false
     * @public
     */
    showColon: boolean;
    /**
     * Defines whether an asterisk character is added to the component text.
     *
     * **Note:** Usually indicates that user input (bound with the `for` property) is required.
     * In that case the `required` property of
     * the corresponding input should also be set.
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Defines how the text of a component will be displayed when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * @default "Normal"
     * @public
     */
    wrappingType: `${WrappingType}`;
    static i18nBundle: I18nBundle;
    _onclick(): void;
    get _colonSymbol(): string;
}
export default Label;
