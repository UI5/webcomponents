/**
 * Defines the separator types for Select component two-column layout.
 * @public
 */
enum SelectTwoColumnSeparator {
	/**
	 * Will show bullet(·) as separator on two columns layout when Select is in read-only mode.
	 * @public
	 */
	Bullet = "Bullet",

	/**
	 *	Will show N-dash(–) as separator on two columns layout when Select is in read-only mode.
	 * @public
	 */
	Dash = "Dash",

	/**
	 * 	Will show vertical line(|) as separator on two columns layout when Select is in read-only mode.
	 * @public
	 */
	VerticalLine = "VerticalLine",
}

export default SelectTwoColumnSeparator;
