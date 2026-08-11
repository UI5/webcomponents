import type DateHighZoomInputs from "./DateHighZoomInputs.js";
import Dialog from "./Dialog.js";
import YearPicker from "./YearPicker.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import Select from "./Select.js";
import Option from "./Option.js";
import Label from "./Label.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import InputType from "./types/InputType.js";
import IconMode from "./types/IconMode.js";

export default function DateHighZoomInputsTemplate(this: DateHighZoomInputs) {
	return (
		<>
			<div class={{ "ui5-dhzi-root": true, "ui5-dhzi-range": this._isRange }}>
				{ this._isRange
					? <>
						<div class="ui5-dhzi-group">
							<div class="ui5-dhzi-group-label">{this._fromLabel}</div>
							{ dateFields.call(this, false) }
						</div>
						<div class="ui5-dhzi-group">
							<div class="ui5-dhzi-group-label">{this._toLabel}</div>
							{ dateFields.call(this, true) }
						</div>
					</>
					: dateFields.call(this, false)
				}
			</div>

			{ yearPickerDialog.call(this, false) }
			{ this._isRange && yearPickerDialog.call(this, true) }
		</>
	);
}

function dateFields(this: DateHighZoomInputs, isEnd: boolean) {
	const yearVal = isEnd ? this._endYearValue : this._yearValue;
	const monthVal = isEnd ? this._endMonthValue : this._monthValue;
	const dayVal = isEnd ? this._endDayValue : this._dayValue;
	const yearVS = isEnd ? this._endYearValueState : this._yearValueState;
	const monthVS = isEnd ? this._endMonthValueState : this._monthValueState;
	const dayVS = isEnd ? this._endDayValueState : this._dayValueState;
	const yearMsg = isEnd ? this._endYearValueStateMessage : this._yearValueStateMessage;
	const monthMsg = isEnd ? this._endMonthValueStateMessage : this._monthValueStateMessage;
	const dayMsg = isEnd ? this._endDayValueStateMessage : this._dayValueStateMessage;
	const dayOpts = isEnd ? this._endDayOptions : this._dayOptions;
	const suffix = isEnd ? "-end" : "";

	return (
		<div class="ui5-dhzi-fields">

			{/* Year */}
			<div class="ui5-dhzi-row">
				<Label for={`${this._id}-year${suffix}-inner`} class="ui5-dhzi-label">{this._yearLabel}</Label>
				<Input
					id={`${this._id}-year${suffix}`}
					class="ui5-dhzi-year-input"
					type={InputType.Number}
					value={yearVal}
					valueState={yearVS}
					onInput={(e: CustomEvent) => this._onYearInput(e, isEnd)}
					onChange={(e: CustomEvent) => this._onYearChange(e, isEnd)}
				>
					{ yearVS === ValueState.Negative && yearMsg &&
						<span slot="valueStateMessage">{yearMsg}</span>
					}
					<Icon
						slot="icon"
						class={{ "inputIcon": true, "inputIcon--pressed": isEnd ? this._endYearPickerOpen : this._yearPickerOpen }}
						name={slimArrowDown}
						mode={IconMode.Interactive}
						tabindex={-1}
						showTooltip={true}
						onClick={() => this._openYearPicker(isEnd)}
					/>
				</Input>
			</div>

			{/* Month */}
			<div class="ui5-dhzi-row">
				<Label for={`${this._id}-month${suffix}`} class="ui5-dhzi-label">{this._monthLabel}</Label>
				<Select
					id={`${this._id}-month${suffix}`}
					class="ui5-dhzi-select"
					value={String(monthVal)}
					valueState={monthVS}
					onChange={(e: CustomEvent) => this._onMonthChange(e, isEnd)}
				>
					{ monthVS === ValueState.Negative && monthMsg &&
						<span slot="valueStateMessage">{monthMsg}</span>
					}
					{this._monthOptions.map(opt => (
						<Option key={String(opt.value)} value={String(opt.value)}>{opt.text}</Option>
					))}
				</Select>
			</div>

			{/* Day */}
			<div class="ui5-dhzi-row">
				<Label for={`${this._id}-day${suffix}`} class="ui5-dhzi-label">{this._dayLabel}</Label>
				<Select
					id={`${this._id}-day${suffix}`}
					class="ui5-dhzi-select"
					value={String(dayVal)}
					valueState={dayVS}
					onChange={(e: CustomEvent) => this._onDayChange(e, isEnd)}
				>
					{ dayVS === ValueState.Negative && dayMsg &&
						<span slot="valueStateMessage">{dayMsg}</span>
					}
					{dayOpts.map(d => (
						<Option key={String(d)} value={String(d)}>{String(d)}</Option>
					))}
				</Select>
			</div>

		</div>
	);
}

function yearPickerDialog(this: DateHighZoomInputs, isEnd: boolean) {
	const isOpen = isEnd ? this._endYearPickerOpen : this._yearPickerOpen;
	const ts = isEnd ? this._endYearPickerTimestamp : this._yearPickerTimestamp;
	const yearStr = isEnd ? this._endYearValue : this._yearValue;
	const year = parseInt(yearStr);
	const safeYear = isNaN(year) || year <= 0 ? new Date().getFullYear() : year;
	const selectedTs = ts || Date.UTC(safeYear, 0, 1, 12, 0, 0) / 1000;
	const ypId = `${this._id}-yearpicker${isEnd ? "-end" : ""}`;

	return (
		<Dialog
			id={`${this._id}-yearpicker-dialog${isEnd ? "-end" : ""}`}
			class="ui5-dhzi-year-dialog"
			open={isOpen}
			stretch={isPhone()}
			onClose={() => this._closeYearPicker(isEnd)}
		>
			<YearPicker
				id={ypId}
				class="ui5-dhzi-yp"
				primaryCalendarType={this.primaryCalendarType}
				timestamp={selectedTs}
				selectedDates={[selectedTs]}
				_showHeader={true}
				_rowSize={2}
				_pageSize={8}
				onChange={(e: CustomEvent) => this._onYearPickerSelectionChange(e, isEnd)}
			/>
		</Dialog>
	);
}
