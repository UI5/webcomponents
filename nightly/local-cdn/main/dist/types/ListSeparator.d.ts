/**
 * Different types of list items separators.
 * @public
 * @since 2.0.0
 */
declare enum ListSeparator {
    /**
     * Separators between the items including the last and the first one.
     * @public
     */
    All = "All",
    /**
     * Separators between the items.
     * Note: This enumeration depends on the theme.
     * @public
     */
    Inner = "Inner",
    /**
     * No item separators.
     * @public
     */
    None = "None"
}
export default ListSeparator;
