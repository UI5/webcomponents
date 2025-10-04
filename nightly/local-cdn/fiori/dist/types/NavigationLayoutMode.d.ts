/**
 * Specifies the navigation layout mode.
 * @public
 */
declare enum NavigationLayoutMode {
    /**
     * Automatically calculates the navigation layout mode based on the screen device type.
     * `Expanded` on desktop and `Collapsed` on tablet and phone.
     * @public
     */
    Auto = "Auto",
    /**
     * Collapsed side navigation.
     * @public
     */
    Collapsed = "Collapsed",
    /**
     * Expanded side navigation.
     * @public
     */
    Expanded = "Expanded"
}
export default NavigationLayoutMode;
