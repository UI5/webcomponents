import TableSelectionBase from "./TableSelectionBase.js";
import type TableRow from "./TableRow.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection-single` component is used inside the `ui5-table` to add single selection capabilities to the `ui5-table`.
 * Since selection is key-based, each `ui5-table-row` must define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection-single` component is a feature designed exclusively for use within the `ui5-table` component.
 * It must be placed inside the `features` slot of `ui5-table`.
 * This component is not intended for standalone use.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection-single slot="features" selected="Row1"></ui5-table-selection-single>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelectionSingle.js";`
 *
 * @constructor
 * @extends TableSelectionBase
 * @since 2.8.0
 * @public
 */
declare class TableSelectionSingle extends TableSelectionBase {
    /**
     * Defines the `row-key` value of the selected row.
     *
     * @default undefined
     * @public
     */
    selected?: string;
    isSelected(row: TableRow): boolean;
    setSelected(row: TableRow, selected: boolean, fireEvent?: boolean): void;
    /**
     * Returns the selected row.
     *
     * @public
     */
    getSelectedRow(): TableRow | undefined;
}
export default TableSelectionSingle;
