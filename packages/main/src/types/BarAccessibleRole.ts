/**
 * Bar accessible roles.
 * @public
 * @since 2.9.0
 */
enum BarAccessibleRole {

	/**
	 * Represents the ARIA role "toolbar".
	 * @public
	 * @deprecated The Bar does not implement toolbar keyboard navigation (arrow keys) and should not expose the "toolbar" role. Use "None" instead.
	 */
	Toolbar = "Toolbar",

	/**
	 * Represents the ARIA role "none".
	 * @public
	 */
	None = "None"

}

export default BarAccessibleRole;
