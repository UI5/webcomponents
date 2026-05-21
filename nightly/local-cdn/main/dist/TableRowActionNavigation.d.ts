import TableRowActionBase from "./TableRowActionBase.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row-action-navigation` component defines a navigation action for table rows.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableRowActionNavigation.js";`
 *
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
declare class TableRowActionNavigation extends TableRowActionBase {
    /**
     * Defines the interactive state of the navigation action.
     *
     * @default false
     * @public
     * @deprecated As of version 2.20.0, the navigation icon is deprecated.
     * For better accessibility, the interactive mode which renders a button, must be used instead. To handle the action, attach a listener to the `click` event.
     * If the navigation should be triggered when a row is pressed, set the row's `interactive` property and use the `row-click` event of the `ui5-table`.
     * This property will be removed in a future release.
     */
    interactive: boolean;
    static i18nBundle: I18nBundle;
    isFixedAction(): boolean;
    getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
    get _i18nNavigation(): string;
}
export default TableRowActionNavigation;
