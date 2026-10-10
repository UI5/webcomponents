/**
 * Generate markup for a raw string where a particular text is wrapped with some tag, by default `<b>` (bold) tag.
 * All inputs to this function are considered literal text, and special characters will always be escaped.
 * @param {string} text The text to add highlighting to
 * @param {string} textToHighlight The text which should be highlighted
 * @return {string} the markup HTML which contains all occurrances of the input text surrounded with a `<b>` tag.
 */
declare function generateHighlightedMarkup(text: string, textToHighlight: string): string;
export default generateHighlightedMarkup;
