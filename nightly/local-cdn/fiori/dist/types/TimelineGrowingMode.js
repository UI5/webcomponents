/**
 * Timeline growing modes.
 * @public
 * @since 2.7.0
 */
var TimelineGrowingMode;
(function (TimelineGrowingMode) {
    /**
     * Event `load-more` is fired
     * upon pressing a "More" button at the end.
     * @public
     */
    TimelineGrowingMode["Button"] = "Button";
    /**
     * Event `load-more` is fired upon scroll.
     * @public
     */
    TimelineGrowingMode["Scroll"] = "Scroll";
    /**
     * The growing feature is not enabled.
     * @public
     */
    TimelineGrowingMode["None"] = "None";
})(TimelineGrowingMode || (TimelineGrowingMode = {}));
export default TimelineGrowingMode;
//# sourceMappingURL=TimelineGrowingMode.js.map