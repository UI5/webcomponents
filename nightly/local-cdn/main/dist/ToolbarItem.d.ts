import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
type IEventOptions = {
    preventClosing: boolean;
};
type ToolbarItemEventDetail = {
    targetRef: HTMLElement;
};
interface IOverflowToolbarItem extends HTMLElement {
    overflowCloseEvents?: string[] | undefined;
    hasOverflow?: boolean | undefined;
}
/**
 * Fired when the overflow popover is closed.
 * @public
 * @since 1.17.0
 */
declare class ToolbarItem extends UI5Element {
    eventDetails: {
        click: ToolbarItemEventDetail;
        "close-overflow": void;
    };
    /**
     * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
     * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
     * @public
     * @default "Default"
     */
    overflowPriority: `${ToolbarItemOverflowBehavior}`;
    /**
     * Defines if the toolbar overflow popup should close upon intereaction with the item.
     * It will close by default.
     * @default false
     * @public
     */
    preventOverflowClosing: boolean;
    /**
     * Defines if the toolbar item is overflowed.
     * @default false
     * @protected
     * @since 2.11.0
     */
    isOverflowed: boolean;
    _isRendering: boolean;
    _maxWidth: number;
    _wrapperChecked: boolean;
    fireCloseOverflowRef: () => void;
    closeOverflowSet: {
        "ui5-button": string[];
        "ui5-select": string[];
        "ui5-combobox": string[];
        "ui5-multi-combobox": string[];
        "ui5-date-picker": string[];
        "ui5-switch": string[];
    };
    predefinedWrapperSet: {
        "ui5-button": string;
        "ui5-select": string;
    };
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onExitDOM(): void;
    /**
     * Wrapped component slot.
     * @public
     * @since 2.20.0
     */
    item: IOverflowToolbarItem[];
    checkForWrapper(): void;
    getClosingEvents(): string[];
    attachCloseOverflowHandlers(): void;
    detachCloseOverflowHandlers(): void;
    fireCloseOverflow(): void;
    /**
    * Defines if the width of the item should be ignored in calculating the whole width of the toolbar
    * @protected
    */
    get ignoreSpace(): boolean;
    /**
     * Returns if the item is flexible. An item that is returning true for this property will make
     * the toolbar expand to fill the 100% width of its container.
     * @protected
     */
    get hasFlexibleWidth(): boolean;
    /**
     * Returns if the item is interactive.
     * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
     * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
     * @protected
     */
    get isInteractive(): boolean;
    get itemTagName(): string;
    get hasOverflow(): boolean;
    /**
     * Returns if the item is separator.
     * @protected
     */
    get isSeparator(): boolean;
    get stableDomRef(): string;
    get classes(): {
        root: {
            "ui5-tb-popover-item": boolean;
            "ui5-tb-item": boolean;
        };
    };
}
export type { IEventOptions, ToolbarItemEventDetail, IOverflowToolbarItem, };
export default ToolbarItem;
