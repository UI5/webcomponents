import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-item` is a list item, used for displaying search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItem.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.9.0
 * @experimental
 */
declare class SearchItem extends ListItemBase {
    eventDetails: ListItemBase["eventDetails"] & {
        "delete": void;
    };
    /**
     * Defines the heading text of the search item.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the description that appears right under the item text, if available.
     * @default undefined
     * @public
     * @since 2.12.0
     */
    description?: string;
    /**
     * Defines the icon name of the search item.
     * **Note:** If provided, the image slot will be ignored.
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines whether the search item is selected.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the search item is deletable.
     * @default false
     * @public
     */
    deletable: boolean;
    /**
     * Defines the scope of the search item
     * @default undefined
     * @public
     */
    scopeName?: string;
    highlightText: string;
    /**
     * **Note:** While the slot allows the option of setting a custom avatar, to comply with the
     * design guidelines, use the `ui5-avatar` with size - XS.
     *
     * @public
     * @since 2.12.0
     */
    image: Slot<HTMLElement>;
    /**
     * Defines the actionable elements.
     * This slot allows placing additional interactive elements (such as buttons, icons, or tags)
     * next to the delete button, providing flexible customization for various user actions.
     *
     * **Note:** While the slot is flexible, for consistency with design guidelines,
     * it's recommended to use `ui5-button` with `Transparent` design or `ui5-icon` elements.
     *
     * @public
     * @since 2.16.0
     */
    actions: Slot<HTMLElement>;
    _markupText: string;
    static i18nBundle: I18nBundle;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    /**
     * Handles manual tab navigation between action items and delete button with focus looping
     */
    _handleTabNavigation(e: KeyboardEvent): boolean;
    _onDeleteButtonClick(): void;
    _onDeleteButtonKeyDown(e: KeyboardEvent): void;
    onBeforeRendering(): void;
    get _deleteButtonTooltip(): string;
    get hasActions(): boolean;
}
export default SearchItem;
