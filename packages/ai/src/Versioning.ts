import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Types
import VersioningTemplate from "./VersioningTemplate.js";

// Styles
import VersioningCss from "./generated/themes/Versioning.css.js";

type VersionClickEventDetail = {
	/**
	 * The current version index (1-based).
	 */
	currentIndex: number;
	
	/**
	 * The total number of versions available.
	 */
	totalVersions: number;
}

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
 * Fired when the user clicks on the "Previous Version" button.
 *
 * @public
 */
@event("previous-version-click")

/**
 * Fired when the user clicks on the "Next Version" button.
 *
 * @public
 */
@event("next-version-click")

class Versioning extends UI5Element {
	eventDetails!: {
		"previous-version-click": VersionClickEventDetail;
		"next-version-click": VersionClickEventDetail;
	}

	/**
	 * Indicates the index of the currently displayed result version.
	 *
	 * The index is **1-based** (i.e. `1` represents the first result).
	 *
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	currentStep = 1;

	/**
	 * Indicates the total number of result versions available.
	 *
	 * When not set or `0`, versioning UI will be hidden.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	totalSteps = 0;

	private _previousCurrentStep: number = 1;
	private _previousTotalSteps: number = 0;
	private _lastClickedButton: "previous" | "next" | "" = "";

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

		const previousButton = this.shadowRoot.querySelector("[data-ui5-versioning-button=\"previous\"]") as HTMLElement;
		const nextButton = this.shadowRoot.querySelector("[data-ui5-versioning-button=\"next\"]") as HTMLElement;
		
		if (!previousButton || !nextButton) {
			return;
		}

		const isPreviousDisabled = this.currentStep <= 1;
		const isNextDisabled = this.currentStep === this.totalSteps || this.totalSteps === 0;
		const wasPreviousDisabled = this._previousCurrentStep <= 1;
		const wasNextDisabled = this._previousCurrentStep === this._previousTotalSteps || this._previousTotalSteps === 0;

		// Move focus to next button if previous becomes disabled and next is available
		if (isPreviousDisabled && !wasPreviousDisabled && !isNextDisabled && this._lastClickedButton === "previous") {
			nextButton.focus();
			this._lastClickedButton = "";
		} 
		// Move focus to previous button if next becomes disabled and previous is available
		else if (isNextDisabled && !wasNextDisabled && !isPreviousDisabled && this._lastClickedButton === "next") {
			previousButton.focus();
			this._lastClickedButton = "";
		}
	}

	/**
	 * Handles the click event for the "Previous Version" button.
	 * Updates internal state and fires the previous-version-click event with proper details.
	 * 
	 * @public
	 */
	handlePreviousVersionClick(): void {
		this._lastClickedButton = "previous";
		this.fireDecoratorEvent("previous-version-click", {
			currentIndex: this.currentStep,
			totalVersions: this.totalSteps
		});
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 * Updates internal state and fires the next-version-click event with proper details.
	 * 
	 * @public
	 */
	handleNextVersionClick(): void {
		this._lastClickedButton = "next";
		this.fireDecoratorEvent("next-version-click", {
			currentIndex: this.currentStep,
			totalVersions: this.totalSteps
		});
	}
}

Versioning.define();

export default Versioning;
