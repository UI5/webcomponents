import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

/**
 * Minimal view of a `<ui5-tooltip>` the delegation needs.
 */
interface ITooltipTarget {
	id: string;
	getRootNode(): Node;
	openTooltip(): void;
	closeTooltip(): void;
	isOpen(): boolean;
	delay: number;
}

const OPENER_ATTR = "data-ui5-has-tooltip";
const LONG_PRESS_MS = 500;

// Registered tooltips, keyed by id for opener → tooltip lookup.
const registry = new Map<string, ITooltipTarget>();

// Per-tooltip open/close timers. Keeping them per-tooltip (rather than one shared
// pair) is essential: when the pointer or focus moves from tooltip A's opener to
// tooltip B's opener, scheduling B's open must not cancel A's pending close.
const openTimers = new WeakMap<ITooltipTarget, ReturnType<typeof setTimeout>>();
const closeTimers = new WeakMap<ITooltipTarget, ReturnType<typeof setTimeout>>();

let longPressTimer: ReturnType<typeof setTimeout> | undefined;
// The tooltip currently shown or pending-open; used to dismiss it when another
// opens and to close on activation/Escape.
let activeTooltip: ITooltipTarget | undefined;

// Find the nearest [data-ui5-has-tooltip] on the event's composed path. A
// document-level listener sees `event.target` retargeted to the outermost host,
// so the opener (which may live inside a component's shadow root) is only
// reachable via composedPath(), which spans all shadow boundaries.
function openerFromEvent(e: Event): HTMLElement | undefined {
	const path = e.composedPath();
	for (const node of path) {
		if (node instanceof HTMLElement && node.hasAttribute(OPENER_ATTR)) {
			return node;
		}
	}
	return undefined;
}

// Resolve the tooltip an opener points at, matching root scope.
function tooltipForOpener(opener: HTMLElement): ITooltipTarget | undefined {
	const id = opener.getAttribute(OPENER_ATTR);
	if (!id) {
		return undefined;
	}
	const tooltip = registry.get(id);
	// Same-root check: the id reference resolves within the opener's root,
	// mirroring aria-describedby IDREF scoping.
	if (tooltip && tooltip.getRootNode() === opener.getRootNode()) {
		return tooltip;
	}
	return undefined;
}

// Whether `node` is or sits inside `opener` (crossing shadow boundaries).
function isWithin(node: Node, opener: HTMLElement): boolean {
	let current: Node | null = node;
	while (current) {
		if (current === opener) {
			return true;
		}
		const parent: Node | null = current.parentNode;
		current = parent instanceof ShadowRoot ? parent.host : parent;
	}
	return false;
}

// Cancel both pending timers for a single tooltip.
function clearTooltipTimers(tooltip: ITooltipTarget) {
	clearTimeout(openTimers.get(tooltip));
	clearTimeout(closeTimers.get(tooltip));
	openTimers.delete(tooltip);
	closeTimers.delete(tooltip);
}

// Close the currently active tooltip immediately (used on activation/Escape, and
// when a different tooltip is about to open).
function dismissActive() {
	if (activeTooltip) {
		clearTooltipTimers(activeTooltip);
		activeTooltip.closeTooltip();
		activeTooltip = undefined;
	}
	clearTimeout(longPressTimer);
}

function scheduleOpen(tooltip: ITooltipTarget) {
	// Moving onto a new opener dismisses the previous tooltip at once, so two
	// tooltips are never shown and the previous one cannot leak open.
	if (activeTooltip && activeTooltip !== tooltip) {
		clearTooltipTimers(activeTooltip);
		activeTooltip.closeTooltip();
	}
	clearTooltipTimers(tooltip);
	activeTooltip = tooltip;
	openTimers.set(tooltip, setTimeout(() => tooltip.openTooltip(), tooltip.delay));
}

function scheduleClose(tooltip: ITooltipTarget) {
	clearTimeout(openTimers.get(tooltip));
	openTimers.delete(tooltip);
	clearTimeout(closeTimers.get(tooltip));
	closeTimers.set(tooltip, setTimeout(() => {
		tooltip.closeTooltip();
		if (activeTooltip === tooltip) {
			activeTooltip = undefined;
		}
	}, tooltip.delay));
}

const onMouseOver = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleOpen(tooltip);
	}
};

const onMouseOut = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleClose(tooltip);
	}
};

// Left activation closes immediately; right button left to the browser.
const onMouseDown = (e: MouseEvent) => {
	if (e.button === 2) {
		return;
	}
	dismissActive();
};

const onFocusIn = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (!tooltip || !opener) {
		return;
	}
	// Openers delegate focus into their shadow root, so the host never matches
	// :focus-visible. Resolve the deepest active element, gate on it, and confirm
	// it is within this opener.
	const active = getActiveElement();
	if (active && isWithin(active, opener) && active.matches(":focus-visible")) {
		scheduleOpen(tooltip);
	}
};

const onFocusOut = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (tooltip) {
		scheduleClose(tooltip);
	}
};

const onKeyDown = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		dismissActive();
		return;
	}
	// Activation closes immediately; the key still propagates.
	if (e.key === "Enter" || e.key === " ") {
		dismissActive();
	}
};

const onTouchStart = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (!tooltip) {
		return;
	}
	// Dismiss any other active tooltip, then arm the long-press.
	if (activeTooltip && activeTooltip !== tooltip) {
		clearTooltipTimers(activeTooltip);
		activeTooltip.closeTooltip();
	}
	clearTimeout(longPressTimer);
	activeTooltip = tooltip;
	longPressTimer = setTimeout(() => tooltip.openTooltip(), LONG_PRESS_MS);
};

const onTouchEnd = () => {
	clearTimeout(longPressTimer);
};

function attach() {
	document.addEventListener("mouseover", onMouseOver);
	document.addEventListener("mouseout", onMouseOut);
	document.addEventListener("mousedown", onMouseDown);
	document.addEventListener("focusin", onFocusIn);
	document.addEventListener("focusout", onFocusOut);
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("touchstart", onTouchStart);
	document.addEventListener("touchend", onTouchEnd);
	document.addEventListener("touchcancel", onTouchEnd);
}

function detach() {
	document.removeEventListener("mouseover", onMouseOver);
	document.removeEventListener("mouseout", onMouseOut);
	document.removeEventListener("mousedown", onMouseDown);
	document.removeEventListener("focusin", onFocusIn);
	document.removeEventListener("focusout", onFocusOut);
	document.removeEventListener("keydown", onKeyDown);
	document.removeEventListener("touchstart", onTouchStart);
	document.removeEventListener("touchend", onTouchEnd);
	document.removeEventListener("touchcancel", onTouchEnd);
	dismissActive();
}

/**
 * Registers a tooltip and attaches the shared document listeners on the first one.
 */
function registerTooltip(tooltip: ITooltipTarget): void {
	if (registry.size === 0) {
		attach();
	}
	registry.set(tooltip.id, tooltip);
}

/**
 * Deregisters a tooltip and detaches the shared listeners once the last one is gone.
 */
function deregisterTooltip(tooltip: ITooltipTarget): void {
	if (registry.get(tooltip.id) === tooltip) {
		registry.delete(tooltip.id);
	}
	// Cancel any pending timers for the removed tooltip so they can't fire after it
	// leaves the DOM.
	clearTooltipTimers(tooltip);
	if (activeTooltip === tooltip) {
		activeTooltip = undefined;
	}
	if (registry.size === 0) {
		detach();
	}
}

export { registerTooltip, deregisterTooltip };
export type { ITooltipTarget };
