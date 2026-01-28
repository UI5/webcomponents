import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";

import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/pushpin-off.js";
import "@ui5/webcomponents-icons/dist/pushpin-on.js";

// Template
import DynamicPageHeaderActionsTemplate from "./DynamicPageHeaderActionsTemplate.js";

// Styles
import DynamicPageHeaderActionsCss from "./generated/themes/DynamicPageHeaderActions.css.js";

// Texts
import {
	DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_UNPIN_HEADER,
} from "./generated/i18n/i18n-defaults.js";

type DynamicPageHeaderActionsAccessibilityAttributes = Pick<AccessibilityAttributes, "controls">;

/**
 * @class
 *
 * ### Overview
 *
 * The `DynamicPageHeaderActions` component is part of the `DynamicPage`
 * family and is holding the action buttons behind the `DynamicPageTitle` and the `DynamicPageHeader`.
 *
 * The "pin" action is used to attach the header to a certain state (expanded/collapsed).
 * The expand/collapse action is used to switch between the two states of `DynamicPageHeader`.
 *
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-dynamic-page-header-actions",
	renderer: jsxRenderer,
	styles: DynamicPageHeaderActionsCss,
	template: DynamicPageHeaderActionsTemplate,
})

/**
 * Event that is being fired by clicking on the expand button.
 *
 * @protected
 */
@event("expand-button-click", {
	bubbles: true,
})

/**
 * Event that is being fired by clicking on the pin button.
 *
 * @protected
 */
@event("pin-button-click", {
	bubbles: true,
})

/**
 * Event that is being fired by hovering in the expand button.
 *
 * @protected
 */
@event("expand-button-hover-in", {
	bubbles: true,
})
/**
 * Event that is being fired by hovering out the expand button.
 *
 * @protected
 */
@event("expand-button-hover-out", {
	bubbles: true,
})
class DynamicPageHeaderActions extends UI5Element {
	eventDetails!: {
		"expand-button-click": void;
		"pin-button-click": void;
		"expand-button-hover-in": void;
		"expand-button-hover-out": void;
	}
	/**
	 * Defines whether the header is pinned.
	 *
	 * @protected
	 * @default false
	 */
	@property({ type: Boolean })
	pinned = false;

	/**
	 * Defines whether the pin button is hidden.
	 *
	 * @protected
	 * @default false
	 */
	@property({ type: Boolean })
	hidePinButton = false;

	/**
	 * Defines whether the header is snapped.
	 *
	 * @protected
	 * @default false
	 */
	@property({ type: Boolean })
	snapped = false;

	/**
	 * Contains attributes to be added to HTML to gain accessibility.
	 *
	 * @protected
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes: DynamicPageHeaderActionsAccessibilityAttributes = {};

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get arrowButtonIcon() {
		return this.snapped ? "slim-arrow-down" : "slim-arrow-up";
	}

	get pinButtonIcon() {
		if (isLegacyThemeFamily()) {
			return "pushpin-off";
		}
		return this.pinned ? "pushpin-on" : "pushpin-off";
	}

	get expandButton(): Button | null {
		return this.shadowRoot!.querySelector<Button>(".ui5-dynamic-page-header-action-expand");
	}

	get pinButton(): ToggleButton | null {
		return this.shadowRoot!.querySelector<ToggleButton>(".ui5-dynamic-page-header-action-pin");
	}

	get pinLabel() {
		return this.pinned
			? DynamicPageHeaderActions.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_UNPIN_HEADER)
			: DynamicPageHeaderActions.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_PIN_HEADER);
	}

	get expandLabel() {
		return this.snapped
			? DynamicPageHeaderActions.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPAND_HEADER)
			: DynamicPageHeaderActions.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAP_HEADER);
	}

	focusExpandButton() {
		this.expandButton?.focus();
	}

	focusPinButton() {
		this.pinButton?.focus();
	}

	onExpandClick() {
		this.fireDecoratorEvent("expand-button-click");
	}

	onPinClick() {
		this.fireDecoratorEvent("pin-button-click");
	}

	onExpandHoverIn() {
		this.fireDecoratorEvent("expand-button-hover-in");
	}

	onExpandHoverOut() {
		this.fireDecoratorEvent("expand-button-hover-out");
	}

	get showPinButton() {
		return !this.hidePinButton && !this.snapped;
	}
}

DynamicPageHeaderActions.define();

export default DynamicPageHeaderActions;
