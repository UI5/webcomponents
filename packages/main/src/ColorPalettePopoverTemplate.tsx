import type ColorPalettePopover from "./ColorPalettePopover.js";
import Title from "./Title.js";
import Button from "./Button.js";
import ColorPalette from "./ColorPalette.js";
import ResponsivePopover from "./ResponsivePopover.js";

export default function ColorPalettePopoverTemplate(this: ColorPalettePopover) {
	return (
		<ResponsivePopover
			hideArrow={true}
			contentOnlyOnDesktop={true}
			placement="Bottom"
			opener={this.opener}
			open={this._open}
			onClose={this.onAfterClose}
			onOpen={this.onAfterOpen}
			accessibleName={this._colorPaletteTitle}
		>
			<div slot="header" class="ui5-cp-header">
				<Title level="H1" wrappingType="None">
					{this._colorPaletteTitle}
				</Title>
			</div>

			<div>
				<ColorPalette
					showMoreColors={this.showMoreColors}
					showRecentColors={this.showRecentColors}
					showDefaultColor={this.showDefaultColor}
					defaultColor={this.defaultColor}
					accessibleName={this.accessibleName}
					accessibleNameRef={this.accessibleNameRef}
					popupMode={true}
					onItemClick={this.onSelectedColor}
				>
					{this.colorPaletteColors.map(color =>
						<slot name={color._individualSlot}></slot>
					)}
				</ColorPalette>
			</div>

			<div slot="footer" class="ui5-cp-footer">
				<Button
					design="Transparent"
					onClick={this.closePopover}
				>
					{this._cancelButtonLabel}
				</Button>
			</div>
		</ResponsivePopover>
	);
}
