import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import TitleLevel from "./types/TitleLevel.js";
import type WrappingType from "./types/WrappingType.js";

// Template
import TitleTemplate from "./TitleTemplate.js";
import Tooltip from "./Tooltip.js";

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

	/**
	 * Full text shown via the tooltip, non-empty only when the title is
	 * truncated. Drives the visual tooltip's `text`.
	 * @private
	 */
	@property({ noAttribute: true })
	_truncatedText = "";

	_titleResizeHandler = this._updateTruncation.bind(this);

	onEnterDOM(): void {
		ResizeHandler.register(this, this._titleResizeHandler);
	}

	onExitDOM(): void {
		ResizeHandler.deregister(this, this._titleResizeHandler);
	}

	onAfterRendering(): void {
		this._updateTruncation();
	}

	// Set the tooltip text only when the title text overflows its box.
	_updateTruncation(): void {
		const root = this.getDomRef();
		if (!root) {
			this._truncatedText = "";
			return;
		}
		const truncated = root.scrollWidth > root.clientWidth;
		this._truncatedText = truncated ? (this.textContent || "").trim() : "";
	}

	get h1() {
		return this.level === TitleLevel.H1;
	}

	get h2() {
		return this.level === TitleLevel.H2;
	}

	get h3() {
		return this.level === TitleLevel.H3;
	}

	get h4() {
		return this.level === TitleLevel.H4;
	}

	get h5() {
		return this.level === TitleLevel.H5;
	}

	get h6() {
		return this.level === TitleLevel.H6;
	}
}

Title.define();

export default Title;
