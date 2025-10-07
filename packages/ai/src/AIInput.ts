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

enum LastClickedButton {
	None = "",
	Previous = "previous",
	Next = "next"
}

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
 * Fired when the user presses generating button while loading.
 * @public
 */
@event("stop-generation")

/**
 * Fired when the user navigates via the version change buttons.
 *
 * @param {boolean} backwards - Indicates if navigation is backwards (true) or forwards (false, default)
 * @public
 */
@event("version-change")

// @event("generate-icon-click")

class AIInput extends Input {
	eventDetails!: Input["eventDetails"] & {
		"version-change": {
			backwards: boolean;
		};
		"stop-generation": null;
		// "generate-icon-click": { clickTarget: HTMLElement };
	};

	@property({ type: Number })
	currentVersion = 0;

	// @property()
	// menuItems: Array<{ text: string}> = [];

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
	_lastClickedButton: LastClickedButton = LastClickedButton.None;
	isFocused: boolean = false;

	onBeforeRendering(): void {
		super.onBeforeRendering();
		const menu = this.menu;

		menu?.addEventListener("item-click", (e: Event) => {
			const customEvent = e as CustomEvent;
			this.dispatchEvent(new CustomEvent("item-click", {
				detail: customEvent.detail, // { item: <ui5-menu-item> }
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

	_manageFocus() {
		const previousButton = this.shadowRoot?.querySelectorAll("ui5-button")[0] as Button;
		const nextButton = this.shadowRoot?.querySelectorAll("ui5-button")[1] as Button;
		// // const previousButton = this.shadowRoot?.querySelector("ui5-ai-input-versioning")?.shadowRoot?.querySelectorAll("ui5-button")[0] as Button;
		// // const nextButton = this.shadowRoot?.querySelector("ui5-ai-input-versioning")?.shadowRoot?.querySelectorAll("ui5-button")[1] as Button;
		const isPreviousDisabled = this.currentVersion <= 1;
		const isNextDisabled = this.currentVersion >= this.totalVersions;

		if (isPreviousDisabled && previousButton) {
			// queueMicrotask(() => nextButton.focus());
			// if (nextButton && nextButton.getDomRef()) {
			setTimeout(() => {
				nextButton.focus();
				//     previousButton.disabled = true;
			}, 0);
			// }
		} else if (isNextDisabled && nextButton) {
			// if (previousButton && previousButton.getDomRef()) {
			// if(previousButton.disabled) {
			// previousButton.disabled = false;
			// }
			setTimeout(() => {
				previousButton.focus();
				//     nextButton.disabled = true;
			}, 0);
			// }
		}

		// const previousButton = this.shadowRoot?.querySelector("[data-ui5-versioning-button=\"previous\"]") as HTMLElement;
		// const nextButton = this.shadowRoot?.querySelector("[data-ui5-versioning-button=\"next\"]") as HTMLElement;
		// const isPreviousDisabled = this.currentVersion <= 1;
		// const isNextDisabled = this.currentVersion === this.totalVersions;
		// const wasPreviousDisabled = this._previousCurrentStep <= 1;
		// const wasNextDisabled = this._previousCurrentStep === this._previousTotalSteps;

		// if (isPreviousDisabled && !wasPreviousDisabled && !isNextDisabled && this._lastClickedButton === LastClickedButton.Previous) {
		// 	// nextButton.focus();
		// setTimeout( () => {
		// nextButton.focus();
		// console.log("next focus");

		//         //     previousButton.disabled = true;
		// }, 0)
		// 	this._lastClickedButton = LastClickedButton.None;
		// } else if (isNextDisabled && !wasNextDisabled && !isPreviousDisabled && this._lastClickedButton === LastClickedButton.Next) {
		// 	// previousButton.focus();
		// setTimeout( () => {
		// previousButton.focus();
		// console.log("previous focus");

		// //         //     nextButton.disabled = true;
		// }, 0);
		// 	this._lastClickedButton = LastClickedButton.None;
		// }
	}

	_handleAIIconClick(e: CustomEvent) {
		const target = e.target as HTMLElement & { name?: string };
		if (target?.name === "stop") {
			this.fireDecoratorEvent("stop-generation");
		} else {
			const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
			// this.fireDecoratorEvent("generate-icon-click", { clickTarget: target });
			menu.opener = target;
			menu.open = true;
		}
	}

	_handleVersionChange(e: CustomEvent<{ backwards: boolean }>) {
		this.fireDecoratorEvent("version-change", {
			backwards: e.detail.backwards,
		});

		this._manageFocus();
		// this._previousCurrentStep = this.currentVersion;
		// this._previousTotalSteps = this.totalVersions;
		// this._lastClickedButton = LastClickedButton.None;
	}

	_handleArrowLeftClick() {
		this._lastClickedButton = LastClickedButton.Previous;
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: true } }));
	}

	_handleArrowRightClick() {
		this._lastClickedButton = LastClickedButton.Next;
		this._handleVersionChange(new CustomEvent("version-change", { detail: { backwards: false } }));
	}

	_onkeydown(e: KeyboardEvent): void {
		super._onkeydown(e);
		const menu = this.shadowRoot?.querySelector("ui5-menu") as Menu;
		menu.opener = this.shadowRoot?.getElementById("ai-menu-icon");

		if (e.key === "F4" && e.shiftKey) {
			e.preventDefault();
			menu.open = true;
		}
		const goPreviousStep = e.key === "Z" && e.shiftKey && e.ctrlKey;
		const goNextStep = e.key === "Y" && e.shiftKey && e.ctrlKey;

		if (goPreviousStep) {
			e.preventDefault();
			this._handleArrowLeftClick();
		} else if (goNextStep) {
			e.preventDefault();
			this._handleArrowRightClick();
		}
	}
	get iconAccName() {
		return "AI Writing Assistant (Shift + F4)";
	}

	get menu() {
		return this.shadowRoot?.querySelector("ui5-menu");
	}
}

AIInput.define();

export default AIInput;
