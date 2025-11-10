import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { i18n } from "@ui5/webcomponents-base/dist/decorators.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import type ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type ButtonState from "./ButtonState.js";
import { BUTTON_TOOLTIP_TEXT } from "./generated/i18n/i18n-defaults.js";
import "./ButtonState.js";
import ButtonTemplate from "./ButtonTemplate.js";
import {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	getAllAccessibleNameRefTexts,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";

// Styles
import ButtonCss from "./generated/themes/Button.css.js";

type AIButtonRootAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "roleDescription" | "title" | "ariaKeyShortcuts">;
type AIButtonArrowButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded" | "title">;
type AIButtonAccessibilityAttributes = { root?: AIButtonRootAccessibilityAttributes, arrowButton?: AIButtonArrowButtonAccessibilityAttributes}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component serves as a button for AI-related scenarios. Users can trigger actions by clicking or tapping the `ui5-ai-button`
 * or by pressing keyboard keys like [Enter] or [Space].
 *
 * ### Usage
 *
 * For the `ui5-ai-button` user interface, you can define one or more button states by placing `ui5-ai-button-state` components in their default slot.
 * Each state has a name for identification and can include text, an icon, and an end icon, as needed for its purpose.
 * You can define a split mode for the `ui5-ai-button`, which will results in displaying an arrow button for additional actions.
 *
 * You can choose from a set of predefined designs for `ui5-ai-button` (as in `ui5-button`) to match the desired styling.
 *
 * The `ui5-ai-button` can be activated by clicking or tapping it. You can change the button state in the click event handler. When the button is
 * in split mode, you can activate the default button action by clicking or tapping it, or by pressing keyboard keys like [Enter] or [Space].
 * You can activate the arrow button by clicking or tapping it, or by pressing keyboard keys like [Arrow Up], [Arrow Down], or [F4].
 * To display additional actions, you can attach a menu to the arrow button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @experimental The Button and ButtonState web components are availabe since 2.0 under an experimental flag and their API and behaviour are subject to change.
 */

@customElement({
	tag: "ui5-ai-button",
	languageAware: true,
	renderer: jsxRenderer,
	template: ButtonTemplate,
	styles: ButtonCss,
	shadowRootOptions: { delegatesFocus: true },
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 * @public
 */
@event("click", {
	bubbles: true,
})

/**
 * Fired when the component is in split mode and after the arrow button
 * is activated either by clicking or tapping it or by using the [Arrow Up] / [Arrow Down],
 * [Alt] + [Arrow Up]/ [Arrow Down], or [F4] keyboard keys.
 * @public
 */
@event("arrow-button-click", {
	bubbles: true,
})

class Button extends UI5Element {
	eventDetails!: {
		"click": void;
		"arrow-button-click": void;
	}
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property()
	design?: `${ButtonDesign}` = "Default"

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the current state of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	state?: string;

	/**
	 * Defines the active state of the arrow button in split mode.
	 * Set to true when the button is in split mode and a menu with additional options
	 * is opened by the arrow button. Set back to false when the menu is closed.
	 * @default false
	 * @public
	 * @since 2.6.0
	 */
	@property({ type: Boolean, noAttribute: true })
	arrowButtonPressed = false;

	/**
 	 * Defines the additional accessibility attributes that will be applied to the component.
	 *
	 * This property allows for fine-tuned control of ARIA attributes for screen reader support.
	 * It accepts an object with the following optional fields:
	 *
	 * - **root**: Accessibility attributes that will be applied to the root element.
	 *   - **hasPopup**: Indicates the availability and type of interactive popup element (such as a menu or dialog).
	 *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
	 *   - **roleDescription**: Defines a human-readable description for the button's role.
	 *     Accepts any string value.
	 *   - **title**: Specifies a tooltip or description for screen readers.
	 *     Accepts any string value.
	 *  - **ariaKeyShortcuts**: Defines keyboard shortcuts that activate or focus the button.
	 *
	 * - **arrowButton**: Accessibility attributes that will be applied to the arrow (split) button element.
	 *   - **hasPopup**: Indicates the type of popup triggered by the arrow button.
	 *     Accepts string values: `"dialog"`, `"grid"`, `"listbox"`, `"menu"`, or `"tree"`.
	 *   - **expanded**: Indicates whether the popup controlled by the arrow button is currently expanded.
	 *     Accepts boolean values: `true` or `false`.
	 *
	 * @public
	 * @since 2.6.0
	 * @default {}
 	*/
	@property({ type: Object })
	accessibilityAttributes: AIButtonAccessibilityAttributes = {};

	/**
	 * Keeps the current state object of the component.
	 * @private
	 */
	@property({ type: Object })
	_currentStateObject?: ButtonState;

	/**
	 * Determines if the button is in icon-only mode.
	 * This property is animation related only.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly? = false;

	/**
	 * Defines the available states of the component.
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that
	 * you only use `ui5-ai-button-state` components in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	states!: Array<ButtonState>;

	@query("[ui5-split-button]")
	_splitButton?: SplitButton;

	@query(".ui5-ai-button-hidden[ui5-split-button]")
	_hiddenSplitButton?: SplitButton;

	@i18n("@ui5/webcomponents-ai")
	static i18nBundleAi: I18nBundle;

	get _hideArrowButton() {
		return !this._effectiveStateObject?.showArrowButton;
	}

	get _effectiveState() {
		return this.state || (this.states.length && this.states[0].name) || "";
	}

	get _effectiveStateObject() {
		return this.states.find(state => state.name === this._effectiveState);
	}

	get _stateIconOnly() {
		return !this._stateText && !!this._stateIcon;
	}

	get _stateText() {
		return this._currentStateObject?.text;
	}

	get _stateIcon() {
		return this._currentStateObject?.icon;
	}

	get _stateEndIcon() {
		const endIcon = this._effectiveStateObject?.showArrowButton ? "" : this._effectiveStateObject?.endIcon;
		return endIcon;
	}

	get _hasText() {
		return !!this._stateText;
	}

	onBeforeRendering(): void {
		const splitButton = this._splitButton;

		if (splitButton) {
			splitButton.activeArrowButton = this.arrowButtonPressed;
		}

		if (!this._currentStateObject?.name) {
			this._currentStateObject = this._effectiveStateObject;
		}

		const currentStateName = this._currentStateObject?.name || "";

		this.iconOnly = this._stateIconOnly;
		if (currentStateName !== "" && currentStateName !== this._effectiveState) {
			this._fadeOut();
		}
	}

	/**
	 * Starts the fade-out animation.
	 * @private
	 */
	async _fadeOut(): Promise<void> {
		const fadeOutDuration = 180;
		const button = this._splitButton;
		const hiddenButton = this._hiddenSplitButton;
		const newStateObject = this._effectiveStateObject;

		if (!newStateObject) {
			// eslint-disable-next-line no-console
			console.warn(`State with name="${this.state}" doesn't exist!`);
			return;
		}

		if (!button || !hiddenButton) {
			return;
		}

		const buttonWidth = button.offsetWidth;
		const currentState: Partial<ButtonState> = this._currentStateObject || {};

		if ((!currentState.showArrowButton && newStateObject.showArrowButton) || (!currentState.endIcon && !!newStateObject.endIcon)) {
			this.classList.add("ui5-ai-button-button-to-menu");
		}
		if ((currentState.showArrowButton && !newStateObject.showArrowButton) || (!!currentState.endIcon && !newStateObject.endIcon)) {
			this.classList.add("ui5-ai-button-menu-to-button");
		}

		this.style.width = `${buttonWidth}px`;
		hiddenButton.icon = newStateObject.icon;
		hiddenButton._endIcon = newStateObject.endIcon;
		hiddenButton.textContent = newStateObject.text || null;
		hiddenButton._hideArrowButton = this._hideArrowButton;

		await renderFinished();
		const hiddenButtonWidth = hiddenButton.offsetWidth;
		this.style.width = `${hiddenButtonWidth}px`;
		this.classList.add("ui5-ai-button-fade-out");

		setTimeout(() => {
			this.classList.add("ui5-ai-button-fade-mid");
			button._hideArrowButton = this._hideArrowButton;
			this._fadeIn();
		}, fadeOutDuration);
	}

	/**
	 * Starts the fade-in animation.
	 * @private
	 */
	_fadeIn(): void {
		const fadeInDuration = 160;

		setTimeout(() => {
			const newStateObject = this._effectiveStateObject;
			this._currentStateObject = newStateObject;
			this.classList.add("ui5-ai-button-fade-in");
			this._resetFade();
		}, fadeInDuration);
	}

	/**
	 * Resets the fade phases when the animation is completed.
	 * @private
	 */
	_resetFade(): void {
		const fadeResetDuration = 160;

		setTimeout(() => {
			this.classList.remove("ui5-ai-button-fade-out");
			this.classList.remove("ui5-ai-button-fade-mid");
			this.classList.remove("ui5-ai-button-fade-in");
			this.classList.remove("ui5-ai-button-button-to-menu");
			this.classList.remove("ui5-ai-button-menu-to-button");
		}, fadeResetDuration);

		// reset the button's width after animations
		const button = this._splitButton;

		if (button) {
			button.style.width = "";
		}
	}

	/**
	 * Handles the click event.
	 * @private
	 */
	_onClick(e: CustomEvent): void {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("click");
	}

	/**
	 * Handles the arrow-button-click event when `ui5-ai-button` is in split mode.
	 * @private
	 */
	_onArrowClick(e: CustomEvent): void {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("arrow-button-click");
	}

	get _computedAccessibilityAttributes(): AIButtonAccessibilityAttributes {
		const labelRefTexts = getAllAccessibleNameRefTexts(this) || getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this) || "";

		const mainTitle = this._hasText ? Button.i18nBundleAi.getText(BUTTON_TOOLTIP_TEXT, this._stateText as string) : "";
		const title = `${mainTitle} ${labelRefTexts}`.trim();

		return {
			root: {
				hasPopup: this.accessibilityAttributes?.root?.hasPopup || "false",
				roleDescription: this.accessibilityAttributes?.root?.roleDescription,
				title: this.accessibilityAttributes?.root?.title || title,
				ariaKeyShortcuts: this.accessibilityAttributes?.root?.ariaKeyShortcuts,
			},
			arrowButton: {
				hasPopup: this.accessibilityAttributes?.arrowButton?.hasPopup,
				expanded: this.accessibilityAttributes?.arrowButton?.expanded,
				title: this.accessibilityAttributes?.arrowButton?.title,
			},
		};
	}
}

Button.define();
export default Button;
export type {
	AIButtonAccessibilityAttributes,
};
