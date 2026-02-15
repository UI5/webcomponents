/**
 * Different behavior for ItemNavigation.
 *
 * @public
 */
declare enum ItemNavigationBehavior {
    /**
     * Static behavior: navigations stops at the first or last item.
     * @public
     */
    Static = "Static",
    /**
     * Cycling behavior: navigating past the last item continues with the first and vice versa.
     * @public
     */
    Cyclic = "Cyclic"
}
export default ItemNavigationBehavior;
