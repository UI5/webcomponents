import type DayPicker from "./DayPicker.js";

export default function DayPickerTemplate(this: DayPicker) {
	return (
		<div
			class={{
				"ui5-dp-root": true,
				"ui5-dp-twocalendartypes": this.hasSecondaryCalendarType,
			}}
			style={{
				"justify-content": "center",
				display: this._hidden ? "none" : "flex",
			}}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onClick={this._onclick}
			onMouseOver={this._onmouseover}
		>
			<div id={`${this._id}-content`} class="ui5-dp-content" role="grid" aria-roledescription={this.ariaRoledescription}>
				<div role="row" class="ui5-dp-days-names-container">
					{this._dayNames.map(day =>
						<div
							role="columnheader"
							aria-label={day.ultraShortName ? day.name : undefined}
							class={day.classes}
						>
							{day.ultraShortName ? day.ultraShortName : <span aria-hidden="true" class="ui5-hidden-text">{day.name}</span>}
						</div>
					)}
				</div>

				{this._weeks.map(week => {
					 return week.length > 0 ?
						<div class="ui5-dp-weeks-row" role="row">
							{week.map(day => {
								return "timestamp" in day ?
									<div
										data-ui5-special-day={day.type ? day.type : undefined}
										tabindex={day._tabIndex}
										data-sap-focus-ref={day.focusRef ? "true" : undefined}
										data-sap-timestamp={day.timestamp}
										role="gridcell"
										title={day.tooltip}
										aria-selected={day.ariaSelected}
										aria-label={day.ariaLabel}
										aria-disabled={day.ariaDisabled}
										class={day.classes}
										part={day.parts}>
										<span
											class="ui5-dp-daytext"
											data-sap-timestamp={day.timestamp}
										>
											{day.day}
										</span>
										{day._isSecondaryCalendarType &&
													<span class="ui5-dp-daytext ui5-dp-daysectext">
														{day.secondDay}
													</span>
										}
										{day.type &&
													<div class={`ui5-dp-specialday ${day.type}`}></div>
										}
									</div>
									:
									!day.isHidden && (
										<div
											className="ui5-dp-weekname-container"
											role="rowheader"
											aria-label={`Calendar Week ${day.weekNum}`}
										>
											<span className="ui5-dp-weekname">{day.weekNum}</span>
										</div>
									);
							})}
						</div>
						:
						<div class="ui5-dp-empty-week"></div>;
				})}
			</div>
		</div>);
}
