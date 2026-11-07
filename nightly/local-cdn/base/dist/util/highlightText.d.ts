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
declare const highlightText: (text: string | null | undefined, highlightedText: string | null | undefined, sClass?: string) => string;
export default highlightText;
