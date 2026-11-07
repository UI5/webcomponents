import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/pushpin-off.js";
import "@ui5/webcomponents-icons/dist/pushpin-on.js";
type DynamicPageHeaderActionsAccessibilityAttributes = Pick<AccessibilityAttributes, "controls">;
/**
 * @class
 *
 * ### Overview
 *
 * The `DynamicPageHeaderActions` component is part of the `DynamicPage`
 * family and is holding the action buttons behind the `DynamicPageTitle` and the `DynamicPageHeader`.
 *
 * The "pin" action is used to attach the header to a certain state (expanded/collapsed).
 * The expand/collapse action is used to switch between the two states of `DynamicPageHeader`.
 *
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class DynamicPageHeaderActions extends UI5Element {
    eventDetails: {
        "expand-button-click": void;
        "pin-button-click": void;
        "expand-button-hover-in": void;
        "expand-button-hover-out": void;
    };
    /**
     * Defines whether the header is pinned.
     *
     * @protected
     * @default false
     */
    pinned: boolean;
    /**
     * Defines whether the pin button is hidden.
     *
     * @protected
     * @default false
     */
    hidePinButton: boolean;
    /**
     * Defines whether the header is snapped.
     *
     * @protected
     * @default false
     */
    snapped: boolean;
    /**
     * Contains attributes to be added to HTML to gain accessibility.
     *
     * @protected
     * @default {}
     */
    accessibilityAttributes: DynamicPageHeaderActionsAccessibilityAttributes;
    static i18nBundle: I18nBundle;
    get arrowButtonIcon(): "slim-arrow-down" | "slim-arrow-up";
    get pinButtonIcon(): "pushpin-off" | "pushpin-on";
    get expandButton(): Button | null;
    get pinButton(): ToggleButton | null;
    get pinLabel(): string;
    get expandLabel(): string;
    focusExpandButton(): void;
    focusPinButton(): void;
    onExpandClick(): void;
    onPinClick(): void;
    onExpandHoverIn(): void;
    onExpandHoverOut(): void;
    get showPinButton(): boolean;
}
export default DynamicPageHeaderActions;
