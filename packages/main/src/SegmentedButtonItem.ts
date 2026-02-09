import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	getEffectiveAriaDescriptionText,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
import type { ISegmentedButtonItem } from "./SegmentedButton.js";
import SegmentedButtonItemTemplate from "./SegmentedButtonItemTemplate.js";

import type { IButton } from "./Button.js";
import segmentedButtonItemCss from "./generated/themes/SegmentedButtonItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `selected`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends UI5Element
 * @implements { ISegmentedButtonItem }
 * @implements { IButton }
 * @public
 */
@customElement({
	tag: "ui5-segmented-button-item",
	renderer: jsxRenderer,
	template: SegmentedButtonItemTemplate,
	styles: segmentedButtonItemCss,
})
class SegmentedButtonItem extends UI5Element implements IButton, ISegmentedButtonItem {
	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be selected or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Determines whether the component is displayed as selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default undefined
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.15.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines the IDs of the HTML Elements that describe the component.
	 * @default undefined
	 * @public
	 * @since 2.15.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines if the button has icon and no text.
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly = false;

	/**
	 * Indicates if the element is focusable
	 * @private
	 */
	@property({ type: Boolean })
	nonInteractive = false;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedTabIndex?: string;

	/**
	 * Defines the index of the item inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ type: Number })
	posInSet? = 0;

	/**
	 * Defines how many items are inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ type: Number })
	sizeOfSet? = 0;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hidden = false;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: DefaultSlot<Node>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get ariaDescription() {
		return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}

	constructor() {
		super();
	}

	_onclick(e: MouseEvent) {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		this.selected = !this.selected;
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onBeforeRendering(): void {
		this.iconOnly = !willShowContent(this.text);
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpaceShift(e)) {
			e.preventDefault();
		}
	}

	get tabIndexValue() {
		if (this.disabled) {
			return;
		}

		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.forcedTabIndex;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || undefined;
	}

	get ariaDescriptionText() {
		return getEffectiveAriaDescriptionText(this) || undefined;
	}

	get showIconTooltip() {
		return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
	}

	get slotTextContent(): string {
		return this.text
			.filter(node => node.nodeType === Node.TEXT_NODE)
			.map(node => node.textContent?.trim() || "")
			.filter(Boolean)
			.join(" ");
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
