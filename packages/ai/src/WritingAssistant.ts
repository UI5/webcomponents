import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";

// Styles
import WritingAssistantCss from "./generated/themes/WritingAssistant.css.js";

// Templates
import WritingAssistantTemplate from "./WritingAssistantTemplate.js";
import Versioning from "./Versioning.js";
import type AssistantState from "./types/AssistantState.js";

// UI5 Components
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";

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
	tag: "ui5-ai-writing-assistant",
	languageAware: true,
	renderer: jsxRenderer,
	template: WritingAssistantTemplate,
	styles: [WritingAssistantCss],
	dependencies: [
		Versioning,
		Toolbar,
		ToolbarSpacer,
		Label,
		Button,
	],
})

/**
 * Fired when the user clicks on version navigation buttons.
 *
 * @public
 */
@event("version-change")

/**
 * Fired when the user clicks on the AI button.
 *
 * @public
 */
@event("button-click")

/**
 * Fired when the user clicks on the "Stop" button to stop ongoing AI text generation.
 *
 * @public
 */
@event("stop-generation")

class WritingAssistant extends UI5Element {
	eventDetails!: {
		"version-change": {
			backwards: boolean;
		};
		"button-click": {
			clickTarget: HTMLElement;
		};
		"stop-generation": object;
	};

	/**
	 * Defines the current state of the AI Writing Assistant.
	 *
	 * Available values are:
	 * - `"Initial"`: Shows only the main toolbar button.
	 * - `"Loading"`: Indicates that an action is in progress.
	 *
	 * @default "Initial"
	 * @public
	 */
	@property()
	assistantState: `${AssistantState}` = "Initial";

	/**
	 * Defines the action text of the AI Writing Assistant.
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
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	totalVersions = 1;

	/**
	 * Handles the version change event from the versioning component.
	 */
	handleVersionChange(e: CustomEvent<{ backwards: boolean }>) {
		this.fireDecoratorEvent("version-change", { backwards: e.detail.backwards });
	}

	/**
	 * Handles the click event for the AI generate button.
	 * Toggles between generate and stop states based on current button state.
	 *
	 * @public
	 */
	handleButtonClick(e: Event): void {
		const target = e.target as HTMLElement & { state?: string };
		if (target?.state === "generating") {
			this.fireDecoratorEvent("stop-generation");
		} else {
			this.fireDecoratorEvent("button-click", { clickTarget: target });
			announce("AI writing assistant generating. Stop generating (ESC)", "Polite");
		}
	}
	get _ariaLabel() {
		return WritingAssistant.i18nBundle.getText(WRITING_ASSISTANT_LABEL);
	}
}

WritingAssistant.define();

export default WritingAssistant;
