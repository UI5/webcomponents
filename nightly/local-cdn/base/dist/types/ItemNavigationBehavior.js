/**
 * Different behavior for ItemNavigation.
 *
 * @public
 */
var ItemNavigationBehavior;
(function (ItemNavigationBehavior) {
    /**
     * Static behavior: navigations stops at the first or last item.
     * @public
     */
    ItemNavigationBehavior["Static"] = "Static";
    /**
     * Cycling behavior: navigating past the last item continues with the first and vice versa.
     * @public
     */
    ItemNavigationBehavior["Cyclic"] = "Cyclic";
})(ItemNavigationBehavior || (ItemNavigationBehavior = {}));
export default ItemNavigationBehavior;
//# sourceMappingURL=ItemNavigationBehavior.js.map