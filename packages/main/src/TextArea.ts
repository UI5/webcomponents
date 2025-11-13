import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	getEffectiveAriaLabelText,
	getAssociatedLabelForTexts,
	getEffectiveAriaDescriptionText,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type Popover from "./Popover.js";

import TextAreaTemplate from "./TextAreaTemplate.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	TEXTAREA_CHARACTERS_LEFT,
	TEXTAREA_CHARACTERS_EXCEEDED,
	FORM_TEXTFIELD_REQUIRED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import textareaStyles from "./generated/themes/TextArea.css.js";
import valueStateMessageStyles from "./generated/themes/ValueStateMessage.css.js";

type TokenizedText = Array<string>;
type IndexedTokenizedText = Array<{
	text: string;
	last: boolean;
}>;

type ExceededText = {
	exceededText?: string;
	leftCharactersCount?: number;
	calcedMaxLength?: number;
};

type TextAreaInputEventDetail = {
	escapePressed?: boolean;
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-textarea` component is used to enter multiple rows of text.
 *
 * When empty, it can hold a placeholder similar to a `ui5-input`.
 * You can define the rows of the `ui5-textarea` and also determine specific behavior when handling long texts.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TextArea.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart textarea - Used to style the native textarea
 */
@customElement({
	tag: "ui5-textarea",
	formAssociated: true,
	languageAware: true,
	styles: [
		textareaStyles,
		valueStateMessageStyles,
	],
	renderer: jsxRenderer,
	template: TextAreaTemplate,
})
/**
 * Fired when the text has changed and the focus leaves the component.
 * @public
 */
@event("change", {
	bubbles: true,
})
/**
 * Fired to make Angular two way data binding work properly.
 * @private
 */
@event("value-changed", {
	bubbles: true,
})

/**
 * Fired when the value of the component changes at each keystroke or when
 * something is pasted.
 * @since 1.0.0-rc.5
 * @param {boolean} escapePressed Indicates whether the Escape key was pressed, which triggers a revert to the previous value
 * @public
 */
@event("input", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when some text has been selected.
 *
 * @since 1.23.0
 * @public
 */
@event("select", {
	bubbles: true,
})

/**
 * Fired when textarea is scrolled.
 *
 * @since 1.23.0
 * @public
 */
@event("scroll", {
	bubbles: true,
})

class TextArea extends UI5Element implements IFormInputElement {
	eventDetails!: {
		"change": void;
		"input": TextAreaInputEventDetail;
		"select": void;
		"scroll": void;
		"value-changed": void;
	}
	/**
	 * Defines the value of the component.
	 * @formEvents change input
	 * @formProperty
	 * @default ""
	 * @public
	 */
	@property()
	value = "";
	/**
	 * Indicates whether the user can interact with the component or not.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;
	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;
	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.3
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines a short hint intended to aid the user with data entry when the component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the value state of the component.
	 *
	 * **Note:** If `maxlength` property is set,
	 * the component turns into "Critical" state once the characters exceeds the limit.
	 * In this case, only the "Negative" state is considered and can be applied.
	 * @default "None"
	 * @since 1.0.0-rc.7
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines the number of visible text rows for the component.
	 *
	 * **Notes:**
	 *
	 * - If the `growing` property is enabled, this property defines the minimum rows to be displayed
	 * in the textarea.
	 * - The CSS `height` property wins over the `rows` property, if both are set.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	rows = 0;

	/**
	 * Defines the maximum number of characters that the `value` can have.
	 * @default undefined
	 * @public
	 */
	@property({ type: Number })
	maxlength?: number

	/**
	 * Determines whether the characters exceeding the maximum allowed character count are visible
	 * in the component.
	 *
	 * If set to `false`, the user is not allowed to enter more characters than what is set in the
	 * `maxlength` property.
	 * If set to `true` the characters exceeding the `maxlength` value are selected on
	 * paste and the counter below the component displays their number.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showExceededText = false;

	/**
	 * Enables the component to automatically grow and shrink dynamically with its content.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	growing = false;

	/**
	 * Defines the maximum number of rows that the component can grow.
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	growingMaxRows = 0;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the textarea.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.16.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Receives id(or many ids) of the elements that describe the textarea.
	 * @default undefined
	 * @public
	 * @since 2.16.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * @private
	 */
	 @property({ type: Boolean })
	exceeding = false;

	/**
	 * @private
	 */
	@property({ type: Array })
	_mirrorText: IndexedTokenizedText = [];

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	_maxHeight?: string;

	/**
	 * @private
	 */
	@property({ type: Number })
	_width?: number;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
   	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed if the component has
	 * `valueState` of type `Information`, `Critical` or `Negative`.
	 * @since 1.0.0-rc.7
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	_fnOnResize: ResizeObserverCallback;
	_firstRendering: boolean;
	_openValueStateMsgPopover: boolean;
	_exceededTextProps!: ExceededText;
	_keyDown?: boolean;
	previousValue: string;
	valueStatePopover?: Popover;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get formValidityMessage() {
		return TextArea.i18nBundle.getText(FORM_TEXTFIELD_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this.required && !this.value };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue(): FormData | string | null {
		return this.value;
	}

	constructor() {
		super();

		this._firstRendering = true;
		this._openValueStateMsgPopover = false;
		this._fnOnResize = this._onResize.bind(this);
		this.previousValue = "";
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._fnOnResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._fnOnResize);
	}

	onBeforeRendering() {
		if (!this.value) {
			// fallback to default value
			this.value = "";
		}

		this._exceededTextProps = this._calcExceededText();
		this._mirrorText = this._tokenizeText(this.value);

		this.exceeding = !!this._exceededTextProps.leftCharactersCount && this._exceededTextProps.leftCharactersCount < 0;
		this._setCSSParams();
	}

	onAfterRendering() {
		const nativeTextArea = this.getInputDomRef()!;

		if (this.rows === 1) {
			nativeTextArea.setAttribute("rows", "1");
		} else {
			nativeTextArea.removeAttribute("rows");
		}

		this.toggleValueStateMessage(this.openValueStateMsgPopover);
		this._firstRendering = false;
	}

	getInputDomRef() {
		return this.getDomRef()!.querySelector<HTMLTextAreaElement>("textarea")!;
	}

	_onkeydown(e: KeyboardEvent) {
		this._keyDown = true;

		if (isEscape(e)) {
			const nativeTextArea = this.getInputDomRef();

			const prevented = !this.fireDecoratorEvent("input", {
				escapePressed: true,
			});

			if (!prevented) {
				this.value = this.previousValue;
				nativeTextArea.value = this.value;
			}
		}
	}

	_onkeyup() {
		this._keyDown = false;
	}

	_onfocusin() {
		this.focused = true;
		this._openValueStateMsgPopover = true;
		this.previousValue = this.getInputDomRef().value;
	}

	_onfocusout(e: FocusEvent) {
		const eTarget = e.relatedTarget as HTMLElement;
		const focusedOutToValueStateMessage = eTarget && this.contains(eTarget);

		this.focused = false;

		if (!focusedOutToValueStateMessage) {
			this._openValueStateMsgPopover = false;
		}
	}

	_onchange() {
		this.fireDecoratorEvent("change");
	}

	_onselect() {
		this.fireDecoratorEvent("select");
	}

	_onscroll() {
		this.fireDecoratorEvent("scroll");
	}

	_oninput(e: InputEvent) {
		const nativeTextArea = this.getInputDomRef()!;

		if (e.target === nativeTextArea) {
			// stop the native event, as the semantic "input" would be fired.
			e.stopImmediatePropagation();
		}

		this.value = nativeTextArea.value;
		const valueLength = this.value.length;

		if (e.inputType === "insertFromPaste" && this.maxlength && valueLength > this.maxlength) {
			nativeTextArea.setSelectionRange(this.maxlength, valueLength);
		}

		this.fireDecoratorEvent("input");

		// Angular two way data binding
		this.fireDecoratorEvent("value-changed");
	}

	_onResize() {
		if (this.displayValueStateMessagePopover) {
			this._width = this.offsetWidth;
		}
	}

	_setCSSParams() {
		this.style.setProperty("--_textarea_rows", this.rows ? String(this.rows) : "2");
		this.style.setProperty("--_textarea_growing_max_rows", String(this.growingMaxRows));
	}

	toggleValueStateMessage(toggle: boolean) {
		if (toggle) {
			this.openPopover();
		} else {
			this.closePopover();
		}
	}

	openPopover() {
		this.valueStatePopover = this._getPopover();
		if (this.valueStatePopover) {
			this.valueStatePopover.opener = this.shadowRoot!.querySelector<HTMLElement>(".ui5-textarea-root .ui5-textarea-wrapper")!;
			this.valueStatePopover.open = true;
		}
	}

	closePopover() {
		this.valueStatePopover = this._getPopover();
		if (this.valueStatePopover) {
			this.valueStatePopover.open = false;
		}
	}

	_getPopover() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-popover]")!;
	}

	_tokenizeText(value: string) {
		const tokenizedText = value.replace(/</gm, "<")
			.replace(/>/gm, ">")
			.split("\n");

		return this._mapTokenizedTextToObject(tokenizedText);
	}

	_mapTokenizedTextToObject(tokenizedText: TokenizedText) {
		return tokenizedText.map((token, index) => {
			return {
				text: token,
				last: index === (tokenizedText.length - 1),
			};
		});
	}

	_calcExceededText() {
		let calcedMaxLength,
			exceededText,
			leftCharactersCount;

		if (this.showExceededText) {
			const maxLength = this.maxlength;

			if (maxLength !== null && maxLength !== undefined) {
				leftCharactersCount = maxLength - this.value.length;

				if (leftCharactersCount >= 0) {
					exceededText = TextArea.i18nBundle.getText(TEXTAREA_CHARACTERS_LEFT, leftCharactersCount);
				} else {
					exceededText = TextArea.i18nBundle.getText(TEXTAREA_CHARACTERS_EXCEEDED, Math.abs(leftCharactersCount));
				}
			}
		} else {
			calcedMaxLength = this.maxlength;
		}

		return {
			exceededText, leftCharactersCount, calcedMaxLength,
		};
	}

	get classes() {
		return {
			root: {
				"ui5-textarea-root": true,
			},
			valueStateMsg: {
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get tabIndex() {
		return this.disabled ? -1 : 0;
	}

	get ariaLabelText() {
		const effectiveAriaLabelText = getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this);

		if (this.showExceededText) {
			if (effectiveAriaLabelText) {
				return effectiveAriaLabelText.concat(" ", this._exceededTextProps.exceededText!);
			}

			return this._exceededTextProps.exceededText;
		}

		return effectiveAriaLabelText;
	}

	get ariaDescriptionText() {
		return getEffectiveAriaDescriptionText(this);
	}

	get ariaDescriptionTextId() {
		return this.ariaDescriptionText ? "accessibleDescription" : "";
	}

	get ariaDescribedBy() {
		const ids = [
			this.hasValueState ? `${this._id}-valueStateDesc` : "",
			this.ariaDescriptionTextId,
		].filter(Boolean).join(" ");

		return ids || undefined;
	}

	get ariaValueStateHiddenText() {
		if (!this.hasValueState) {
			return;
		}

		if (this.valueState === ValueState.None) {
			return;
		}

		if (this.hasCustomValueState) {
			return `${this.valueStateTypeMappings[this.valueState]}`.concat(" ", this.valueStateMessage.map(el => el.textContent).join(" "));
		}

		return `${this.valueStateTypeMappings[this.valueState]} ${this.valueStateDefaultText}`;
	}

	get valueStateDefaultText() {
		if (this.valueState !== ValueState.None) {
			return this.valueStateTextMappings[this.valueState];
		}

		return "";
	}

	get _ariaInvalid() {
		return this.valueState === ValueState.Negative ? "true" : undefined;
	}

	get openValueStateMsgPopover() {
		return !this._firstRendering && this._openValueStateMsgPopover && this.displayValueStateMessagePopover;
	}

	get displayValueStateMessagePopover() {
		return !this.readonly && (this.hasCustomValueState || this.hasValueState);
	}

	get hasCustomValueState() {
		return !!this.valueStateMessage.length && this.hasValueState;
	}

	get hasValueState() {
		return this.valueState === ValueState.Negative || this.valueState === ValueState.Critical || this.valueState === ValueState.Information;
	}

	get valueStateTextMappings() {
		return {
			"Positive": TextArea.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": TextArea.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Negative": TextArea.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": TextArea.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateTypeMappings() {
		return {
			"Positive": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			"Information": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			"Negative": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			"Critical": TextArea.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}
}

TextArea.define();

export default TextArea;
export { TextArea as BaseTextArea };
export type { TextAreaInputEventDetail };
