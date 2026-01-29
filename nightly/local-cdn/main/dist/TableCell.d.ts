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
    _popinHeader?: HTMLElement;
    _popinContent?: HTMLElement;
    onBeforeRendering(): void;
    _injectHeaderNodes(ref: HTMLElement | null): void;
    get _headerCell(): import("./TableHeaderCell.js").default | null | undefined;
    get _popinHeaderNodes(): Node[];
    get _i18nPopinColon(): string;
}
export default TableCell;
