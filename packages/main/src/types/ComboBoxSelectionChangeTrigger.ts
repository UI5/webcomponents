/**
 * Describes the source of a `selection-change` event fired by the `ui5-combobox`.
 * @public
 * @since 2.24.0
 */
enum ComboBoxSelectionChangeTrigger {
	/**
	 * Selection caused by typeahead (auto-complete while typing).
	 * @public
	 */
	Typeahead = "Typeahead",

	/**
	 * Selection caused by clicking or tapping an item in the dropdown.
	 * @public
	 */
	Click = "Click",

	/**
	 * Selection caused by keyboard navigation (Arrow keys, Home, End, Page Up/Down, Enter).
	 * @public
	 */
	Keyboard = "Keyboard",
}

export default ComboBoxSelectionChangeTrigger;
