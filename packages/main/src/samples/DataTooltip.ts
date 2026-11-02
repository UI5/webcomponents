import type Tooltip from "../Tooltip.js";
import "../Tooltip.js"; // ensure the <ui5-tooltip> custom element is defined

/**
 * SAMPLE / PROOF-OF-CONCEPT — not production framework infrastructure.
 *
 * Demonstrates how a magic `data-ui5-tooltip` attribute could drive the
 * enhanced tooltip from *inside* a component's shadow DOM — on the internal
 * element that used to carry the native `title` — without the component
 * instantiating `<ui5-tooltip>` or wiring an `opener` for it.
 *
 * This is NOT meant for the host element: public components already expose a
 * `tooltip` property (e.g. `ui5-button`), and that property is what the author
 * sets. The magic attribute is the component-internal mechanism: the component
 * puts `data-ui5-tooltip={this.tooltip}` on the same inner element where it
 * previously rendered `title={...}`, and this hook upgrades it to the enhanced
 * tooltip.
 *
 * It is a thin layer *on top of* the `<ui5-tooltip>` component: on
 * hover/focus/long-press of a `[data-ui5-tooltip]` element, a single shared
 * `<ui5-tooltip>` is docked to that element (its `opener` + `text` are set) and
 * opened. All gesture, delay, placement and a11y behavior stays in the
 * component — this file only decides *which* element the shared tooltip points at.
 *
 * Usage (see DataTooltipSample.html):
 *
 * ```js
 * import { startDataTooltips } from "@ui5/webcomponents/dist/samples/DataTooltip.js";
 * startDataTooltips();
 * ```
 *
 * ```tsx
 * // Inside a component template, on the internal element that had `title` before:
 * <button class="ui5-button-root" data-ui5-tooltip={this.tooltip}>
 *   ...
 * </button>
 * ```
 *
 * The honest cost flagged in tooltip-api-research.md lives here: detecting
 * matches needs DOM observation. This sample uses capture-phase document
 * listeners so events bubbling out of shadow roots are seen — enough to
 * demonstrate the ergonomics, deliberately simpler than a real cross-shadow-root
 * implementation.
 */

const ATTRIBUTE = "data-ui5-tooltip";
const ALIGN_ATTRIBUTE = "data-ui5-tooltip-align";

let sharedTooltip: Tooltip | undefined;
let started = false;

// One shared <ui5-tooltip> instance, created on first use and re-docked per target.
function getSharedTooltip(): Tooltip {
	if (!sharedTooltip) {
		const el = document.createElement("ui5-tooltip");
		document.body.appendChild(el);
		sharedTooltip = el as unknown as Tooltip;
	}
	return sharedTooltip;
}

// First element in the event's composed path that carries the magic attribute.
// composedPath() crosses shadow boundaries and is not retargeted, so it sees the
// real inner element (e.g. the <button> inside ui5-button's shadow root), which a
// retargeted e.target would hide.
function matchInPath(e: Event): HTMLElement | null {
	for (const node of e.composedPath()) {
		if (node instanceof HTMLElement && node.hasAttribute(ATTRIBUTE)) {
			return node;
		}
	}
	return null;
}

// Point the shared tooltip at `target` and open it.
function dockAndOpen(target: HTMLElement): void {
	const text = target.getAttribute(ATTRIBUTE) ?? "";
	if (!text) {
		return;
	}
	const tooltip = getSharedTooltip();
	tooltip.text = text;
	// Optional per-target alignment; reset to the default when absent so a prior
	// target's value does not leak into the next (the tooltip is shared).
	tooltip.horizontalAlign = (target.getAttribute(ALIGN_ATTRIBUTE) as Tooltip["horizontalAlign"]) || "Center";
	tooltip.opener = target;
	tooltip.openTooltip();
}

function onPointerOver(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		dockAndOpen(target);
	}
}

function onFocusIn(e: Event): void {
	const target = matchInPath(e);
	if (target) {
		dockAndOpen(target);
	}
}

/**
 * Starts the sample `data-ui5-tooltip` behavior for the whole document.
 * Idempotent — calling it twice is a no-op.
 * @public
 */
function startDataTooltips(): void {
	if (started) {
		return;
	}
	started = true;

	// Capture phase so events from inside component shadow roots still reach us.
	document.addEventListener("mouseover", onPointerOver, true);
	document.addEventListener("focusin", onFocusIn, true);
	document.addEventListener("touchstart", onPointerOver, true);
}

export { startDataTooltips };
