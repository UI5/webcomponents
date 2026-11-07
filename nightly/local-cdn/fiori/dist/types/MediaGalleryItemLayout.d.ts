/**
 * Defines the layout of the content displayed in the `ui5-media-gallery-item`.
 * @public
 */
declare enum MediaGalleryItemLayout {
    /**
     * Recommended to use when the item contains an image.
     *
     * When a thumbnail is selected, it makes the corresponding enlarged content appear in a square display area.
     * @public
     */
    Square = "Square",
    /**
     * Recommended to use when the item contains video content.
     *
     * When a thumbnail is selected, it makes the corresponding enlarged content appear in a wide display area
     * (stretched to fill all of the available width) for optimal user experiance.
     * @public
     */
    Wide = "Wide"
}
export default MediaGalleryItemLayout;
