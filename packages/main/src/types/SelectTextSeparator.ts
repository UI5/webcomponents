/**
 * Defines the separator types for Select component two-column layout.
 * @public
 * @since 2.16.0
 */
enum SelectTextSeparator {
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

export default SelectTextSeparator;
