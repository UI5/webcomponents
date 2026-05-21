import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-text` component displays text that can be used in any content area of an application.
 *
 * ### Usage
 *
 * - Use the `ui5-text` if you want to display text inside a form, table, or any other content area.
 * - Do not use the `ui5-text` if you need to reference input type of components (use ui5-label).
 *
 * ### Responsive behavior
 *
 * The `ui5-text` component is fully adaptive to all screen sizes.
 * By default, the text will wrap when the space is not enough.
 * In addition, the component supports truncation via the `max-lines` property,
 * by defining the number of lines the text should wrap before start truncating.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Text";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
declare class Text extends UI5Element {
    /**
     * Defines the number of lines the text should wrap before it truncates.
     * @default Infinity
     * @public
     */
    maxLines: number;
    /**
     * Specifies if an empty indicator should be displayed when there is no text.
     * @default "Off"
     * @since 2.2.0
     * @public
     */
    emptyIndicatorMode: `${TextEmptyIndicatorMode}`;
    /**
     * Defines the text of the component.
     * @public
     */
    text: DefaultSlot<Node>;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    get hasText(): boolean;
    get _renderEmptyIndicator(): boolean;
    get _emptyIndicatorAriaLabel(): string;
    get _emptyIndicatorSymbol(): string;
}
export default Text;
