import type MonthPicker from "./MonthPicker.js";

export default function MonthPickerTemplate(this: MonthPicker) {
	return (
		<div
			class="ui5-mp-root"
			part="month-picker-root"
			role="grid"
			aria-roledescription={this.roleDescription}
			aria-readonly="false"
			aria-multiselectable="false"
			onMouseOver={this._onmouseover}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._selectMonth}
			onMouseDown={this._onmousedown}
		>
			{this._monthsInterval.map(months =>
				<div role="row" class="ui5-mp-quarter">

					{months.map(month =>
						<div
							data-sap-timestamp={month.timestamp}
							tabindex={month._tabIndex}
							data-sap-focus-ref={month.focusRef ? "true" : undefined}
							class={month.classes}
							part={month.parts}
							role="gridcell"
							aria-selected={month.ariaSelected}
							aria-disabled={month.ariaDisabled}
						>
							<span class="ui5-dp-monthtext">
								{month.name}
							</span>

							{month.nameInSecType &&
						<span class="ui5-dp-monthtext ui5-dp-monthsectext">
							{month.nameInSecType}
						</span>
							}
						</div>
					)}
				</div>
			)}
		</div>);
}
