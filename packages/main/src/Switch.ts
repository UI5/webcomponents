import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	isSpace, isEnter, isShift, isEscape,
	isSpaceShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText, getAssociatedLabelForTexts } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import SwitchDesign from "./types/SwitchDesign.js";
import { FORM_CHECKABLE_REQUIRED } from "./generated/i18n/i18n-defaults.js";

// Template
import SwitchTemplate from "./SwitchTemplate.js";

// Styles
import switchCss from "./generated/themes/Switch.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-switch` component is used for changing between binary states.
 *
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties,
 * but texts longer than 3 letters will be cutted off.
 *
 * However, users are able to customize the width of `ui5-switch` with pure CSS (`<ui5-switch style="width: 200px">`), and set widths, depending on the texts they would use.
 *
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * ### Keyboard Handling
 * The state can be changed by pressing the Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Switch";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the `textOn` property text
 * @csspart text-off - Used to style the `textOff` property text
 * @csspart handle - Used to style the handle of the switch
 */
@customElement({
	tag: "ui5-switch",
	formAssociated: true,
	languageAware: true,
	styles: switchCss,
	renderer: jsxRenderer,
	template: SwitchTemplate,
})
/**
 * Fired when the component checked state changes.
 * @public
 */
@event("change", {
	bubbles: true,
	cancelable: true,
})
/**
 * Fired to make Angular two way data binding work properly.
 * @private
 */
@event("value-changed", {
	bubbles: true,
	cancelable: true,
})
class Switch extends UI5Element implements IFormInputElement {
	eventDetails!: {
		change: void
		"value-changed": void
	}

	/**
	 * Defines the component design.
	 *
	 * **Note:** If `Graphical` type is set,
	 * positive and negative icons will replace the `textOn` and `textOff`.
	 * @public
	 * @default "Textual"
	 */
	@property()
	design: `${SwitchDesign}` = "Textual";

	/**
	 * Defines if the component is checked.
	 *
	 * **Note:** The property can be changed with user interaction,
	 * either by cliking the component, or by pressing the `Enter` or `Space` key.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property({ type: Boolean })
	checked = false;

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false

	/**
	 * Defines the text, displayed when the component is checked.
	 *
	 * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * @default undefined
	 * @public
	 */
	@property()
	textOn?: string

	/**
	 * Defines the text, displayed when the component is not checked.
	 *
	 * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * @default undefined
	 * @public
	 */
	@property()
	textOff?: string

	/**
	 * Sets the accessible ARIA name of the component.
	 *
	 * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
	 * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
	 * @default undefined
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
	 * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
	 * @default undefined
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** If applicable an external label reference should always be the preferred option to provide context to the `ui5-switch` component over a tooltip.
	 * @default undefined
	 * @public
	 * @since 1.9.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.16.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 * @since 1.16.0
	 */
	@property()
	name?: string;

	/**
	 * Defines the form value of the component.
	 * @default ""
	 * @since 2.12.0
	 * @public
	 */
	@property()
	value = "";

	@property({ type: Boolean, noAttribute: true })
	_cancelAction = false;

	@property({ type: Boolean, noAttribute: true })
	_isSpacePressed = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get formValidityMessage() {
		return Switch.i18nBundle.getText(FORM_CHECKABLE_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this.required && !this.checked };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		if (this.checked) {
			return this.value || "on";
		}

		return null;
	}

	get sapNextIcon() {
		return this.checked ? "accept" : "less";
	}

	_onclick() {
		this.toggle();
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._isSpacePressed = true;
		} else if (isShift(e) || isEscape(e)) {
			this._cancelAction = true;
		}

		if (isEnter(e)) {
			this._onclick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		const isSpaceKey = isSpace(e);
		const isCancelKey = isShift(e) || isEscape(e);

		if (isSpaceKey || isSpaceShift(e)) {
			if (this._cancelAction) {
				this._cancelAction = false;
				this._isSpacePressed = false;
				e.preventDefault();
				return;
			}

			this._isSpacePressed = false;
		} else if (isCancelKey && !this._isSpacePressed) {
			this._cancelAction = false;
		}
		if (isSpaceKey) {
			this._onclick();
		}
	}

	toggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			const changePrevented = !this.fireDecoratorEvent("change");
			// Angular two way data binding;
			const valueChangePrevented = !this.fireDecoratorEvent("value-changed");

			if (changePrevented || valueChangePrevented) {
				this.checked = !this.checked;
			}
		}
	}

	get graphical() {
		return this.design === SwitchDesign.Graphical;
	}

	get hasNoLabel() {
		return !(this.graphical || this.textOn || this.textOff);
	}

	get _textOn() {
		return this.graphical ? "" : this.textOn;
	}

	get _textOff() {
		return this.graphical ? "" : this.textOff;
	}

	get effectiveTabIndex() {
		return this.disabled ? undefined : 0;
	}

	get effectiveAriaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get accessibilityOnText() {
		return this._textOn;
	}

	get accessibilityOffText() {
		return this._textOff;
	}

	get hiddenText() {
		return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
	}

	get ariaLabelText() {
		return [getEffectiveAriaLabelText(this) || getAssociatedLabelForTexts(this), this.hiddenText].join(" ").trim();
	}
}

Switch.define();

export default Switch;
