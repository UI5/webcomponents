/**
 * Selection modes of the &lt;ui5-table&gt; component.
 *
 * @public
 * @experimental
 * @deprecated This component is deprecated and will be removed in future releases. Use the `ui5-table-selection-single` or `ui5-table-selection-multi` components instead.
 */
declare enum TableSelectionMode {
    /**
     * Default mode (no selection).
     * @public
     */
    None = "None",
    /**
     * Single selection mode (only one table row can be selected).
     * @public
     */
    Single = "Single",
    /**
     * Multi selection mode (more than one table row can be selected).
     * @public
     */
    Multiple = "Multiple"
}
export default TableSelectionMode;
