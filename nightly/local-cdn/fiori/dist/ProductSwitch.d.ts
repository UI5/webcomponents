import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
/**
 * Interface for components that may be slotted inside `ui5-product-switch` as items
 * @public
 */
interface IProductSwitchItem extends HTMLElement, ITabbable {
    titleText?: string;
    subtitleText?: string;
    icon?: string;
    target?: string;
    targetSrc?: string;
    selected: boolean;
}
/**
 * @class
 * ### Overview
 *
 * The `ui5-product-switch` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily switch between products.
 *
 * ### Keyboard Handling
 * The `ui5-product-switch` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Tab] - Move focus to the next interactive element after the `ui5-product-switch`
 * - [Up] or [Down] - Navigates up and down the items
 * - [Left] or [Right] - Navigates left and right the items
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";` (for `ui5-product-switch-item`)
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.5
 */
declare class ProductSwitch extends UI5Element {
    /**
     * Indicates how many columns are displayed.
     * @private
     */
    desktopColumns?: number;
    /**
     * Defines the items of the `ui5-product-switch`.
     * @public
     */
    items: DefaultSlot<IProductSwitchItem>;
    _itemNavigation: ItemNavigation;
    _currentIndex: number;
    _rowSize: number;
    _handleResizeBound: ResizeObserverCallback;
    constructor();
    static i18nBundle: I18nBundle;
    static get ROW_MIN_WIDTH(): {
        ONE_COLUMN: number;
        THREE_COLUMN: number;
    };
    get _ariaLabelText(): string;
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    _handleResize(): void;
    handleProductSwitchItemClick(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    _setRowSize(size: number): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleDown(e: KeyboardEvent): void;
    _handleUp(e: KeyboardEvent): void;
    getFocusDomRef(): HTMLElement | undefined;
}
export default ProductSwitch;
export type { IProductSwitchItem, };
