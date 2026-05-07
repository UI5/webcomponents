import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base";
type ShellBarLogoAccessibilityAttributes = {
    role?: Extract<AriaRole, "button" | "link">;
    name?: string;
};
type ShellBarProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;
type ShellBarAreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;
type ShellBarBrandingAccessibilityAttributes = Pick<AccessibilityAttributes, "name">;
type ShellBarAccessibilityAttributes = {
    logo?: ShellBarLogoAccessibilityAttributes;
    notifications?: ShellBarAreaAccessibilityAttributes;
    profile?: ShellBarProfileAccessibilityAttributes;
    product?: ShellBarAreaAccessibilityAttributes;
    search?: ShellBarAreaAccessibilityAttributes;
    overflow?: ShellBarAreaAccessibilityAttributes;
    branding?: ShellBarBrandingAccessibilityAttributes;
};
interface ShellBarAreaAccessibilityInfo {
    title: string | undefined;
    accessibilityAttributes: {
        name?: string;
        hasPopup?: AccessibilityAttributes["hasPopup"];
        expanded?: AccessibilityAttributes["expanded"];
    };
}
type ShellBarAccessibilityInfo = {
    notifications: ShellBarAreaAccessibilityInfo;
    profile: ShellBarAreaAccessibilityInfo;
    products: ShellBarAreaAccessibilityInfo;
    overflow: ShellBarAreaAccessibilityInfo;
    search: ShellBarAreaAccessibilityInfo;
};
declare class ShellBarAccessibility {
    getActionsAccessibilityAttributes(defaultTexts: Record<string, string | undefined>, params: {
        accessibilityAttributes: ShellBarAccessibilityAttributes;
        overflowPopoverOpen: boolean;
    }): ShellBarAccessibilityInfo;
    getActionsRole(visibleItemsCount: number): "toolbar" | undefined;
    getContentRole(visibleItemsCount: number): "group" | undefined;
}
export default ShellBarAccessibility;
export type { ShellBarAccessibilityInfo, ShellBarAreaAccessibilityInfo, ShellBarAccessibilityAttributes, ShellBarLogoAccessibilityAttributes, ShellBarAreaAccessibilityAttributes, ShellBarProfileAccessibilityAttributes, };
