/**
 * Accessibility modes of the Form.
 *
 * Based on the mode, the Form and its items will render different HTML elements and ARIA attributes,
 * which are appropriate for the use-case.
 *
 * **Usage:**
 * - "Display" mode should be used when the form consists of non-editable (e.g. texts) form items.
 * - "Edit" mode should be used when the form consists of editable (e.g. input fields) form items.
 *
 * @public
 * @since 2.16.0
 */
declare enum FormAccessibleMode {
    /**
     * Display mode.
     * @public
     */
    Display = "Display",
    /**
     * Edit mode.
     * @public
     */
    Edit = "Edit"
}
export default FormAccessibleMode;
