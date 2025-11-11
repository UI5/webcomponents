import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base";

// Legacy Type logo accessibility attributes
type ShellBarV2LogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "button" | "link">;
	name?: string;
};

type ShellBarV2ProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;
type ShellBarV2AreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;
type ShellBarV2BrandingAccessibilityAttributes = Pick<AccessibilityAttributes, "name">;

type ShellBarV2AccessibilityAttributes = {
	logo?: ShellBarV2LogoAccessibilityAttributes;
	notifications?: ShellBarV2AreaAccessibilityAttributes;
	profile?: ShellBarV2ProfileAccessibilityAttributes;
	product?: ShellBarV2AreaAccessibilityAttributes;
	search?: ShellBarV2AreaAccessibilityAttributes;
	overflow?: ShellBarV2AreaAccessibilityAttributes;
	branding?: ShellBarV2BrandingAccessibilityAttributes;
};

interface ShellBarV2AreaAccessibilityInfo {
	title: string | undefined;
	accessibilityAttributes: {
		name?: string;
		hasPopup?: AccessibilityAttributes["hasPopup"];
		expanded?: AccessibilityAttributes["expanded"];
	};
}

type ShellBarV2AccessibilityInfo = {
	notifications: ShellBarV2AreaAccessibilityInfo;
	profile: ShellBarV2AreaAccessibilityInfo;
	products: ShellBarV2AreaAccessibilityInfo;
	overflow: ShellBarV2AreaAccessibilityInfo;
	search: ShellBarV2AreaAccessibilityInfo;
};

class ShellBarV2Accessibility {
	getActionsAccessibilityAttributes(
		defaultTexts: Record<string, string | undefined>,
		params: {
			accessibilityAttributes: ShellBarV2AccessibilityAttributes;
			overflowPopoverOpen: boolean;
		},
	): ShellBarV2AccessibilityInfo {
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

export default ShellBarV2Accessibility;

export type {
	ShellBarV2AccessibilityInfo,
	ShellBarV2AreaAccessibilityInfo,
	ShellBarV2AccessibilityAttributes,
	ShellBarV2LogoAccessibilityAttributes,
	ShellBarV2AreaAccessibilityAttributes,
	ShellBarV2ProfileAccessibilityAttributes,
};
