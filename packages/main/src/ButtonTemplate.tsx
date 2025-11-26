import type Button from "./Button.js";
import { jsx, useState } from "@ui5/webcomponents-base";
import type UI5Element from "@ui5/webcomponents-base";
import LazyIcon from "./Icon.js";
import LazyBusyIndicator from "./BusyIndicator.js";

function lazy1<T extends typeof UI5Element>(fn: () => Promise<{ default: T }>): T {
	return function Component(props: { [key: string]: unknown }) {
		const [Comp, setComp] = useState<T | null>(null);
		const p = fn();
		p.then(module => {
			setComp(() => module.default);
		});
		return Comp ? <Comp {...props}></Comp> : <></>;
	} as unknown as T;
}

function lazy<T extends typeof UI5Element>(tag: string, fn: () => Promise<{ default: T }>): T {
	return function Component(props: { [key: string]: unknown }) {
		const [Comp, setComp] = useState<T | null>(null);
		Promise.resolve().then(() => {
			console.log("immediate promise");
		});
		const p = fn();
		p.then(module => {
			setComp(() => module.default);
		});
		return Comp ? <Comp {...props}></Comp> : jsx(tag, props, "");
	} as unknown as T;
}

// const LazyIcon = lazy1(() => import("./Icon.js"));
// const LazyBusyIndicator = lazy1(() => import("./BusyIndicator.js"));
// const LazyIcon = lazy("ui5-icon", () => import("./Icon.js"));
// const LazyBusyIndicator = lazy("ui5-busy-indicator", () => import("./BusyIndicator.js"));

export default function ButtonTemplate(this: Button, injectedProps?: {
		ariaPressed?: boolean,
		ariaValueMax?: number,
		ariaValueMin?: number,
		ariaValueNow?: number,
		ariaValueText?: string,
}) {
	return (<>
		<button
			type="button"
			class={{
				"ui5-button-root": true,
				"ui5-button-badge-placement-end": this.badge[0]?.design === "InlineText",
				"ui5-button-badge-placement-end-top": this.badge[0]?.design === "OverlayText",
				"ui5-button-badge-dot": this.badge[0]?.design === "AttentionDot"
			}}
			disabled={this.disabled}
			data-sap-focus-ref
			aria-pressed={injectedProps?.ariaPressed}
			aria-valuemin={injectedProps?.ariaValueMin}
			aria-valuemax={injectedProps?.ariaValueMax}
			aria-valuenow={injectedProps?.ariaValueNow}
			aria-valuetext={injectedProps?.ariaValueText}
			onFocusOut={this._onfocusout}
			onClick={this._onclick}
			onMouseDown={this._onmousedown}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onTouchStart={this._ontouchstart}
			onTouchEnd={this._ontouchend}
			tabindex={this.tabIndexValue}
			aria-expanded={this._computedAccessibilityAttributes?.expanded}
			aria-controls={this._computedAccessibilityAttributes?.controls}
			aria-haspopup={this._computedAccessibilityAttributes?.hasPopup}
			aria-label={this._computedAccessibilityAttributes?.ariaLabel}
			aria-keyshortcuts={this._computedAccessibilityAttributes?.ariaKeyShortcuts}
			aria-description={this.ariaDescriptionText}
			aria-busy={this.loading ? "true" : undefined}
			title={this.buttonTitle}
			part="button"
			role={this.effectiveAccRole}
		>
			{ this.icon &&
				<LazyIcon
					class="ui5-button-icon"
					name={this.icon}
					mode="Decorative"
					part="icon"
				/>
			}

			<span id={`${this._id}-content`} class="ui5-button-text">
				<bdi>
					<slot></slot>
				</bdi>
			</span>

			{this.endIcon &&
				<LazyIcon
					class="ui5-button-end-icon"
					name={this.endIcon}
					mode="Decorative"
					part="endIcon"
				/>
			}

			{this.shouldRenderBadge &&
				<slot name="badge"/>
			}
		</button>
		{this.loading &&
			<LazyBusyIndicator
				id={`${this._id}-button-busy-indicator`}
				class="ui5-button-busy-indicator"
				size={this.iconOnly ? "S" : "M"}
				active={true}
				delay={this.loadingDelay}
				inert={this.loading}
			/>
		}
	</>);
}
