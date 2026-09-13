/**
 * Represents the boundary state of a component's internal navigation
 * (e.g. a text cursor position inside an input field).
 */
export type ToolbarArrowNavState = {
    atLeftEnd: boolean;
    atRightEnd: boolean;
};
/**
 * Interface for components that can be placed inside a `ui5-toolbar-item` and
 * manage their own internal keyboard navigation (e.g. a text cursor in an input
 * field). Components that implement this interface report their boundary state
 * to the toolbar so the toolbar knows when to move focus to the next item.
 *
 * ### Return value of `getArrowNavState`
 * - `undefined` - the component has no internal navigation state to report at
 *   this moment (e.g. it is not focused). The toolbar will not intercept the
 *   arrow key.
 * - `{ atLeftEnd: true }` - the internal cursor/selection is at the left
 *   boundary; the toolbar may move focus to the previous item on ArrowLeft.
 * - `{ atRightEnd: true }` - the internal cursor/selection is at the right
 *   boundary; the toolbar may move focus to the next item on ArrowRight.
 * - `{ atLeftEnd: false, atRightEnd: false }` - the cursor is in the middle;
 *   the toolbar does not intercept the arrow key.
 *
 * @public
 * @since 2.25.0
 */
export interface IToolbarArrowNavProvider {
    getArrowNavState(): ToolbarArrowNavState | undefined;
}
export declare function isToolbarArrowNavProvider(el: unknown): el is IToolbarArrowNavProvider;
