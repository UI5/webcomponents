import TableCellBase from "./TableCellBase.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 */
declare class TableHeaderCell extends TableCellBase {
    /**
     * Defines the width of the column.
     *
     * By default, the column will grow and shrink according to the available space.
     * This will distribute the space proportionally among all columns with no specific width set.
     *
     * See [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) and
     * [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) for possible width values.
     *
     * @default undefined
     * @public
     */
    width?: string;
    /**
     * Defines the minimum width of the column.
     *
     * If the table is in `Popin` mode and the minimum width does not fit anymore,
     * the column will move into the popin.
     *
     * By default, the table prevents the column from becoming too small.
     * Changing this value to a small value might lead to accessibility issues.
     *
     * **Note:** This property only takes effect for columns with a [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) value
     * or the default width.
     *
     * @public
     * @default undefined
     */
    minWidth?: string;
    /**
     * Defines the importance of the column.
     *
     * This property affects the popin behaviour.
     * Columns with higher importance will move into the popin area later then less important
     * columns.
     *
     * @default 0
     * @public
     */
    importance: number;
    /**
     * The text for the column when it pops in.
     *
     * @default undefined
     * @since 2.7.0
     * @public
     */
    popinText?: string;
    /**
     * Defines the sort indicator of the column.
     *
     * @default "None"
     * @since 2.8.0
     * @public
     */
    sortIndicator: `${SortOrder}`;
    /**
     * Defines if the column is hidden in the popin.
     *
     * **Note:** Please be aware that hiding the column in the popin might lead to accessibility issues as
     * users might not be able to access the content of the column on small screens.
     *
     * @default false
     * @since 2.8.0
     * @public
     */
    popinHidden: boolean;
    /**
     * Defines the action of the column.
     *
     * **Note:** While multiple actions are technically possible, this is not supported.
     *
     * @public
     * @since 2.8.0
     */
    action: Slot<TableHeaderCellActionBase>;
    _defaultSlot: HTMLSlotElement;
    _actionSlot: HTMLSlotElement;
    ariaRole: string;
    _popinWidth: number;
    onBeforeRendering(): void;
    get accessibilityInfo(): {
        children: HTMLSlotElement[];
    };
}
export default TableHeaderCell;
