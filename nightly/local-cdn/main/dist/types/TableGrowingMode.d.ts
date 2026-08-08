/**
 * Growing mode of the &lt;ui5-table&gt; component.
 *
 * @public
 */
declare enum TableGrowingMode {
    /**
     * Renders a growing button, which can be pressed to load more data.
     * @public
     */
    Button = "Button",
    /**
     * Scroll to load more data.
     *
     * **Note:** If the table is not scrollable, a growing button will be rendered instead to ensure growing functionality.
     * @public
     */
    Scroll = "Scroll"
}
export default TableGrowingMode;
