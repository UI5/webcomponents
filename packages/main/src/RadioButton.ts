import UI5Element, { customElement, property, eventStrict as event, i18n, jsxRenderer, Device, Keys, AccessibilityTextsHelper } from "@ui5/webcomponents-base";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
import type WrappingType from "./types/WrappingType.js";

// Template
import RadioButtonTemplate from "./RadioButtonTemplate.js";

// i18n
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	FORM_SELECTABLE_REQUIRED2,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import radioButtonCss from "./generated/themes/RadioButton.css.js";

const {
	isSpace,
	isEnter,
	isDown,
	isLeft,
	isUp,
	isRight,
} = Keys;
const { isDesktop } = Device;
const { getEffectiveAriaLabelText } = AccessibilityTextsHelper;

let isGlobalHandlerAttached = false;
let activeRadio: RadioButton;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-radio-button` component enables users to select a single option from a set of options.
 * When a `ui5-radio-button` is selected by the user, the
 * `change` event is fired.
 * When a `ui5-radio-button` that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 *
 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * ### Keyboard Handling
 *
 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
 *
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 *
 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RadioButton";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
 */
@customElement({
	tag: "ui5-radio-button",
	languageAware: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: RadioButtonTemplate,
	styles: radioButtonCss,
})
/**
 * Fired when the component checked state changes.
 * @public
 * @since 1.0.0-rc.15
 */
@event("change", {
	bubbles: true,
})

class RadioButton extends UI5Element implements IFormInputElement {
	eventDetails!: {
		change: void,
	}
	/**
	 * Defines whether the component is disabled.
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
	 * **Note:** A read-only component isn't editable or selectable.
	 * However, because it's focusable, it still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.9.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines whether the component is checked or not.
	 *
	 * **Note:** The property value can be changed with user interaction,
	 * either by clicking/tapping on the component,
	 * or by using the Space or Enter key.
	 *
	 * **Note:** Only enabled radio buttons can be checked.
	 * Read-only radio buttons are not selectable, and therefore are always unchecked.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	checked = false;

	/**
	 * Defines the text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

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
	 * Radio buttons with the same `name` will form a radio button group.
	 *
	 * **Note:** By this name the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** The selection can be changed with `ARROW_UP/DOWN` and `ARROW_LEFT/RIGHT` keys between radio buttons in same group.
	 *
	 * **Note:** Only one radio button can be selected per group.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines the form value of the component.
	 * When a form with a radio button group is submitted, the group's value
	 * will be the value of the currently selected radio button.
	 * @default ""
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Defines whether the component text wraps when there is not enough space.
	 *
	 * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	 * @default "Normal"
	 * @public
	 */
	@property()
	wrappingType: `${WrappingType}` = "Normal";

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.6.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef?: string;

	@property({ type: Number })
	_tabIndex?: number;

	/**
	 * Defines the active state (pressed or not) of the component.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	active = false;

	/**
	 * Defines if the component is selected in specific group
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_groupChecked = false;
	@property({ type: Boolean, noAttribute: true })
	_groupRequired = false;

	_deactivate: () => void;
	_name = "";
	_checked = false;

	get formValidityMessage() {
		return RadioButton.i18nBundle.getText(FORM_SELECTABLE_REQUIRED2);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this._groupRequired && !this._groupChecked };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		return this.checked ? (this.value || "on") : null;
	}

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._deactivate = () => {
			if (activeRadio) {
				activeRadio.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);
			isGlobalHandlerAttached = true;
		}
	}

	onAfterRendering() {
		this.syncGroup();
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onExitDOM() {
		this.syncGroup(true);
	}

	syncGroup(forceRemove?: boolean) {
		const oldGroup = this._name;
		const currentGroup = this.name;
		const oldChecked = this._checked;
		const currentChecked = this.checked;

		if (forceRemove) {
			RadioButtonGroup.removeFromGroup(this, oldGroup);
		}

		if (currentGroup !== oldGroup) {
			if (oldGroup) {
				// remove the control from the previous group
				RadioButtonGroup.removeFromGroup(this, oldGroup);
			}

			if (currentGroup) {
				// add the control to the existing group
				RadioButtonGroup.addToGroup(this, currentGroup);
			}
		} else if (currentGroup && this.isConnected) {
			RadioButtonGroup.enforceSingleSelection(this, currentGroup);
		}

		if (this.name && currentChecked !== oldChecked) {
			RadioButtonGroup.updateTabOrder(this.name);
		}

		this._name = this.name || "";
		this._checked = this.checked;
	}

	_onclick() {
		return this.toggle();
	}

	_handleDown(e: KeyboardEvent) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		e.preventDefault();
		RadioButtonGroup.selectNextItem(this, currentGroup);
	}

	_handleUp(e: KeyboardEvent) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		e.preventDefault();
		RadioButtonGroup.selectPreviousItem(this, currentGroup);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.active = true;
			return e.preventDefault();
		}

		if (isEnter(e)) {
			this.active = true;
			return this.toggle();
		}

		const isRTL = this.effectiveDir === "rtl";

		if (isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e))) {
			this._handleDown(e);
		}

		if (isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e))) {
			this._handleUp(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.toggle();
		}

		this.active = false;
	}

	_onmousedown() {
		this.active = true;
		activeRadio = this; // eslint-disable-line
	}

	_onmouseup() {
		this.active = false;
	}

	_onfocusout() {
		this.active = false;
	}

	toggle() {
		if (!this.canToggle()) {
			return this;
		}

		if (!this.name) {
			this.checked = !this.checked;
			this.fireDecoratorEvent("change");
			return this;
		}

		RadioButtonGroup.selectItem(this, this.name);
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly || this.checked);
	}

	get effectiveAriaDisabled() {
		return (this.disabled || this.readonly) ? true : undefined;
	}

	get ariaLabelText() {
		return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
	}

	get effectiveAriaDescribedBy() {
		return this.hasValueState ? `${this._id}-descr` : undefined;
	}

	get hasValueState() {
		return this.valueState !== "None";
	}

	get valueStateText() {
		switch (this.valueState) {
		case "Negative":
			return RadioButton.i18nBundle.getText(VALUE_STATE_ERROR);
		case "Critical":
			return RadioButton.i18nBundle.getText(VALUE_STATE_WARNING);
		case "Positive":
			return RadioButton.i18nBundle.getText(VALUE_STATE_SUCCESS);
		case "Information":
			return RadioButton.i18nBundle.getText(VALUE_STATE_INFORMATION);
		default:
			return "";
		}
	}

	get effectiveTabIndex() {
		const tabindex = this.getAttribute("tabindex");

		if (this.disabled) {
			return -1;
		}

		if (this.name) {
			return this._tabIndex;
		}

		return tabindex ? parseInt(tabindex) : 0;
	}
}

RadioButton.define();

export default RadioButton;
