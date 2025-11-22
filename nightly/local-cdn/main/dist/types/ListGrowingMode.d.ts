/**
 * Different list growing modes.
 * @public
 */
declare enum ListGrowingMode {
    /**
     * Component's "load-more" is fired upon pressing a "More" button.
     * at the bottom.
     * @public
     */
    Button = "Button",
    /**
     * Component's "load-more" is fired upon scroll.
     * @public
     */
    Scroll = "Scroll",
    /**
     * Component's growing is not enabled.
     * @public
     */
    None = "None"
}
export default ListGrowingMode;
