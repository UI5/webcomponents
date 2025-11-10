import type { AccessibilityAttributes, AriaRole } from "@ui5/webcomponents-base";
import { ShellBarV2Actions } from "../ShellBarV2.js";
import type { ShellBarV2ActionId } from "../ShellBarV2.js";

/**
 * Accessibility attributes for logo area (legacy)
 */
type ShellBarV2LogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "button" | "link">;
	name?: string;
};

/**
 * Accessibility attributes for profile area
 */
type ShellBarV2ProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;

/**
 * Accessibility attributes for action areas (notifications, product, search, overflow)
 */
type ShellBarV2AreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;

/**
 * Accessibility attributes for branding area
 */
type ShellBarV2BrandingAccessibilityAttributes = Pick<AccessibilityAttributes, "name">;

/**
 * Top-level accessibility configuration for ShellBarV2
 */
type ShellBarV2AccessibilityAttributes = {
	logo?: ShellBarV2LogoAccessibilityAttributes;
	notifications?: ShellBarV2AreaAccessibilityAttributes;
	profile?: ShellBarV2ProfileAccessibilityAttributes;
	product?: ShellBarV2AreaAccessibilityAttributes;
	search?: ShellBarV2AreaAccessibilityAttributes;
	overflow?: ShellBarV2AreaAccessibilityAttributes;
	branding?: ShellBarV2BrandingAccessibilityAttributes;
};

/**
 * Accessibility info for a single area
 */
interface ShellBarV2AreaAccessibilityInfo {
	title: string;
	accessibilityAttributes: {
		hasPopup?: AccessibilityAttributes["hasPopup"];
		expanded?: AccessibilityAttributes["expanded"];
	};
}

/**
 * Complete accessibility info object returned by the support controller
 */
interface ShellBarV2AccessibilityInfo {
	notifications: ShellBarV2AreaAccessibilityInfo;
	profile: ShellBarV2AreaAccessibilityInfo;
	products: ShellBarV2AreaAccessibilityInfo;
	search: ShellBarV2AreaAccessibilityInfo;
	overflow: ShellBarV2AreaAccessibilityInfo;
}

/**
 * Parameters for computing accessibility info
 */
interface ShellBarV2AccessibilityParams {
	accessibilityAttributes: ShellBarV2AccessibilityAttributes;
	overflowPopoverOpen: boolean;
}

type ShellBarV2AccessibilityDefaultTexts = Record<ShellBarV2ActionId, string>;

/**
 * Controller for ShellBarV2 accessibility features.
 * Manages accessibility attributes and generates aria properties for template.
 */
class ShellBarV2Accessibility {
	/**
	 * Computes accessibility info for all interactive areas.
	 * Merges user-provided attributes with defaults and dynamic state.
	 */
	getActionsAccessibilityInfo(defaultTexts: ShellBarV2AccessibilityDefaultTexts, params: ShellBarV2AccessibilityParams): ShellBarV2AccessibilityInfo {
		const {
			overflowPopoverOpen,
			accessibilityAttributes,
		} = params;

		const overflowExpanded = accessibilityAttributes.overflow?.expanded;

		return {
			[ShellBarV2Actions.Notifications]: {
				title: defaultTexts[ShellBarV2Actions.Notifications],
				accessibilityAttributes: {
					expanded: accessibilityAttributes.notifications?.expanded,
					hasPopup: accessibilityAttributes.notifications?.hasPopup,
				},
			},
			[ShellBarV2Actions.Profile]: {
				title: defaultTexts[ShellBarV2Actions.Profile],
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.profile?.hasPopup,
					expanded: accessibilityAttributes.profile?.expanded,
					...(accessibilityAttributes.profile?.name ? { name: accessibilityAttributes.profile.name } : {}),
				},
			},
			[ShellBarV2Actions.ProductSwitch]: {
				title: defaultTexts[ShellBarV2Actions.ProductSwitch],
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.product?.hasPopup,
					expanded: accessibilityAttributes.product?.expanded,
				},
			},
			[ShellBarV2Actions.Search]: {
				title: defaultTexts[ShellBarV2Actions.Search],
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.search?.hasPopup,
				},
			},
			[ShellBarV2Actions.Overflow]: {
				title: defaultTexts[ShellBarV2Actions.Overflow],
				accessibilityAttributes: {
					hasPopup: accessibilityAttributes.overflow?.hasPopup || "menu",
					expanded: overflowExpanded === undefined ? overflowPopoverOpen : overflowExpanded,
				},
			},
		};
	}

	/**
	 * Gets role for actions toolbar area.
	 * Returns "toolbar" when multiple visible items exist.
	 */
	getActionsRole(visibleItemsCount: number): "toolbar" | undefined {
		if (visibleItemsCount <= 1) {
			return undefined;
		}
		return "toolbar";
	}

	/**
	 * Returns accessibility role for content area.
	 * Only group if multiple items exist.
	 */
	getContentRole(visibleItemsCount: number): "group" | undefined {
		if (visibleItemsCount <= 1) {
			return undefined;
		}
		return "group";
	}
}

export default ShellBarV2Accessibility;

export type {
	ShellBarV2AccessibilityInfo,
	ShellBarV2AccessibilityParams,
	ShellBarV2AreaAccessibilityInfo,
	ShellBarV2AccessibilityAttributes,
	ShellBarV2LogoAccessibilityAttributes,
	ShellBarV2AreaAccessibilityAttributes,
	ShellBarV2ProfileAccessibilityAttributes,
};
