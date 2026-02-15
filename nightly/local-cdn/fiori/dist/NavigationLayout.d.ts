import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import NavigationLayoutMode from "./types/NavigationLayoutMode.js";
import type SideNavigation from "./SideNavigation.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-navigation-layout` is a container component that can be used to
 * create a layout with a header, a side navigation and a content area.
 *
 * ### Usage
 *
 * Use the `ui5-navigation-layout` to create whole screen of an application with vertical navigation.
 *
 * ### Responsive Behavior
 *
 * On larger screens with a width of 600px or more, excluding mobile phone devices, the side navigation is visible
 * by default and can be expanded or collapsed using the `mode` property.
 * On mobile phone devices and screens with a width of 599px or less, the side navigation is hidden by
 * default and can be displayed using the `mode` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.4.0
 * @public
 */
declare class NavigationLayout extends UI5Element {
    /**
     * Specifies the navigation layout mode.
     * @default "Auto"
     * @public
     */
    mode: `${NavigationLayoutMode}`;
    /**
     * @private
     */
    sideCollapsed: boolean;
    /**
     * @private
     */
    hasSideNavigation: boolean;
    /**
     * @private
     */
    isPhone: boolean;
    /**
     * Gets whether the side navigation is collapsed.
     * @public
     */
    isSideCollapsed(): boolean;
    /**
     * Defines the header.
     * @public
     */
    header: Slot<HTMLElement>;
    /**
     * Defines the side content.
     * @public
     */
    sideContent: Slot<SideNavigation>;
    /**
     * Defines the content.
     * @public
     */
    content: DefaultSlot<HTMLElement>;
    onBeforeRendering(): void;
    calcSideCollapsed(): void;
}
export default NavigationLayout;
