/**
 * ListItem accessible roles.
 * @public
 * @since 2.9.0
 */
enum BarAccessibleRole {

	/**
	 * Represents the ARIA role "toolbar".
	 * @public
	 * @deprecated The Bar component does not implement toolbar keyboard navigation (arrow keys).
	 * Using this value is discouraged. The `accessibleRole` property itself is deprecated and will be removed in a future major version.
	 */
	Toolbar = "Toolbar",

	/**
	 * Represents the ARIA role "none".
	 * @public
	 */
	None = "None"

}

export default BarAccessibleRole;
