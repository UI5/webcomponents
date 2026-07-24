/**
 * Timeline growing modes.
 * @public
 * @since 2.7.0
 */
declare enum TimelineGrowingMode {
    /**
     * Event `load-more` is fired
     * upon pressing a "More" button at the end.
     * @public
     */
    Button = "Button",
    /**
     * Event `load-more` is fired upon scroll.
     * @public
     */
    Scroll = "Scroll",
    /**
     * The growing feature is not enabled.
     * @public
     */
    None = "None"
}
export default TimelineGrowingMode;
