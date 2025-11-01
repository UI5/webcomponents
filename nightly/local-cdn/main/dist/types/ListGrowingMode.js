/**
 * Different list growing modes.
 * @public
 */
var ListGrowingMode;
(function (ListGrowingMode) {
    /**
     * Component's "load-more" is fired upon pressing a "More" button.
     * at the bottom.
     * @public
     */
    ListGrowingMode["Button"] = "Button";
    /**
     * Component's "load-more" is fired upon scroll.
     * @public
     */
    ListGrowingMode["Scroll"] = "Scroll";
    /**
     * Component's growing is not enabled.
     * @public
     */
    ListGrowingMode["None"] = "None";
})(ListGrowingMode || (ListGrowingMode = {}));
export default ListGrowingMode;
//# sourceMappingURL=ListGrowingMode.js.map