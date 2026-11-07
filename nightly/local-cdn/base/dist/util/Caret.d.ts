/**
 * Returns the caret (cursor) position of the specified text field (field).
 * Return value range is 0-field.value.length.
 */
declare const getCaretPosition: (field: HTMLInputElement) => number | null;
declare const setCaretPosition: (field: HTMLInputElement, caretPos: number | null) => void;
export { getCaretPosition, setCaretPosition, };
