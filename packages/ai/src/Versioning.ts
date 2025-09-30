import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	VERSIONING_PREVIOUS_BUTTON_TEXT,
	VERSIONING_NEXT_BUTTON_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Types
import VersioningTemplate from "./VersioningTemplate.js";

// Styles
import VersioningCss from "./generated/themes/Versioning.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `sap-writing-assistant-versioning` component provides navigation controls for AI-generated content versions.
 * It displays the current version index and total versions, with previous/next navigation buttons.
 *
 * ### Structure
 * The `sap-writing-assistant-versioning` consists of the following elements:
 * - Previous Button: Navigates to the previous version (disabled when at first version)
 * - Version Counter: Shows current version / total versions (e.g., "2 / 5")
 * - Next Button: Navigates to the next version (disabled when at last version)
 *
 * ### Focus Management
 * The component automatically manages focus when users reach version boundaries,
 * moving focus to the available navigation button when one becomes disabled.
 *
 * ### Keyboard Shortcuts
 * - Shift+Ctrl+Z: Navigate to previous version
 * - Shift+Ctrl+Y: Navigate to next version
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/Versioning.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.1
 * @private
 */
@customElement({
	tag: "ui5-ai-textarea-versioning",
	renderer: jsxRenderer,
	styles: VersioningCss,
	template: VersioningTemplate,
})

/**
 * Fired when the user clicks on version navigation buttons.
 *
 * @public
 */
@event("version-change")

/**
 * Fired when the user clicks the previous version button.
 *
 * @public
 */
@event("previous-version-click")

/**
 * Fired when the user clicks the next version button.
 *
 * @public
 */
@event("next-version-click")

class Versioning extends UI5Element {
	eventDetails!: {
		"version-change": {
			backwards: boolean;
		},
		"previous-version-click": {
			currentIndex: number;
			totalVersions: number;
		},
		"next-version-click": {
			currentIndex: number;
			totalVersions: number;
		},
	}

	/**
	 * Indicates the index of the currently displayed result version.
	 *
	 * This property represents the current position in the version history.
	 * The value is 1-based for display purposes.
	 *
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	currentStep = 1;

	/**
	 * The total number of available result versions.
	 *
	 * Note: Versioning is hidden if the value is `0`.
	 *
	 * @default 1
	 * @public
	 * @since 1.0.0-rc.1
	 */
	@property({ type: Number })
	totalSteps = 1;

	_previousCurrentStep = 0;
	_previousTotalSteps = 0;
	_lastClickedButton: "previous" | "next" | "" = "";

	static i18nBundle: I18nBundle;

	static async onDefine() {
		Versioning.i18nBundle = await getI18nBundle("@ui5/webcomponents-ai");
	}

	onAfterRendering() {
		this._manageFocus();
		this._previousCurrentStep = this.currentStep;
		this._previousTotalSteps = this.totalSteps;
		this._lastClickedButton = "";
	}

	/**
	 * Manages focus when navigation buttons become disabled/enabled.
	 * Automatically moves focus to available button when user reaches boundaries.
	 * @private
	 */
	_manageFocus() {
		if (!this.shadowRoot) {
			return;
		}

		const previousButton = this.shadowRoot.querySelector("[data-ui5-versioning-button=\"previous\"]");
		const nextButton = this.shadowRoot.querySelector("[data-ui5-versioning-button=\"next\"]");

		if (!previousButton || !nextButton) {
			return;
		}

		const isPreviousDisabled = this.currentStep <= 1;
		const isNextDisabled = this.currentStep === this.totalSteps;
		const wasPreviousDisabled = this._previousCurrentStep <= 1;
		const wasNextDisabled = this._previousCurrentStep === this._previousTotalSteps;

		if (isPreviousDisabled && !wasPreviousDisabled && !isNextDisabled && this._lastClickedButton === "previous" && nextButton instanceof HTMLElement) {
			nextButton.focus();
			this._lastClickedButton = "";
		} else if (isNextDisabled && !wasNextDisabled && !isPreviousDisabled && this._lastClickedButton === "next" && previousButton instanceof HTMLElement) {
			previousButton.focus();
			this._lastClickedButton = "";
		}
	}

	handlePreviousVersionClick() {
		this._lastClickedButton = "previous";
		this.fireDecoratorEvent("version-change", { backwards: true });
		this.fireDecoratorEvent("previous-version-click", { 
			currentIndex: this.currentStep, 
			totalVersions: this.totalSteps 
		});
	}

	handleNextVersionClick() {
		this._lastClickedButton = "next";
		this.fireDecoratorEvent("version-change", { backwards: false });
		this.fireDecoratorEvent("next-version-click", { 
			currentIndex: this.currentStep, 
			totalVersions: this.totalSteps 
		});
	}

	get _previousButtonAccessibleName() {
		return Versioning.i18nBundle.getText(VERSIONING_PREVIOUS_BUTTON_TEXT);
	}

	get _nextButtonAccessibleName() {
		return Versioning.i18nBundle.getText(VERSIONING_NEXT_BUTTON_TEXT);
	}
}

Versioning.define();

export default Versioning;
