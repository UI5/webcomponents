/**
 * Interface for ShellBar search controllers.
 */
export interface IShellBarSearchController {
	/**
	 * Subscribe to search field events.
	 */
	subscribe(): void;

	/**
	 * Unsubscribe from search field events.
	 */
	unsubscribe(): void;

	/**
	 * Auto-collapse or expand search based on available space.
	 * @param hiddenItems Number of items currently hidden due to overflow
	 * @param availableSpace Available space in pixels (spacer width)
	 */
	autoManageSearchState(hiddenItems: number, availableSpace: number): void;

	/**
	 * Sync component state (showSearchField) to search field.
	 */
	syncShowSearchFieldState(): void;

	/**
	 * Check if full-screen search should be shown.
	 * Returns true when shellbar is overflowing AND search is visible.
	 */
	shouldShowFullScreen(): boolean;

	/**
	 * Called from onAfterRendering to inform the controller of the initial render state.
	 * If hiddenItems is 0 (component rendered without overflow), clears the initialRender flag
	 * so that subsequent resize events don't incorrectly treat themselves as "initial render"
	 * and collapse search that the user explicitly opened.
	 */
	notifyInitialRender(hiddenItems: number): void;
}
