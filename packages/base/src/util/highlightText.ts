// @ts-expect-error
import encodeXML from "../sap/base/security/encodeXML.js";

function createLowerCaseIndexMap(text: string) {
	const originalStart: number[] = [];
	const originalEnd: number[] = [];
	let originalIndex = 0;

	Array.from(text).forEach(character => {
		const lowerCharacter = character.toLowerCase();
		const end = originalIndex + character.length;

		Array.from({ length: lowerCharacter.length }).forEach(() => {
			originalStart.push(originalIndex);
			originalEnd.push(end);
		});

		originalIndex = end;
	});

	return {
		originalStart,
		originalEnd,
	};
}

/**
 * Highlights the occurrences of the highlightedText in the text.
 * When a CSS class is provided, matches are wrapped in `<span class="...">`.
 * When no class is provided, matches are wrapped in `<b>`.
 * @param text The original text in which to highlight occurrences.
 * @param highlightedText The text to highlight within the original text.
 * @param sClass The CSS class to apply to the highlighted spans. When omitted, a `<b>` tag is used instead.
 * @returns The text with the highlighted occurrences wrapped in the appropriate tag.
 * @since 2.28.0
 */
const highlightText = (text: string | null | undefined, highlightedText: string | null | undefined, sClass?: string) => {
	text = text || "";
	highlightedText = highlightedText || "";

	const lowerText = text.toLowerCase();
	const lowerHighlight = highlightedText.toLowerCase();
	const highlightLength = lowerHighlight.length;
	let index = lowerText.indexOf(lowerHighlight);

	if (!highlightLength || index === -1) {
		return encodeXML(text) as string;
	}

	// Lowercasing can expand a single character (for example Turkish dotted İ).
	// The index map keeps the lowercase search positions aligned with the original text slices.
	const indexMap = createLowerCaseIndexMap(text);

	let result = "";
	let lastEnd = 0;

	while (index > -1) {
		const start = indexMap.originalStart[index];
		const end = indexMap.originalEnd[index + highlightLength - 1];

		const open = sClass ? `<span class="${sClass}">` : "<b>";
		const close = sClass ? "</span>" : "</b>";
		result += `${encodeXML(text.slice(lastEnd, start))}${open}${encodeXML(text.slice(start, end))}${close}`;
		lastEnd = end;
		index = lowerText.indexOf(lowerHighlight, index + highlightLength);
	}

	result += encodeXML(text.slice(lastEnd));

	return result;
};

export default highlightText;
