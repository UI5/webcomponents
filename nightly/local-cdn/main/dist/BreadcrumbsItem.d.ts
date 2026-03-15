import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import LinkDesign from "./types/LinkDesign.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-breadcrumbs-item` component defines the content of an item in `ui5-breadcrumbs`.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 * @abstract
 */
declare class BreadcrumbsItem extends UI5Element {
    /**
     * Defines the link href.
     *
     * **Note:** Standard hyperlink behavior is supported.
     * @default undefined
     * @public
     */
    href?: string;
    /**
     * Defines the link target.
     *
     * Available options are:
     *
     * - `_self`
     * - `_top`
     * - `_blank`
     * - `_parent`
     * - `_search`
     *
     * **Note:** This property must only be used when the `href` property is set.
     * @default undefined
     * @public
     */
    target?: string;
    /**
     * Defines the accessible ARIA name of the item.
     * @default undefined
     * @public
     */
    accessibleName?: string;
    /**
     * Defines the text of the component.
     *
     * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     * @public
     */
    text: DefaultSlot<Node>;
    _accessibleNameText?: string;
    _isCurrentPageItem?: boolean;
    _needsSeparator?: boolean;
    get stableDomRef(): string;
    get _linkDesign(): LinkDesign.Default | LinkDesign.Emphasized;
    get accessibilityAttributes(): Pick<AccessibilityAttributes, "current">;
}
export default BreadcrumbsItem;
