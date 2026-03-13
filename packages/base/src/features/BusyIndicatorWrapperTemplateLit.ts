import type { TemplateResult } from "lit-html";
import { html } from "lit-html";
import type OpenUI5Element from "./OpenUI5Element.js";

/**
 * Wraps component content with busy indicator markup when __isBusy is true.
 * This template is specifically for LitRenderer (lit-html).
 *
 * @param host - The OpenUI5Element component instance
 * @param templateResult - The component's rendered content to wrap
 * @returns The wrapped content if busy, otherwise the original template result
 */
export default function BusyIndicatorWrapperTemplateLit(
	host: OpenUI5Element,
	templateResult: TemplateResult,
): TemplateResult {
	if (host.isOpenUI5Component && host.__isBusy) {
		return html`
			<div class="busy-indicator-wrapper">
				<span tabindex="0" busy-indicator-before-span @focusin=${host.__suppressFocusIn}></span>
				${templateResult}
				<div class="busy-indicator-overlay"></div>
				<div
					busy-indicator
					class="busy-indicator-busy-area"
					tabindex="0"
					role="progressbar"
					@keydown=${host.__suppressFocusBack}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuetext="Busy"
				>
					<div>
						<div class="busy-indicator-circle circle-animation-0"></div>
						<div class="busy-indicator-circle circle-animation-1"></div>
						<div class="busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>
		`;
	}
	return templateResult;
}
