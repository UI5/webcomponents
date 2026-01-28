import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

// Template
import ShellBarBrandingTemplate from "./ShellBarBrandingTemplate.js";

// Styles
import shellBarBrandingCss from "./generated/themes/ShellBarBranding.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-shellbar-branding` component is intended to be placed inside the branding slot of the
 * `ui5-shellbar` component. Its content has higher priority than the `primaryTitle` property
 * and the `logo` slot of `ui5-shellbar`.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.12.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-branding",
	languageAware: true,
	renderer: jsxRenderer,
	template: ShellBarBrandingTemplate,
	styles: shellBarBrandingCss,
})

/**
 * Fired, when the logo is activated.
 * @public
 */
@event("click", {
	bubbles: true,
})

class ShellBarBranding extends UI5Element {
	eventDetails!: {
		click: void,
	}

	/**
	 * Defines the component href.
	 *
	 * **Note:** Standard hyperlink behavior is supported.
	 * @default undefined
	 * @public
	 */
    @property()
    href?: string;

	/**
	 * Defines the component target.
	 *
	 * **Notes:**
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **This property must only be used when the `href` property is set.**
	 * @default undefined
	 * @public
	 */
	@property()
	target?: string;

	/**
	 * Defines the text alternative of the component.
	 * If not provided a default text alternative will be set, if present.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
     * Defines if the title of the branding is shown on an S breakpoint.
     * @default false
     * @private
     */
	@property({ type: Boolean })
	_isSBreakPoint = false;

	/**
	 * Defines the title for the ui5-shellbar-branding component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @public
	 */
	@slot({ type: HTMLElement })
	logo!: Array<HTMLElement>;

	get parsedRef() {
		return (this.href && this.href.length > 0) ? this.href : undefined;
	}

	get _role() {
		return this.href && this.href.length > 0 ? "link" : "button";
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement;
		return defaultSlot?.assignedNodes({ flatten: true })
			.find(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
			?.textContent!.trim();
	}

	_fireClick() {
		this.fireDecoratorEvent("click");
	}

	_onclick(e: MouseEvent) {
		e.stopPropagation();
		this._fireClick();
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._fireClick();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this._fireClick();
		}
	}
}

ShellBarBranding.define();

export default ShellBarBranding;
