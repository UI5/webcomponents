import type ColorPalette from "../ColorPalette.js";
import Button from "../Button.js";
import Dialog from "../Dialog.js";
import ColorPicker from "../ColorPicker.js";

export default function ColorPaletteMoreColorsTemplate(this: ColorPalette) {
	return (
		<Dialog open={this.dialogOpen} headerText={this.colorPaletteDialogTitle} onClose={this._closeDialog} onOpen={this._onColorPickerDialogOpen}>
			<div class="ui5-cp-dialog-content">
				<ColorPicker value={this.colorPickerValue} onChange={this.onColorPickerChange} />
			</div>

			<div slot="footer" class="ui5-cp-dialog-footer">
				<Button
					design="Emphasized"
					onClick={this._chooseCustomColor}
				>
					{this.colorPaletteDialogOKButton}
				</Button>

				<Button
					design="Transparent"
					onClick={this._closeDialog}
				>
					{this.colorPaletteCancelButton}
				</Button>
			</div>
		</Dialog>
	);
}
