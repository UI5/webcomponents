import type YearPicker from "./YearPicker.js";

export default function YearPickerTemplate(this: YearPicker) {
	return (
		<div
			class="ui5-yp-root"
			part="year-picker-root"
			role="grid"
			aria-roledescription={this.roleDescription}
			aria-readonly="false"
			aria-multiselectable="false"
			onMouseOver={this._onmouseover}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._selectYear}
		>
			{this._yearsInterval.map(years =>
				<div role="row" class="ui5-yp-interval-container">
					{years.map(year => <div
						data-sap-timestamp={year.timestamp}
						tabindex={year._tabIndex}
						data-sap-focus-ref={year.focusRef ? "true" : undefined}
						class={year.classes}
						part={year.parts}
						role="gridcell"
						aria-selected={year.ariaSelected}
						aria-disabled={year.ariaDisabled}
					>
						<span class="ui5-dp-yeartext">
							{year.year}
						</span>
						{
							year.yearInSecType &&
							<span class="ui5-yp-item-sec-type">
								{year.yearInSecType}
							</span>
						}
					</div>
					)}
				</div>
			)}
		</div>);
}
