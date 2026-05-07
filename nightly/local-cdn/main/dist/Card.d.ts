import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type CardHeader from "./CardHeader.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-card` is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a `ui5-card` can be arbitrary HTML content.
 * The header can be used through slot `header`. For which there is a `ui5-card-header` component to achieve the card look and feel.
 *
 * Note: We recommend the usage of `ui5-card-header` for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Card.js";`
 *
 * `import "@ui5/webcomponents/dist/CardHeader.js";` (for `ui5-card-header`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the root DOM element of the card component
 * @csspart content - Used to style the content of the card
 */
declare class Card extends UI5Element {
    /**
     * Defines the accessible name of the component, which is used as the name of the card region and should be unique per card.
     *
     * **Note:** `accessibleName` should be always set, unless `accessibleNameRef` is set.
     * @default undefined
     * @public
     * @since 1.0.0-rc.16
    */
    accessibleName?: string;
    /**
     * Defines the IDs of the elements that label the component.
     * @default undefined
     * @public
     * @since 1.0.0-rc.16
    */
    accessibleNameRef?: string;
    /**
     * Defines the content of the component.
     * @public
    */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines the header of the component.
     *
     * **Note:** Use `ui5-card-header` for the intended design.
     * @since 1.0.0-rc.15
     * @public
    */
    header: Slot<CardHeader>;
    /**
     * Defines if a loading indicator would be displayed over the card.
     * @default false
     * @public
     * @since 2.1.0
     */
    loading: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will show up for this card.
     * @default 1000
     * @public
     * @since 2.1.0
     */
    loadingDelay: number;
    static i18nBundle: I18nBundle;
    get _hasHeader(): boolean;
    get _getAriaLabel(): string;
    get _ariaCardContentLabel(): string;
}
export default Card;
