/**
 * Shared high-zoom (≤320px effective viewport) detection used by the date/time pickers.
 *
 * At ~200% browser zoom on a narrow viewport the calendar/clock grids no longer fit, so the
 * pickers switch to a select-based UI. Detection is based on the effective viewport width
 * rather than a true zoom API (which browsers do not expose).
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

/**
 * Implemented by any component that wants to be notified of high-zoom state changes.
 * Implementors MUST declare `_highZoom` with `@property({ type: Boolean, noAttribute: true })`
 * so that assigning it triggers component invalidation and re-render.
 */
interface HighZoomObserver {
	_highZoom: boolean;
}

// --- Singleton pub/sub ---------------------------------------------------------

const observers = new Set<HighZoomObserver>();
let rafId = 0;

const handler = () => {
	if (rafId) {
		cancelAnimationFrame(rafId);
	}
	rafId = requestAnimationFrame(() => {
		rafId = 0;
		const bHighZoom = isHighZoom();
		observers.forEach(obs => {
			if (obs._highZoom !== bHighZoom) {
				obs._highZoom = bHighZoom;
			}
		});
	});
};

/**
 * Registers a component to receive high-zoom state updates.
 * The shared window listeners are created on the first subscription.
 * Call in `onEnterDOM`.
 */
const subscribeHighZoom = (observer: HighZoomObserver): void => {
	if (observers.size === 0) {
		window.visualViewport?.addEventListener("resize", handler);
		window.addEventListener("resize", handler);
	}
	observers.add(observer);
};

/**
 * Removes a component from high-zoom state updates.
 * The shared window listeners are torn down when the last subscriber leaves.
 * Call in `onExitDOM`.
 */
const unsubscribeHighZoom = (observer: HighZoomObserver): void => {
	observers.delete(observer);
	if (observers.size === 0) {
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = 0;
		}
		window.visualViewport?.removeEventListener("resize", handler);
		window.removeEventListener("resize", handler);
	}
};

export {
	HIGH_ZOOM_MAX_VIEWPORT_WIDTH, isHighZoom, subscribeHighZoom, unsubscribeHighZoom,
};
export type { HighZoomObserver };
