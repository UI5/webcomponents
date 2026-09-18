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
 * Highlights the occurrences of the highlightedText in the text by wrapping them in a span with the provided class.
 * @param text The original text in which to highlight occurrences.
 * @param highlightedText The text to highlight within the original text.
 * @param sClass The CSS class to apply to the highlighted spans.
 * @returns The text with the highlighted occurrences wrapped in a span with the specified class.
 * @since 2.28.0
 */
const highlightText = (text: string | null, highlightedText: string | null, sClass: string) => {
	text = text || "";
	highlightedText = highlightedText || "";

	const lowerText = text.toLowerCase();
	const lowerHighlight = highlightedText.toLowerCase();
	const highlightLength = lowerHighlight.length;
	let index = lowerText.indexOf(lowerHighlight);

	if (!highlightLength || index === -1) {
		return text;
	}

	// Lowercasing can expand a single character (for example Turkish dotted İ).
	// The index map keeps the lowercase search positions aligned with the original text slices.
	const indexMap = createLowerCaseIndexMap(text);

	let result = "";
	let lastEnd = 0;

	while (index > -1) {
		const start = indexMap.originalStart[index];
		const end = indexMap.originalEnd[index + highlightLength - 1];

		result += `${text.slice(lastEnd, start)}<span class="${sClass}">${text.slice(start, end)}</span>`;
		lastEnd = end;
		index = lowerText.indexOf(lowerHighlight, index + highlightLength);
	}

	result += text.slice(lastEnd);

	return result;
};

export default highlightText;
