/**
 * Different filtering types of the Input.
 * @public
 */
 enum InputSuggestionsFilter {
    /**
     * Defines filtering by first symbol of each word of item's text.
     * @public
     */
    StartsWithPerTerm = "StartsWithPerTerm",

    /**
     * Defines filtering by starting symbol of item's text.
     * @public
     */
    StartsWith = "StartsWith",

    /**
     * Defines contains filtering.
     * @public
     */
    Contains = "Contains",

    /**
     * Removes any filtering applied while typing
     * @public
     */
    None = "None",
}

export default InputSuggestionsFilter;
