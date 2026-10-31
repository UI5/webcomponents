/**
 * Highlights the occurrences of the highlightedText in the text by wrapping them in a span with the provided class.
 * @param text The original text in which to highlight occurrences.
 * @param highlightedText The text to highlight within the original text.
 * @param sClass The CSS class to apply to the highlighted spans.
 * @returns The text with the highlighted occurrences wrapped in a span with the specified class.
 * @since 2.28.0
 */
declare const highlightText: (text: string | null | undefined, highlightedText: string | null | undefined, sClass: string) => string;
export default highlightText;
