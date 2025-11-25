import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isShow,
	isBackSpace,
	isLeft,
	isRight,
	isRightCtrl,
	isHome,
	isEnd,
	isDown,
	isEnter,

} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { MULTIINPUT_ROLEDESCRIPTION_TEXT, MULTIINPUT_VALUE_HELP_LABEL, MULTIINPUT_VALUE_HELP, MULTIINPUT_FILTER_BUTTON_LABEL } from "./generated/i18n/i18n-defaults.js";
import Input from "./Input.js";
import MultiInputTemplate from "./MultiInputTemplate.js";
import styles from "./generated/themes/MultiInput.css.js";
import type Token from "./Token.js";
import type Tokenizer from "./Tokenizer.js";
import { getTokensCountText } from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import type Icon from "./Icon.js";

import type {
	InputSelectionChangeEventDetail as MultiInputSelectionChangeEventDetail,
} from "./Input.js";

interface IToken extends UI5Element, ITabbable {
	text?: string;
	readonly: boolean,
	selected: boolean,
	isTruncatable: boolean,
}

type MultiInputTokenDeleteEventDetail = {
	tokens: Token[];
}

/**
 * @class
 * ### Overview
 * A `ui5-multi-input` field allows the user to enter multiple values, which are displayed as `ui5-token`.
 *
 * User can choose interaction for creating tokens.
 * Fiori Guidelines say that user should create tokens when:
 *
 * - Type a value in the input and press enter or focus out the input field (`change` event is fired)
 * - Move between suggestion items (`selection-change` event is fired)
 * - Clicking on a suggestion item (`selection-change` event is fired if the clicked item is different than the current value. Also `change` event is fired )
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiInput.js";`
 * @constructor
 * @extends Input
 * @since 1.0.0-rc.9
 * @public
 */
@customElement({
	tag: "ui5-multi-input",
	renderer: jsxRenderer,
	formAssociated: true,
	template: MultiInputTemplate,
	styles: [Input.styles, styles],
})
/**
 * Fired when the value help icon is pressed
 * and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used.
 * @public
 */
@event("value-help-trigger", {
	bubbles: true,
})

/**
 * Fired when tokens are being deleted.
 * @param {Array} tokens An array containing the deleted tokens.
 * @public
 */
@event("token-delete", {
	bubbles: true,
})

class MultiInput extends Input implements IFormInputElement {
	eventDetails!: Input["eventDetails"] & {
		"value-help-trigger": void,
		"token-delete": MultiInputTokenDeleteEventDetail,
	}
	/**
	 * Determines whether a value help icon will be visualized in the end of the input.
	 * Pressing the icon will fire `value-help-trigger` event.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showValueHelpIcon = false;

	/**
	 * Indicates whether the tokenizer has tokens
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	tokenizerAvailable = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * **Note:** When the component is used inside a form element,
	 * the value is sent as the first element in the form data, even if it's empty.
	 * @default undefined
	 * @public
	 */
	@property()
	declare name?: string;

	/**
	 * Indicates whether to show tokens in suggestions popover
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_showTokensInSuggestions = false;

	/**
	 * Tracks whether user has explicitly toggled the show tokens state
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_userToggledShowTokens = false;

	/**
	 * Defines the component tokens.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	tokens!: Array<IToken>;

	_skipOpenSuggestions: boolean;
	_valueHelpIconPressed: boolean;

	get formValidity(): ValidityStateFlags {
		const tokens = (this.tokens || []);

		return { valueMissing: this.required && !this.value && !tokens.length };
	}

	get formFormattedValue(): FormData | string | null {
		const tokens = (this.tokens || []);

		if (tokens.length && this.name) {
			const formData = new FormData();

			formData.append(this.name, this.value);

			for (let i = 0; i < tokens.length; i++) {
				formData.append(this.name, (tokens[i].text || ""));
			}

			return formData;
		}

		return this.value;
	}

	constructor() {
		super();

		// Prevent suggestions' opening.
		this._skipOpenSuggestions = false;
		this._valueHelpIconPressed = false;
	}

	valueHelpPress() {
		this.closeValueStatePopover();
		this.fireDecoratorEvent("value-help-trigger");
	}

	tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>) {
		const deletedTokens = e.detail.tokens;
		const selectedTokens = this.tokens.filter(token => token.selected);
		const shouldFocusInput = this.tokens.length - 1 === 0 || this.tokens.length === selectedTokens.length;

		if (this._readonly) {
			return;
		}

		if (deletedTokens) {
			this.fireDecoratorEvent("token-delete", { tokens: deletedTokens });

			if (shouldFocusInput) {
				this.focus();
			}
		}
	}

	valueHelpMouseDown(e: MouseEvent) {
		const target = e.target as Icon;
		this.closeValueStatePopover();
		this.tokenizer.open = false;
		this._valueHelpIconPressed = true;
		target.focus();
	}

	_tokenizerFocusOut(e: FocusEvent) {
		if (!this.contains(e.relatedTarget as HTMLElement) && !this.shadowRoot!.contains(e.relatedTarget as HTMLElement)) {
			this.tokenizer._tokens.forEach(token => { token.selected = false; });
		}
	}

	valueHelpMouseUp() {
		setTimeout(() => {
			this._valueHelpIconPressed = false;
		}, 0);
	}

	innerFocusIn() {
		this.tokenizer._scrollToEndOnExpand = true;
		this.tokenizer.expanded = true;
		this.focused = true;

		this.tokens.forEach(token => {
			token.selected = false;
		});
	}

	_showMoreItemsPress() {
		this.tokenizer._scrollToEndOnExpand = true;
	}

	_onkeydown(e: KeyboardEvent) {
		!this._isComposing && super._onkeydown(e);

		const target = e.target as HTMLInputElement;
		const isHomeInBeginning = isHome(e) && target.selectionStart === 0;

		if (isHomeInBeginning) {
			this._skipOpenSuggestions = true; // Prevent input focus when navigating through the tokens
			return this._focusFirstToken(e);
		}

		if (isEnter(e) && !!this._internals.form) {
			e.preventDefault();
		}

		if (isLeft(e)) {
			this._skipOpenSuggestions = true;
			return this._handleLeft(e);
		}

		if (isBackSpace(e)) {
			this._skipOpenSuggestions = true;
			return this._handleBackspace(e);
		}

		this._skipOpenSuggestions = false;

		if (isShow(e)) {
			this.valueHelpPress();
		}
	}

	_onTokenizerKeydown(e: KeyboardEvent) {
		const rightCtrl = isRightCtrl(e);
		if (isRight(e) || isDown(e) || isEnd(e) || rightCtrl) {
			e.preventDefault();
			const lastTokenIndex = this.tokens.length - 1;

			if (e.target === this.tokens[lastTokenIndex] && this.tokens[lastTokenIndex] === document.activeElement) {
				setTimeout(() => {
					this.focus();
				}, 0);
			}
		}
	}

	_handleLeft(e: KeyboardEvent) {
		const cursorPosition = this.getDomRef()!.querySelector(`input`)!.selectionStart;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		// selectionStart property applies only to inputs of types text, search, URL, tel, and password
		if (((cursorPosition === null && !this.value) || cursorPosition === 0) && lastToken) {
			e.preventDefault();
			lastToken.focus();
			this.tokenizer._itemNav.setCurrentItem(lastToken);
		}
	}

	_handleBackspace(e: KeyboardEvent) {
		const cursorPosition = this.getDomRef()!.querySelector(`input`)!.selectionStart;
		const selectionEnd = this.getDomRef()!.querySelector(`input`)!.selectionEnd;
		const isValueSelected = cursorPosition === 0 && selectionEnd === this.value.length;
		const tokens = this.tokens;
		const lastToken = tokens.length && tokens[tokens.length - 1];

		// selectionStart property applies only to inputs of types text, search, URL, tel, and password
		if ((!this.value || (this.value && cursorPosition === 0 && !isValueSelected)) && lastToken) {
			e.preventDefault();
			lastToken.focus();
			this.tokenizer._itemNav.setCurrentItem(lastToken);
		}
	}

	_focusFirstToken(e: KeyboardEvent) {
		const tokens = this.tokens;
		const firstToken = tokens.length && tokens[0];

		if (firstToken) {
			e.preventDefault();

			firstToken.focus();
			this.tokenizer._itemNav.setCurrentItem(firstToken);
		}
	}

	_onfocusout(e: FocusEvent) {
		super._onfocusout(e);
		const relatedTarget = e.relatedTarget as HTMLElement;
		const insideDOM = this.contains(relatedTarget);
		const insideShadowDom = this.shadowRoot!.contains(relatedTarget);

		if (!insideDOM && !insideShadowDom) {
			this.tokenizer.expanded = false;
		}

		if (this.contains(relatedTarget) && relatedTarget.hasAttribute("ui5-token")) {
			this.focused = false;
		}
	}

	/**
	 * @override
	 */
	_onfocusin(e: FocusEvent) {
		const inputDomRef = this.getInputDOMRef();

		if (e.target === inputDomRef) {
			super._onfocusin(e);
		}
	}

	onBeforeRendering() {
		super.onBeforeRendering();

		this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
		this.tokenizerAvailable = this.tokens && this.tokens.length > 0;

		if (this.tokenizer) {
			this.tokenizer.readonly = this.readonly;
		}

		// Reset toggle state if there are tokens and dialog is about to open
		if (this.tokens.length > 0 && !this._userToggledShowTokens) {
			this._showTokensInSuggestions = true;
		}
	}

	/**
	 * Override the _handlePickerAfterOpen method to reset toggle state when dialog opens with tokens
	 */
	_handlePickerAfterOpen() {
		if (this.tokens.length > 0) {
			this._showTokensInSuggestions = true;
			this._userToggledShowTokens = false;
		}

		super._handlePickerAfterOpen();
	}

	onAfterRendering() {
		super.onAfterRendering();

		this.tokenizer.preventInitialFocus = true;
	}

	get iconsCount() {
		return super.iconsCount + (this.showValueHelpIcon ? 1 : 0);
	}

	get tokenizer() {
		return this.shadowRoot!.querySelector<Tokenizer>("[ui5-tokenizer]")!;
	}

	get tokenizerExpanded() {
		return this.tokenizer && this.tokenizer.expanded;
	}

	get _tokensCountText() {
		return getTokensCountText(this.tokens.length);
	}

	get _valueHelpText() {
		return MultiInput.i18nBundle.getText(MULTIINPUT_VALUE_HELP);
	}

	get _filterButtonAccessibleName() {
		return MultiInput.i18nBundle.getText(MULTIINPUT_FILTER_BUTTON_LABEL);
	}

	get _tokensCountTextId() {
		return `hiddenText-nMore`;
	}

	get _valueHelpTextId() {
		return this.showValueHelpIcon ? `hiddenText-value-help` : "";
	}

	/**
	 * Returns the placeholder value when there are no tokens.
	 * @protected
	 */
	get _placeholder() {
		if (this.tokens.length) {
			return "";
		}

		return this.placeholder;
	}

	get accInfo() {
		const ariaDescribedBy = `${this._tokensCountTextId} ${this.suggestionsTextId} ${this.valueStateTextId} ${this._valueStateLinksShortcutsTextAccId} ${this._valueHelpTextId}`.trim();
		return {
			...super.accInfo,
			"ariaRoledescription": this.ariaRoleDescription,
			"ariaDescribedBy": ariaDescribedBy,
		};
	}

	get valueHelpLabel() {
		return MultiInput.i18nBundle.getText(MULTIINPUT_VALUE_HELP_LABEL);
	}

	get ariaRoleDescription() {
		return MultiInput.i18nBundle.getText(MULTIINPUT_ROLEDESCRIPTION_TEXT);
	}

	get morePopoverOpener(): HTMLElement {
		if (this.tokens.length === 1 && this.tokens[0].isTruncatable) {
			return this.tokens[0];
		}

		return this;
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && !this.open && this.focused && !this.tokenizer.open;
	}

	/**
	 * Computes the effective state for showing tokens in suggestions.
	 * Defaults to true when tokens exist, but respects explicit user toggle.
	 */
	get _effectiveShowTokensInSuggestions() {
		// If no tokens exist, always false
		if (this.tokens.length === 0) {
			return false;
		}

		// If user has never interacted with the toggle, default to true when tokens exist
		if (!this._userToggledShowTokens) {
			return true;
		}

		// If user has interacted, respect their choice
		return this._showTokensInSuggestions;
	}
}

MultiInput.define();

export default MultiInput;
export type {
	IToken,
	MultiInputTokenDeleteEventDetail,
	MultiInputSelectionChangeEventDetail,
};
