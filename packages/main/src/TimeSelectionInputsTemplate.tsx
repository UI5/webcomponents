import type TimeSelectionInputs from "./TimeSelectionInputs.js";
import Input from "./Input.js";
import Label from "./Label.js";
import SegmentedButton from "./SegmentedButton.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";

export default function TimeSelectionInputsTemplate(this: TimeSelectionInputs) {
	const hzLabels: Record<string, string> = {
		hours: this.hzHoursLabel,
		minutes: this.hzMinutesLabel,
		seconds: this.hzSecondsLabel,
	};

	return (
		<div
			class={{ "ui5-time-selection-inputs": true, "ui5-time-selection-inputs--labeled": this._showLabels }}
			onKeyDown={this._onkeydown}
		>
			{this._entities.map((entity, index) => (
				<>
					{ !this._showLabels && entity.hasSeparator &&
						<span class="ui5-time-selection-separator">:</span>
					}
					{ this._showLabels && index > 0 &&
						<span class="ui5-time-selection-separator">:</span>
					}

					<div class={{ "ui5-time-selection-input-cell": this._showLabels }}>
						{ this._showLabels &&
							<Label class="ui5-time-selection-input-label">
								{hzLabels[entity.entity ?? ""] ?? entity.label}
							</Label>
						}
						<Input
							id={`${this._id}_input_${entity.entity}`}
							class="ui5-time-selection-numeric-input"
							type={this._numberType}
							maxlength={2}
							autocomplete="off"
							pattern="[0-9]*"
							inputmode="numeric"
							value={entity.stringValue}
							accessibleName={entity.label}
							_nativeInputAttributes={entity.attributes}
							onFocusIn={this._onfocusin}
							onFocusOut={this._onfocusout}
							onInput={this._oninput}
						/>
					</div>
				</>
			))}

			{this._periods.length > 0 &&
			<>
				{ !this._showLabels && <span class="ui5-time-selection-separator"></span> }
				<div class={{ "ui5-time-selection-input-cell": this._showLabels }}>
					{ this._showLabels && <Label class="ui5-time-selection-input-label">&nbsp;</Label> }
					<SegmentedButton id={`${this._id}_AmPm`} onClick={this._periodChange}>
						{this._periods.map(period =>
							<SegmentedButtonItem selected={period.selected}>{period.label}</SegmentedButtonItem>
						)}
					</SegmentedButton>
				</div>
			</>
			}
		</div>
	);
}
