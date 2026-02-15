import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ButtonBadgeDesign from "./types/ButtonBadgeDesign.js";
/**
 * @class
 *
 * The `ui5-button-badge` component defines a badge that appears in the `ui5-button`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ButtonBadge.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.7.0
 * @public
 */
declare class ButtonBadge extends UI5Element {
    /**
     * Defines the badge placement and appearance.
     * - **InlineText** - displayed inside the button after its text, and recommended for **compact** density.
     * - **OverlayText** - displayed at the top-end corner of the button, and recommended for **cozy** density.
     * - **AttentionDot** - displayed at the top-end corner of the button as a dot, and suitable for both **cozy** and **compact** densities.
     * @since 2.7.0
     * @public
    */
    design: `${ButtonBadgeDesign}`;
    /**
     * Defines the text of the component.
     *
     * **Note:** Text is not applied when the `design` property is set to `AttentionDot`.
     *
     * **Note:** The badge component only accepts numeric values and the "+" symbol. Using other characters or formats may result in unpredictable behavior, which is not guaranteed or supported.
     * @since 2.7.0
     * @public
    */
    text: string;
    get effectiveText(): string;
}
export default ButtonBadge;
