import type ShellBar from "../../ShellBar.js";
declare function ShellBarLegacyBrandingArea(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
declare function ShellBarLegacyTitleArea(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
/**
 * Renders interactive menu button for non-S breakpoints.
 * Shows primaryTitle with arrow, opens menu popover.
 */
declare function ShellBarInteractiveMenuButton(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
/**
 * Renders single logo on S breakpoint when no menu items.
 * Used on S breakpoint when no menu items and no branding slot.
 */
declare function ShellBarSingleLogo(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
declare function ShellBarLegacySecondaryTitle(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
/**
 * Renders the menu popover.
 * Contains the list of menu items.
 */
declare function ShellBarMenuPopover(this: ShellBar): import("@ui5/webcomponents-base/jsx-runtime").JSX.Element | null;
export { ShellBarSingleLogo, ShellBarMenuPopover, ShellBarLegacyTitleArea, ShellBarLegacyBrandingArea, ShellBarLegacySecondaryTitle, ShellBarInteractiveMenuButton, };
