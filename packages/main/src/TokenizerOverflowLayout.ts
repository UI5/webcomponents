/**
 * Layout states for the Tokenizer component.
 *
 * - all:  every token fits; no overflow button shown.
 * - some: a prefix of tokens fits; a "+N more" button follows the last visible token.
 * - none: no token fits; only an "N Items" fallback button is rendered.
 */
export type OverflowLayoutState = "all" | "some" | "none";

export interface OverflowLayout {
	state: OverflowLayoutState;
	/** Number of tokens rendered inline (0 for state "none"). */
	visibleCount: number;
	/** Number of hidden tokens (0 for state "all"). */
	hiddenCount: number;
}

/**
 * Pure, DOM-free layout calculation for tokenizer overflow.
 *
 * Width model (single-line, LTR/RTL-agnostic – pass absolute pixel values):
 *
 *   Available:  containerWidth
 *   State A:    paddingStart + Σ tokenWidths[0..n-1] + (n-1)·gap
 *   State B(k): paddingStart + Σ tokenWidths[0..k-1] + k·gap + nMoreWidth(n-k)
 *               (last visible token removes its own gap; the +N button provides gap via
 *                its margin-inline-start, so accounting for k·gap covers both sides)
 *   State C:    fallback button rendered; its fit in the container is the caller's concern.
 *
 * @param containerWidth  - pixel width of the tokenizer container (content-box).
 * @param tokenWidths     - rendered pixel width of each token element (no margins).
 * @param gap             - pixel value of --_ui5_token_right_margin (token gap / n-more margin-start).
 * @param paddingStart    - pixel value of the container's padding-inline-start.
 * @param nMoreWidth      - returns the rendered width of the "+N more" / "N Items" button for
 *                          a given hidden count; called at most n-1 times.
 */
export function calculateLayout(
	containerWidth: number,
	tokenWidths: readonly number[],
	gap: number,
	paddingStart: number,
	nMoreWidth: (hiddenCount: number) => number,
): OverflowLayout {
	const n = tokenWidths.length;

	if (n === 0) {
		return { state: "all", visibleCount: 0, hiddenCount: 0 };
	}

	// prefix[k] = paddingStart + Σ (tokenWidths[i] + gap) for i = 0..k-1
	// Re-use a plain array – Float64Array would be slightly faster but adds no correctness.
	const prefix = new Array<number>(n + 1);
	prefix[0] = paddingStart;
	for (let i = 0; i < n; i++) {
		prefix[i + 1] = prefix[i] + tokenWidths[i] + gap;
	}

	// State A: all tokens fit; the last token has no trailing gap.
	if (prefix[n] - gap <= containerWidth) {
		return { state: "all", visibleCount: n, hiddenCount: 0 };
	}

	// State B: find the largest k ≥ 1 such that k tokens + "+N-k more" fits.
	// Iterate from the largest candidate downward; the first that fits wins.
	for (let k = n - 1; k >= 1; k--) {
		const hidden = n - k;
		// prefix[k] already includes k·gap (one gap per visible token).
		// The n-more button's margin-inline-start provides the visual gap on the right.
		if (prefix[k] + nMoreWidth(hidden) <= containerWidth) {
			return { state: "some", visibleCount: k, hiddenCount: hidden };
		}
	}

	// State C: not even one token + n-more fits.
	return { state: "none", visibleCount: 0, hiddenCount: n };
}
