import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import {
	isEscape,
	isSpace,
	isEnter,
	isDown,
	isUp,
	isDownAlt,
	isUpAlt,
	isF4,
	isShift,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Button from "./Button.js";
import HasPopup from "./types/HasPopup.js";

import {
	SPLIT_BUTTON_DESCRIPTION,
	SPLIT_BUTTON_KEYBOARD_HINT,
	SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import SplitButtonTemplate from "./generated/templates/SplitButtonTemplate.lit.js";

// Styles
import SplitButtonCss from "./generated/themes/SplitButton.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-split-button` enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - `Space` or `Enter` for default action,
 * and `Arrow Down` or `Arrow Up` for arrow action.
 *
 * ### Usage
 *
 * `ui5-split-button` consists two separate buttons:
 *
 * - for the first one (default action) you can define some `text` or an `icon`, or both.
 * Also, it is possible to define different icon for active state of this button - `activeIcon`.
 * - the second one (arrow action) contains only `slim-arrow-down` icon.
 *
 * You can choose a `design` from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 *
 * You can set the `ui5-split-button` as enabled or disabled. Both parts of an enabled
 * `ui5-split-button` can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-split-button` appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * ### Keyboard Handling
 *
 * - `Space` or `Enter` - triggers the default action
 * - `Shift` or `Escape` - if `Space` is pressed, releases the default action button without triggering the click event.
 * - `Arrow Down`, `Arrow Up`, `Alt`+`Arrow Down`, `Alt`+`Arrow Up`, or `F4` - triggers the arrow action
 * There are separate events that are fired on activating of `ui5-split-button` parts:
 *
 * - `click` for the first button (default action)
 * - `arrow-click` for the second button (arrow action)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SplitButton.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
@customElement({
	tag: "ui5-split-button",
	renderer: litRender,
	styles: SplitButtonCss,
	template: SplitButtonTemplate,
	dependencies: [Button],
})
/**
 * Fired when the user clicks on the default action.
 * @public
 */
@event("click")

/**
 * Fired when the user clicks on the arrow action.
 * @public
 */
@event("arrow-click")
class SplitButton extends UI5Element {
	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the icon to be displayed in active state as graphical element within the component.
	 * @default ""
	 * @public
	 */
	@property()
	activeIcon!: string;

	/**
	 * Defines whether the arrow button should have the active state styles or not.
	 * @default false
	 * @public
	 * @since 1.21.0
	 */
	@property({ type: Boolean })
	activeArrowButton!: boolean;

	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: `${ButtonDesign}`;

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Accessibility-related properties for inner elements of the Split Button
	 * @private
	 */
	@property({ type: Object })
	_splitButtonAccInfo!: Record<string, boolean>;

	/**
	 * Defines the tabIndex of the component.
	 * @default "0"
	 * @private
	 */
	@property({ defaultValue: "0", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Indicates if there is Space key pressed
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_spacePressed!: boolean;

	/**
	 * Indicates if there is SHIFT or ESCAPE key pressed
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_shiftOrEscapePressed!: boolean;

	/**
	 * Defines the active state of the text button
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_textButtonActive!: boolean;

	/**
	 * Defines the icon of the text button
	 * @default ""
	 * @private
	 */
	@property({ noAttribute: true })
	_textButtonIcon!: string;

	/**
	 * Defines the state of the internal Button used for the Arrow button of the SplitButton.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_activeArrowButton!: boolean;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	_textButtonPress: { handleEvent: (e: MouseEvent) => void, passive: boolean };
	_isDefaultActionPressed = false;
	_isKeyDownOperation = false;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		SplitButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		const handleTouchStartEvent = (e: MouseEvent) => {
			e.stopPropagation();
			this._textButtonActive = true;
			this._tabIndex = "-1";
		};

		this._textButtonPress = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	onBeforeRendering() {
		this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
		if (this.disabled) {
			this._tabIndex = "-1";
		}
	}

	_handleMouseClick(e: MouseEvent) {
		this._fireClick(e);
	}

	_onFocusOut(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}

		this._shiftOrEscapePressed = false;
		this._setTabIndexValue();
	}

	_onFocusIn(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}
		this._shiftOrEscapePressed = false;
	}

	_onInnerButtonFocusIn(e: FocusEvent) {
		e.stopPropagation();
		this._setTabIndexValue(true);
		const target = e.target as Button;
		target.focus();
	}

	_onKeyDown(e: KeyboardEvent) {
		this._isKeyDownOperation = true;
		if (this._isArrowKeyAction(e)) {
			this._handleArrowButtonAction(e);
			this._activeArrowButton = true;
		} else if (this._isDefaultAction(e)) {
			this._handleDefaultAction(e);
			this._isDefaultActionPressed = true;
		}

		if (this._spacePressed && this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		// Handles button freeze issue when pressing Enter/Space and navigating with Tab/Shift+Tab simultaneously.
		if (this._isDefaultActionPressed && (isTabNext(e) || isTabPrevious(e))) {
			this._activeArrowButton = false;
			this._textButtonActive = false;
		}

		this._tabIndex = "-1";
	}

	_onKeyUp(e: KeyboardEvent) {
		this._isKeyDownOperation = false;
		if (this._isArrowKeyAction(e)) {
			e.preventDefault();
			this._activeArrowButton = false;
			this._textButtonActive = false;
		} else if (this._isDefaultAction(e)) {
			this._isDefaultActionPressed = false;
			this._textButtonActive = false;
			if (isSpace(e)) {
				e.preventDefault();
				e.stopPropagation();
				this._fireClick();
				this._spacePressed = false;
				this._textButtonActive = false;
			}
		}

		if (this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		this._tabIndex = "-1";
	}

	_fireClick(e?: Event) {
		e?.stopPropagation();
		if (!this._shiftOrEscapePressed) {
			this.fireEvent("click");
		}
		this._shiftOrEscapePressed = false;
	}

	_fireArrowClick(e?: Event) {
		e?.stopPropagation();

		this.fireEvent("arrow-click");
	}

	_textButtonRelease() {
		this._textButtonActive = false;
		this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
		this._tabIndex = "-1";
	}

	_arrowButtonPress(e: MouseEvent) {
		e.stopPropagation();

		this._tabIndex = "-1";
	}

	_arrowButtonRelease(e: MouseEvent) {
		e.preventDefault();

		this._tabIndex = "-1";
	}

	_setTabIndexValue(innerButtonPressed?: boolean) {
		this._tabIndex = this.disabled ? "-1" : "0";

		if (this._tabIndex === "-1" && innerButtonPressed) {
			this._tabIndex = "0";
		}
	}

	_onArrowButtonActiveStateChange(e: CustomEvent) {
		if (this.activeArrowButton) {
			e.preventDefault();
		}
	}

	/**
	 * Checks if the pressed key is an arrow key.
	 * @param e - keyboard event
	 * @private
	 */
	_isArrowKeyAction(e: KeyboardEvent): boolean {
		return isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e);
	}

	/**
	 * Checks if the pressed key is a default action key (Space or Enter).
	 * @param e - keyboard event
	 * @private
	 */
	_isDefaultAction(e: KeyboardEvent): boolean {
		return isSpace(e) || isEnter(e);
	}

	/**
	 * Checks if the pressed key is an escape key or shift key.
	 * @param e - keyboard event
	 * @private
	 */
	_isShiftOrEscape(e: KeyboardEvent): boolean {
		return isEscape(e) || isShift(e);
	}

	/**
	 * Handles the click event and the focus on the arrow button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleArrowButtonAction(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();

		this._fireArrowClick(e);

		if (isSpace((e as KeyboardEvent))) {
			this._spacePressed = true;
		}
	}

	/**
	 * Handles the default action and the active state of the respective button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleDefaultAction(e: KeyboardEvent) {
		e.preventDefault();
		const wasSpacePressed = isSpace(e);
		const target = e.target as Button;

		if (this.arrowButton && target === this.arrowButton) {
			this._activeArrowButton = true;
			this._fireArrowClick();
			if (wasSpacePressed) {
				this._spacePressed = true;
				this._textButtonActive = false;
			}
		} else {
			this._textButtonActive = true;
			this._fireClick();
			if (wasSpacePressed) {
				this._spacePressed = true;
			}
		}
	}

	_handleShiftOrEscapePressed() {
		this._shiftOrEscapePressed = true;
		this._textButtonActive = false;
		this._isKeyDownOperation = false;
	}

	get effectiveActiveArrowButton() {
		return this.activeArrowButton || this._activeArrowButton;
	}

	get textButtonAccText() {
		return this.textContent;
	}

	get isTextButton() {
		return !!this.textContent;
	}

	get textButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-text-button");
	}

	get arrowButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-arrow-button");
	}

	get accInfo() {
		return {
			root: {
				"description": SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION),
				"keyboardHint": SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT),
			},
			arrowButton: {
				"title": this.arrowButtonTooltip,
				"accessibilityAttributes": {
					"hasPopup": (this._splitButtonAccInfo && this._splitButtonAccInfo.ariaHaspopup) || HasPopup.Menu.toLocaleLowerCase(),
					"expanded": this._splitButtonAccInfo && this._splitButtonAccInfo.ariaExpanded,
				},
			},
		};
	}

	get arrowButtonTooltip() {
		return SplitButton.i18nBundle.getText(SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP);
	}

	get ariaLabelText() {
		return [SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION), SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT)].join(" ");
	}
}

SplitButton.define();

export default SplitButton;
