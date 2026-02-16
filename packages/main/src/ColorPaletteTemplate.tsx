import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

import type ColorPalette from "./ColorPalette.js";
import Button from "./Button.js";
import ColorPaletteItem from "./ColorPaletteItem.js";

export default function ColorPaletteTemplate(this: ColorPalette) {
	return (
		<>
			<div
				class={{
					"ui5-cp-root": true,
					"ui5-cp-root-phone": isPhone(),
				}}
				onClick={this._onclick}
				onKeyUp={this._onkeyup}
				onKeyDown={this._onkeydown}
				onMouseDown={this._onmousedown}
			>
				{this.showDefaultColor &&
					<div class="ui5-cp-default-color-button-wrapper">
						<Button
							class="ui5-cp-default-color-button"
							design="Transparent"
							onClick={this._onDefaultColorClick}
							onKeyUp={this._onDefaultColorKeyUp}
							onKeyDown={this._onDefaultColorKeyDown}
						>
							{this.colorPaletteDefaultColorText}
						</Button>
						<div class="ui5-cp-separator"></div>
					</div>
				}
				<div class="ui5-cp-item-container"
					role="group"
					aria-label={this.colorContainerLabel}
					onKeyDown={this._onColorContainerKeyDown}
				>
					{this.displayedColors.map(color =>
						<slot name={color._individualSlot}></slot>
					)}
				</div>

				{this.showMoreColors &&
					<div class="ui5-cp-more-colors-wrapper">
						<div class="ui5-cp-separator"></div>
						<Button
							design="Transparent"
							class="ui5-cp-more-colors"
							onClick={this._openMoreColorsDialog}
							onKeyDown={this._onMoreColorsKeyDown}
						>
							{this.colorPaletteMoreColorsText}
						</Button>
					</div>
				}

				{this.showRecentColors &&
					<div class="ui5-cp-recent-colors-wrapper">
						<div class="ui5-cp-separator"></div>
						<div class="ui5-cp-recent-colors-container" onKeyDown={this._onRecentColorsContainerKeyDown}>
							{this.recentColors.map(color =>
								<ColorPaletteItem value={color}/>
							)}
						</div>
					</div>
				}
			</div>

			{ this.showMoreColors && this.showMoreColorsTemplate?.call(this) }
		</>
	);
}
