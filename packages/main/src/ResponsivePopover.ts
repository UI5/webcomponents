import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";

import { RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON } from "./generated/i18n/i18n-defaults.js";

import ResponsivePopoverTemplate from "./ResponsivePopoverTemplate.js";
import Popover from "./Popover.js";
import type Dialog from "./Dialog.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";
import type { PopupBeforeCloseEventDetail } from "./Popup.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-responsive-popover` acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * ### Usage
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ResponsivePopover.js";`
 * @constructor
 * @extends Popover
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-responsive-popover",
	styles: [Popover.styles, ResponsivePopoverCss],
	template: ResponsivePopoverTemplate,
})
class ResponsivePopover extends Popover {
	eventDetails!: Popover["eventDetails"]

	/**
	 * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
	 * By default both the header and footer would be displayed.
	 * @private
	 */
	@property({ type: Boolean })
	contentOnlyOnDesktop = false;

	
	@property({ type: Boolean })
	stretch = false;

	/**
	 * Used internaly for controls which must not have header.
	 * @private
	 */
	@property({ type: Boolean })
	_hideHeader = false;

	/**
	 * Defines whether a close button will be rendered in the header of the component
	 * **Note:** If you are using the `header` slot, this property will have no effect
	 * @private
	 * @default false
	 * @since 1.0.0-rc.16
	 */
	@property({ type: Boolean })
	_hideCloseButton = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
	}

	async openPopup() {
		if (!isPhone()) {
			await super.openPopup();
		} else if (this._dialog) {
			this._dialog.open = true;
		}
	}

	async _show() {
		if (!isPhone()) {
			return super._show();
		}
	}

	handleOpenOnEnterDOM() {
		if (this.open && !isPhone()) {
			this.showPopover();
			this.openPopup();
		}
	}

	_dialogCloseButtonClick() {
		this.closePopup();
	}

	/**
	 * Closes the popover/dialog.
	 * @override
	 */
	closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) : void {
		if (!isPhone()) {
			super.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
		} else {
			this._dialog?.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
		}
	}

	toggle(opener: HTMLElement) : void {
		if (this.open) {
			this.closePopup();
			return;
		}

		this.opener = opener;
		this.open = true;
	}

	get classes() {
		const allClasses = super.classes;

		allClasses.header = {
			"ui5-responsive-popover-header": true,
			"ui5-responsive-popover-header-no-title": !this.headerText,
		};

		return allClasses;
	}

	get _dialog() {
		return this.shadowRoot!.querySelector<Dialog>("[ui5-dialog]")!;
	}

	get contentDOM() {
		return isPhone() ? this._dialog.contentDOM : super.contentDOM;
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return (isPhone() || !this.contentOnlyOnDesktop) && super._displayHeader;
	}

	get _displayFooter() {
		return isPhone() || !this.contentOnlyOnDesktop;
	}

	get _closeDialogAriaLabel() {
		return ResponsivePopover.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
	}

	_beforeDialogOpen() {
		this._opened = true;
		this.open = true;
		this.fireDecoratorEvent("before-open");
	}

	_afterDialogOpen() {
		this.fireDecoratorEvent("open");
	}

	_beforeDialogClose(e: CustomEvent<PopupBeforeCloseEventDetail>) {
		this.fireDecoratorEvent("before-close", e.detail);
	}

	_afterDialogClose() {
		this._opened = false;
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	get isModal() {
		if (!isPhone()) {
			return super.isModal;
		}

		return this._dialog.isModal;
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
