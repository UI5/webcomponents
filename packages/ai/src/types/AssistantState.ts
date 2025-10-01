/**
 * Defines the UI states for the AI Writing Assistant.
 *
 * These states control the visual and behavioral rendering of the assistant component.
 *
 * @public
 * @experimental
 */
enum AssistantState {
	/**
	 * The initial state.
	 * Shows only the initial toolbar button.
	 * @public
	 */
	Initial = "Initial",

	/**
	 * The loading state.
	 * Indicates an action (e.g., generation) is in progress.
	 * @public
	 */
	Loading = "Loading",
}

export default AssistantState;
