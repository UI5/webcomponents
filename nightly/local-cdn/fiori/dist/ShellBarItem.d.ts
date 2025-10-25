import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes, UI5CustomEvent } from "@ui5/webcomponents-base";
import type Button from "@ui5/webcomponents/dist/Button.js";
type ShellBarItemClickEventDetail = {
    targetRef: HTMLElement;
};
type ShellBarItemAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls">;
/**
 * Interface for components that may be slotted inside `ui5-shellbar` as items
 * @public
 */
/**
 * @class
 * The `ui5-shellbar-item` represents a custom item, that
 * might be added to the `ui5-shellbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
declare class ShellBarItem extends UI5Element {
    eventDetails: {
        click: ShellBarItemClickEventDetail;
    };
    /**
     * Defines the name of the item's icon.
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines the item text.
     *
     * **Note:** The text is only displayed inside the overflow popover list view.
     * @default undefined
     * @public
     */
    text?: string;
    /**
     * Defines the count displayed in the top-right corner.
     * @default undefined
     * @since 1.0.0-rc.6
     * @public
     */
    count?: string;
    /**
     * Defines additional accessibility attributes on Shellbar Items.
     *
     * The accessibility attributes support the following values:
     *
     * - **expanded**: Indicates whether the button, or another grouping element it controls,
     * is currently expanded or collapsed.
     * Accepts the following string values: `true` or `false`.
     *
     * - **hasPopup**: Indicates the availability and type of interactive popup element,
     * such as menu or dialog, that can be triggered by the button.
     *
     * - **controls**: Identifies the element (or elements) whose contents
     * or presence are controlled by the component.
     * Accepts a lowercase string value, referencing the ID of the element it controls.
     *
     * @default {}
     * @public
     * @since 2.9.0
     */
    accessibilityAttributes: ShellBarItemAccessibilityAttributes;
    get stableDomRef(): string;
    fireClickEvent(e: UI5CustomEvent<Button, "click">): boolean;
}
export default ShellBarItem;
export type { ShellBarItemClickEventDetail };
export type { ShellBarItemAccessibilityAttributes };
