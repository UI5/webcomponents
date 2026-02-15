import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ChangeInfo, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ToolbarAlign from "./types/ToolbarAlign.js";
import type ToolbarDesign from "./types/ToolbarDesign.js";
import type ToolbarItem from "./ToolbarItem.js";
import type Button from "./Button.js";
import type Popover from "./Popover.js";
type ToolbarMinWidthChangeEventDetail = {
    minWidth: number;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - The control is not interactive, but can contain of interactive elements
 * - [Tab] - iterates through elements
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
declare class Toolbar extends UI5Element {
    eventDetails: {
        "_min-content-width-change": ToolbarMinWidthChangeEventDetail;
    };
    static i18nBundle: I18nBundle;
    /**
     * Indicated the direction in which the Toolbar items will be aligned.
     * @public
     * @default "End"
     */
    alignContent: `${ToolbarAlign}`;
    /**
     * Calculated width of the whole toolbar.
     * @private
     * @default undefined
     */
    width?: number;
    /**
     * Calculated width of the toolbar content.
     * @private
     * @default undefined
     */
    contentWidth?: number;
    /**
     * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
     * @private
     */
    reverseOverflow: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the input.
     * @default undefined
     * @public
     */
    accessibleNameRef?: string;
    /**
     * Defines the toolbar design.
     * @public
     * @default "Solid"
     * @since 2.0.0
     */
    design: `${ToolbarDesign}`;
    popoverOpen: boolean;
    /**
     * Defines the items of the component.
     *
     * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
     * @public
     */
    items: DefaultSlot<ToolbarItem>;
    _onResize: ResizeObserverCallback;
    _onCloseOverflow: EventListener;
    itemsToOverflow: Array<ToolbarItem>;
    itemsWidth: number;
    minContentWidth: number;
    ITEMS_WIDTH_MAP: Map<string, number>;
    static get styles(): string[];
    constructor();
    /**
     * Read-only members
     */
    get overflowButtonSize(): number;
    get padding(): number;
    get alwaysOverflowItems(): ToolbarItem[];
    get movableItems(): ToolbarItem[];
    get overflowItems(): ToolbarItem[];
    get standardItems(): ToolbarItem[];
    get hideOverflowButton(): boolean;
    get interactiveItems(): ToolbarItem[];
    /**
     * Accessibility
     */
    get hasAriaSemantics(): boolean;
    get accessibleRole(): "toolbar" | undefined;
    get ariaLabelText(): string | undefined;
    get accInfo(): {
        root: {
            role: "toolbar" | undefined;
            accessibleName: string | undefined;
        };
        overflowButton: {
            accessibleName: string;
            tooltip: string;
            accessibilityAttributes: {
                expanded: boolean;
                hasPopup: "menu";
            };
        };
        popover: {
            accessibleName: string;
        };
    };
    /**
     * Toolbar Overflow Popover
     */
    get overflowButtonDOM(): Button | null;
    get hasFlexibleSpacers(): boolean;
    /**
     * Lifecycle methods
     */
    onEnterDOM(): void;
    onExitDOM(): void;
    onInvalidation(changeInfo: ChangeInfo): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    addItemsAdditionalProperties(item: ToolbarItem): void;
    /**
     * Returns if the overflow popup is open.
     * @public
     */
    isOverflowOpen(): boolean;
    openOverflow(): void;
    closeOverflow(): void;
    toggleOverflow(): void;
    getOverflowPopover(): Popover;
    /**
     * Layout management
     */
    processOverflowLayout(): void;
    storeItemsWidth(): void;
    distributeItems(overflowSpace?: number): void;
    distributeItemsThatAlwaysOverflow(): void;
    setSeperatorsVisibilityInOverflow(): void;
    shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<ToolbarItem>): boolean;
    /**
     * Adds AlwaysOverflow items to overflow to ensure they are never rendered outside overflow (and visual flash is prevented)
     */
    prePopulateAlwaysOverflowItems(): void;
    /**
     * Event Handlers
     */
    onOverflowPopoverClosed(): void;
    onOverflowPopoverOpened(): void;
    onResize(): void;
    /**
     * Private members
     */
    attachListeners(): void;
    detachListeners(): void;
    onToolbarItemChange(): void;
    getItemWidth(item: ToolbarItem): number;
    getCachedItemWidth(id: string): number | undefined;
}
export default Toolbar;
export type { ToolbarMinWidthChangeEventDetail, };
