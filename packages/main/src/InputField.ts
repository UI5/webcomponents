import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type {
	AriaRole,
	AriaHasPopup,
	ClassMap,
} from "@ui5/webcomponents-base/dist/types.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isPhone,
	isMac,
} from "@ui5/webcomponents-base/dist/Device.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isEnter,
	isEscape,
	isCtrlAltF8,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { attachListeners } from "@ui5/webcomponents-base/dist/util/valueStateNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	getAssociatedLabelForTexts,
	getAllAccessibleNameRefTexts,
	registerUI5Element,
	deregisterUI5Element,
	getEffectiveAriaDescriptionText,
	getAllAccessibleDescriptionRefTexts,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getCaretPosition, setCaretPosition } from "@ui5/webcomponents-base/dist/util/Caret.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import InputType from "./types/InputType.js";
import type Popover from "./Popover.js";
import type Icon from "./Icon.js";
import type { IIcon } from "./Icon.js";
import type { ToolbarArrowNavState, IToolbarArrowNavProvider } from "./IToolbarArrowNavProvider.js";

import InputFieldTemplate from "./InputFieldTemplate.js";

import {
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_TYPE_SUCCESS,
	VALUE_STATE_TYPE_INFORMATION,
	VALUE_STATE_TYPE_ERROR,
	VALUE_STATE_TYPE_WARNING,
	VALUE_STATE_LINK,
	VALUE_STATE_LINKS,
	VALUE_STATE_LINK_MAC,
	VALUE_STATE_LINKS_MAC,
	INPUT_CLEAR_ICON_ACC_NAME,
} from "./generated/i18n/i18n-defaults.js";

import inputFieldStyles from "./generated/themes/InputField.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

import type InputKeyHint from "./types/InputKeyHint.js";
import type InputComposition from "./features/InputComposition.js";

type NativeInputAttributes = {
	min?: number,
	max?: number,
	step?: number
}

type InputAccInfo = {
	ariaRoledescription?: string,
	ariaDescribedBy?: string,
	ariaHasPopup?: AriaHasPopup,
	ariaAutoComplete?: "list" | "none" | "inline" | "both",
	role?: AriaRole,
	ariaControls?: string,
	ariaRequired?: boolean,
	ariaExpanded?: boolean,
	ariaDescription?: string,
	ariaLabel?: string,
	ariaInvalid?: boolean,
}

enum INPUT_EVENTS {
	CHANGE = "change",
	INPUT = "input",
}

enum INPUT_ACTIONS {
	ACTION_ENTER = "enter",
	ACTION_USER_INPUT = "input",
}

type InputEventDetail = {
	inputType: string;
}

/**
 * @class
 * ### Overview
 *
 * The `InputField` is a private base class for input components that provides basic input functionality
 * without any suggestion-related features. It handles value state, icons, form integration, and accessibility.
 *
 * **Note:** This is an internal base class and should not be used directly.
 * Use `ui5-input` or `ui5-input-table-suggest` instead.
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-input-field",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: InputFieldTemplate,
	styles: [
		inputFieldStyles,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
	],
})

/**
 * Fired when the input operation has finished by pressing Enter or on focusout.
 * @public
 */
@event("change", {
	bubbles: true,
})

@event("_request-submit", {
	bubbles: true,
})

/**
 * Fired when the value of the component changes at each keystroke.
 * @public
 */
@event("input", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when some text has been selected.
 *
 * @since 2.0.0
 * @public
 */
@event("select", {
	bubbles: true,
})

abstract class InputField extends UI5Element implements IFormInputElement, IToolbarArrowNavProvider {
	eventDetails!: {
		"change": InputEventDetail,
		"input": InputEventDetail,
		"select": void,
		"_request-submit": void,
	}

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines a short hint intended to aid the user with data entry when the
	 * component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

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
	 * Defines the HTML type of the component.
	 *
	 * **Notes:**
	 *
	 * - The particular effect of this property differs depending on the browser
	 * and the current language settings, especially for type `Number`.
	 * - The property is mostly intended to be used with touch devices
	 * that use different soft keyboard layouts depending on the given input type.
	 * @default "Text"
	 * @public
	 */
	@property()
	type: `${InputType}` = "Text";

	/**
	 * Defines the value of the component.
	 *
	 * **Note:** The property is updated upon typing.
	 * @default ""
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

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
	 * Sets the maximum number of characters available in the input field.
	 *
	 * **Note:** This property is not compatible with the ui5-input type InputType.Number. If the ui5-input type is set to Number, the maxlength value is ignored.
	 * @default undefined
	 * @since 1.0.0-rc.5
	 * @public
	 */
	@property({ type: Number })
	maxlength?: number;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the input.
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
	 * @since 2.9.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Receives id(or many ids) of the elements that describe the input.
	 * @default undefined
	 * @public
	 * @since 2.9.0
	 */
	@property()
	accessibleDescriptionRef?: string;

	/**
	 * Defines whether the clear icon of the input will be shown.
	 * @default false
	 * @public
	 * @since 1.2.0
	 */
	@property({ type: Boolean })
	showClearIcon = false;

	/**
	 * Defines whether the clear icon is visible.
	 * @default false
	 * @private
	 * @since 1.2.0
	 */
	@property({ type: Boolean })
	_effectiveShowClearIcon = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Used to define enterkeyhint of the inner input.
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint
	 *
	 * @private
	 */
	@property()
	hint?: `${InputKeyHint}`;

	@property({ type: Boolean })
	valueStateOpen = false;

	@property({ type: Object })
	_inputAccInfo: InputAccInfo = {};

	@property({ type: Object })
	_nativeInputAttributes: NativeInputAttributes = {};

	@property({ type: Number })
	_inputWidth?: number;

	@property({ type: Boolean, noAttribute: true })
	_inputIconFocused = false;

	/**
	 * Constantly updated value of texts collected from the associated labels
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedLabelsTexts?: string;

	/**
	 * Constantly updated value of texts collected from the accessibleNameRef elements
	 * @private
	 */
	@property({ noAttribute: true })
	_accessibleLabelsRefTexts?: string;

	/**
	 * Constantly updated value of texts collected from the associated labels
	 * @private
	 */
	@property({ noAttribute: true })
	_associatedDescriptionRefTexts?: string;

	/**
	 * @private
	 */
	@property({ type: Array, noAttribute: true })
	_linksListenersArray: Array<(args: any) => void> = [];

	/**
	 * Indicates whether IME composition is currently active
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isComposing = false;

	/**
	 * Defines the icon to be displayed in the component.
	 * @public
	 */
	@slot()
	icon!: Slot<IIcon>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * The value state message slot should contain only one root element.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Critical` or `Negative` value state.
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	valueStateMessage!: Slot<HTMLElement>;

	previousValue: string;
	firstRendering: boolean;
	lastConfirmedValue: string;
	isTyping: boolean;
	_handleResizeBound: ResizeObserverCallback;
	_enterKeyDown?: boolean;
	_clearIconClicked?: boolean;
	_focusedAfterClear: boolean;
	_valueStateLinks: Array<HTMLElement>;
	_composition?: InputComposition;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;
	static composition: typeof InputComposition;

	/**
	 * Indicates whether link navigation is being handled.
	 * @default false
	 * @private
	 * @since 2.11.0
	 */
	_handleLinkNavigation: boolean = false;

	constructor() {
		super();

		// tracks the value between focus in and focus out to detect that change event should be fired.
		this.previousValue = "";

		// Indicates, if the component is rendering for first time.
		this.firstRendering = true;

		// The last value confirmed by the user with "ENTER"
		this.lastConfirmedValue = "";

		// Indicates, if the user is typing. Gets reset once popup is closed
		this.isTyping = false;

		this._handleResizeBound = this._handleResize.bind(this);

		this._focusedAfterClear = false;
		this._valueStateLinks = [];
	}

	get formValidityMessage() {
		return this.nativeInput?.validationMessage;
	}

	get formValidity(): ValidityStateFlags {
		return {
			valueMissing: this.nativeInput?.validity.valueMissing,
			typeMismatch: this.required && this.nativeInput?.validity.typeMismatch,
			patternMismatch: this.nativeInput?.validity.patternMismatch,
		};
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue(): FormData | string | null {
		return this.value;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
		registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
		this._enableComposition();
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
		deregisterUI5Element(this);
		this._removeLinksEventListeners();
		this._composition?.removeEventListeners();
	}

	onBeforeRendering() {
		this._effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
		this.style.setProperty("--_ui5-input-icons-count", `${this.iconsCount}`);

		// Sync value state to slotted input icons
		this.icon.forEach((iconElement: IIcon) => {
			if (iconElement.hasAttribute("ui5-input-icon")) {
				(iconElement as any).valueState = this.valueState;
				(iconElement as any).readonly = this.readonly;
				(iconElement as any)._parentDisabled = this.disabled;
			}
		});

		// Value state popover logic (only when no suggestion popover is open)
		if (this.shouldDisplayOnlyValueStateMessage) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	onAfterRendering() {
		if (!arraysAreEqual(this._valueStateLinks, this.linksInAriaValueStateHiddenText)) {
			this._removeLinksEventListeners();
			this._addLinksEventListeners();
			this._valueStateLinks = this.linksInAriaValueStateHiddenText;
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			const isValueUnchanged = this.previousValue === this.getInputDOMRefSync()!.value;

			this._enterKeyDown = true;
			if (isValueUnchanged) {
				this.fireDecoratorEvent("_request-submit");
				submitForm(this);
				return;
			}

			// Basic Enter handling: confirm value
			this.lastConfirmedValue = this.value;
			return;
		}

		if (isEscape(e)) {
			return this._handleEscape();
		}

		if (isCtrlAltF8(e)) {
			return this._handleCtrlAltF8();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		// The native Delete event does not update the value property "on time".
		// So, the (native) change event is always fired with the old value
		if (e.key === "Delete") {
			this.value = (e.target as HTMLInputElement).value;
		}

		this._enterKeyDown = false;
	}

	_handleEscape() {
		this.isTyping = false;

		if (this.value !== this.previousValue && this.value !== this.lastConfirmedValue) {
			this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
			this.fireDecoratorEvent(INPUT_EVENTS.INPUT, { inputType: "" });
			return;
		}

		this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
		this.focused = true;
	}

	_handleCtrlAltF8() {
		this._handleLinkNavigation = true;
		const links = this.linksInAriaValueStateHiddenText;

		if (links.length) {
			links[0].focus();
		}
	}

	_onfocusin(e: FocusEvent) {
		this.focused = true;

		if (!this._focusedAfterClear) {
			this.previousValue = this.value;
		}

		this._inputIconFocused = !!e.target && e.target === this.querySelector<Icon>("[ui5-icon]");
		this._focusedAfterClear = false;
	}

	/**
	 * Called on "focusin" of the native input HTML Element.
	 * **Note:** implemented in subclasses like MultiInput.
	 */
	innerFocusIn(): void | undefined { }

	_onfocusout(e: FocusEvent) {
		const toBeFocused = e.relatedTarget as HTMLElement;

		// Allow subclasses to skip focusout (e.g., for suggestion popover)
		if (this._shouldSkipFocusOut(toBeFocused)) {
			return;
		}

		if (this.contains(toBeFocused) || this.getSlottedNodes("valueStateMessage").some(el => el.contains(toBeFocused))) {
			return;
		}

		this.focused = false;

		if (this.showClearIcon && !this._effectiveShowClearIcon) {
			this._clearIconClicked = false;
			this._handleChange();
		}

		if (!this._clearIconClicked) {
			this.previousValue = "";
		}

		this.lastConfirmedValue = "";
		this.isTyping = false;

		if ((this.value !== this.previousValue) && this.showClearIcon) {
			this._clearIconClicked = false;
		}
	}

	_click() {
	}

	_handleChange() {
		if (this._clearIconClicked) {
			this._clearIconClicked = false;
			return;
		}

		if (this.previousValue !== this.getInputDOMRefSync()!.value) {
			this.fireDecoratorEvent(INPUT_EVENTS.CHANGE, { inputType: "" });
			this.previousValue = this.value;

			if (this._enterKeyDown) {
				this.fireDecoratorEvent("_request-submit");
				submitForm(this);
			}
		}
	}

	_clear() {
		const valueBeforeClear = this.value;
		this.value = "";
		const prevented = !this.fireDecoratorEvent(INPUT_EVENTS.INPUT, { inputType: "" });

		if (prevented) {
			this.value = valueBeforeClear;
			return;
		}

		if (!this._isPhone) {
			this.focus();
			this._focusedAfterClear = true;
		}
	}

	_iconMouseDown() {
		this._clearIconClicked = true;
	}

	_handleSelect() {
		this.fireDecoratorEvent("select");
	}

	_handleInput(e: CustomEvent<InputEventDetail>) {
		const eventType: string = (e.detail && e.detail.inputType) || "";
		this._input(e, eventType);
	}

	_handleNativeInput(e: InputEvent) {
		const eventType: string = e.inputType || "";
		this._input(e, eventType);
	}

	// Base implementation - subclasses override and use eventType
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_input(e: CustomEvent<InputEventDetail> | InputEvent, eventType: string) {
		const inputDomRef = this.getInputDOMRefSync();

		if (e.target === inputDomRef) {
			this.focused = true;
			// stop the native event, as the semantic "input" would be fired.
			e.stopImmediatePropagation();
		}

		this.fireEventByAction(INPUT_ACTIONS.ACTION_ENTER, e as InputEvent);
		this.isTyping = true;
	}

	fireEventByAction(action: INPUT_ACTIONS, e: InputEvent) {
		const valueBeforeInput = this.value;
		const inputRef = this.getInputDOMRefSync();

		if (this.disabled || this.readonly) {
			return;
		}

		const inputValue = this.getInputValue();
		const isUserInput = action === INPUT_ACTIONS.ACTION_ENTER;

		this.value = inputValue;
		const valueAfterInput = this.value;

		if (isUserInput) {
			const inputType = e.inputType || "";
			const prevented = !this.fireDecoratorEvent(INPUT_EVENTS.INPUT, { inputType });

			if (prevented) {
				// if the value is not changed after preventing the input event, revert the value
				if (valueAfterInput === this.value) {
					this.value = valueBeforeInput;
				}

				inputRef && (inputRef.value = this.value);
			}
		}
	}

	getInputValue() {
		const domRef = this.getDomRef();

		if (domRef) {
			return (this.getInputDOMRef())!.value;
		}
		return "";
	}

	getInputDOMRef(): HTMLInputElement | null {
		return this.nativeInput;
	}

	getInputDOMRefSync(): HTMLInputElement | null {
		return this.nativeInput;
	}

	getArrowNavState(): ToolbarArrowNavState | undefined {
		const input = this.getInputDOMRefSync();
		if (!input) {
			return undefined;
		}

		const active = getActiveElement() as HTMLElement | null;
		const isInputFocused = !!active && (active === input || input.contains(active));
		if (!isInputFocused) {
			return undefined;
		}

		const caret = input.selectionStart ?? 0;
		const caretEnd = input.selectionEnd ?? caret;
		const len = input.value?.length ?? 0;

		// A non-collapsed selection is not a navigation boundary: Left/Right should
		// collapse the selection (native behaviour), not exit to the next toolbar item.
		const collapsed = caret === caretEnd;

		return { atLeftEnd: collapsed && caret === 0, atRightEnd: collapsed && caretEnd >= len };
	}

	/**
	 * Returns a reference to the native input element
	 * @protected
	 */
	get nativeInput() {
		const domRef = this.getDomRef();
		return domRef ? domRef.querySelector<HTMLInputElement>(`input`) : null;
	}

	get nativeInputWidth() {
		return this.nativeInput ? this.nativeInput.offsetWidth : 0;
	}

	_handleResize() {
		this._inputWidth = this.offsetWidth;
	}

	_updateAssociatedLabelsTexts() {
		this._associatedLabelsTexts = getAssociatedLabelForTexts(this);
		this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
		this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
	}

	openValueStatePopover() {
		this.valueStateOpen = true;
	}

	closeValueStatePopover() {
		this.valueStateOpen = false;
	}

	_handleValueStatePopoverAfterClose() {
		this.valueStateOpen = false;
		this._handleLinkNavigation = false;
	}

	_getValueStatePopover() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-popover]")!;
	}

	/**
	 * Enables IME composition handling.
	 * Dynamically loads the InputComposition feature and sets up event listeners.
	 * @private
	 */
	_enableComposition() {
		if (this._composition) {
			return;
		}
		const setup = (FeatureClass: typeof InputComposition) => {
			this._composition = new FeatureClass({
				getInputEl: () => this.getInputDOMRefSync(),
				updateCompositionState: (isComposing: boolean) => {
					this._isComposing = isComposing;
				},
			});
			this._composition.addEventListeners();
		};

		if (InputField.composition) {
			setup(InputField.composition);
		} else {
			import("./features/InputComposition.js").then(CompositionModule => {
				InputField.composition = CompositionModule.default;
				setup(CompositionModule.default);
			});
		}
	}

	_addLinksEventListeners() {
		const links = this.linksInAriaValueStateHiddenText;

		links.forEach((link, index) => {
			this._linksListenersArray.push((e: KeyboardEvent) => {
				attachListeners(e, links, index, {
					closeValueState: () => {
						if (this.valueStateOpen) {
							this.closeValueStatePopover();
						}
					},
					focusInput: () => {
						this._handleLinkNavigation = false;
						this.getInputDOMRef()!.focus();
					},
					navigateToItem: () => {
						// Basic implementation - subclasses override if they have suggestions
					},
					isPopoverOpen: () => false,
				});
			});
			link.addEventListener("keydown", this._linksListenersArray[index]);
		});
	}

	_removeLinksEventListeners() {
		const links = this.linksInAriaValueStateHiddenText;

		links.forEach((link, index) => {
			link.removeEventListener("keydown", this._linksListenersArray[index]);
		});

		this._linksListenersArray = [];
		this._handleLinkNavigation = false;
	}

	/**
	 * Returns the caret position inside the native input
	 * @protected
	 */
	getCaretPosition(): number | null {
		return getCaretPosition(this.nativeInput!);
	}

	/**
	 * Sets the caret to a certain position inside the native input
	 * @protected
	 */
	setCaretPosition(pos: number | null) {
		setCaretPosition(this.nativeInput!, pos);
	}

	/**
	 * Removes the fractional part of floating-point number.
	 * @param value the numeric value of Input of type "Number"
	 */
	removeFractionalPart(value: string) {
		if (value.includes(".")) {
			return value.slice(0, value.indexOf("."));
		}
		if (value.includes(",")) {
			return value.slice(0, value.indexOf(","));
		}

		return value;
	}

	/**
	 * Called in _onfocusout to allow subclasses to skip focusout handling
	 * (e.g., when clicking inside a suggestion popover)
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_shouldSkipFocusOut(toBeFocused: HTMLElement): boolean {
		return false;
	}

	// ============== Getters ==============

	get valueStateTypeMappings() {
		return {
			"Positive": InputField.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
			"Information": InputField.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
			"Negative": InputField.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
			"Critical": InputField.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
		};
	}

	valueStateTextMappings() {
		return {
			"Positive": InputField.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": InputField.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Negative": InputField.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": InputField.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get _readonly() {
		return this.readonly && !this.disabled;
	}

	get clearIconAccessibleName() {
		return InputField.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
	}

	get inputType(): `${InputType}` {
		return this.type;
	}

	get inputNativeType(): Lowercase<`${InputType}`> {
		return this.type.toLowerCase() as Lowercase<`${InputType}`>;
	}

	get isTypeNumber() {
		return this.type === InputType.Number;
	}

	get valueStateTextId() {
		return this.hasValueState ? `valueStateDesc` : "";
	}

	get _accInfoAriaDescription() {
		return (this._inputAccInfo && this._inputAccInfo.ariaDescription) || "";
	}

	get _accInfoAriaDescriptionId() {
		const hasAriaDescription = this._accInfoAriaDescription !== "";
		return hasAriaDescription ? "descr" : "";
	}

	get ariaDescriptionText() {
		return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this);
	}

	get ariaDescriptionTextId() {
		return this.ariaDescriptionText ? "accessibleDescription" : "";
	}

	get ariaDescribedByIds() {
		return [
			this.valueStateTextId,
			this._valueStateLinksShortcutsTextAccId,
			this._inputAccInfo.ariaDescribedBy,
			this._accInfoAriaDescriptionId,
			this.ariaDescriptionTextId,
		].filter(Boolean).join(" ");
	}

	get accInfo() {
		return {
			"ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
			"ariaDescribedBy": this.ariaDescribedByIds || undefined,
			"ariaInvalid": this.valueState === ValueState.Negative ? true : undefined,
			"ariaHasPopup": this._inputAccInfo.ariaHasPopup,
			"ariaAutoComplete": this._inputAccInfo.ariaAutoComplete,
			"role": this._inputAccInfo && this._inputAccInfo.role,
			"ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
			"ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
			"ariaDescription": this._accInfoAriaDescription,
			"accessibleDescription": this.ariaDescriptionText,
			"ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || this._accessibleLabelsRefTexts || this.accessibleName || this._associatedLabelsTexts || undefined,
		};
	}

	get nativeInputAttributes() {
		return {
			"min": this.isTypeNumber ? this._nativeInputAttributes.min : undefined,
			"max": this.isTypeNumber ? this._nativeInputAttributes.max : undefined,
			"step": this.isTypeNumber ? (this._nativeInputAttributes.step || "any") : undefined,
		};
	}

	get ariaValueStateHiddenText() {
		if (!this.hasValueState) {
			return;
		}

		const valueState = this.valueState !== ValueState.None ? this.valueStateTypeMappings[this.valueState] : "";

		if (this.shouldDisplayDefaultValueStateMessage) {
			return this.valueStateText ? `${valueState} ${this.valueStateText}` : valueState;
		}

		return this.valueStateMessage.length ? `${valueState} ${this.valueStateMessage.map(el => el.textContent).join(" ")}` : valueState;
	}

	get linksInAriaValueStateHiddenText() {
		const links: Array<HTMLElement> = [];
		if (this.valueStateMessage) {
			this.valueStateMessage.forEach(element => {
				if (element.children.length) {
					element.querySelectorAll("ui5-link").forEach(link => {
						links.push(link as HTMLElement);
					});
				}
			});
		}
		return links;
	}

	get valueStateLinksShortcutsTextAcc() {
		const links = this.linksInAriaValueStateHiddenText;
		if (!links.length) {
			return "";
		}

		if (isMac()) {
			return links.length === 1
				? InputField.i18nBundle.getText(VALUE_STATE_LINK_MAC)
				: InputField.i18nBundle.getText(VALUE_STATE_LINKS_MAC);
		}

		return links.length === 1
			? InputField.i18nBundle.getText(VALUE_STATE_LINK)
			: InputField.i18nBundle.getText(VALUE_STATE_LINKS);
	}

	get _valueStateLinksShortcutsTextAccId() {
		return this.linksInAriaValueStateHiddenText.length > 0 ? `hiddenText-value-state-link-shortcut` : "";
	}

	get iconsCount(): number {
		const slottedIconsCount = this.icon ? this.icon.length : 0;
		const clearIconCount = Number(this._effectiveShowClearIcon) ?? 0;
		return slottedIconsCount + clearIconCount;
	}

	get classes(): ClassMap {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage-header": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			innerInput: {
				"padding": "",
			},
		};
	}

	get shouldDisplayOnlyValueStateMessage() {
		return this.hasValueStateMessage && !this.readonly && this.focused;
	}

	get shouldDisplayDefaultValueStateMessage() {
		return !this.valueStateMessage.length && this.hasValueStateMessage;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateMessage() {
		return this.hasValueState && this.valueState !== ValueState.Positive
			&& !this._inputIconFocused;
	}

	get valueStateText() {
		return this.valueState !== ValueState.None ? this.valueStateTextMappings()[this.valueState] : undefined;
	}

	get step() {
		return this.isTypeNumber ? "any" : undefined;
	}

	get _isPhone() {
		return isPhone();
	}

	/**
	 * Returns the placeholder value.
	 * @protected
	 */
	get _placeholder() {
		return this.placeholder;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateInputIcon() {
		const iconPerValueState = {
			Negative: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>`,
			Critical: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>`,
			Positive: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>`,
			Information: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>`,
		};

		if (this.valueState !== ValueState.None) {
			return `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">
				${iconPerValueState[this.valueState]};
			</svg>
			`;
		}

		return "";
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Negative: "error",
			Critical: "alert",
			Positive: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}
}

export default InputField;
export {
	INPUT_ACTIONS,
};
export type {
	InputAccInfo,
	InputEventDetail,
	NativeInputAttributes,
};
