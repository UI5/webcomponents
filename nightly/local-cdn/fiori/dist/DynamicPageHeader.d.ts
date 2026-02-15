import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * Header of the DynamicPage.
 *
 * ### Overview
 *
 * The DynamicPageHeader `ui5-dynamic-page-header` is part of the DynamicPage family
 * and is used to serve as header of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageHeader` can hold any layout control and has two states - expanded
 * and collapsed (snapped). The switching between these states happens when:
 *	- the user scrolls below its bottom margin
 *	- the user clicks on the `DynamicPageTitle`
 *	- through the `DynamicPage` property `headerSnapped`
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageHeader` depends on the behavior of the
 * content that is displayed.
 *
 * ### Accessibility
 *
 * The `DynamicPageHeader` provides an accessible label for the header region.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
declare class DynamicPageHeader extends UI5Element {
    /**
     * Defines the content of the Dynamic Page Header.
     *
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines if the header is snapped.
     *
     * @default false
     * @private
     */
    _snapped: boolean;
    static i18nBundle: I18nBundle;
    /**
     * Returns the aria-label for the header region.
     * @internal
     */
    get _headerRegionAriaLabel(): string;
}
export default DynamicPageHeader;
