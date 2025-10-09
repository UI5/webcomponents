import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	WRITING_ASSISTANT_LABEL,
} from "./generated/i18n/i18n-defaults.js";
// Styles
import AITextAreaCss from "./generated/themes/AITextArea.css.js";
import textareaStyles from "@ui5/webcomponents/dist/generated/themes/TextArea.css.js";
import valueStateMessageStyles from "@ui5/webcomponents/dist/generated/themes/ValueStateMessage.css.js";

// Templates
import TextAreaTemplate from "./TextAreaTemplate.js";
import WritingAssistant from "./WritingAssistant.js";

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
 * Single vs multiple result display is determined internally based on totalVersions count.
 *
 * ### ES6 Module Import
 *
 * `import "@sap-webcomponents/ai/dist/TextArea.js";`
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
	template: TextAreaTemplate,
	styles: [
		textareaStyles,
		valueStateMessageStyles,
		AITextAreaCss,
	],
	dependencies: [
		WritingAssistant,
		BusyIndicator,
	],
})

/**
 * Fired when the user clicks on version navigation buttons.
 *
 * @public
 */
@event("version-change")

/**
 * Fired when the user requests to stop AI text generation.
 *
 * @public
 */
@event("stop-generation")

class AITextArea extends TextArea {
	eventDetails!: TextArea["eventDetails"] & {
		"version-change": {
			backwards: boolean;
		};
		"stop-generation": object;
	};

	// Store bound handler for proper cleanup
	private _keydownHandler?: (event: KeyboardEvent) => void;

	/**
	 * Defines whether the `ui5-ai-textarea` is currently in a loading(processing) state.
	 *
	 * @default false
	 * @since 1.0.0-rc.14
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

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

	static i18nBundle: I18nBundle;

	static async onDefine() {
		AITextArea.i18nBundle = await getI18nBundle("@ui5/webcomponents-ai");
	}

	/**
	 * Handles the click event for the "Previous Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handlePreviousVersionClick(): void {
		this.fireDecoratorEvent("version-change", { backwards: true });
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handleNextVersionClick(): void {
		this.fireDecoratorEvent("version-change", { backwards: false });
	}

	/**
	 * Handles the version change event from the writing assistant.
	 */
	_handleVersionChange(e: CustomEvent<{ backwards: boolean }>): void {
		if (e.detail.backwards) {
			this._handlePreviousVersionClick();
		} else {
			this._handleNextVersionClick();
		}
	}

	/**
	 * Handles keydown events for keyboard shortcuts.
	 * @private
	 */
	_handleKeydown(keyboardEvent: KeyboardEvent) {
		const isCtrlOrCmd = keyboardEvent.ctrlKey || keyboardEvent.metaKey;
		const isShift = keyboardEvent.shiftKey;

		if (isShift && keyboardEvent.key.toLowerCase() === "f4") {
			const toolbar = this.shadowRoot?.querySelector("[ui5-ai-writing-assistant]") as HTMLElement;
			const aiButton = toolbar?.shadowRoot?.querySelector("#ai-menu-btn") as HTMLElement;

			if (aiButton) {
				aiButton.focus();
			}
			return;
		}

		if (this.totalVersions > 1) {
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
	 * Overrides the parent's onAfterRendering to add keydown handler.
	 * @private
	 */
	onAfterRendering() {
		super.onAfterRendering();

		// Add keydown event listener to the textarea
		const textarea = this.shadowRoot?.querySelector("textarea");
		if (textarea && !this._keydownHandler) {
			this._keydownHandler = this._handleKeydown.bind(this);
			textarea.addEventListener("keydown", this._keydownHandler);
		}
	}

	/**
	 * Handles the generate click event from the AI toolbar.
	 * Opens the AI menu and sets the opener element.
	 *
	 * @private
	 */
	_handleAIButtonClick = (e: CustomEvent<{ clickTarget?: HTMLElement }>) => {
		const menuNodes = this.getSlottedNodes("menu");
		if (menuNodes.length === 0) {
			return;
		}
		if (!e.detail?.clickTarget) {
			return;
		}

		const menu = menuNodes[0] as HTMLElement & { opener?: HTMLElement; open?: boolean };
		if (menu && typeof menu.open !== "undefined") {
			menu.opener = e.detail.clickTarget;
			menu.open = true;
		}
	}
	get _ariaLabel() {
		return this.accessibleName || AITextArea.i18nBundle.getText(WRITING_ASSISTANT_LABEL);
	}

	/**
	 * Handles the stop generation event from the AI toolbar.
	 * Fires the stop-generation event to notify listeners.
	 *
	 * @private
	 */
	handleStopGeneration = () => {
		this.fireDecoratorEvent("stop-generation");
	}
}

AITextArea.define();

export default AITextArea;
