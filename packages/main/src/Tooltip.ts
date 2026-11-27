import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";
import type PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import { registerTooltip, deregisterTooltip } from "./TooltipDelegation.js";

// Template
import TooltipTemplate from "./TooltipTemplate.js";
// Styles
import TooltipCss from "./generated/themes/Tooltip.css.js";

const OPENER_ATTR = "data-ui5-has-tooltip";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tooltip` shows a short, non-interactive text near an element to
 * provide supplementary information. The element it describes points at the
 * tooltip with `data-ui5-has-tooltip="<id>"` (to drive the gestures) and
 * `aria-describedby="<id>"` (for the accessible description). The tooltip text
 * is the component's text content.
 *
 * It opens on hover, keyboard focus and long-press, and closes on Escape,
 * activation or when the pointer/focus leaves.
 *
 * ### Usage
 *
 * ```html
 * <button data-ui5-has-tooltip="t1" aria-describedby="t1">Save</button>
 * <ui5-tooltip id="t1">Save the document</ui5-tooltip>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Tooltip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.29.0
 */
@customElement({
	tag: "ui5-tooltip",
	renderer: jsxRenderer,
	template: TooltipTemplate,
	styles: TooltipCss,
})
class Tooltip extends UI5Element {
	/**
	 * Defines the placement of the tooltip relative to its opener.
	 * @default "Top"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "Top";

	/**
	 * Defines the horizontal alignment of the tooltip relative to its opener.
	 * @default "Center"
	 * @public
	 */
	@property()
	horizontalAlign: `${PopoverHorizontalAlign}` = "Center";

	/**
	 * Delay in milliseconds before the tooltip opens or closes on hover and
	 * keyboard focus. Touch and Escape act immediately.
	 * @default 500
	 * @public
	 */
	@property({ type: Number })
	delay = 500;

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
		// Nothing to show without text content.
		if (!this.textContent?.trim()) {
			return;
		}
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

	onEnterDOM(): void {
		// Host carries role=tooltip so aria-describedby targets a valid node.
		// Reflected as a real attribute (not via ElementInternals) so it is
		// queryable by ARIA tooling and matches the repo's role convention.
		this.setAttribute("role", "tooltip");
		// Mirror the text content into aria-label. The host text is clip-hidden,
		// and some engines do not reliably compute a description from a visually
		// hidden text node referenced by aria-describedby; an explicit aria-label
		// gives the referenced node a stable accessible name that aria-describedby
		// reads as the description.
		this._syncAriaLabel();
		registerTooltip(this);
	}

	onBeforeRendering(): void {
		// Keep aria-label in sync if the text content changes after mount.
		this._syncAriaLabel();
	}

	_syncAriaLabel(): void {
		const text = this.textContent?.trim();
		if (text) {
			this.setAttribute("aria-label", text);
		} else {
			this.removeAttribute("aria-label");
		}
	}

	onExitDOM(): void {
		deregisterTooltip(this);
	}

	_onPopoverClose = (): void => {
		this._open = false;
	};

	// Resolve the element that points at this tooltip within the same root.
	_getOpenerElement(): HTMLElement | null {
		const root = this.getRootNode() as Document | ShadowRoot;
		return root.querySelector?.(`[${OPENER_ATTR}="${this.id}"]`) ?? null;
	}
}

Tooltip.define();

export default Tooltip;
