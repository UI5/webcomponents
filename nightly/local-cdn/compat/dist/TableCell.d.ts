import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` component defines the structure of the data in a single `ui5-table` cell.
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart cell - Used to style the native `td` element
 * @deprecated Deprecated as of version 2.12.0, use `@ui5/webcomponents/dist/TableCell.js` instead.
 */
declare class TableCell extends UI5Element {
    /**
     * @private
     */
    lastInRow: boolean;
    /**
     * @private
     */
    popined: boolean;
    /**
     * @private
     */
    _popinedInline: boolean;
    /**
     * Specifies the content of the component.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    static i18nBundle: I18nBundle;
    get cellContent(): Array<HTMLElement>;
    get ariaLabelEmptyCellText(): string;
}
export default TableCell;
