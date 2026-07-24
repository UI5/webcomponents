import { ShellBarActions, ShellBarActionsSelectors } from "../ShellBar.js";
class ShellBarOverflow {
    constructor() {
        this.CLOSED_SEARCH_STRATEGY = {
            ACTIONS: 0, // All actions hide first
            CONTENT: 1000, // Then content (except last)
            SEARCH: 2000, // Then search button
            LAST_CONTENT: 3000, // Last content item hides last
        };
        this.OPEN_SEARCH_STRATEGY = {
            CONTENT: 0, // All content hide first
            ACTIONS: 1000, // All actions next
            SEARCH: 2000, // Then search button
            LAST_CONTENT: 0, // Last content same as other content
        };
    }
    updateOverflow(params) {
        const { overflowOuter, overflowInner, setVisible, } = params;
        if (!overflowOuter || !overflowInner) {
            return { hiddenItemsIds: [], showOverflowButton: false };
        }
        const sortedItems = this.buildHidableItems(params);
        // set initial state, to account for isOverflowing calculation
        setVisible(ShellBarActionsSelectors.Overflow, false);
        sortedItems.forEach(item => {
            // show all items to account for isOverflowing calculation
            setVisible(item.selector, true);
        });
        let nextItemToHide = null;
        let showOverflowButton = false;
        const hiddenItemsIds = [];
        // Iteratively hide items until no overflow
        for (let indexToHide = 0; indexToHide < sortedItems.length; indexToHide++) {
            nextItemToHide = sortedItems[indexToHide];
            if (!this.isOverflowing(overflowOuter, overflowInner)) {
                break; // No more overflow, stop hiding
            }
            setVisible(nextItemToHide.selector, false);
            hiddenItemsIds.push(nextItemToHide.id);
            if (nextItemToHide.showInOverflow) {
                // show overflow button to account in isOverflowing calculation
                setVisible(ShellBarActionsSelectors.Overflow, true);
                showOverflowButton = true;
            }
        }
        return {
            hiddenItemsIds,
            showOverflowButton,
        };
    }
    isOverflowing(overflowOuter, overflowInner) {
        return overflowInner.offsetWidth > overflowOuter.offsetWidth;
    }
    getOverflowStrategy(showSearchField) {
        return showSearchField ? this.OPEN_SEARCH_STRATEGY : this.CLOSED_SEARCH_STRATEGY;
    }
    buildHidableItems(params) {
        const items = [
            ...this.buildContent(params),
            ...this.buildActions(params),
        ];
        // sort by hideOrder first then by keepHidden keepHidden items are at the start
        return items.sort((a, b) => {
            if (a.keepHidden && !b.keepHidden) {
                return -1;
            }
            if (!a.keepHidden && b.keepHidden) {
                return 1;
            }
            return a.hideOrder - b.hideOrder;
        });
    }
    buildContent(params) {
        const { content, showSearchField, } = params;
        const items = [];
        const overflowStrategy = this.getOverflowStrategy(showSearchField);
        // Build content items
        content.forEach((item, index) => {
            const slotName = item._individualSlot;
            const dataHideOrder = parseInt(item.getAttribute("data-hide-order") || String(index));
            const isLast = index === content.length - 1;
            const priority = isLast ? overflowStrategy.LAST_CONTENT : overflowStrategy.CONTENT;
            items.push({
                id: slotName,
                selector: `#${slotName}`,
                hideOrder: priority + dataHideOrder,
                keepHidden: false, // Content items don't cause flickering
                showInOverflow: false,
            });
        });
        return items;
    }
    buildActions(params) {
        const { customItems, actions, showSearchField, hiddenItemsIds, } = params;
        const items = [];
        const overflowStrategy = this.getOverflowStrategy(showSearchField);
        let actionIndex = 0;
        customItems.forEach(item => {
            items.push({
                id: item._id,
                selector: `[data-ui5-stable="${item.stableDomRef}"]`,
                hideOrder: overflowStrategy.ACTIONS + actionIndex++,
                keepHidden: hiddenItemsIds.includes(item._id),
                showInOverflow: true,
            });
        });
        actions
            // skip protected actions and search (handled separately)
            .filter(a => !a.isProtected && a.id !== ShellBarActions.Search)
            .forEach(config => {
            items.push({
                id: config.id,
                selector: config.selector,
                hideOrder: overflowStrategy.ACTIONS + actionIndex++,
                keepHidden: hiddenItemsIds.includes(config.id),
                showInOverflow: true,
            });
        });
        if (!showSearchField) {
            // Only move search to overflow if it's closed
            items.push({
                id: ShellBarActions.Search,
                selector: ShellBarActionsSelectors.Search,
                hideOrder: overflowStrategy.SEARCH + actionIndex++,
                keepHidden: false, // Search button can be shown/hidden freely
                showInOverflow: true,
            });
        }
        return items;
    }
    getOverflowItems(params) {
        const { actions, customItems, hiddenItemsIds } = params;
        const result = [];
        // Add hidden custom items
        const hiddenCustomItems = customItems.filter((item) => hiddenItemsIds.includes(item._id));
        hiddenCustomItems.forEach((item, index) => {
            result.push({
                type: "item", id: item._id, data: item, order: 3 + index,
            });
        });
        const actionOrder = {
            [ShellBarActions.Search]: 0,
            [ShellBarActions.Notifications]: 1,
            [ShellBarActions.Assistant]: 2,
        };
        const hiddenActions = actions.filter(action => hiddenItemsIds.includes(action.id));
        hiddenActions.forEach(action => {
            result.push({
                type: "action",
                id: action.id,
                data: action,
                order: actionOrder[action.id] ?? 0,
            });
        });
        return result.sort((a, b) => a.order - b.order);
    }
}
export default ShellBarOverflow;
//# sourceMappingURL=ShellBarOverflow.js.map