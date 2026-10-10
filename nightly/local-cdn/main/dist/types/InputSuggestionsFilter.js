/**
 * Different filtering types of the Input.
 * @public
 */
var InputSuggestionsFilter;
(function (InputSuggestionsFilter) {
    /**
     * Defines filtering by first symbol of each word of item's text.
     * @public
     */
    InputSuggestionsFilter["StartsWithPerTerm"] = "StartsWithPerTerm";
    /**
     * Defines filtering by starting symbol of item's text.
     * @public
     */
    InputSuggestionsFilter["StartsWith"] = "StartsWith";
    /**
     * Defines contains filtering.
     * @public
     */
    InputSuggestionsFilter["Contains"] = "Contains";
    /**
     * Removes any filtering applied while typing
     * @public
     */
    InputSuggestionsFilter["None"] = "None";
})(InputSuggestionsFilter || (InputSuggestionsFilter = {}));
export default InputSuggestionsFilter;
//# sourceMappingURL=InputSuggestionsFilter.js.map