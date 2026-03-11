import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isEnter,
	isEscape,
	isShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import {
	isDesktop,
	isSafari,
} from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import Icon from "./Icon.js";
import HasPopup from "./types/HasPopup.js";

import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";

/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
	nonInteractive: boolean;
}

let isGlobalHandlerAttached = false;
let activeButton: Button | null = null;

type AccessibilityAttributes = {
	expanded?: "true" | "false" | boolean,
	hasPopup?: `${HasPopup}`,
	controls?: string
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
@customElement({
	tag: "ui5-button",
	languageAware: true,
	renderer: litRender,
	template: ButtonTemplate,
	styles: buttonCss,
	dependencies: [Icon],
})
/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @public
 * @native
 */
@event("click")
/**
 * Fired whenever the active state of the component changes.
 * @private
 */
@event("_active-state-change")
class Button extends UI5Element implements IFormElement, IButton {
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
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether the icon should be displayed after the component text.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * When set to `true`, the component will
	 * automatically submit the nearest HTML form element on `press`.
	 *
	 * **Note:** For the `submits` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 * @default false
	 * @public
	 * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
	 */
	@property({ type: Boolean })
	submits!: boolean;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * - `expanded`: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *	- `true`
	 *	- `false`
	 *
	 * - `hasPopup`: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values:
	 *	- `Dialog`
	 *	- `Grid`
	 *	- `ListBox`
	 *	- `Menu`
	 *	- `Tree`
	 *
	 * - `controls`: Identifies the element (or elements) whose contents or presence are controlled by the button element. Accepts a string value.
	 * @public
	 * @since 1.2.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * Defines whether the button has special form-related functionality.
	 *
	 * **Note:** For the `type` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 * @default "Button"
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: ButtonType, defaultValue: ButtonType.Button })
	type!: `${ButtonType}`;

	/**
	 * Describes the accessibility role of the button.
	 *
	 * **Note:** Use link role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
	 *
	 * @default "Button"
	 * @public
	 * @since 1.23
	 */
	@property({ type: ButtonAccessibleRole, defaultValue: ButtonAccessibleRole.Button })
	accessibleRole!: `${ButtonAccessibleRole}`;

	/**
	 * Used to switch the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Defines if a content has been added to the default slot
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly!: boolean;

	/**
	 * Indicates if the elements has a slotted icon
	 * @private
	 */
	@property({ type: Boolean })
	hasIcon!: boolean;

	/**
	 * Indicates if the element is focusable
	 * @private
	 */
	@property({ type: Boolean })
	nonInteractive!: boolean;

	/**
	 * The current title of the button, either the tooltip property or the icons tooltip. The tooltip property with higher prio.
	 * @private
	 */
	@property({ noAttribute: true })
	buttonTitle?: string;

	/**
	 * @private
	 */
	@property({ type: Object })
	_iconSettings!: object;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ defaultValue: "0", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	_isTouch!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_cancelAction!: boolean;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	_deactivate: () => void;

	_ontouchstart: PassiveEventListenerObject;

	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._deactivate = () => {
			if (activeButton) {
				activeButton._setActiveState(false);
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);

			isGlobalHandlerAttached = true;
		}

		const handleTouchStartEvent = (e: TouchEvent) => {
			markEvent(e, "button");

			if (this.nonInteractive) {
				return;
			}

			this._setActiveState(true);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	async onBeforeRendering() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (this.type !== ButtonType.Button && !formSupport) {
			console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
		if (this.submits && !formSupport) {
			console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		this.iconOnly = this.isIconOnly;
		this.hasIcon = !!this.icon;

		this.buttonTitle = this.tooltip || await this.getDefaultTooltip();
	}

	_onclick(e: MouseEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport && this._isSubmit) {
			formSupport.triggerFormSubmit(this);
		}
		if (formSupport && this._isReset) {
			formSupport.triggerFormReset(this);
		}

		if (isSafari()) {
			this.getDomRef()?.focus();
		}
	}

	_onmousedown(e: MouseEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");
		this._setActiveState(true);
		activeButton = this; // eslint-disable-line
	}

	_ontouchend(e: TouchEvent) {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (this.active) {
			this._setActiveState(false);
		}

		if (activeButton) {
			activeButton._setActiveState(false);
		}
	}

	_onmouseup(e: MouseEvent) {
		markEvent(e, "button");
	}

	_onkeydown(e: KeyboardEvent) {
		this._cancelAction = isShift(e) || isEscape(e);
		markEvent(e, "button");

		if (isSpace(e) || isEnter(e)) {
			this._setActiveState(true);
		} else if (this._cancelAction) {
			this._setActiveState(false);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this._cancelAction) {
			e.preventDefault();
		}

		if (isSpace(e) || isEnter(e)) {
			if (this.active) {
				this._setActiveState(false);
			}
		}
	}

	_onfocusout() {
		if (this.nonInteractive) {
			return;
		}

		if (this.active) {
			this._setActiveState(false);
		}
	}

	_onfocusin(e: FocusEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");
	}

	_setActiveState(active: boolean) {
		const eventPrevented = !this.fireEvent("_active-state-change", null, true);

		if (eventPrevented) {
			return;
		}

		this.active = active;
	}

	get _hasPopup() {
		return this.accessibilityAttributes.hasPopup?.toLowerCase();
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	get iconRole() {
		if (!this.icon) {
			return "";
		}

		return "presentation";
	}

	get isIconOnly() {
		return !willShowContent(this.text);
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	getDefaultTooltip() {
		if (!getEnableDefaultTooltips()) {
			return;
		}

		return getIconAccessibleName(this.icon);
	}

	get buttonTypeText() {
		return Button.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get buttonAccessibleRole() {
		return this.accessibleRole.toLowerCase();
	}

	get tabIndexValue() {
		if (this.disabled) {
			return;
		}

		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonInteractive ? "-1" : this.forcedTabIndex;
	}

	get showIconTooltip() {
		return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaDescribedbyText() {
		return this.hasButtonType ? "ui5-button-hiddenText-type" : undefined;
	}

	get _isSubmit() {
		return this.type === ButtonType.Submit || this.submits;
	}

	get _isReset() {
		return this.type === ButtonType.Reset;
	}

	static async onDefine() {
		Button.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Button.define();

export default Button;
export type {
	AccessibilityAttributes,
	IButton,
};
