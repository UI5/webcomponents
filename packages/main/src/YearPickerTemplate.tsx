import type YearPicker from "./YearPicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";

export default function YearPickerTemplate(this: YearPicker) {
	if (this._showHeader) {
		return (
			<div class="ui5-cal-root">
				<div class="ui5-calheader" exportparts="calendar-header-arrow-button, calendar-header-middle-button">
					{ CalendarHeaderTemplate.call(this) }
				</div>
				{ grid.call(this) }
			</div>
		);
	}

	return grid.call(this);
}

function grid(this: YearPicker) {
	const rowSize = this._getRowSize();
	const itemWidth = `calc(${(100 / rowSize).toFixed(4)}% - 0.125rem)`;

	return (
		<div
			class="ui5-yp-root"
			part="year-picker-root"
			role="grid"
			aria-roledescription={this.roleDescription}
			aria-readonly="false"
			aria-multiselectable="false"
			style={{ "--_ui5_yp_item_width": itemWidth } as Record<string, string>}
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
		</div>
	);
}
