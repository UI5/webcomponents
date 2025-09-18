import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import type AssistantState from "./types/AssistantState.js";

// Styles
import AITextAreaCss from "./generated/themes/AITextArea.css.js";
import textareaStyles from "@ui5/webcomponents/dist/generated/themes/TextArea.css.js";
import valueStateMessageStyles from "@ui5/webcomponents/dist/generated/themes/ValueStateMessage.css.js";

// Templates
import AITextAreaTemplate from "./AITextAreaTemplate.js";
import AITextAreaToolbar from "./AITextAreaToolbar.js";
import Versioning from "./Versioning.js";

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
 * The `ui5-ai-textarea` component extends the standard TextArea with AI Writing Assistant capabilities.
 * It provides AI-powered text generation, editing suggestions, and version management functionality.
 *
 * ### Structure
 * The `ui5-ai-textarea` consists of the following elements:
 * - TextArea: The main text input area with all standard textarea functionality
 * - AI Toolbar: Specialized toolbar with AI generation controls
 * - Version Navigation: Controls for navigating between AI-generated versions
 * - Menu Integration: Support for AI action menu
 *
 * ### States
 * The `ui5-ai-textarea` supports multiple states:
 * - Initial: Shows only the AI button
 * - Loading: Indicates AI generation in progress
 * 
 * Single vs multiple result display is determined internally based on totalVersions count.
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/AITextArea.js";`
 *
 * @constructor
 * @extends TextArea
 * @since 1.0.0-rc.1
 * @public
 * @slot {HTMLElement} menu Defines a slot for `ui5-menu` integration. This slot allows you to pass a `ui5-menu` instance that will be associated with the assistant.
 */
@customElement({
	tag: "ui5-ai-textarea",
	languageAware: true,
	renderer: jsxRenderer,
	template: AITextAreaTemplate,
	styles: [
		textareaStyles,
		valueStateMessageStyles,
		AITextAreaCss,
	],
	dependencies: [
		AITextAreaToolbar,
		Versioning,
		BusyIndicator,
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
 * Fired when the user requests to stop AI text generation.
 *
 * @public
 */
@event("stop-generation")

class AITextArea extends TextArea {
	eventDetails!: TextArea["eventDetails"] & {
		"previous-version-click": VersionClickEventDetail;
		"next-version-click": VersionClickEventDetail;
		"stop-generation": null;
	};

	/**
	 * Defines the current state of the AI Writing Assistant.
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

	@slot({ type: HTMLElement })
	menu!: Array<HTMLElement>;

	/**
	 * Handles the click event for the "Previous Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handlePreviousVersionClick() {
		this.fireDecoratorEvent("previous-version-click", {
			currentIndex: this.currentVersionIndex,
			totalVersions: this.totalVersions
		});
		this._syncContent();
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handleNextVersionClick() {
		this.fireDecoratorEvent("next-version-click", {
			currentIndex: this.currentVersionIndex,
			totalVersions: this.totalVersions
		});
		this._syncContent();
	}

	/**
	 * Forces the textarea content to sync with the current value.
	 * @private
	 */
	_syncContent() {
		setTimeout(() => {
			const textarea = this.shadowRoot?.querySelector("textarea");
			if (textarea && textarea.value !== this.value) {
				textarea.value = this.value;
			}
		}, 0);
	}

	/**
	 * Handles keydown events for keyboard shortcuts.
	 * @private
	 */
	_handleKeydown(keyboardEvent: KeyboardEvent) {
		const isCtrlOrCmd = keyboardEvent.ctrlKey || keyboardEvent.metaKey;
		const isShift = keyboardEvent.shiftKey;
		
		if (isShift && keyboardEvent.key.toLowerCase() === "f4") {
			const toolbar = this.shadowRoot?.querySelector("ui5-ai-textarea-toolbar") as HTMLElement;
			const aiButton = toolbar?.shadowRoot?.querySelector("#ai-menu-btn") as HTMLElement;

			if (aiButton) {
				aiButton.focus();
			}
			return;
		}

		if (this.assistantState !== "Loading" && this.totalVersions > 1) {
			if (isCtrlOrCmd && isShift && keyboardEvent.key.toLowerCase() === "z") {
				keyboardEvent.preventDefault();
				this._handlePreviousVersionClick();
				return;
			}

			if (isCtrlOrCmd && isShift && keyboardEvent.key.toLowerCase() === "y") {
				keyboardEvent.preventDefault();
				this._handleNextVersionClick();
			}
		}
	}

	/**
	 * Opens the AI menu.
	 * @private
	 */
	_openMenu() {
		const menuNodes = this.getSlottedNodes("menu");
		if (menuNodes.length > 0) {
			const menu = menuNodes[0] as HTMLElement & { opener?: HTMLElement; open?: boolean };
			const toolbar = this.shadowRoot?.querySelector("ui5-ai-textarea-toolbar") as HTMLElement;
			const aiButton = toolbar?.shadowRoot?.querySelector("#ai-menu-btn") as HTMLElement;

			if (aiButton) {
				menu.opener = aiButton;
				menu.open = true;
			}
		}
	}

	/**
	 * Overrides the parent's onAfterRendering to add keydown handler.
	 * @private
	 */
	onAfterRendering() {
		super.onAfterRendering();
		
		// Add keydown event listener to the textarea
		const textarea = this.shadowRoot?.querySelector("textarea");
		if (textarea) {
			textarea.addEventListener("keydown", this._handleKeydown.bind(this));
		}
	}

	/**
	 * Handles the generate click event from the AI toolbar.
	 * Opens the AI menu and sets the opener element.
	 *
	 * @private
	 */
	handleGenerateClick = (e: CustomEvent<{ clickTarget?: HTMLElement }>) => {
		try {
			const menuNodes = this.getSlottedNodes("menu");
			if (menuNodes.length > 0 && e.detail?.clickTarget) {
				const menu = menuNodes[0] as HTMLElement & { opener?: HTMLElement; open?: boolean };
				if (menu && typeof menu.open !== "undefined") {
					menu.opener = e.detail.clickTarget;
					menu.open = true;
				}
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error handling generate click:", error);
		}
	}

	/**
	 * Handles the stop generation event from the AI toolbar.
	 * Fires the stop-generation event to notify listeners.
	 *
	 * @private
	 */
	handleStopGeneration = () => {
		try {
			this.fireDecoratorEvent("stop-generation");
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error("Error handling stop generation:", error);
		}
	}
}

AITextArea.define();

export default AITextArea;
