import type TimeSelectionClocks from "./TimeSelectionClocks.js";
import ToggleSpinButton from "./ToggleSpinButton.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import TimePickerClock from "./TimePickerClock.js";

export default function TimeSelectionClocksTemplate(this: TimeSelectionClocks) {
	return (
		<div
			id={`${this._id}`}
			class="ui5-time-picker-tsc-container"
			tabindex={-1}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onFocusIn={this._clocksFocusIn}
		>
			<div class="ui5-time-picker-tsc-buttons">
				{this._entities.map(entity =>
					<>
						{ entity.hasSeparator && <span class="ui5-time-selection-separator">:</span> }
						<ToggleSpinButton
							data-sap-focus-ref
							id={`${this._id}_button_${entity.entity}`}
							data-ui5-clock={entity.entity}
							valueMin={entity.attributes && entity.attributes.min}
							valueMax={entity.attributes && entity.attributes.max}
							valueNow={entity.value}
							valueText={entity.textValue}
							accessibleName={entity.label}
							pressed={entity.active}
							onFocusIn={this._buttonFocusIn}
						>{entity.stringValue}</ToggleSpinButton>
					</>
				)}

				{this._periods.length > 0 &&
					<>
						<span class="ui5-time-selection-separator"></span>
						<SegmentedButton
							id={`${this._id}_AmPm`}
							onClick={this._periodChange}
							onFocusIn={this._amPmFocusIn}
							onFocusOut={this._amPmFocusOut}
						>
							{this._periods.map(period =>
								<SegmentedButtonItem selected={period.selected}>{period.label}</SegmentedButtonItem>
							)}
						</SegmentedButton>
					</>
				}
			</div>

			<div
				class="ui5-time-picker-tsc-clocks"
				role="img"
				aria-label={this.clockDialAriaLabel}
			>
				{this._entities.map(entity =>
					<TimePickerClock
						id={`${this._id}_clock_${entity.entity}`}
						data-ui5-clock={entity.entity}
						active={entity.active}
						label={entity.label}
						itemMin={entity.itemMin}
						itemMax={entity.itemMax}
						selectedValue={entity.value}
						displayStep={entity.displayStep}
						valueStep={entity.attributes && entity.attributes.step}
						lastItemReplacement={entity.lastItemReplacement}
						hideFractions={entity.hideFractions}
						prependZero={entity.prependZero}
						_skipAnimation={entity.skipAnimation}
						onChange={this._clockChange}
					>
					</TimePickerClock>
				)}
			</div>
		</div>
	);
}
