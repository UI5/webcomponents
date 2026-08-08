/**
 * Specifies the navigation layout mode.
 * @public
 */
var NavigationLayoutMode;
(function (NavigationLayoutMode) {
    /**
     * Automatically calculates the navigation layout mode based on the screen width.
     * `Collapsed` on small screens (screen width of 599px or less) and `Expanded` on larger screens (screen width of 600px or more).
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