import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";

// Template
import TooltipTemplate from "./TooltipTemplate.js";
// Styles
import TooltipCss from "./generated/themes/Tooltip.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tooltip` shows a short, non-interactive text near an element to
 * provide supplementary information. It opens on hover, keyboard focus and
 * long-press, and closes on Escape, activation or when the pointer/focus leaves.
 *
 * ### Usage
 *
 * ```html
 * <ui5-button id="btn">Save</ui5-button>
 * <ui5-tooltip opener="btn" text="Save the document"></ui5-tooltip>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tooltip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.x
 */
@customElement({
	tag: "ui5-tooltip",
	renderer: jsxRenderer,
	template: TooltipTemplate,
	styles: TooltipCss,
})
class Tooltip extends UI5Element {
	/**
	 * Defines the tooltip text.
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the element the tooltip reacts to and docks against,
	 * by id (within the same root) or a DOM reference.
	 * @default undefined
	 * @public
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string;

	/**
	 * Defines the placement of the tooltip relative to its opener.
	 * @default "Top"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "Top";

	/**
	 * Id for the in-shadow `role="tooltip"` ARIA anchor. The owning element
	 * sets this to a known value and references the same id via
	 * `aria-describedby`. Both must live in the same shadow root.
	 * @default ""
	 * @public
	 */
	@property()
	ariaAnchorId = "";

	/**
	 * Controls popover visibility.
	 * @private
	 */
	@property({ type: Boolean })
	_open = false;

	/**
	 * Opens the tooltip against its opener.
	 * @public
	 */
	openTooltip(): void {
		this._open = true;
	}

	/**
	 * Closes the tooltip.
	 * @public
	 */
	closeTooltip(): void {
		this._open = false;
	}

	/**
	 * Whether the tooltip is currently open.
	 * @public
	 */
	isOpen(): boolean {
		return this._open;
	}

	// Falls back to an auto id when the owner did not provide one.
	get _anchorId(): string {
		return this.ariaAnchorId || `${this._id}-aria`;
	}

	_onPopoverClose = (): void => {
		this._open = false;
	};
}

Tooltip.define();

export default Tooltip;
