/**
 * Different SegmentedButton items sizing modes.
 * @public
 */
declare enum SegmentedButtonContentMode {
    /**
     * Each item is sized to fit its content, with any extra space placed after the last item.
     * @public
     */
    ContentFit = "ContentFit",
    /**
     * All items are sized equally to fill the available space.
     * @public
     */
    EqualSized = "EqualSized"
}
export default SegmentedButtonContentMode;
