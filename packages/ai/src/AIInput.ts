import { customElement, property, slot } from "@ui5/webcomponents-base";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type Menu from "@ui5/webcomponents/dist/Menu.js";
import type Button from "./Button.js";

// styles
import AIInputCss from "./generated/themes/AIInput.css.js";
import InputCss from "@ui5/webcomponents/dist/generated/themes/Input.css.js";
import ResponsivePopoverCommonCss from "@ui5/webcomponents/dist/generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "@ui5/webcomponents/dist/generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "@ui5/webcomponents/dist/generated/themes/Suggestions.css.js";

// templates
import AIInputTemplate from "./AIInputTemplate.js";
import { VERSIONING_NEXT_BUTTON_TEXT, VERSIONING_PREVIOUS_BUTTON_TEXT, WRITING_ASSISTANT_LABEL } from "./generated/i18n/i18n-defaults.js";

@customElement({
	tag: "ui5-ai-input",
	languageAware: true,
	renderer: jsxRenderer,
	template: AIInputTemplate,
	styles: [
		AIInputCss,
		InputCss,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
		SuggestionsCss,
	],
})

/**
 * Fired when the user clicks on the "Stop" button to stop ongoing AI text generation.
 * @public
 */
@event("stop-generation")

/**
 * Fired when the user clicks on version navigation buttons.
 *
 * @param {boolean} backwards - Indicates if navigation is backwards (true) or forwards (false, default)
 * @public
 */
@event("version-change")

class AIInput extends Input {
	eventDetails!: Input["eventDetails"] & {
		"version-change": {
			backwards: boolean;
		};
		"stop-generation": object;
	};

	/**
	 * Indicates the index of the currently displayed version.
	 *
	 * @default 0
	 */
	@property({ type: Number })
	currentVersion = 0;

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
	 * Defines whether the AI Writing Assistant is currently loading.
	 *
	 * When `true`, indicates that an AI action is in progress.
	 *
	 * @default false
	 */
	@property({ type: Boolean })
	loading: boolean = false;

	/**
	 * Indicates if the menu is open.
	 * @default 0
	 * @private
	 */
	@property({ type: Boolean })
	_isMenuOpen: boolean = false;

	@slot({
		type: HTMLElement,
		// "default": true,
		invalidateOnChildChange: true,
	})
	default!: Array<HTMLElement>;

	_previousCurrentStep = 0;
	_previousTotalSteps = 0;
	isFocused: boolean = false;

	onBeforeRendering(): void {
		super.onBeforeRendering();
		const menu = this.menu;

		menu?.addEventListener("item-click", (e: Event) => {
			const customEvent = e as CustomEvent;
			this.dispatchEvent(new CustomEvent("item-click", {
				detail: customEvent.detail,
				bubbles: true,
				composed: true,
			}));
		});
	}

	_onfocusin(e: FocusEvent): void {
		super._onfocusin(e);
		this.isFocused = true;
	}

	_onfocusout(e: FocusEvent): void {
		super._onfocusout(e);
		this.isFocused = false;
	}

	/**
	 * Manages focus when navigation buttons become disabled/enabled.
	 * Automatically moves focus to available button when user reaches boundaries.
	 * @private
	 */
	_manageFocus() {
		const previousButton = this.shadowRoot?.querySelectorAll("ui5-button")[0] as Button;
		const nextButton = this.shadowRoot?.querySelectorAll("ui5-button")[1] as Button;
		const isPreviousDisabled = this.currentVersion <= 1;
		const isNextDisabled = this.currentVersion >= this.totalVersions;

		if (isPreviousDisabled && previousButton) {
			setTimeout(() => {
				nextButton.focus();
			}, 0);
		} else if (isNextDisabled && nextButton) {
			setTimeout(() => {
				previousButton.focus();
			}, 0);
		}
	}

	/**
	 * Handles the click event for the AI generate icon.
	 * Toggles between generate and stop states based on current icon name.
	 *
	 */
	_handleAIIconClick(e: Event) {
		const target = e.target as HTMLElement & { name?: string };
		if (target?.name === "stop") {
			this.fireDecoratorEvent("stop-generation");
		} else {
			const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
			const opener = this.shadowRoot?.querySelector(".ui5-input-ai-icon") as HTMLElement;
			// this.fireDecoratorEvent("generate-icon-click", { clickTarget: target });
			menu.opener = opener;
			menu.open = true;
		}
	}

	/**
	 * Handles the version change event from the versioning component.
	 *
	 * @param {CustomEvent} e - The version change event
	 */
	_handleVersionChange(e: CustomEvent<{ backwards: boolean }>) {
		this.fireDecoratorEvent("version-change", {
			backwards: e.detail.backwards,
		});
		this._manageFocus();
	}

	/**
	 * Handles the click event for the "Previous Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handlePreviousButtonClick(): void {
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: true } }));
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 * Updates the current version index and syncs content.
	 */
	_handleNextButtonClick(): void {
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: false } }));
	}

	/**
	 * Handles keydown events for keyboard shortcuts.
	 * @private
	 */
	_onkeydown(e: KeyboardEvent): void {
		super._onkeydown(e);
		const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
		menu.opener = this.shadowRoot?.querySelector(".ui5-input-ai-icon") as HTMLElement;

		if (e.key === "F4" && e.shiftKey) {
			e.preventDefault();
			menu.open = true;
		}
		const goPreviousStep = e.key === "Z" && e.shiftKey && e.ctrlKey;
		const goNextStep = e.key === "Y" && e.shiftKey && e.ctrlKey;

		if (goPreviousStep) {
			e.preventDefault();
			menu.open = true;
			this._handlePreviousButtonClick();
		} else if (goNextStep) {
			e.preventDefault();
			menu.open = true;
			this._handleNextButtonClick();
		}
	}

	get ariaLabel() {
		return AIInput.i18nBundle.getText(WRITING_ASSISTANT_LABEL);
	}

	get nextButtonAccessibleName() {
		return AIInput.i18nBundle.getText(VERSIONING_NEXT_BUTTON_TEXT);
	}

	get previousButtonAccessibleName() {
		return AIInput.i18nBundle.getText(VERSIONING_PREVIOUS_BUTTON_TEXT);
	}

	get menu() {
		return this.shadowRoot?.querySelector("ui5-menu") as Menu;
	}
}

AIInput.define();

export default AIInput;
