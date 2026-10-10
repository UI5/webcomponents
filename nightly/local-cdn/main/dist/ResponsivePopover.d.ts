import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Popover from "./Popover.js";
import type Dialog from "./Dialog.js";
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
declare class ResponsivePopover extends Popover {
    eventDetails: Popover["eventDetails"];
    /**
     * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
     * By default both the header and footer would be displayed.
     * @private
     */
    contentOnlyOnDesktop: boolean;
    /**
     * Used internaly for controls which must not have header.
     * @private
     */
    _hideHeader: boolean;
    /**
     * Defines whether a close button will be rendered in the header of the component
     * **Note:** If you are using the `header` slot, this property will have no effect
     * @private
     * @default false
     * @since 1.0.0-rc.16
     */
    _hideCloseButton: boolean;
    static i18nBundle: I18nBundle;
    constructor();
    openPopup(): Promise<void>;
    _show(): Promise<void>;
    handleOpenOnEnterDOM(): void;
    _dialogCloseButtonClick(): void;
    /**
     * Closes the popover/dialog.
     * @override
     */
    closePopup(escPressed?: boolean, preventRegistryUpdate?: boolean, preventFocusRestore?: boolean): void;
    toggle(opener: HTMLElement): void;
    get classes(): import("@ui5/webcomponents-base/dist/types.js").ClassMap;
    get _dialog(): Dialog;
    get contentDOM(): HTMLElement;
    get _isPhone(): boolean;
    get _displayHeader(): boolean;
    get _displayFooter(): boolean;
    get _closeDialogAriaLabel(): string;
    _beforeDialogOpen(): void;
    _afterDialogOpen(): void;
    _beforeDialogClose(e: CustomEvent<PopupBeforeCloseEventDetail>): void;
    _afterDialogClose(): void;
    get isModal(): boolean;
}
export default ResponsivePopover;
