import type BusyIndicator from "./BusyIndicator.js";
import Label from "./Label.js";

export default function BusyIndicatorTemplate(this: BusyIndicator) {
	return (
		<div class="ui5-busy-indicator-root">
			{this._isBusy && (
				<div
					class={{
						"ui5-busy-indicator-busy-area": true,
						"ui5-busy-indicator-busy-area-over-content": this.hasContent,
					}}
					title={this.ariaTitle}
					tabindex={0}
					role="progressbar"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuetext="Busy"
					aria-labelledby={this.labelId}
					data-sap-focus-ref
				>
					{this.textPosition.top && BusyIndicatorBusyText.call(this)}
					<div class="ui5-busy-indicator-circles-wrapper">
						<div class="ui5-busy-indicator-circle circle-animation-0"></div>
						<div class="ui5-busy-indicator-circle circle-animation-1"></div>
						<div class="ui5-busy-indicator-circle circle-animation-2"></div>
					</div>
					{this.textPosition.bottom && BusyIndicatorBusyText.call(this)}
				</div>
			)}
			<slot></slot>
			{this._isBusy && (
				<span
					data-ui5-focus-redirect
					tabindex={0}
					role="none"
					onFocusIn={this._redirectFocus}
				></span>
			)}
		</div>
	);
}

function BusyIndicatorBusyText(this: BusyIndicator) {
	return (<>
		{this.text && (
			<Label
				id={`${this._id}-label`}
				class="ui5-busy-indicator-text"
			>
				{this.text}
			</Label>
		)}
	</>);
}
