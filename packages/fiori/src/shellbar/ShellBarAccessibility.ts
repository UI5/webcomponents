import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base";

// Legacy Type logo accessibility attributes
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

class ShellBarAccessibility {
	getActionsAccessibilityAttributes(
		defaultTexts: Record<string, string | undefined>,
		params: {
			accessibilityAttributes: ShellBarAccessibilityAttributes;
			overflowPopoverOpen: boolean;
		},
	): ShellBarAccessibilityInfo {
		const { overflowPopoverOpen, accessibilityAttributes } = params;
		const overflowExpanded = accessibilityAttributes.overflow?.expanded;

		return {
			notifications: {
				title: defaultTexts.notifications,
				accessibilityAttributes: {
					expanded: accessibilityAttributes.notifications?.expanded,
					hasPopup: accessibilityAttributes.notifications?.hasPopup,
				},
			},
			profile: {
				title: accessibilityAttributes.profile?.name || defaultTexts.profile,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.profile?.hasPopup,
					expanded: accessibilityAttributes.profile?.expanded,
				},
			},
			products: {
				title: defaultTexts.products,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.product?.hasPopup,
					expanded: accessibilityAttributes.product?.expanded,
				},
			},
			search: {
				title: defaultTexts.search,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.search?.hasPopup,
				},
			},
			overflow: {
				title: defaultTexts.overflow,
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.overflow?.hasPopup || "menu" as const,
					expanded: overflowExpanded === undefined ? overflowPopoverOpen : overflowExpanded,
				},
			},
		};
	}

	getActionsRole(visibleItemsCount: number): "toolbar" | undefined {
		return visibleItemsCount > 1 ? "toolbar" : undefined;
	}

	getContentRole(visibleItemsCount: number): "group" | undefined {
		return visibleItemsCount > 1 ? "group" : undefined;
	}
}

export default ShellBarAccessibility;

export type {
	ShellBarAccessibilityInfo,
	ShellBarAreaAccessibilityInfo,
	ShellBarAccessibilityAttributes,
	ShellBarLogoAccessibilityAttributes,
	ShellBarAreaAccessibilityAttributes,
	ShellBarProfileAccessibilityAttributes,
};
