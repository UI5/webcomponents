import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import TitleLevel from "./types/TitleLevel.js";
import type WrappingType from "./types/WrappingType.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-title` component is used to display titles inside a page.
 * It is a simple, large-sized text with explicit header/title semantics.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Title.js";`
 * @constructor
 * @extends UI5Element
 * @slot {Node[]} default - Defines the text of the component.
 * This component supports nesting a `Link` component inside.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @public
 */
declare class Title extends UI5Element {
    /**
     * Defines how the text of a component will be displayed when there is not enough space.
     *
     * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
     * @default "Normal"
     * @public
     */
    wrappingType: `${WrappingType}`;
    /**
     * Defines the component level.
     * Available options are: `"H6"` to `"H1"`.
     * This property does not influence the style of the component.
     * Use the property `size` for this purpose instead.
     * @default "H2"
     * @public
     */
    level: `${TitleLevel}`;
    /**
     * Defines the visual appearance of the title.
     * Available options are: `"H6"` to `"H1"`.
     * @default "H5"
     * @public
     */
    size: `${TitleLevel}`;
    get h1(): boolean;
    get h2(): boolean;
    get h3(): boolean;
    get h4(): boolean;
    get h5(): boolean;
    get h6(): boolean;
}
export default Title;
