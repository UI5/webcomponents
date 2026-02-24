import type ColorPicker from "./ColorPicker.js";
import Label from "./Label.js";
import Slider from "./Slider.js";
import Input from "./Input.js";
import Button from "./Button.js";

export default function ColorPickerTemplate(this: ColorPicker) {
	return (
		<div
			class="ui5-color-picker-root"
			role="group"
			aria-label={this.colorPickerLabel}
		>
			<div
				class="ui5-color-picker-main-color"
				role="presentation"
				style={{ "background-color": `rgb(${this._mainValue.r}, ${this._mainValue.g}, ${this._mainValue.b})` }}
				onMouseDown={this._handleMouseDown}
				onMouseUp={this._handleMouseUp}
				onMouseMove={this._handleMouseMove}
				onMouseOut={this._handleMouseOut}
			>
				<div
					class="ui5-color-picker-circle"
					style={{
						left: `${this._selectedCoordinates.x}px`,
						top: `${this._selectedCoordinates.y}px`,
					}}
				></div>
			</div>

			<div
				class="ui5-color-picker-sliders-wrapper"
				role="group"
				aria-label={this.sliderGroupLabel}
			>
				<Slider
					disabled={this.inputsDisabled}
					class="ui5-color-picker-hue-slider"
					min={0}
					max={360}
					step={1}
					value={this._hue}
					accessibleName={this.hueSliderLabel}
					showTooltip={true}
					onInput={this._handleHueInput}
				/>

				{this._isDefaultPickerMode &&
					<Slider
						disabled={this.inputsDisabled}
						class="ui5-color-picker-alpha-slider"
						min={0}
						max={1}
						step={0.01}
						value={this._alpha}
						accessibleName={this.alphaSliderLabel}
						showTooltip={true}
						onInput={this._handleAlphaInput}
					/>
				}
			</div>

			<div class="ui5-color-picker-current-color">
				<div class="ui5-color-picker-colors-wrapper">
					<span class="ui5-color-picker-white"></span>
					<span class="ui5-color-picker-color">
						<div
							class="ui5-color-picker-color-inner"
							style={{ "background-color": this._colorValue.toRGBString() }}
						></div>
					</span>
				</div>

				<div class="ui5-color-picker-hex-input-wrapper">
					<Label>Hex</Label>
					<Input
						class="ui5-color-picker-hex-input"
						value={this.HEX}
						onKeyDown={this._onkeydown}
						accessibleName={this.hexInputLabel}
						onChange={this._handleHEXChange}
						valueState={this.hexInputErrorState}
					/>
				</div>
			</div>

			{this._isDefaultPickerMode &&
				<div
					class="ui5-color-channel-inputs-wrapper"
					onui5-change={this._handleColorInputChange}
				>
					{this.colorChannelInputs.map(input =>
						<><div class="ui5-color-channel">
							<Input
								id={input.id}
								class="ui5-color-channel-input"
								disabled={this.inputsDisabled}
								accessibleName={input.accessibleName}
								value={String(input.value)} />
							<Label>{input.label}</Label>
						</div>
						<div class="ui5-color-channel-percentage-label">
							{input.showPercentSymbol &&
								<Label>%</Label>
							}
						</div></>
					)}

					<div class="ui5-color-channel">
						<Input
							id="alpha"
							disabled={this.inputsDisabled}
							class="ui5-color-channel-input"
							value={this._alphaTemp ?? String(this._alpha)}
							accessibleName={this.alphaInputLabel}
							onChange={this._handleAlphaChange}
							onInput={this._handleAlphaInput}
						/>
						<Label>A</Label>
					</div>

					<div>
						<Button
							class="ui5-color-channel-toggle"
							id="toggle-picker-mode"
							icon="expand"
							design="Transparent"
							tooltip={this.toggleModeTooltip}
							onClick={this._togglePickerMode}
						/>
					</div>
				</div>
			}
		</div>
	);
}
