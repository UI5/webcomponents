/**
 * Generate markup for a raw string where the first match following StartsWithPerTerm pattern is wrapped with `<b>` tag.
 * StartsWithPerTerm pattern: finds the first word (at start or after whitespace) that starts with the search text.
 * All inputs to this function are considered literal text, and special characters will always be escaped.
 * @param {string} text The text to add highlighting to
 * @param {string} textToHighlight The text which should be highlighted (case-insensitive)
 * @return {string} the markup HTML which contains the first match surrounded with a `<b>` tag.
 */
declare function generateHighlightedMarkupFirstMatch(text: string, textToHighlight: string): string;
export default generateHighlightedMarkupFirstMatch;
