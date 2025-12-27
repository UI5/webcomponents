/**
 * Specifies the navigation layout mode.
 * @public
 */
var NavigationLayoutMode;
(function (NavigationLayoutMode) {
    /**
     * Automatically calculates the navigation layout mode based on the screen device type.
     * `Expanded` on desktop and `Collapsed` on tablet and phone.
     * @public
     */
    NavigationLayoutMode["Auto"] = "Auto";
    /**
     * Collapsed side navigation.
     * @public
     */
    NavigationLayoutMode["Collapsed"] = "Collapsed";
    /**
     * Expanded side navigation.
     * @public
     */
    NavigationLayoutMode["Expanded"] = "Expanded";
})(NavigationLayoutMode || (NavigationLayoutMode = {}));
export default NavigationLayoutMode;
//# sourceMappingURL=NavigationLayoutMode.js.map