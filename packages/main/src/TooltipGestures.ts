type TooltipGesturesConfig = {
	opener: HTMLElement;
	onOpen: () => void;
	onClose: () => void;
	isPendingOrOpen: () => boolean;
	getDelay: () => number;
};

// Long-press threshold in ms on touch devices.
const LONG_PRESS_MS = 500;

/**
 * Translates raw DOM gestures on the opener (hover, focus, long-press, Escape,
 * activation) into open/close calls. Not a UI5Element — a plain lifecycle object
 * owned by the Tooltip.
 */
class TooltipGestures {
	_config: TooltipGesturesConfig;
	_openTimer?: ReturnType<typeof setTimeout>;
	_closeTimer?: ReturnType<typeof setTimeout>;
	_longPressTimer?: ReturnType<typeof setTimeout>;

	constructor(config: TooltipGesturesConfig) {
		this._config = config;
		this._attach();
	}

	_attach() {
		const el = this._config.opener;
		el.addEventListener("mouseover", this._onMouseOver);
		el.addEventListener("mouseout", this._onMouseOut);
		el.addEventListener("mousedown", this._onMouseDown);
		el.addEventListener("focusin", this._onFocusIn);
		el.addEventListener("focusout", this._onFocusOut);
		el.addEventListener("keydown", this._onKeyDown);
		el.addEventListener("touchstart", this._onTouchStart);
		el.addEventListener("touchmove", this._onTouchEnd);
		el.addEventListener("touchend", this._onTouchEnd);
		el.addEventListener("touchcancel", this._onTouchEnd);
	}

	destroy() {
		const el = this._config.opener;
		el.removeEventListener("mouseover", this._onMouseOver);
		el.removeEventListener("mouseout", this._onMouseOut);
		el.removeEventListener("mousedown", this._onMouseDown);
		el.removeEventListener("focusin", this._onFocusIn);
		el.removeEventListener("focusout", this._onFocusOut);
		el.removeEventListener("keydown", this._onKeyDown);
		el.removeEventListener("touchstart", this._onTouchStart);
		el.removeEventListener("touchmove", this._onTouchEnd);
		el.removeEventListener("touchend", this._onTouchEnd);
		el.removeEventListener("touchcancel", this._onTouchEnd);
		this._clearTimers();
	}

	_clearTimers() {
		clearTimeout(this._openTimer);
		clearTimeout(this._closeTimer);
		clearTimeout(this._longPressTimer);
	}

	// Deepest active element inside the opener, piercing shadow roots.
	_deepActiveElement(): Element | null {
		const opener = this._config.opener;
		let active = opener.ownerDocument.activeElement;
		if (!active || (active !== opener && !opener.contains(active))) {
			return null;
		}
		while (active?.shadowRoot?.activeElement) {
			active = active.shadowRoot.activeElement;
		}
		return active;
	}

	_scheduleOpen() {
		clearTimeout(this._closeTimer);
		clearTimeout(this._openTimer);
		this._openTimer = setTimeout(() => this._config.onOpen(), this._config.getDelay());
	}

	_scheduleClose() {
		clearTimeout(this._openTimer);
		clearTimeout(this._closeTimer);
		this._closeTimer = setTimeout(() => this._config.onClose(), this._config.getDelay());
	}

	_onMouseOver = () => {
		this._scheduleOpen();
	};

	_onMouseOut = () => {
		this._scheduleClose();
	};

	// Left activation closes immediately; right button is left to the browser.
	_onMouseDown = (e: MouseEvent) => {
		if (e.button === 2) {
			return;
		}
		this._clearTimers();
		this._config.onClose();
	};

	_onFocusIn = () => {
		// Openers often delegate focus into their shadow root, so the host never
		// matches :focus-visible. Resolve the deepest active element and gate on it.
		const active = this._deepActiveElement();
		if (active && active.matches(":focus-visible")) {
			this._scheduleOpen();
		}
	};

	_onFocusOut = () => {
		this._scheduleClose();
	};

	_onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			if (this._config.isPendingOrOpen()) {
				this._clearTimers();
				this._config.onClose();
			}
			return;
		}
		// Activation (Enter/Space) closes immediately; key still propagates.
		if (e.key === "Enter" || e.key === " ") {
			this._clearTimers();
			this._config.onClose();
		}
		// TODO: focus guard after activation — suppress the immediate focus-reopen
		// that follows Enter/Space activation. Out of scope for this iteration.
	};

	_onTouchStart = () => {
		clearTimeout(this._longPressTimer);
		// Suppress long-press text selection / iOS callout while pending/open.
		this._config.opener.classList.add("ui5-tooltip-suppress-selection");
		this._longPressTimer = setTimeout(() => this._config.onOpen(), LONG_PRESS_MS);
	};

	_onTouchEnd = () => {
		clearTimeout(this._longPressTimer);
		this._config.opener.classList.remove("ui5-tooltip-suppress-selection");
	};
}

export default TooltipGestures;
