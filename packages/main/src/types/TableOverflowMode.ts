/**
 * Overflow mode of the `ui5-table` component.
 *
 * @public
 */
enum TableOverflowMode {
	/**
	 * Shows a scrollbar, when the table cannot fit all columns.
	 * @public
	 */
	Scroll = "Scroll",

	/**
	 * Pops in columns, that do not fit into the table anymore.
	 * @public
	 */
	Popin = "Popin"
}

export default TableOverflowMode;
