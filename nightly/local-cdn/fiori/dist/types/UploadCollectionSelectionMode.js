/**
 * Different UploadCollection selection modes.
 * @public
 */
var UploadCollectionSelectionMode;
(function (UploadCollectionSelectionMode) {
    /**
     * Default mode (no selection).
     * @public
     */
    UploadCollectionSelectionMode["None"] = "None";
    /**
     * Right-positioned single selection mode (only one list item can be selected).
     * @public
     */
    UploadCollectionSelectionMode["Single"] = "Single";
    /**
     * Left-positioned single selection mode (only one list item can be selected).
     * @public
     */
    UploadCollectionSelectionMode["SingleStart"] = "SingleStart";
    /**
     * Selected item is highlighted but no selection element is visible
     * (only one list item can be selected).
     * @public
     */
    UploadCollectionSelectionMode["SingleEnd"] = "SingleEnd";
    /**
     * Selected item is highlighted and selection is changed upon arrow navigation
     * (only one list item can be selected - this is always the focused item).
     * @public
     */
    UploadCollectionSelectionMode["SingleAuto"] = "SingleAuto";
    /**
     * Multi selection mode (more than one list item can be selected).
     * @public
     */
    UploadCollectionSelectionMode["Multiple"] = "Multiple";
})(UploadCollectionSelectionMode || (UploadCollectionSelectionMode = {}));
export default UploadCollectionSelectionMode;
//# sourceMappingURL=UploadCollectionSelectionMode.js.map