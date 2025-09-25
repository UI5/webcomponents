import type YearRangePicker from "./YearRangePicker.js";

export default function YearRangePickerTemplate(this: YearRangePicker) {
	return (
		<div
			class="ui5-yrp-root"
			part="year-range-picker-root"
			role="grid"
			aria-roledescription={this.roleDescription}
			aria-readonly="false"
			aria-multiselectable="false"
			onClick={this._selectYearRange}
			onMouseOver={this._onmouseover}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
		>
			{this._yearRanges.map(rangeRow =>
				<div role="row" class="ui5-yrp-interval-container">
					{rangeRow.map(yearRange => <div
						data-sap-timestamp={yearRange.timestamp}
						tabindex={yearRange._tabIndex}
						data-sap-focus-ref={yearRange.focusRef ? "true" : undefined}
						class={yearRange.classes}
						part={yearRange.parts}
						role="gridcell"
						aria-selected={yearRange.ariaSelected}
						aria-disabled={yearRange.ariaDisabled}
					>
						<span class="ui5-dp-yeartext">
							{yearRange.range}
						</span>
						{
							yearRange.rangeInSecType &&
							<span class="ui5-yrp-item-sec-type">
								{yearRange.rangeInSecType}
							</span>
						}
					</div>
					)}
				</div>
			)}
		</div>);
}
