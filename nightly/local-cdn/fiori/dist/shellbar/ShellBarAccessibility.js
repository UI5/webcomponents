class ShellBarAccessibility {
    getActionsAccessibilityAttributes(defaultTexts, params) {
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
                    hasPopup: accessibilityAttributes.overflow?.hasPopup || "menu",
                    expanded: overflowExpanded === undefined ? overflowPopoverOpen : overflowExpanded,
                },
            },
        };
    }
    getActionsRole(visibleItemsCount) {
        return visibleItemsCount > 1 ? "toolbar" : undefined;
    }
    getContentRole(visibleItemsCount) {
        return visibleItemsCount > 1 ? "group" : undefined;
    }
}
export default ShellBarAccessibility;
//# sourceMappingURL=ShellBarAccessibility.js.map