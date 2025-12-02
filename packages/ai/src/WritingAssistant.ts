import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	WRITING_ASSISTANT_LABEL,
	VERSIONING_PREVIOUS_BUTTON_TEXT,
	VERSIONING_NEXT_BUTTON_TEXT,
	WRITING_ASSISTANT_GENERATING_ANNOUNCEMENT,
	WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME,
	WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME,
	WRITING_ASSISTANT_BUTTON_TOOLTIP,
	WRITING_ASSISTANT_STOP_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import WritingAssistantCss from "./generated/themes/WritingAssistant.css.js";

// Templates
import WritingAssistantTemplate from "./WritingAssistantTemplate.js";
import Versioning from "./Versioning.js";
import ToolbarLabel from "./ToolbarLabel.js";

// UI5 Components
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarSpacer from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";

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
 * `import "@sap-webcomponents/ai/dist/WritingAssistant.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.16.0
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
		ToolbarLabel,
		Toolbar,
		ToolbarSpacer,
		ToolbarButton,
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
	 * Defines whether the Writing Assistant is currently loading.
	 *
	 * When `true`, indicates that an AI action is in progress.
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the prompt description of the Writing Assistant.
	 *
	 * This text is displayed in the toolbar to indicate the current or last
	 * performed AI action (e.g., "Generated text", "Simplified text").
	 *
	 * @default ""
	 * @public
	 */
	@property()
	promptDescription = "";

	/**
	 * Indicates the index of the currently displayed result version.
	 *
	 * The index is **0-based** (i.e. `0` represents the first result).
	 * This property is synchronized with the parent AI TextArea component.
	 *
	 * @default 0
	 * @public
	 * @since 2.16.0
	 */
	@property({ type: Number })
	currentVersion = 0;

	/**
	 * Indicates the total number of result versions available.
	 *
	 * This property determines whether version navigation controls are displayed.
	 * When totalVersions > 0, previous/next buttons become available.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	totalVersions = 0;

	@i18n("@ui5/webcomponents-ai")
	static i18nBundleAi: I18nBundle;

	static async onDefine() {
		WritingAssistant.i18nBundleAi = await getI18nBundle("@ui5/webcomponents-ai");
	}

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
		const target = e.target as HTMLElement & { dataset?: { state?: string } };
		if (target?.dataset?.state === "generating") {
			this.fireDecoratorEvent("stop-generation");
		} else {
			this.fireDecoratorEvent("button-click", { clickTarget: target });
			announce(WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_GENERATING_ANNOUNCEMENT), "Polite");
		}
	}
	get _ariaLabel() {
		return WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_LABEL);
	}

	get _previousButtonAccessibleName() {
		return WritingAssistant.i18nBundleAi.getText(VERSIONING_PREVIOUS_BUTTON_TEXT);
	}

	get _nextButtonAccessibleName() {
		return WritingAssistant.i18nBundleAi.getText(VERSIONING_NEXT_BUTTON_TEXT);
	}

	get _toolbarAccessibleName() {
		return WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_TOOLBAR_ACCESSIBLE_NAME);
	}

	get _buttonAccessibleName() {
		return WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_ACCESSIBLE_NAME);
	}

	get _buttonTooltip() {
		return WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_BUTTON_TOOLTIP);
	}

	get _stopTooltip() {
		return WritingAssistant.i18nBundleAi.getText(WRITING_ASSISTANT_STOP_TOOLTIP);
	}
}

WritingAssistant.define();

export default WritingAssistant;
