import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { IProductSwitchItem } from "./ProductSwitch.js";
/**
 * @class
 * ### Overview
 * The `ui5-product-switch-item` web component represents the items displayed in the
 * `ui5-product-switch` web component.
 *
 * **Note:** `ui5-product-switch-item` is not supported when used outside of `ui5-product-switch`.
 *
 * ### Keyboard Handling
 * The `ui5-product-switch` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IProductSwitchItem}
 * @since 1.0.0-rc.5
 */
declare class ProductSwitchItem extends UI5Element implements IProductSwitchItem {
    eventDetails: {
        click: {
            item: ProductSwitchItem;
        };
        _focused: void;
    };
    /**
     * Defines the title of the component.
     * @default undefined
     * @since 1.0.0-rc.15
     * @public
     */
    titleText?: string;
    /**
     * Defines the subtitle of the component.
     * @default undefined
     * @since 1.0.0-rc.15
     * @public
     */
    subtitleText?: string;
    /**
     * Defines the icon to be displayed as a graphical element within the component.
     *
     * Example:
     *
     * `<ui5-product-switch-item icon="palette">`
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines a target where the `targetSrc` content must be open.
     *
     * Available options are:
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **Note:** By default target will be open in the same frame as it was clicked.
     * @default undefined
     * @public
     */
    target?: string;
    /**
     * Defines the component target URI. Supports standard hyperlink behavior.
     * @default undefined
     * @public
     */
    targetSrc?: string;
    /**
     * Used to switch the active state (pressed or not) of the component.
     * @private
     */
    private active;
    /**
     * Used to set the selected state of the component. Only one selected in a sequence.
     * **Note:** Set by the `ProductSwitch`
     */
    selected: boolean;
    /**
     * Defines the component tabindex.
     */
    forcedTabIndex?: string;
    /**
     * Defines an image to be displayed instead of the standard icon.
     *
     * **Note:** The image slot takes precedence over the icon property.
     * **Note:** We recommend using non-interactive ui5-avatar with size S, Square shape and Transparent colorScheme for best alignment.
     * @public
     * @since 2.14.0
     */
    image: Slot<HTMLElement>;
    _deactivate: () => void;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    _onmousedown(): void;
    get _effectiveTarget(): string;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onfocusout(): void;
    _onfocusin(): void;
    _fireItemClick(): void;
}
export default ProductSwitchItem;
