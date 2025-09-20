import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
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
    content: HTMLElement[];
}
export default DynamicPageHeader;
