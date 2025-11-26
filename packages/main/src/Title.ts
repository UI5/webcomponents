import UI5Element, { jsxRenderer, customElement, property } from "@ui5/webcomponents-base";
import type TitleLevel from "./types/TitleLevel.js";
import type WrappingType from "./types/WrappingType.js";

// Template
import TitleTemplate from "./TitleTemplate.js";

// Styles
import titleCss from "./generated/themes/Title.css.js";

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
@customElement({
	tag: "ui5-title",
	renderer: jsxRenderer,
	template: TitleTemplate,
	styles: titleCss,
})
class Title extends UI5Element {
	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 *
	 * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	 * @default "Normal"
	 * @public
	 */
	@property()
	wrappingType: `${WrappingType}` = "Normal";

	/**
	 * Defines the component level.
	 * Available options are: `"H6"` to `"H1"`.
	 * This property does not influence the style of the component.
	 * Use the property `size` for this purpose instead.
	 * @default "H2"
	 * @public
	 */
	@property()
	level: `${TitleLevel}` = "H2";

	/**
	 * Defines the visual appearance of the title.
	 * Available options are: `"H6"` to `"H1"`.
	 * @default "H5"
	 * @public
	 */
	@property()
	size: `${TitleLevel}` = "H5";

	get h1() {
		return this.level === "H1";
	}

	get h2() {
		return this.level === "H2";
	}

	get h3() {
		return this.level === "H3";
	}

	get h4() {
		return this.level === "H4";
	}

	get h5() {
		return this.level === "H5";
	}

	get h6() {
		return this.level === "H6";
	}
}

Title.define();

export default Title;
