import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type MessageStripDesign from "./types/MessageStripDesign.js";
import MessageStripTemplate from "./MessageStripTemplate.js";
import type { IIcon } from "./Icon.js";
import {
	MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION,
	MESSAGE_STRIP_CLOSE_BUTTON_POSITIVE,
	MESSAGE_STRIP_CLOSE_BUTTON_NEGATIVE,
	MESSAGE_STRIP_CLOSE_BUTTON_CRITICAL,
	MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM,
	MESSAGE_STRIP_CLOSABLE,
	MESSAGE_STRIP_ERROR,
	MESSAGE_STRIP_WARNING,
	MESSAGE_STRIP_SUCCESS,
	MESSAGE_STRIP_INFORMATION,
	MESSAGE_STRIP_CUSTOM,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import messageStripCss from "./generated/themes/MessageStrip.css.js";

enum DesignClassesMapping {
	Information = "ui5-message-strip-root--info",
	Positive = "ui5-message-strip-root--positive",
	Negative = "ui5-message-strip-root--negative",
	Critical = "ui5-message-strip-root--critical",
	ColorSet1 = "ui5-message-strip-root--color-set-1",
	ColorSet2 = "ui5-message-strip-root--color-set-2",
}

type DesignTypeAnnouncemnt = Record<MessageStripDesign, string>;

type DesignCloseButtonTooltip = Record<MessageStripDesign, string>;

/**
 * @class
 *
 * ### Overview
 *
 * The ui5-message-strip component allows for the embedding of application-related messages.
 * It supports four semantic designs, each with its own color and icon: "Information", "Positive", "Critical", and "Negative".
 * Additionally, users can choose from two color sets ("ColorSet1" and "ColorSet2"), each containing 10 predefined color schemes.
 * Each message shows a "Close" button, so that it can be removed from the UI, if needed.

 * ### Usage
 *
 * For the `ui5-message-strip` component, you can define whether it displays
 * an icon in the beginning and a close button. Moreover, its size and background
 * can be controlled with CSS.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MessageStrip.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.9.0
 * @slot {Array<Node>} default
 * Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
@customElement({
	tag: "ui5-message-strip",
	languageAware: true,
	renderer: jsxRenderer,
	template: MessageStripTemplate,
	styles: messageStripCss,
})
/**
 * Fired when the close button is pressed either with a
 * click/tap or by using the Enter or Space key.
 * @public
 */
@event("close")

class MessageStrip extends UI5Element {
	eventDetails!: {
		close: void;
	}
	/**
	 * Defines the component type.
	 * @default "Information"
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	design: `${MessageStripDesign}` = "Information";

	/**
	 * Defines the color scheme of the component.
	 * There are 10 predefined schemes.
	 * To use one you can set a number from `"1"` to `"10"`. The `colorScheme` `"1"` will be set by default.
	 *
	 * @default "1"
	 * @public
	 * @since 2.0.0
	 */
	@property()
	colorScheme = "1"

	/**
	 * Defines whether the MessageStrip will show an icon in the beginning.
	 * You can directly provide an icon with the `icon` slot. Otherwise, the default icon for the type will be used.
	 *
	 *  * **Note:** If <code>MessageStripDesign.ColorSet1</code> or <code>MessageStripDesign.ColorSet2</code> value is set to the <code>design</code> property, default icon will not be presented.
	 *
	 * @default false
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	hideIcon = false

	/**
	 * Defines whether the MessageStrip renders close button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideCloseButton = false;

	/**
	 * Defines the content to be displayed as graphical element within the component.
	 *
	 * **Note:** If no icon is given, the default icon for the component type will be used.
	 * The SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @public
	 */
	@slot()
	icon!: Slot<IIcon[]>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_closeClick() {
		this.fireDecoratorEvent("close");
	}

	static designAnnouncementMappings(): DesignTypeAnnouncemnt {
		const getTranslation = (text:I18nText): string => {
			return MessageStrip.i18nBundle.getText(text);
		};

		return {
			Information: getTranslation(MESSAGE_STRIP_INFORMATION),
			Positive: getTranslation(MESSAGE_STRIP_SUCCESS),
			Negative: getTranslation(MESSAGE_STRIP_ERROR),
			Critical: getTranslation(MESSAGE_STRIP_WARNING),
			ColorSet1: getTranslation(MESSAGE_STRIP_CUSTOM),
			ColorSet2: getTranslation(MESSAGE_STRIP_CUSTOM),
		};
	}

	get hiddenText() {
		return `${MessageStrip.designAnnouncementMappings()[this.design]} ${this.hideCloseButton ? "" : this._closableText}`;
	}

	get shouldHideIcon() {
		if (this.designClasses === DesignClassesMapping.ColorSet1 || this.designClasses === DesignClassesMapping.ColorSet2) {
			return this.hideIcon || this.icon.length === 0;
		}

		return this.hideIcon;
	}

	static closeButtonMappings(): DesignCloseButtonTooltip {
		const getTranslation = (text:I18nText): string => {
			return MessageStrip.i18nBundle.getText(text);
		};

		return {
			Information: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_INFORMATION),
			Positive: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_POSITIVE),
			Negative: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_NEGATIVE),
			Critical: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_CRITICAL),
			ColorSet1: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM),
			ColorSet2: getTranslation(MESSAGE_STRIP_CLOSE_BUTTON_CUSTOM),
		};
	}

	get _closeButtonText() {
		return MessageStrip.closeButtonMappings()[this.design];
	}

	get _closableText() {
		return MessageStrip.i18nBundle.getText(MESSAGE_STRIP_CLOSABLE);
	}

	get iconProvided() {
		return this.icon.length > 0;
	}

	get designClasses() {
		return DesignClassesMapping[this.design];
	}
}

MessageStrip.define();

export default MessageStrip;
