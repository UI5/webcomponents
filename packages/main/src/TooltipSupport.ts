import getSingletonElementInstance from "@ui5/webcomponents-base/dist/util/getSingletonElementInstance.js";
import Tooltip from "./Tooltip.js";
import TooltipGestures from "./TooltipGestures.js";

/**
 * Runtime support for the magic `data-ui5-tooltip` attribute.
 *
 * A component opts into the enhanced tooltip by putting
 * `data-ui5-tooltip={this.tooltip}` on the internal element that used to carry
 * the native `title` (and, optionally, `data-ui5-tooltip-align`). On
 * hover/focus/touch of a `[data-ui5-tooltip]` element, a single shared,
 * scoping-safe `<ui5-tooltip>` is docked to that element and driven through the
 * full open/close/long-press/Escape gesture state machine.
 *
 * Capture-phase document listeners discover the target (events bubbling out of
 * component shadow roots are seen); `composedPath()` resolves the real inner
 * element across shadow boundaries. Only the target currently being interacted
 * with carries gesture listeners — `TooltipGestures` is bound on discovery and
 * released when a different target is discovered or the target leaves the DOM.
 *
 * The visual tooltip is accessibility-silent; the opener owns ARIA.
 */

const ATTRIBUTE = "data-ui5-tooltip";
const ALIGN_ATTRIBUTE = "data-ui5-tooltip-align";

let started = false;
let activeTarget: HTMLElement | undefined;
let activeGestures: TooltipGestures | undefined;

// One shared <ui5-tooltip>, created scoping-safe on first use and re-docked per target.
function getSharedTooltip(): Tooltip {
	const tag = Tooltip.getMetadata().getTag();
	return getSingletonElementInstance(tag, document.body, () => document.createElement(tag)) as Tooltip;
}

// First element in the event's composed path that carries the magic attribute.
// composedPath() crosses shadow boundaries and is not retargeted, so it sees the
// real inner element (e.g. the <button> inside ui5-button's shadow root).
function matchInPath(e: Event): HTMLElement | null {
	for (const node of e.composedPath()) {
		if (node instanceof HTMLElement && node.hasAttribute(ATTRIBUTE)) {
			return node;
		}
	}
	return null;
}

// Point the shared tooltip at `target`, syncing all per-target state, and open it.
function dockAndOpen(target: HTMLElement): void {
	// The gesture may fire after the target has been removed from the DOM.
	if (!target.isConnected) {
		getSharedTooltip().closeTooltip();
		releaseGestures();
		return;
	}
	const text = target.getAttribute(ATTRIBUTE) ?? "";
	if (!text) {
		// The attribute was cleared while docked; close rather than leave it stale.
		getSharedTooltip().closeTooltip();
		return;
	}
	const tooltip = getSharedTooltip();
	tooltip.text = text;
	// Reset to the default when the attribute is absent so a prior target's value
	// does not leak into the next (the tooltip is shared).
	tooltip.horizontalAlign = (target.getAttribute(ALIGN_ATTRIBUTE) as Tooltip["horizontalAlign"]) || "Center";
	tooltip.opener = target;
	tooltip.openTooltip();
}

// Bind the gesture state machine to `target`, replacing any previous binding.
// `type` is the discovery event so the gesture can replay it (the DOM skips the
// listeners _attach() adds mid-dispatch, so the first hover/focus is otherwise lost).
function bindGestures(target: HTMLElement, type: "mouseover" | "focusin" | "touchstart"): void {
	if (activeTarget === target && activeGestures) {
		activeGestures.triggerFromDiscovery(type);
		return;
	}
	releaseGestures();
	activeTarget = target;
	const tooltip = getSharedTooltip();
	activeGestures = new TooltipGestures({
		opener: target,
		onOpen: () => dockAndOpen(target),
		onClose: () => tooltip.closeTooltip(),
		isPendingOrOpen: () => tooltip.isOpen(),
		getDelay: () => tooltip.delay,
	});
	activeGestures.triggerFromDiscovery(type);
}

function releaseGestures(): void {
	activeGestures?.destroy();
	activeGestures = undefined;
	activeTarget = undefined;
}

function onPointerOver(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		bindGestures(target, e.type === "touchstart" ? "touchstart" : "mouseover");
	}
}

function onFocusIn(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		bindGestures(target, "focusin");
	}
}

/**
 * Starts `data-ui5-tooltip` support for the whole document. Idempotent — calling
 * it more than once is a no-op. Components that emit the magic attribute call it
 * on enter-DOM so the enhanced tooltip works without any app-level setup.
 *
 * ```js
 * import { startTooltipSupport } from "@ui5/webcomponents/dist/TooltipSupport.js";
 * startTooltipSupport();
 * ```
 * @public
 */
function startTooltipSupport(): void {
	if (started || typeof document === "undefined") {
		return;
	}
	started = true;

	// Capture phase so events from inside component shadow roots still reach us.
	document.addEventListener("mouseover", onPointerOver, true);
	document.addEventListener("focusin", onFocusIn, true);
	document.addEventListener("touchstart", onPointerOver, true);
}

export { startTooltipSupport };
