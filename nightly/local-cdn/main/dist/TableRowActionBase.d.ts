import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { UI5CustomEvent } from "@ui5/webcomponents-base";
import type Button from "./Button.js";
/**
 * Fired when a row action is clicked.
 *
 * @public
 * @since 2.9.0
 */
declare abstract class TableRowActionBase extends UI5Element {
    eventDetails: {
        "click": void;
    };
    /**
     * Defines the visibility of the row action.
     *
     * **Note:** Invisible row actions still take up space, allowing to hide the action while maintaining its position.
     *
     * @default false
     * @public
     */
    invisible: boolean;
    private static _menu;
    private static _menuItems;
    static showMenu(actions: TableRowActionBase[], opener: HTMLElement): Promise<void>;
    abstract getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
    isFixedAction(): boolean;
    onEnterDOM(): void;
    _fireClickEvent(): void;
    _onActionClick(e: UI5CustomEvent<Button, "click">): void;
    get _text(): string;
    get _icon(): string;
    get _isInteractive(): boolean;
}
export default TableRowActionBase;
