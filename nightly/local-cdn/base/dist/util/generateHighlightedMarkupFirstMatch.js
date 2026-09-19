import escapeRegex from "./escapeRegex.js";
// @ts-expect-error
import encodeXML from "../sap/base/security/encodeXML.js";
/**
 * Generate markup for a raw string where the first match following StartsWithPerTerm pattern is wrapped with `<b>` tag.
 * StartsWithPerTerm pattern: finds the first word (at start or after whitespace) that starts with the search text.
 * All inputs to this function are considered literal text, and special characters will always be escaped.
 * @param {string} text The text to add highlighting to
 * @param {string} textToHighlight The text which should be highlighted (case-insensitive)
 * @return {string} the markup HTML which contains the first match surrounded with a `<b>` tag.
 */
function generateHighlightedMarkupFirstMatch(text, textToHighlight) {
    const normalizedText = text || "";
    if (!normalizedText || !textToHighlight) {
        return encodeXML(normalizedText);
    }
    const filterValue = textToHighlight.toLowerCase();
    const lowerText = normalizedText.toLowerCase();
    const matchLength = textToHighlight.length;
    // Find the first word that starts with textToHighlight (StartsWithPerTerm pattern)
    let matchIndex = lowerText.search(new RegExp(`(^|\\s)${escapeRegex(filterValue)}`));
    if (matchIndex !== -1 && lowerText[matchIndex] === " ") {
        matchIndex++; // Skip the space
    }
    // If no match found, return encoded text
    if (matchIndex === -1) {
        return encodeXML(normalizedText);
    }
    // Build highlighted markup with only the first match
    const beforeMatch = encodeXML(normalizedText.substring(0, matchIndex));
    const match = encodeXML(normalizedText.substring(matchIndex, matchIndex + matchLength));
    const afterMatch = encodeXML(normalizedText.substring(matchIndex + matchLength));
    return `${beforeMatch}<b>${match}</b>${afterMatch}`;
}
export default generateHighlightedMarkupFirstMatch;
//# sourceMappingURL=generateHighlightedMarkupFirstMatch.js.map