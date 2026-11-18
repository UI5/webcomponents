/**
 * Hierarchy states of a row in the `ui5-table` component.
 *
 * @public
 * @since 2.29.0
 * @experimental
 */
enum TableHierarchyNodeState {
	/**
	 * The row has no children.
	 * @public
	 */
	Leaf = "Leaf",

	/**
	 * The row has children which are currently displayed.
	 * @public
	 */
	Expanded = "Expanded",

	/**
	 * The row has children which are currently not displayed.
	 * @public
	 */
	Collapsed = "Collapsed",
}

export default TableHierarchyNodeState;
