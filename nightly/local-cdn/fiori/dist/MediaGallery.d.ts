import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type { CarouselNavigateEventDetail } from "@ui5/webcomponents/dist/Carousel.js";
import Carousel from "@ui5/webcomponents/dist/Carousel.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import MediaGalleryLayout from "./types/MediaGalleryLayout.js";
import type MediaGalleryMenuHorizontalAlign from "./types/MediaGalleryMenuHorizontalAlign.js";
import type MediaGalleryMenuVerticalAlign from "./types/MediaGalleryMenuVerticalAlign.js";
/**
 * Interface for components that can be slotted inside `ui5-media-gallery` as items.
 * @public
 */
interface IMediaGalleryItem extends UI5Element, ITabbable {
    selected: boolean;
    disabled: boolean;
    displayedContent: HTMLElement | null;
    layout: `${MediaGalleryItemLayout}`;
}
type MediaGallerySelectionChangeEventDetail = {
    item: IMediaGalleryItem;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-media-gallery` component allows the user to browse through multimedia items. Currently,
 * the supported items are images and videos. The items should be defined using the `ui5-media-gallery-item`
 * component.
 *
 * The items are initially displayed as thumbnails. When the user selects a thumbnail, the corresponding item
 * is displayed in larger size.
 *
 * The component is responsive by default and adjusts the position of the menu with respect to viewport size,
 * but the application is able to further customize the layout via the provided API.
 *
 * ### Keyboard Handling
 * The `ui5-media-gallery` provides advanced keyboard handling.
 *
 * When the thumbnails menu is focused the following keyboard
 * shortcuts allow the user to navigate through the thumbnail items:
 *
 * - [Up] or [Down] - Navigates up and down the items
 * - [Home] - Navigates to first item
 * - [End] - Navigates to the last item
 * - [Space], [Enter] - Selects an item
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/MediaGallery.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
declare class MediaGallery extends UI5Element {
    eventDetails: {
        "selection-change": MediaGallerySelectionChangeEventDetail;
        "overflow-click": void;
        "display-area-click": void;
    };
    /**
     * If set to `true`, all thumbnails are rendered in a scrollable container.
     * If `false`, only up to five thumbnails are rendered, followed by
     * an overflow button that shows the count of the remaining thumbnails.
     * @default false
     * @public
     */
    showAllThumbnails: boolean;
    /**
     * If enabled, a `display-area-click` event is fired
     * when the user clicks or taps on the display area.
     *
     * The display area is the central area that contains
     * the enlarged content of the currently selected item.
     * @default false
     * @public
     */
    interactiveDisplayArea: boolean;
    /**
     * Determines the layout of the component.
     * @default "Auto"
     * @public
     */
    layout: `${MediaGalleryLayout}`;
    /**
     * Determines the horizontal alignment of the thumbnails menu
     * vs. the central display area.
     * @default "Left"
     * @public
     */
    menuHorizontalAlign: `${MediaGalleryMenuHorizontalAlign}`;
    /**
     * Determines the vertical alignment of the thumbnails menu
     * vs. the central display area.
     * @default "Bottom"
     * @public
     */
    menuVerticalAlign: `${MediaGalleryMenuVerticalAlign}`;
    /**
     * Determines the actual applied layout type
     * (esp. needed when the app did not specify a fixed layout type
     * but selected `Auto` layout type).
     * @default "Vertical"
     * @private
     */
    effectiveLayout: `${MediaGalleryLayout}`;
    /**
     * Defines the current media query size.
     * @private
     */
    mediaRange: string;
    /**
     * The number of items in the overflow.
     * @private
     */
    _overflowSize: number;
    /**
     * Defines the component items.
     *
     * **Note:** Only one selected item is allowed.
     *
     * **Note:** Use the `ui5-media-gallery-item` component to define the desired items.
     * @public
     */
    items: DefaultSlot<IMediaGalleryItem>;
    _itemNavigation: ItemNavigation;
    _onResize: () => void;
    _selectedItem?: IMediaGalleryItem;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onAfterRendering(): void;
    _updateSelection(): void;
    _isSelectableItem(this: void, item: IMediaGalleryItem): boolean;
    _findSelectableItem(): IMediaGalleryItem | undefined;
    _updateMediaRange(width: number): void;
    _updateLayout(): void;
    _calculateOverflowSize(width: number, height: number): number;
    _toggleDisplaySquareSize(enable: boolean): void;
    _toggleMainItem9x16size(enable: boolean): void;
    _infereffectiveLayout(): "Vertical" | "Horizontal" | MediaGalleryLayout.Vertical | MediaGalleryLayout.Horizontal;
    _getMaxAllowedThumbnailsInColumn(columnHeight: number): number;
    _getOverflowSize(columnHeight: number, columnsCount: number): number;
    _getFocusableItems(): ITabbable[];
    getFocusDomRef(): HTMLElement | undefined;
    _selectItem(item: IMediaGalleryItem, userInteraction?: boolean): void;
    _updateSelectedFlag(itemToSelect: IMediaGalleryItem): void;
    _selectItemOnPhone(item: IMediaGalleryItem): void;
    _displayContent(item: IMediaGalleryItem): void;
    _onThumbnailClick(e: MouseEvent): void;
    _onOverflowBtnClick(): void;
    _onDisplayAreaClick(): void;
    _onCarouselNavigate(e: CustomEvent<CarouselNavigateEventDetail>): void;
    get _mainItemTabIndex(): 0 | undefined;
    get _selectableItems(): IMediaGalleryItem[];
    get _carousel(): Carousel | null;
    get _display(): HTMLElement | null;
    get _mainItem(): MediaGalleryItem | null;
    get _overflowBtn(): Button | null;
    get _visibleItems(): IMediaGalleryItem[];
    get _isPhonePlatform(): boolean;
    get _showThumbnails(): boolean;
    get _showOverflowBtn(): boolean;
    get _isPhoneSize(): boolean;
    get _mainItemHasWideLayout(): boolean | null;
    get _shouldHaveWideDisplay(): boolean;
    get _shouldHaveSquareDisplay(): boolean;
    static get THUMBNAIL_HEIGHT(): number;
    static get THUMBNAIL_MARGIN(): number;
}
export default MediaGallery;
export type { MediaGallerySelectionChangeEventDetail, IMediaGalleryItem, };
