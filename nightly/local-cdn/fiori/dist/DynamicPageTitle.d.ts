import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import type { ToolbarMinWidthChangeEventDetail } from "@ui5/webcomponents/dist/Toolbar.js";
import type Title from "@ui5/webcomponents/dist/Title.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * Title of the `DynamicPage`.
 *
 * The `DynamicPageTitle` component is part of the `DynamicPage`
 * family and is used to serve as title of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageTitle` can hold any component and displays the most important
 * information regarding the object that will always remain visible while scrolling.
 *
 * **Note:** The `actions` slot accepts any UI5 web component, but it's
 * recommended to use `ui5-toolbar`.
 *
 * The user can switch between the expanded/collapsed states of the
 * `DynamicPage` by clicking on the `DynamicPageTitle`
 * or by using the expand/collapse visual indicators, positioned at the bottom of the
 * `DynamicPageTitle` and the `DynamicPageHeader` inside `ui5-dynamic-page-header-actions`.
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageTitle` depends on the behavior of the
 * content that is displayed.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
declare class DynamicPageTitle extends UI5Element {
    eventDetails: {
        "toggle-title": void;
    };
    /**
     * Defines if the title is snapped.
     *
     * @protected
     * @default false
     */
    snapped: boolean;
    /**
     * Defines if the mobileNavigationActions are shown.
     *
     * @private
     */
    mobileNavigationActions: boolean;
    /**
     * Indicates if the elements is on focus
     * @private
     */
    focused: boolean;
    /**
     * Defines the minimum width of the content area.
     * @private
     */
    minContentWidth?: number;
    /**
     * Defines the minimum width of the actions area.
     * @private
     */
    minActionsWidth?: number;
    /**
     * Indicates whether the title has snapped on mobile devices.
     * @private
     */
    hasSnappedTitleOnMobile: boolean;
    /**
     * Defines the content of the Heading of the Dynamic Page.
     *
     * The font size of the title within the `heading` slot can be adjusted to the recommended values using the following CSS variables:
     *
     * **Expanded:** `var(--sapObjectHeader_Title_FontSize)`
     *
     * **Collapsed:** `var(--sapObjectHeader_Title_SnappedFontSize)`
     *
     * @public
     */
    heading: Slot<HTMLElement>;
    /**
     * Defines the heading that is shown only when the header is snapped.
     *
     * @public
     */
    snappedHeading: Slot<HTMLElement>;
    /**
     * Defines the content of the snapped title on mobile devices.
     *
     * This slot is displayed only when the `DynamicPageTitle` is in the snapped state on mobile devices.
     * It should be used to provide a simplified, single-line title that takes up less space on smaller screens.
     *
     * **Note:**
     * - The content set in this slot **overrides** all other content set in the `DynamicPageTitle` slots when displayed.
     * - The slot is intended for a single `ui5-title` component.
     *
     * @public
     * @since 2.3.0
     */
    snappedTitleOnMobile: Slot<Title>;
    /**
     * Defines the bar with actions in the Dynamic page title.
     *
     * @public
     */
    actionsBar: Slot<HTMLElement>;
    /**
     * Defines the bar with navigation actions in the Dynamic page title.
     *
     * @public
     */
    navigationBar: Slot<Toolbar>;
    /**
     * Defines the content of the Dynamic page title.
     *
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    /**
     * Defines the content of the title that is shown only when the header is not snapped.
     *
     * @public
     */
    subheading: Slot<HTMLElement>;
    /**
     * Defines the content of the title that is shown only when the header is snapped.
     *
     * @public
     */
    snappedSubheading: Slot<HTMLElement>;
    /**
     * Defines the content of the breadcrumbs inside Dynamic Page Title.
     *
     * @public
     */
    breadcrumbs: Slot<HTMLElement>;
    /**
     * @private
     */
    interactive: boolean;
    static i18nBundle: I18nBundle;
    _handleResize: ResizeObserverCallback;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    onBeforeRendering(): void;
    get hasContent(): boolean;
    get headingSlotName(): "heading" | "snappedHeading";
    get subheadingSlotName(): "subheading" | "snappedSubheading";
    get _tabIndex(): 0 | undefined;
    get _headerExpanded(): boolean;
    get _role(): "button" | undefined;
    get _ariaDescribedBy(): string | undefined;
    get _ariaDescribedbyText(): string | undefined;
    get _ariaLabelledBy(): string | undefined;
    get _needsSeparator(): boolean;
    get forAriaExpanded(): boolean | undefined;
    prepareLayoutActions(): void;
    handleResize(): void;
    onMinContentWidthChange(e: CustomEvent<ToolbarMinWidthChangeEventDetail>): void;
    onTitleClick(): void;
    _onkeydown(e: KeyboardEvent): void;
}
export default DynamicPageTitle;
