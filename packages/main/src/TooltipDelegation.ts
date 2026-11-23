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

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let longPressTimer: ReturnType<typeof setTimeout> | undefined;
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

function clearTimers() {
	clearTimeout(openTimer);
	clearTimeout(closeTimer);
	clearTimeout(longPressTimer);
}

function scheduleOpen(tooltip: ITooltipTarget) {
	clearTimeout(closeTimer);
	clearTimeout(openTimer);
	activeTooltip = tooltip;
	openTimer = setTimeout(() => tooltip.openTooltip(), tooltip.delay);
}

function scheduleClose(tooltip: ITooltipTarget) {
	clearTimeout(openTimer);
	clearTimeout(closeTimer);
	closeTimer = setTimeout(() => tooltip.closeTooltip(), tooltip.delay);
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
	clearTimers();
	activeTooltip?.closeTooltip();
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
		clearTimers();
		activeTooltip?.closeTooltip();
		return;
	}
	// Activation closes immediately; the key still propagates.
	if (e.key === "Enter" || e.key === " ") {
		clearTimers();
		activeTooltip?.closeTooltip();
	}
};

const onTouchStart = (e: Event) => {
	const opener = openerFromEvent(e);
	const tooltip = opener && tooltipForOpener(opener);
	if (!tooltip) {
		return;
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
	clearTimers();
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
	if (activeTooltip === tooltip) {
		activeTooltip = undefined;
	}
	if (registry.size === 0) {
		detach();
	}
}

export { registerTooltip, deregisterTooltip };
export type { ITooltipTarget };
