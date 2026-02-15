import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-shellbar-branding` component is intended to be placed inside the branding slot of the
 * `ui5-shellbar` component. Its content has higher priority than the `primaryTitle` property
 * and the `logo` slot of `ui5-shellbar`.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.12.0
 * @public
 * @experimental
 */
declare class ShellBarBranding extends UI5Element {
    eventDetails: {
        click: void;
    };
    /**
     * Defines the component href.
     *
     * **Note:** Standard hyperlink behavior is supported.
     * @default undefined
     * @public
     */
    href?: string;
    /**
     * Defines the component target.
     *
     * **Notes:**
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **This property must only be used when the `href` property is set.**
     * @default undefined
     * @public
     */
    target?: string;
    /**
     * Defines the text alternative of the component.
     * If not provided a default text alternative will be set, if present.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Defines if the title of the branding is shown on an S breakpoint.
     * @default false
     * @private
     */
    _isSBreakPoint: boolean;
    /**
     * Defines the title for the ui5-shellbar-branding component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines the logo of the `ui5-shellbar`.
     * For example, you can use `ui5-avatar` or `img` elements as logo.
     * @public
     */
    logo: Slot<HTMLElement>;
    get parsedRef(): string | undefined;
    get _role(): "button" | "link";
    get accessibleNameText(): string | undefined;
    _fireClick(): void;
    _onclick(e: MouseEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onkeydown(e: KeyboardEvent): void;
}
export default ShellBarBranding;
