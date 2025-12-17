/**
 * Specifies the navigation layout mode.
 * @public
 */
enum NavigationLayoutMode {
	/**
	 * Automatically calculates the navigation layout mode based on the screen device type.
	 * `Expanded` on size M, L, XL and `Collapsed` on size S screens.
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
