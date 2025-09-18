import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";

// Styles
import AITextAreaCss from "./generated/themes/AITextArea.css.js";

// Templates
import AITextAreaToolbarTemplate from "./AITextAreaToolbarTemplate.js";
import Versioning from "./Versioning.js";
import type AssistantState from "./types/AssistantState.js";

// Icons
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-textarea-toolbar` component provides a specialized toolbar for AI TextArea functionality.
 * It manages different states of the AI assistant and provides version navigation capabilities.
 *
 * ### Structure
 * The `ui5-ai-textarea-toolbar` consists of the following elements:
 * - AI Generate Button: Triggers AI text generation or stops ongoing generation
 * - Version Navigation: Allows navigation between multiple AI-generated results
 * - Action Label: Displays the current AI action being performed
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/AITextAreaToolbar.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.1
 * @private
 */
@customElement({
	tag: "ui5-ai-textarea-toolbar",
	languageAware: true,
	renderer: jsxRenderer,
	template: AITextAreaToolbarTemplate,
	styles: [AITextAreaCss],
	dependencies: [
		Versioning,
	],
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

/**
 * Fired when the user clicks on the "Generate" button to start AI text generation.
 *
 * @public
 */
@event("generate-click")

/**
 * Fired when the user clicks on the "Stop" button to stop ongoing AI text generation.
 *
 * @public
 */
@event("stop-generation")

class AITextAreaToolbar extends UI5Element {
	eventDetails!: {
		"previous-version-click": object;
		"next-version-click": object;
		"generate-click": { clickTarget?: HTMLElement };
		"stop-generation": object;
	};

	/**
	 * Defines the current state of the AI TextArea.
	 *
	 * Available values are:
	 * - `"Initial"`: Shows only the main toolbar button.
	 * - `"Loading"`: Indicates that an action is in progress.
	 *
	 * Single vs multiple results are determined internally based on totalVersions.
	 *
	 * @default "Initial"
	 * @public
	 */
	@property()
	assistantState: `${AssistantState}` = "Initial";
	/**
	 * Defines the action text of the `ui5-ai-textarea`.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	actionText = "";

	/**
	 * Indicates the index of the currently displayed result version.
	 *
	 * The index is **1-based** (i.e. `1` represents the first result).
	 *
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	currentVersionIndex = 1;

	/**
	 * Indicates the total number of result versions available.
	 *
	 * When not set or `0`, versioning UI will be hidden.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	totalVersions = 0;

	/**
	 * Handles the click event for the "Previous Version" button.
	 *
	 * @public
	 */
	handlePreviousVersionClick(): void {
		this.fireDecoratorEvent("previous-version-click");
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 *
	 * @public
	 */
	handleNextVersionClick(): void {
		this.fireDecoratorEvent("next-version-click");
	}

	/**
	 * Handles the click event for the AI generate button.
	 * Toggles between generate and stop states based on current button state.
	 *
	 * @private
	 */
	_handleGenerateClick(e: Event) {
		const target = e.target as HTMLElement & { state?: string };
		if (target?.state === "generating") {
			// If the button is in generating state, stop the generation
			this.fireDecoratorEvent("stop-generation");
		} else {
			this.fireDecoratorEvent("generate-click", { clickTarget: target });
			announce("AI writing assistant generating. Stop generating (ESC)", "Polite");
		}
	}
}

AITextAreaToolbar.define();

export default AITextAreaToolbar;
