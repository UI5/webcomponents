/**
 * Shared high-zoom (≤320px effective viewport) detection used by the date/time pickers.
 *
 * At ~200% browser zoom on a narrow viewport the calendar/clock grids no longer fit, so the
 * pickers switch to a select-based UI. Detection is based on the effective viewport width
 * rather than a true zoom API (which browsers do not expose).
 *
 * TimePicker cannot extend DateComponentBase, so this logic lives here and is shared by both.
 */

/** Effective viewport width (CSS px) at or below which pickers switch to their high-zoom UI. */
const HIGH_ZOOM_MAX_VIEWPORT_WIDTH = 320;

/**
 * Returns true when the effective viewport width is ≤ the high-zoom threshold.
 * Note: this measures viewport width, which correlates with (but is not exactly) zoom level.
 */
const isHighZoom = (): boolean => {
	return ((window.visualViewport?.width) ?? window.innerWidth) <= HIGH_ZOOM_MAX_VIEWPORT_WIDTH;
};

type HighZoomWatcher = {
	/** Removes the resize listeners and cancels any pending animation frame. */
	stop: () => void;
};

/**
 * Starts watching for viewport changes that cross the high-zoom threshold.
 * `onChange` is called (with the new value) only when the high-zoom state actually flips,
 * deferred to the next animation frame so `visualViewport.width` reflects the settled layout.
 */
const startHighZoomWatch = (
	getCurrent: () => boolean,
	onChange: (highZoom: boolean) => void,
	isConnected: () => boolean,
): HighZoomWatcher => {
	let rafId = 0;

	const handler = () => {
		if (rafId) {
			cancelAnimationFrame(rafId);
		}
		rafId = requestAnimationFrame(() => {
			rafId = 0;
			if (!isConnected()) { return; }
			const bHighZoom = isHighZoom();
			if (bHighZoom !== getCurrent()) {
				onChange(bHighZoom);
			}
		});
	};

	window.visualViewport?.addEventListener("resize", handler);
	window.addEventListener("resize", handler);

	return {
		stop() {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = 0;
			}
			window.visualViewport?.removeEventListener("resize", handler);
			window.removeEventListener("resize", handler);
		},
	};
};

export { HIGH_ZOOM_MAX_VIEWPORT_WIDTH, isHighZoom, startHighZoomWatch };
export type { HighZoomWatcher };
