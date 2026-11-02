import type Tooltip from "../Tooltip.js";

/**
 * SAMPLE / PROOF-OF-CONCEPT — not production framework infrastructure.
 *
 * Demonstrates how a magic `data-ui5-tooltip` attribute could drive the
 * enhanced tooltip without the author instantiating `<ui5-tooltip>` or wiring
 * an `opener`. It is a thin layer *on top of* the `<ui5-tooltip>` component:
 * on hover/focus/long-press of a `[data-ui5-tooltip]` element, a single shared
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
 * ```html
 * <ui5-button data-ui5-tooltip="Save the document">Save</ui5-button>
 * <ui5-title data-ui5-tooltip="Section heading">Reports</ui5-title>
 * ```
 *
 * The honest cost flagged in tooltip-api-research.md lives here: detecting
 * matches needs DOM observation. This sample uses one document-level
 * MutationObserver plus capture-phase listeners — enough to demonstrate the
 * ergonomics, deliberately simpler than a real cross-shadow-root implementation.
 */

const ATTRIBUTE = "data-ui5-tooltip";

let sharedTooltip: Tooltip | undefined;
let started = false;

// One shared <ui5-tooltip> instance, created on first use and re-docked per target.
function getSharedTooltip(): Tooltip {
	if (!sharedTooltip) {
		sharedTooltip = document.createElement("ui5-tooltip") as unknown as Tooltip;
		document.body.appendChild(sharedTooltip);
	}
	return sharedTooltip;
}

// Nearest ancestor (across shadow boundaries) carrying the magic attribute.
function closestWithAttribute(start: EventTarget | null): HTMLElement | null {
	let node = start as Node | null;
	while (node) {
		if (node instanceof HTMLElement && node.hasAttribute(ATTRIBUTE)) {
			return node;
		}
		const parent: Node | null = node.parentNode;
		node = parent instanceof ShadowRoot ? parent.host : parent;
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
	tooltip.opener = target;
	tooltip.openTooltip();
}

function onPointerOver(e: Event): void {
	const target = closestWithAttribute(e.target);
	if (target) {
		dockAndOpen(target);
	}
}

function onFocusIn(e: Event): void {
	const target = closestWithAttribute(e.target);
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
