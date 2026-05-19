/**
 * Specifies the navigation layout mode.
 * @public
 */
enum NavigationLayoutMode {
	/**
	 * Automatically calculates the navigation layout mode based on the screen width.
	 * `Collapsed` on small screens (screen width of 599px or less) and `Expanded` on larger screens (screen width of 600px or more).
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
