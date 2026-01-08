import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isEscape,
	isF4Shift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import BaseInput from "@ui5/webcomponents/dist/Input.js";
import type Menu from "@ui5/webcomponents/dist/Menu.js";
import type { MenuItemClickEventDetail } from "@ui5/webcomponents/dist/Menu.js";
import type Button from "./Button.js";

// styles
import AIInputCss from "./generated/themes/Input.css.js";
import InputCss from "@ui5/webcomponents/dist/generated/themes/Input.css.js";
import ResponsivePopoverCommonCss from "@ui5/webcomponents/dist/generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "@ui5/webcomponents/dist/generated/themes/ValueStateMessage.css.js";

// templates
import InputTemplate from "./InputTemplate.js";
import {
	INPUT_VERSIONING_NEXT_BUTTON_TOOLTIP,
	INPUT_VERSIONING_PREVIOUS_BUTTON_TOOLTIP,
	INPUT_WRITING_ASSISTANT_BUTTON_TOOLTIP,
	WRITING_ASSISTANT_GENERATING_ANNOUNCEMENT,
} from "./generated/i18n/i18n-defaults.js";

type InputVersionChangeEventDetail = {
	backwards: boolean,
};

type InputItemClickEventDetail = MenuItemClickEventDetail;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-input` component extends the standard `ui5-input` with **AI Writing Assistant** capabilities.
 *
 * ### Structure
 *
 * The `ui5-ai-input` consists of the following main parts:
 *
 * - **Input Field** – Inherits all standard Input behaviors.
 * - **AI Action Button** – Appears when focused or loading, providing access to AI-related actions or stopping generation.
 *
 * The component automatically determines which elements to render based on its internal state:
 * - The AI Button is only shown when there are available `actions`.
 * - The version navigation appears only when `totalVersions > 1`.
 *
 * ### Keyboard Support
 *
 * - **Shift + F4** — Opens the AI menu.
 * - **Ctrl + Shift + Z / Y** — Navigates backward/forward between AI-generated versions.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Input.js";`
 *
 * @constructor
 * @extends BaseInput
 * @since 2.16.0
 * @experimental The **@ui5/webcomponents-ai** package is under active development and considered experimental. Component APIs are subject to change.
 * Furthermore, the package supports **Horizon** themes only.
 * @public
 */
@customElement({
	tag: "ui5-ai-input",
	languageAware: true,
	renderer: jsxRenderer,
	template: InputTemplate,
	styles: [
		AIInputCss,
		InputCss,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
	],
})

/**
 * Fired when the user selects the AI button.
 * @public
 */
@event("button-click", {
	cancelable: true,
})

/** Fired when an item from the AI actions menu is clicked.
 * @param { HTMLElement } item The currently clicked menu item.
 * @param { string } text The text of the currently clicked menu item.
 * @public
 */
@event("item-click")

/**
 * Fired when the user selects the "Stop" button to stop ongoing AI text generation.
 * @public
 */
@event("stop-generation")

/**
 * Fired when the user selects the version navigation buttons.
 *
 * @param {boolean} backwards - Indicates if navigation is backwards (true) or forwards (false, default)
 * @public
 */
@event("version-change")

class Input extends BaseInput {
	eventDetails!: BaseInput["eventDetails"] & {
		"version-change": InputVersionChangeEventDetail;
		"stop-generation": void;
		"button-click": void;
		"item-click": InputItemClickEventDetail;
	};

	/**
	 * Indicates the index of the currently displayed version.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	currentVersion = 0;

	/**
	 * Indicates the total number of result versions available.
	 *
	 * When not set or set to 0, the versioning will be hidden.
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
	 * @public
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

	/**
	 * Defines the items of the menu for the component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	actions!: Array<HTMLElement>;

	_previousCurrentStep = 0;
	_previousTotalSteps = 0;
	isFocused: boolean = false;

	_onfocusin(e: FocusEvent): void {
		super._onfocusin(e);
		this.isFocused = true;
	}

	_onfocusout(e: FocusEvent): void {
		super._onfocusout(e);
		this.isFocused = false;
	}

	/**
	 * Manages the focus when the navigation buttons become disabled/enabled.
	 * Automatically moves the focus to the available button when the user reaches the boundaries.
	 * @private
	 */
	_manageVersionButtonsFocus() {
		const previousButton = this.shadowRoot?.getElementById("arrow-left") as Button;
		const nextButton = this.shadowRoot?.getElementById("arrow-right") as Button;
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
	 * Handles the click event for the AI generate Button.
	 * Fires the appropriate event based on the AI Button state.
	 * @private
	 */
	_handleAIButtonClick(e: Event) {
		const target = e.target as HTMLElement & { icon?: string };
		if (target?.icon === "stop") {
			this.fireDecoratorEvent("stop-generation");
		} else {
			const opener = this.shadowRoot?.querySelector(".ui5-input-ai-button") as HTMLElement;
			this.fireDecoratorEvent("button-click");
			this.menu.opener = opener;
			this.menu.open = true;
			this.menu.horizontalAlign = "End";
		}
	}

	/**
	 * Handles the escape event for the AI generate Button.
	 * @private
	 */
	_handleAIButtonKeydown = (e: KeyboardEvent) => {
		if (isEscape(e) && this.loading) {
			this.fireDecoratorEvent("stop-generation");
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
		this._manageVersionButtonsFocus();
	}

	/**
	 * Handles the click event for the "Previous Version" button.
	 * Updates the current version index and syncs content.
	 * @private
	 */
	_handlePreviousButtonClick(): void {
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: true } }));
	}

	/**
	 * Handles the click event for the "Next Version" button.
	 * Updates the current version index and syncs content.
	 * @private
	 */
	_handleNextButtonClick(): void {
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: false } }));
	}

	_onMenuIconClick(e: CustomEvent<InputItemClickEventDetail>): void {
		this.fireDecoratorEvent("item-click", e.detail);
	}

	/**
	 * Handles keydown events for keyboard shortcuts.
	 * @private
	 */
	_onkeydown(e: KeyboardEvent): void {
		super._onkeydown(e);
		const menuButton = this.shadowRoot?.getElementById("ai-menu-btn") as HTMLElement;

		if (isF4Shift(e)) {
			menuButton?.focus();

			this.menu.opener = menuButton;
			this.menu.open = true;
			this.menu.horizontalAlign = "End";
		}
		const goPreviousStep = e.key === "Z" && e.shiftKey && e.ctrlKey;
		const goNextStep = e.key === "Y" && e.shiftKey && e.ctrlKey;

		if (goPreviousStep) {
			e.preventDefault();
			this._handlePreviousButtonClick();
		} else if (goNextStep) {
			e.preventDefault();
			this._handleNextButtonClick();
		}
	}

	/**
	 * Handles visibility of the Writing Assistant Button.
	 * If there are no items, the Writing Assistant Button would not be rendered.
	 */
	get hasActions() {
		return !!this?.menu?.getSlottedNodes("items").length;
	}

	get ariaLabel() {
		return this.accessibleName || !this.loading ? Input.i18nBundle.getText(INPUT_WRITING_ASSISTANT_BUTTON_TOOLTIP) : Input.i18nBundle.getText(WRITING_ASSISTANT_GENERATING_ANNOUNCEMENT);
	}

	get stopGeneratingTooltip() {
		return Input.i18nBundle.getText(WRITING_ASSISTANT_GENERATING_ANNOUNCEMENT);
	}

	get nextButtonAccessibleName() {
		return Input.i18nBundle.getText(INPUT_VERSIONING_NEXT_BUTTON_TOOLTIP);
	}

	get previousButtonAccessibleName() {
		return Input.i18nBundle.getText(INPUT_VERSIONING_PREVIOUS_BUTTON_TOOLTIP);
	}

	get menu() {
		return this.shadowRoot?.querySelector("[ui5-menu]") as Menu;
	}
}

Input.define();

export type {
	InputVersionChangeEventDetail,
	InputItemClickEventDetail,
};
export default Input;
