/**
 * Different SegmentedButton selection modes.
 * @public
 */
var SegmentedButtonSelectionMode;
(function (SegmentedButtonSelectionMode) {
    /**
     * There is always one selected. Selecting one deselects the previous one.
     * @public
     */
    SegmentedButtonSelectionMode["Single"] = "Single";
    /**
     * Multiple items can be selected at a time. All items can be deselected.
     * @public
     */
    SegmentedButtonSelectionMode["Multiple"] = "Multiple";
})(SegmentedButtonSelectionMode || (SegmentedButtonSelectionMode = {}));
export default SegmentedButtonSelectionMode;
//# sourceMappingURL=SegmentedButtonSelectionMode.js.map