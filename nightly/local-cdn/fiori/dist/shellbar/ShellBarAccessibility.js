class ShellBarAccessibility {
    getActionsAccessibilityAttributes(defaultTexts, params) {
        const { overflowPopoverOpen, accessibilityAttributes, showSearchField } = params;
        const overflowExpanded = accessibilityAttributes.overflow?.expanded;
        return {
            notifications: {
                title: defaultTexts.notifications,
                accessibilityAttributes: {
                    // Provide an explicit accessible name so the Button does not derive its
                    // aria-label from the count badge ("X items"), which otherwise collides
                    // with the "X Notifications" tooltip and causes a double announcement.
                    ariaLabel: defaultTexts.notifications,
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
                    expanded: accessibilityAttributes.search?.expanded !== undefined ? accessibilityAttributes.search.expanded : showSearchField,
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