import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import WizardTabTemplate from "./WizardTabTemplate.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";

type WizardTabAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaSetsize" | "ariaPosinset" | "ariaLabel" | "ariaCurrent">;

/**
 * @class
 *
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
 * @private
 */

@customElement({
	tag: "ui5-wizard-tab",
	renderer: jsxRenderer,
	styles: WizardTabCss,
	template: WizardTabTemplate,
})

/**
 * Fired when focus on a step.
 * @private
 */
@event("focused", {
	bubbles: true,
})
/**
 * Fired when clicking on none disabled step.
 * @private
 */
@event("selection-change-requested", {
	bubbles: true,
})
class WizardTab extends UI5Element implements ITabbable {
	eventDetails!: {
		"focused": void
		"selection-change-requested": void
	}
	/**
	 * Defines the `icon` of the step.
	 * @default undefined
	 * @private
	 */
	@property()
	icon?: string

	/**
	 * Defines the `titleText` of the step.
	 * @default undefined
	 * @private
	 * @since 1.0.0
	 */
	@property()
	titleText?: string

	/**
	 * Defines the `subtitleText` of the step.
	 * @default undefined
	 * @private
	 * @since 1.0.0
	 */
	@property()
	subtitleText?: string

	/**
	 * Defines the number that will be displayed in place of the `icon`, when it's missing.
	 * @default undefined
	 * @private
	 */
	@property()
	number?: string

	/**
	 * Defines if the step is `disabled` - the step is not responding to user interaction.
	 * @default false
	 * @private
	 */
	 @property({ type: Boolean })
	 disabled = false;

	/**
	 * Defines if the step is `selected`.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines if the step's separator is hidden or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	hideSeparator = false;

	/**
	 * Defines if the step's separator is active or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	activeSeparator = false;

	/**
	 * Defines if the step's separator is dashed or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	branchingSeparator = false;

	/**
	 * Defines the tabindex of the step.
	 * @default "-1"
	 * @private
	 */
	@property()
	forcedTabIndex?: string

	/**
	 * @private
	 */
	@property({ type: Object })
	_wizardTabAccInfo? : WizardTabAccessibilityAttributes

	_onclick() {
		if (!this.disabled) {
			this.fireDecoratorEvent("selection-change-requested");
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.disabled) {
			return;
		}

		if ((isSpace(e) || isEnter(e)) && !isSpaceShift(e)) {
			e.preventDefault();
			this.fireDecoratorEvent("selection-change-requested");
		}
	}

	get effectiveTabIndex() {
		if (this.disabled) {
			return;
		}

		if (this.selected || this.forcedTabIndex === "0") {
			return 0;
		}

		return -1;
	}

	_onfocusin() {
		this.fireDecoratorEvent("focused");
	}

	get hasTexts() {
		return this.titleText || this.subtitleText;
	}

	get accInfo(): WizardTabAccessibilityAttributes {
		return {
			"ariaSetsize": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaSetsize,
			"ariaPosinset": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaPosinset,
			"ariaLabel": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaLabel,
			"ariaCurrent": this.selected ? "true" : undefined,
		};
	}
}

WizardTab.define();

export default WizardTab;
