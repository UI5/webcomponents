/**
 * Different filtering types of the ComboBox.
 * @public
 */
var ComboBoxFilter;
(function (ComboBoxFilter) {
    /**
     * Defines filtering by first symbol of each word of item's text.
     * @public
     */
    ComboBoxFilter["StartsWithPerTerm"] = "StartsWithPerTerm";
    /**
     * Defines filtering by starting symbol of item's text.
     * @public
     */
    ComboBoxFilter["StartsWith"] = "StartsWith";
    /**
     * Defines contains filtering.
     * @public
     */
    ComboBoxFilter["Contains"] = "Contains";
    /**
     * Removes any filtering applied while typing
     * @public
     */
    ComboBoxFilter["None"] = "None";
})(ComboBoxFilter || (ComboBoxFilter = {}));
export default ComboBoxFilter;
//# sourceMappingURL=ComboBoxFilter.js.map