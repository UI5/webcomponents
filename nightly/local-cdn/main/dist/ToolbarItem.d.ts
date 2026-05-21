import ToolbarItemBase from "./ToolbarItemBase.js";
import type { DefaultSlot } from "@ui5/webcomponents-base";
/**
 * Interface for the slotted item in `ui5-toolbar-item`.
 *
 * It could be any HTMLElement or UI5 Web Component with option to specify custom overflow closing events and overflow behavior.
 *
 * @public
 * @since 2.20.0
 */
interface IToolbarItemContent extends HTMLElement {
    overflowCloseEvents?: string[];
    hasOverflow?: boolean;
}
/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-item` is a wrapper component used to integrate UI5 Web Components into the `ui5-toolbar`.
 * It renders within the toolbar's shadow DOM and manages the lifecycle
 * and overflow behavior of its child component.
 *
 * ### Structure
 * The toolbar item wraps a single UI5 Web Component (such as CheckBox, Title, etc.) and handles:
 * - Overflow management (determining if the item should be displayed in the main toolbar or overflow popover)
 * - Automatic popover closing on interaction
 * - CSS custom state exposure for styling based on overflow state
 *
 * ### Usage
 * The `ui5-toolbar-item` is typically used implicitly when adding components to a toolbar,
 * but specialized wrappers like `ui5-toolbar-button` provide
 * component-specific functionality and should be preferred when available.
 *
 * @constructor
 * @extends ToolbarItemBase
 * @public
 * @since 2.20.0
 */
declare class ToolbarItem extends ToolbarItemBase {
    _maxWidth: number;
    _wrapperChecked: boolean;
    fireCloseOverflowRef: () => void;
    closeOverflowSet: {
        "ui5-button": string[];
        "ui5-select": string[];
        "ui5-combobox": string[];
        "ui5-multi-combobox": string[];
        "ui5-date-picker": string[];
        "ui5-switch": string[];
    };
    predefinedWrapperSet: {
        "ui5-button": string;
        "ui5-select": string;
    };
    onBeforeRendering(): void;
    onExitDOM(): void;
    /**
     * Wrapped component slot.
     * @public
     * @since 2.20.0
     */
    item: DefaultSlot<IToolbarItemContent>;
    checkForWrapper(): void;
    getClosingEvents(): string[];
    attachCloseOverflowHandlers(): void;
    detachCloseOverflowHandlers(): void;
    fireCloseOverflow(): void;
    get itemTagName(): string;
    get hasOverflow(): boolean;
}
export type { IToolbarItemContent, };
export default ToolbarItem;
