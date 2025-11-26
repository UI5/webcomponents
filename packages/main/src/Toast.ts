import UI5Element, { customElement, property, eventStrict as event, Keys, Device, jsxRenderer } from "@ui5/webcomponents-base";
import type ToastPlacement from "./types/ToastPlacement.js";

// Template
import ToastTemplate from "./ToastTemplate.js";

// Styles
import ToastCss from "./generated/themes/Toast.css.js";

const { isEscape } = Keys;
const { isMac } = Device;

// Constants
const MIN_DURATION = 500;
const MAX_DURATION = 1000;
const openedToasts: Array<Toast> = [];
let opener: HTMLElement | null;

let globalListenerAdded = false;
const handleGlobalKeydown = (e: KeyboardEvent) => {
	const isCtrl = e.metaKey || (!isMac() && e.ctrlKey);
	const isMKey = e.key && e.key.toLowerCase() === "m";
	const isCombinationPressed = isCtrl && e.shiftKey && isMKey;
	const hasOpenToast = openedToasts.length;

	if (isCombinationPressed) {
		e.preventDefault();

		if (hasOpenToast) {
			openedToasts[0].focusable = true;

			if (openedToasts[0].focused) {
				openedToasts[0].focused = false;
				opener?.focus();
			} else {
				opener = (document.activeElement as HTMLElement);
				openedToasts[0].focus();
			}
		}
	}
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toast` is a small, non-disruptive popup for success or information messages that
 * disappears automatically after a few seconds.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - You want to display a short success or information message.
 * - You do not want to interrupt users while they are performing an action.
 * - You want to confirm a successful action.
 *
 * #### When not to use:
 *
 * - You want to display error or warning message.
 * - You want to interrupt users while they are performing an action.
 * - You want to make sure that users read the message before they leave the page.
 * - You want users to be able to copy some part of the message text.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Toast.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 * @slot {Array<Node>} default
 * Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 */
@customElement({
	tag: "ui5-toast",
	renderer: jsxRenderer,
	styles: ToastCss,
	template: ToastTemplate,
})

/**
 * Fired after the component is auto closed.
 * @public
 * @since 2.0.0
 */
@event("close")

class Toast extends UI5Element {
	eventDetails!: {
		"close": void,
	};

	/**
	 * Defines the duration in milliseconds for which component
	 * remains on the screen before it's automatically closed.
	 *
	 * **Note:** The minimum supported value is `500` ms
	 * and even if a lower value is set, the duration would remain `500` ms.
	 * @default 3000
	 * @public
	 */
	@property({ type: Number })
	duration = 3000;

	/**
	 * Defines the placement of the component.
	 * @default "BottomCenter"
	 * @public
	 */
	@property()
	placement: `${ToastPlacement}` = "BottomCenter";

	/**
	 * Indicates whether the component is open (visible).
	 * @default false
	 * @public
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Indicates whether the component is hovered.
	 * @private
	 */
	@property({ type: Boolean })
	hover = false;

	/**
	 * Indicates whether the toast could be focused
	 * This happens when ctr / command + shift + m is pressed
	 * @private
	 */
	@property({ type: Boolean })
	focusable = false;

	/**
	 * Indicates whether the toast is focused
	 * This happens when ctr / command + shift + m is pressed
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	_onfocusinFn: () => void;
	_onfocusoutFn: () => void;
	_onkeydownFn: (e: KeyboardEvent) => void;
	_onmouseoverFn: () => void;
	_onmouseleaveFn: () => void;
	_ontransitionendFn: () => void;

	constructor() {
		super();

		this._onfocusinFn = this._onfocusin.bind(this);
		this._onfocusoutFn = this._onfocusout.bind(this);
		this._onkeydownFn = this._onkeydown.bind(this);
		this._onmouseoverFn = this._onmouseover.bind(this);
		this._onmouseleaveFn = this._onmouseleave.bind(this);
		this._ontransitionendFn = this._ontransitionend.bind(this);
	}

	onBeforeRendering() {
		if (this.open) {
			openedToasts.pop();
			openedToasts.push(this);
		}

		requestAnimationFrame(() => {
			// Transition duration (animation) should be a third of the duration
			// property, but not bigger than the maximum allowed (1000ms).
			const transitionDuration = Math.min(this.effectiveDuration / 3, MAX_DURATION);

			this.style.transitionDuration = this.open ? `${transitionDuration}ms` : "";
			this.style.transitionDelay = this.open ? `${this.effectiveDuration - transitionDuration}ms` : "";
			this.style.opacity = this.open && !this.hover && !this.focused ? "0" : "";
		});

		if (!globalListenerAdded) {
			document.addEventListener("keydown", handleGlobalKeydown);
			globalListenerAdded = true;
		}
	}

	onAfterRendering() {
		if (!this.hasAttribute("popover")) {
			this.setAttribute("popover", "manual");
		}
		if (this.open) {
			this.showPopover();
		}
	}

	_onfocusin() {
		if (this.focusable) {
			this.focused = true;
		}
	}

	_onfocusout() {
		this.focused = false;
	}

	/**
	 * If the minimum duration is lower than 500ms, we force
	 * it to be 500ms, as described in the documentation.
	 * @private
	 */
	get effectiveDuration() {
		return this.duration < MIN_DURATION ? MIN_DURATION : this.duration;
	}

	_ontransitionend() {
		if (this.hover || this.focused) {
			return;
		}
		this.open = false;
		this.focusable = false;
		this.focused = false;
		this.fireDecoratorEvent("close");
		this.hidePopover();
	}

	_onmouseover() {
		this.hover = true;
	}

	_onmouseleave() {
		this.hover = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEscape(e)) {
			this.focused = false;
			opener?.focus();
		}
	}

	get _tabindex() {
		return this.focused ? 0 : -1;
	}

	onEnterDOM(): void {
		this.addEventListener("focusin", this._onfocusinFn);
		this.addEventListener("focusout", this._onfocusoutFn);
		this.addEventListener("keydown", this._onkeydownFn);
		this.addEventListener("mouseover", this._onmouseoverFn);
		this.addEventListener("mouseleave", this._onmouseleaveFn);
		this.addEventListener("transitionend", this._ontransitionendFn);
		this.addEventListener("transitioncancel", this._ontransitionendFn);
	}

	onExitDOM(): void {
		this.removeEventListener("focusin", this._onfocusinFn);
		this.removeEventListener("focusout", this._onfocusoutFn);
		this.removeEventListener("keydown", this._onkeydownFn);
		this.removeEventListener("mouseover", this._onmouseoverFn);
		this.removeEventListener("mouseleave", this._onmouseleaveFn);
		this.removeEventListener("transitionend", this._ontransitionendFn);
		this.removeEventListener("transitioncancel", this._ontransitionendFn);
	}
}

Toast.define();

export default Toast;
