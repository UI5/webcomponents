import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITableRow, TableColumnInfo } from "./Table.js";
import TableMode from "./types/TableMode.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-group-row` component represents a group row in the `ui5-table`.
 * @constructor
 * @since 2.0.0
 * @implements {ITableRow}
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @csspart group-row - Used to style the native `tr` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/Table.js` instead.
 */
declare class TableGroupRow extends UI5Element implements ITableRow {
    eventDetails: {
        _focused: FocusEvent;
    };
    /**
     * Defines the mode of the row
     * @default "None"
     * @private
     */
    mode: `${TableMode}`;
    _columnsInfo?: Array<TableColumnInfo>;
    forcedTabIndex?: string;
    forcedBusy: boolean;
    forcedAriaPosition?: string;
    selected: boolean;
    tabbableElements: Array<HTMLElement>;
    _columnsInfoString: string;
    static i18nBundle: I18nBundle;
    _colSpan?: number;
    get colSpan(): number | undefined;
    get ariaLabelText(): string;
    visibleColCount(): number;
    onBeforeRendering(): void;
    _onfocusin(e: FocusEvent): void;
}
export default TableGroupRow;
