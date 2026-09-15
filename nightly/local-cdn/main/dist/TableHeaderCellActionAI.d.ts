import TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/ai.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell-action-ai` component defines a dedicated AI action for the table column.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";`
 *
 * @constructor
 * @extends TableHeaderCellActionBase
 * @since 2.8.0
 * @public
 */
declare class TableHeaderCellActionAI extends TableHeaderCellActionBase {
    static i18nBundle: I18nBundle;
    onAfterRendering(): void;
    getRenderInfo(): {
        icon: string;
        tooltip: string;
    };
}
export default TableHeaderCellActionAI;
