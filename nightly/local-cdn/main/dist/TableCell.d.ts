import TableCellBase from "./TableCellBase.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` represents a cell inside of a `ui5-table`.
 * It is tightly coupled to the `ui5-table` and thus should only be used in the table component.
 *
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/TableCell.js;`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 */
declare class TableCell extends TableCellBase {
    onBeforeRendering(): void;
    injectHeaderNodes(ref: HTMLElement | null): void;
    get _headerCell(): import("./TableHeaderCell.js").default;
    get _popinHeaderNodes(): (string | Node)[];
    get _i18nPopinColon(): string;
}
export default TableCell;
