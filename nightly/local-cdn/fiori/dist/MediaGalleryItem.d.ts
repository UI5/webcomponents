import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
import type { IMediaGalleryItem } from "./MediaGallery.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * ### Overview
 * The `ui5-media-gallery-item` web component represents the items displayed in the
 * `ui5-media-gallery` web component.
 *
 * **Note:** `ui5-media-gallery-item` is not supported when used outside of `ui5-media-gallery`.
 *
 * ### Keyboard Handling
 * The `ui5-media-gallery` provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - [Space] / [Enter] or [Return] - Trigger `ui5-click` event
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";` (comes with `ui5-media-gallery`)
 * @constructor
 * @extends UI5Element
 * @public
 * @implements {IMediaGalleryItem}
 * @since 1.1.0
 */
declare class MediaGalleryItem extends UI5Element implements IMediaGalleryItem {
    eventDetails: {
        click: {
            item: MediaGalleryItem;
        };
    };
    /**
     * Defines the selected state of the component.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines whether the component is in disabled state.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines the layout of the item container.
     * @default "Square"
     * @public
     */
    layout: `${MediaGalleryItemLayout}`;
    /**
     * @private
     */
    _interactive: boolean;
    /**
     * @private
     */
    _square: boolean;
    /**
     * @private
     */
    _contentImageNotFound: boolean;
    /**
     * @private
     */
    _thumbnailNotFound: boolean;
    /**
     * @private
     */
    _thumbnailDesign: boolean;
    /**
     * @private
     */
    forcedTabIndex?: string;
    /**
     * @private
     */
    contentHeight?: string;
    /**
     * Defines the content of the component.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines the content of the thumbnail.
     * @public
     */
    thumbnail: Slot<HTMLElement>;
    _monitoredThumbnail: HTMLElement | null;
    _monitoredContent: HTMLElement | null;
    constructor();
    onEnterDOM(): void;
    get _thumbnail(): HTMLElement | null;
    get displayedContent(): HTMLElement | null;
    get _isThubmnailAvailable(): boolean | null;
    get _isContentAvailable(): boolean | null;
    get _useThumbnail(): boolean | null;
    get _useContent(): boolean | null;
    get effectiveTabIndex(): number | undefined;
    get _showBackgroundIcon(): boolean;
    get styles(): {
        wrapper: {
            height: string | undefined;
        };
    };
    get _role(): "button" | undefined;
    onBeforeRendering(): void;
    _monitorLoadingError(): void;
    _attachListeners(element: HTMLImageElement, callback: (image: HTMLImageElement) => void): true | undefined;
    _updateContentImageLoaded(image: HTMLImageElement): void;
    _updateThumbnailLoaded(image: HTMLImageElement): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _fireItemClick(): void;
}
export default MediaGalleryItem;
