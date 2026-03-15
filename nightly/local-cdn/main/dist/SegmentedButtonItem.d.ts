import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ISegmentedButtonItem } from "./SegmentedButton.js";
import type { IButton } from "./Button.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `selected`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends UI5Element
 * @implements { ISegmentedButtonItem }
 * @implements { IButton }
 * @public
 */
declare class SegmentedButtonItem extends UI5Element implements IButton, ISegmentedButtonItem {
    /**
     * Defines whether the component is disabled.
     * A disabled component can't be selected or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines whether the component is displayed as selected.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines the tooltip of the component.
     *
     * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
     * @default undefined
     * @public
     * @since 1.2.0
     */
    tooltip?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.1.0
     */
    accessibleNameRef?: string;
    /**
     * Defines the accessible description of the component.
     * @default undefined
     * @public
     * @since 2.15.0
     */
    accessibleDescription?: string;
    /**
     * Defines the IDs of the HTML Elements that describe the component.
     * @default undefined
     * @public
     * @since 2.15.0
     */
    accessibleDescriptionRef?: string;
    /**
     * Defines the icon, displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * Example:
     * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default undefined
     * @public
     */
    icon?: string;
    /**
     * Defines if the button has icon and no text.
     * @private
     */
    iconOnly: boolean;
    /**
     * Indicates if the element is focusable
     * @private
     */
    nonInteractive: boolean;
    /**
     * Defines the tabIndex of the component.
     * @private
     */
    forcedTabIndex?: string;
    /**
     * Defines the index of the item inside of the SegmentedButton.
     * @default 0
     * @private
     */
    posInSet?: number | undefined;
    /**
     * Defines how many items are inside of the SegmentedButton.
     * @default 0
     * @private
     */
    sizeOfSet?: number | undefined;
    /**
     * @private
     */
    hidden: boolean;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: DefaultSlot<Node>;
    static i18nBundle: I18nBundle;
    get ariaDescription(): string;
    constructor();
    _onclick(e: MouseEvent): void;
    onEnterDOM(): void;
    onBeforeRendering(): void;
    _onkeyup(e: KeyboardEvent): void;
    get tabIndexValue(): string | undefined;
    get ariaLabelText(): string | undefined;
    get ariaDescriptionText(): string | undefined;
    get showIconTooltip(): boolean;
    get slotTextContent(): string;
}
export default SegmentedButtonItem;
