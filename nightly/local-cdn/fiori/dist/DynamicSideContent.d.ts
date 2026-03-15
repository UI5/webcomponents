import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SideContentPosition from "./types/SideContentPosition.js";
import SideContentVisibility from "./types/SideContentVisibility.js";
import SideContentFallDown from "./types/SideContentFallDown.js";
import type { AccessibilityAttributes } from "@ui5/webcomponents-base";
type DynamicSideContentLayoutChangeEventDetail = {
    currentBreakpoint: string;
    previousBreakpoint: string | undefined;
    mainContentVisible: boolean;
    sideContentVisible: boolean;
};
type DynamicSideContentAriaAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaLabel">;
type DynamicSideContentAccessibilityAttributes = {
    mainContent?: DynamicSideContentAriaAccessibilityAttributes;
    sideContent?: DynamicSideContentAriaAccessibilityAttributes;
};
/**
 * @class
 *
 * ### Overview
 *
 * The DynamicSideContent (`ui5-dynamic-side-content`) is a layout component that allows additional content
 * to be displayed in a way that flexibly adapts to different screen sizes. The side
 * content appears in a container next to or directly below the main content
 * (it doesn't overlay). When the side content is triggered, the main content becomes
 * narrower (if appearing side-by-side). The side content contains a separate scrollbar
 * when appearing next to the main content.
 *
 * ### Usage
 *
 * *When to use?*
 *
 * Use this component if you want to display relevant information that is not critical
 * for users to complete a task. Users should have access to all the key functions and
 * critical information in the app even if they do not see the side content. This is
 * important because on smaller screen sizes it may be difficult to display the side
 * content in a way that is easily accessible for the user.
 *
 * *When not to use?*
 *
 * Don't use it if you want to display navigation or critical information that prevents
 * users from completing a task when they have no access to the side content.
 *
 * ### Responsive Behavior
 *
 * Screen width \> 1440px
 *
 * - Main vs. side content ratio is 75 vs. 25 percent (with a minimum of 320px
 * each).
 * - If the application defines a trigger, the side content can be hidden.
 *
 * Screen width \<\= 1440px and \> 1024px
 *
 * - Main vs. side content ratio is 66.666 vs. 33.333 percent (with a minimum of
 * 320px each). If the side content width falls below 320 px, it automatically slides
 * under the main content, unless the app development team specifies that it should
 * disappear.
 *
 * Screen width \<\= 1024px and \> 720px
 *
 * - The side content ratio is fixed to 340px, and the main content takes the rest
 * of the width. Only if the `sideContentFallDown` is set to `OnMinimumWidth`
 * and screen width is \<\= 960px and \> 720px the side content falls below the main content.
 *
 * Screen width \<\= 720px (for example on a mobile device)
 *
 * - In this case, the side content automatically disappears from the screen (unless
 * specified to stay under the content by setting of `sideContentVisibility`
 * property to `AlwaysShow`) and can be triggered from a pre-set trigger
 * (specified within the app). When the side content is triggered, it replaces the main
 * content. We recommend that you always place the trigger for the side content in the
 * same location, such as in the app footer.
 *
 * A special case allows switching the comparison mode between the main and side content.
 * In this case, the screen is split into 50:50 percent for main vs. side content. The
 * responsive behavior of the equal split is the same as in the standard view - the
 * side content disappears on screen widths of less than 720 px and can only be
 * viewed by triggering it.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 * @slot {Array<HTMLElement>} default - Defines the main content.
 */
declare class DynamicSideContent extends UI5Element {
    eventDetails: {
        "layout-change": DynamicSideContentLayoutChangeEventDetail;
    };
    /**
     * Defines the visibility of the main content.
     * @default false
     * @public
     *
     */
    hideMainContent: boolean;
    /**
     * Defines the visibility of the side content.
     * @default false
     * @public
     *
     */
    hideSideContent: boolean;
    /**
     * Defines whether the side content is positioned before the main content (left side
     * in LTR mode), or after the the main content (right side in LTR mode).

     * @default "End"
     * @public
     *
     */
    sideContentPosition: `${SideContentPosition}`;
    /**
     * Defines on which breakpoints the side content is visible.
     * @default "ShowAboveS"
     * @public
     *
     */
    sideContentVisibility: `${SideContentVisibility}`;
    /**
     * Defines on which breakpoints the side content falls down below the main content.
     * @default "OnMinimumWidth"
     * @public
     *
     */
    sideContentFallDown: `${SideContentFallDown}`;
    /**
     * Defines whether the component is in equal split mode. In this mode, the side and
     * the main content take 50:50 percent of the container on all screen sizes
     * except for phone, where the main and side contents are switching visibility
     * using the toggle method.
     * @default false
     * @public
     *
     */
    equalSplit: boolean;
    /**
    * Defines additional accessibility attributes on different areas of the component.
    *
    * The accessibilityAttributes object has the following fields:
    *
    *  - **mainContent**: `mainContent.ariaLabel` defines the aria-label of the main content area. Accepts any string.
    *  - **sideContent**: `sideContent.ariaLabel` defines the aria-label of the side content area. Accepts any string.
    *
    * @default {}
    * @public
    * @since 2.6.0
    */
    accessibilityAttributes: DynamicSideContentAccessibilityAttributes;
    /**
     * @private
     */
    _toggled: boolean;
    /**
     * @private
     */
    _currentBreakpoint?: string;
    /**
     * @private
     */
    _isSideContentBelowMainContent: boolean;
    /**
     * Defines the side content.
     * @public
     */
    sideContent: Slot<HTMLElement>;
    _mainContent: HTMLElement;
    _sideContent: HTMLElement;
    _resizeObserver?: ResizeObserver;
    static i18nBundle: I18nBundle;
    onEnterDOM(): void;
    onExitDOM(): void;
    /**
     * Toggles visibility of main and side contents on S screen size (mobile device).
     * @public
     */
    toggleContents(): void;
    /**
     * Gets main content visibility by checking CSS display property
     * @private
     */
    _getMainContentVisibility(): boolean;
    /**
     * Gets side content visibility by checking CSS display property
     * @private
     */
    _getSideContentVisibility(): boolean;
    get classes(): {
        main: {
            "ui5-dsc-main": boolean;
        };
        side: {
            "ui5-dsc-side": boolean;
        };
        root: {
            "ui5-dsc-root": boolean;
            "ui5-dsc-toggled": boolean;
        };
    };
    get isSideContentBelowMainContent(): boolean;
    get styles(): {
        root: {
            "flex-wrap": string;
        };
        main: {
            height: string;
        };
        side: {
            height: string;
        };
    };
    get accInfo(): DynamicSideContentAccessibilityAttributes;
    get sizeS(): string;
    get sizeM(): string;
    get sizeL(): string;
    get sizeXL(): string;
    get containerWidth(): number;
    get breakpoint(): string;
    get _isSideContentFirst(): boolean;
    /**
     * Returns true when the toggleContents functionality should be enabled.
     * Toggle is available when side content would normally be hidden in the current breakpoint
     * but can be shown via the toggle mechanism.
     * @private
     */
    get _isToggleEnabled(): boolean;
}
export default DynamicSideContent;
export type { DynamicSideContentLayoutChangeEventDetail, DynamicSideContentAccessibilityAttributes, };
