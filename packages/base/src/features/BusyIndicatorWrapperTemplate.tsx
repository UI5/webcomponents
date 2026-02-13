import type OpenUI5Element from "./OpenUI5Element.js";
import type { ComponentChildren } from "../jsx-runtime.js";

/**
 * Wraps component content with busy indicator markup when __isBusy is true.
 * This template works with both JsxRenderer (Preact) and LitRenderer (lit-html).
 *
 * @param host - The OpenUI5Element component instance
 * @param children - The component's rendered content to wrap
 * @returns The wrapped content if busy, otherwise the original children
 */
export default function BusyIndicatorWrapperTemplate(
	this: OpenUI5Element,
	children: ComponentChildren,
) {
	if (this.isOpenUI5Component && this.__isBusy) {
		return (
			<div class="busy-indicator-wrapper">
				<span tabindex={0} busy-indicator-before-span onFocusIn={this.__suppressFocusIn}></span>
				{children}
				<div class="busy-indicator-overlay"></div>
				<div
					busy-indicator
					class="busy-indicator-busy-area"
					tabindex={0}
					role="progressbar"
					onKeyDown={this.__suppressFocusBack}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuetext="Busy"
				>
					<div>
						<div class="busy-indicator-circle circle-animation-0"></div>
						<div class="busy-indicator-circle circle-animation-1"></div>
						<div class="busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>
		);
	}
	return children;
}
