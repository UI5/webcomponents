/**
 * Defines the semantic type of the row highlight indicator.
 *
 * @public
 */
enum Highlight {
	/**
	 * No highlight is shown.
	 * @public
	 */
	None = "None",

	/**
	 * Indicates a positive or successful state (for example, completed or approved).
	 * @public
	 */
	Positive = "Positive",

	/**
	 * Indicates a critical state that needs attention (for example, a warning).
	 * @public
	 */
	Critical = "Critical",

	/**
	 * Indicates a negative or error state (for example, rejected or failed).
	 * @public
	 */
	Negative = "Negative",

	/**
	 * Indicates a neutral, informative state (for example, a hint or additional detail).
	 * @public
	 */
	Information = "Information",
}

export default Highlight;
