/**
 * Specifies the navigation layout mode.
 * @public
 */
enum NavigationLayoutMode {
	/**
	 * Automatically calculates the navigation layout mode based on the screen device type.
	 * `Collapsed` on small screens (under 600 px wide) and `Expanded` on larger screens.
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
	Expanded = "Expanded",
}

export default NavigationLayoutMode;
