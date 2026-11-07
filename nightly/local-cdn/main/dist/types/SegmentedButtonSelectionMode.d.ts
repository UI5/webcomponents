/**
 * Different SegmentedButton selection modes.
 * @public
 */
declare enum SegmentedButtonSelectionMode {
    /**
     * There is always one selected. Selecting one deselects the previous one.
     * @public
     */
    Single = "Single",
    /**
     * Multiple items can be selected at a time. All items can be deselected.
     * @public
     */
    Multiple = "Multiple"
}
export default SegmentedButtonSelectionMode;
